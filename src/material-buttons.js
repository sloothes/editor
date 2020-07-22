//	material-needs-update.js

	(function( needs_update ){

		watch( needs_update, "onclick", function( prop, event, value ){

			var material = getMaterialByEntityId();
			if ( material ) material.needsUpdate = true;

		});

	})( TabUI.Material.tab.querySelector("div#material-needs-update") );

//	remove-texture.js

	(function( remove_button,map_droplist ){

		watch( remove_button, "onclick", function( property, event, value ){

			var map = map_droplist.value; if ( !map ) return;
			var material = getMaterialByEntityId(); if ( !material ) return;

		//	Remove texture.
			if ( material && material[ map ] !== undefined ) {
				material[ map ] = null; material.needsUpdate = true;
			}

		//	Reset droplist.
			map_droplist.value = "";
		});

	})(
		TabUI.Material.tab.querySelector("div#material-remove-map"), // remove_button,
		TabUI.Material.tab.querySelector("select#material-map-droplist") // map_droplist,
	);

//	replace-material.js

	(function( replace_button ){

		watch( replace_button, "onclick", function( prop, event, value ){

			var object = getObjectByEntityId(); 
			var material = getMaterialByEntityId();
			if ( !(object && material && object.material) ) return;

			object.material = material;
		});

	})( TabUI.Material.tab.querySelector("div#material-replace-button") ); // replace_button

//	exit-edit.js

	(function(exit_button,entity_droplist,exitEditMode){

		watch( exit_button, "onclick", function( prop, event, value ){

			 exitEditMode( entity_droplist );
		});

	})( 
		TabUI.Material.tab.querySelector("div#material-exit-mode"), // exit_button,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		exitEditMode // function.
	 ); 

//	material-create.js

	(function(create_button,type_droplist,entity_droplist,material_entities){

		watch( create_button, "onclick", function( prop, event, type ){

		//	Get type.
			if ( type === "" || type === undefined ) return;

		//	Init properties based on type.

			switch (type) {
				//	case "PointsMaterial":
				//	case "SpriteMaterial":
				//	case "ShaderMaterial":
				//	case "ShadowMaterial":
				//	case "MeshToonMaterial":
				//	case "MeshBasicMaterial":
				//	case "MeshPhongMaterial":
				//	case "MeshDepthMaterial":
				//	case "MeshNormalMaterial":
				//	case "MeshLambertMaterial":
				//	case "MeshStandardMaterial":
				//	case "MeshPhysicalMaterial":
				//	case "RawShaderMaterial":
				//	case "LineBasicMaterial":
				//	case "LineDashedMaterial":
				//	break;
			}

		//	Create.
			var material = new THREE[ type ]();
			if ( material === undefined ) return;

		//	Naming.
			material.name = "material";

		//	Add entity.
			material_entities.add( material );

		//	Enter edit mode.
			callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = String(material.id) );

		});

	})( 
		TabUI.Material.tab.querySelector("div#material-create-button"), // create_button,
		TabUI.Material.tab.querySelector("select#material-type-droplist"), // type_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist,
		material_entities // entities,
	 ); 

//	material-clone.js

	(function(clone_button,entity_droplist,material_entities){

		watch( clone_button, "onclick", function( prop, event, value ){

			var source = getMaterialByEntityId(); if ( !source ) return;

		//	clone.
			var material = source.clone(); if ( !material ) return;

		//	rename.
			if ( source.name ) 
				material.name = source.name.replace(/:clone/g,"") + ":clone";
			else
				material.name = "material"+source.id + ":clone";

		//	Add entity.
			material_entities.add( material );

		//	Enter edit mode.
			callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = String(material.id) );

		});

	})( 
		TabUI.Material.tab.querySelector("div#material-clone-button"), // clone_button,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist,
		material_entities // entity_manager,
	 ); 
	  
//	material-remove.js

	(function( remove_button,entity_droplist,material_entities ){

		watch( remove_button, "onclick", function( prop, event, value ){

			var material = getMaterialByEntityId(); if ( !material ) return;

		//	Remove entity.
			material_entities.remove( material );

		//	Exit edit mode.
			exitEditMode( entity_droplist );

		});

	})( 
		TabUI.Material.tab.querySelector("div#material-remove-button"), // remove_button,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist,
		material_entities // entity_manager,
	 ); 

//	material-save.js

	(function(db,save_button,entity_droplist){

	//	var Geometries, Materials, Textures, Images, Shapes; // collections.
	//	var meta = { geometries:{}, materials:{}, textures:{}, images:{}, shapes:{} };

		watch( save_button, "onclick", function( property, event, value ){

			if ( !db ) return; if ( !value ) return;

		//	collections.

			var Images = db.collection("images"); if ( !Images ) return;
			var Textures = db.collection("textures"); if ( !Textures ) return;
			var Materials = db.collection("materials"); if ( !Materials ) return;
			var Geometries = db.collection("geometries"); if ( !Geometries ) return;

		//	json.

			var material = getMaterialByEntityId(); if ( !material ) return;
			var meta = { geometries:{}, materials:{}, textures:{}, images:{} };
			var json = material.toJSON(meta); debugMode && console.log( meta );

		//	images.

			(function(collection,images){

				for (var key in images){

					(function(data){

						var result; // important!
						collection.find({uuid:data.uuid}).forEach(

							function(doc){
								result = true;
								collection.update({_id:doc._id}, {$set:data}, function(err){
									if (err) throw err; // console.log("image updated!");
								});
							},

							function(err){ if (err) throw err; }

						).then(function(){

							debugMode && console.log("image result:", result);
							if (!result) collection.insert(data, function(err){ 
								if (err) throw err; // console.log( "image inserted!" );
							});

						}).then(function(){
							console.log( "image saved!" );
						}).catch(function(err){
							console.error(err);
						});

					})( images[key] );

				}

			})( Images, meta.images );

		//	textures.

			(function(collection,textures){

				for (var key in textures){

					(function(data){

						var result; // important!
						collection.find({uuid:data.uuid}).forEach(

							function(doc){
								result = true;
								collection.update({_id:doc._id}, {$set:data}, function(err){
									if (err) throw err; // console.log("texture updated!");
								});
							},

							function(err){ if (err) throw err; }

						).then(function(){

							debugMode && console.log("texture result:", result);
							if (!result) collection.insert(data, function(err){ 
								if (err) throw err; // console.log( "texture inserted!" );
							});

						}).then(function(){
							console.log( "texture saved!" );
						}).catch(function(err){
							console.error(err);
						});

					})( textures[key] );

				}

			})( Textures, meta.textures );

		//	materials.

			(function(collection,materials){

				for (var key in materials){

					(function(data){

						var result; // important!
						collection.find({uuid:data.uuid}).forEach(

							function(doc){
								result = true;
								collection.update({_id:doc._id}, {$set:data}, function(err){
									if (err) throw err; // console.log("material updated!");
								});
							},

							function(err){ if (err) throw err; }

						).then(function(){

							debugMode && console.log("material result:", result);
							if (!result) collection.insert(data, function(err){ 
								if (err) throw err; // console.log( "material inserted!" );
							});

						}).then(function(){
							console.log( "material saved!" );
						}).catch(function(err){
							console.error(err);
						});

					})( materials[key] );

				}

			})( Materials, meta.materials );

		//	geometries.

			(function(collection,geometries){

				for (var key in geometries){

					(function(data){

						var result; // important!
						collection.find({uuid:data.uuid}).forEach(

							function(doc){
								result = true;
								collection.update({_id:doc._id}, {$set:data}, function(err){
									if (err) throw err; // console.log("geometry updated!");
								});
							},

							function(err){ if (err) throw err; }

						).then(function(){

							debugMode && console.log("geometry result:", result);
							if (!result) collection.insert(data, function(err){ 
								if (err) throw err; // console.log( "geometry inserted!" );
							});

						}).then(function(){
							console.log( "geometry saved!" );
						}).catch(function(err){
							console.error(err);
						});

					})( geometries[key] );

				}

			})( Geometries, meta.geometries );

		});

	})(
		metaDB, // database,
		TabUI.Material.tab.querySelector("div#material-save-button"), // save_button,
		TabUI.Material.tab.querySelector("select#material-entities-droplist") // entity_droplist.
	);
