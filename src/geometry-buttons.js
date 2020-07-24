
//	geometry-create-button.js

	(function(editor,create_button,entity_droplist,material_entities,entities,scene,local_player){

		watch( create_button, "onclick", function( prop, event, type ){

			if ( type === "" || type === undefined ) return;

		//	Copy position.
			if ( local_player ) {
				editor.position.x = local_player.position.x;
				editor.position.z = local_player.position.z;
			}

		//	Create geometry.
			var geometry = new THREE[ type ]();
			if ( geometry === undefined ) return;

		//	Init params based on type.
		//	switch (type) {
		//		case "BoxGeometry":
		//		case "PlaneGeometry":
		//			geometry.translate(0, 0.5, 0);
		//		break;
		//		case "ConeGeometry":
		//		case "TorusGeometry":
		//		case "SphereGeometry":
		//		case "CylinderGeometry":
		//		case "OctahedronGeometry":
		//		case "DodecahedronGeometry":
		//		case "IcosahedronGeometry":
		//		case "TetrahedronGeometry":
		//		case "TorusKnotGeometry":
		//		case "CircleGeometry":
		//		case "RingGeometry":
		//	}

		//	Material.
			var material = new THREE.MeshStandardMaterial({side:0});

		//	Create mesh.
			var mesh = new THREE.Mesh(geometry, material);
			mesh.position.copy( editor.position ); 
			mesh.name = type.replace(/Geometry/g,"");
			scene.add( mesh );

		//	Add entities.
			entities && entities.add( mesh );
			material_entities && material_entities.add( material );

		//	Enter edit mode.
			callWatchers(entity_droplist, "onchange", "change", entity_droplist.value = String(mesh.id) );
		});

	})(
		objectEditor, // editor,
		TabUI.Geometry.tab.querySelector("div#geometry-create-button"),    // create_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		material_entities, entities, scene, // material_manager, entity_manager, scene,
		localPlayer // local_player.
	);

//	geometry-clone-button.js

	(function(clone_button,entity_droplist,entities,scene){

		watch( clone_button, "onclick", function( prop, event, value ){

			if ( value === undefined || value === "" ) return;

		//	Get source.
			var source = getObjectByEntityId( Number(value) ); // id.
			if ( !(source && source.isMesh && source.geometry) ) return;

		//	Clone source.
			if ( source.isMesh && source.geometry ) {

			//	clone.
				var mesh = source.clone(); if ( !mesh ) return;

			//	rename.
				if ( source.name ) 
					mesh.name = source.name.replace(/:clone/g,"") + ":clone";
				else
					mesh.name = source.geometry.type.replace(/Geometry/g,"")+" "+source.id + ":clone";

			//	translate.
			//	mesh.position.y += 1; // (m)

			//	add to scene.
				scene.add( mesh );

			//	add to entities.
				entities.add( mesh );

			//	enter to edit mode.
				callWatchers(entity_droplist, "onchange", "change", entity_droplist.value = String(mesh.id) );
			}

		});

	})(
		TabUI.Geometry.tab.querySelector("div#geometry-clone-button"),     // clone_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		entities, scene // entity_manager, scene.
	);

//	geometry-remove-button.js

	(function(remove_button,entity_droplist,entities,rigid_objects,octree,octreeIncludes,exitEditMode){

		watch( remove_button, "onclick", function( prop, event, value ){

			if ( value === undefined || value === "" ) return;

			var object = getObjectByEntityId( Number(value) ); 
			debugMode && console.log("remove object:", object);
			if ( !object ) return entity_droplist.value = "";

		//	remove octree.
			if ( object.isMesh && object.geometry ) (function(){
				var uuid = object.geometry.uuid;
				octreeIncludes( uuid ) && octree.removeThreeMesh( uuid );
			})();

		//	remove object.
			object.parent && object.parent.remove( object );

		//	remove entity and option.
			entities && entities.remove( object );

		//	Remove from camera rigid objects.
			rigid_objects.remove( Number(value) ); // id.
		//	removefromRigidObjects( Number(value) ); // id.

		//	Exit edit mode.
			exitEditMode( entity_droplist );
		});

	})(
		TabUI.Geometry.tab.querySelector("div#geometry-remove-button"),    // remove_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		entities, rigidObjects, octree, // entity_manager, rigidObjects,
		octreeIncludes, exitEditMode // function, function.
	);

//	geometry-save-button.js

	(function(db,save_button,entity_droplist,exitEditMode){

	//	var Objects, Geometries, Materials, Textures, Images; // collections.
	//	var meta = { geometries:{}, materials:{}, textures:{}, images:{}, shapes:{} };

		watch( save_button, "onclick", function( property, event, value ){

			if ( !db ) return; if ( !value ) return;

		//	collections.

			var Images = db.collection("images"); if ( !Images ) return;
			var Objects = db.collection("objects"); if ( !Objects ) return;
			var Textures = db.collection("textures"); if ( !Textures ) return;
			var Materials = db.collection("materials"); if ( !Materials ) return;
			var Geometries = db.collection("geometries"); if ( !Geometries ) return;

		//	json.

		//	var object = getObjectByEntityId( value ); if ( !object ) return;

			var json, meta = { geometries:{}, materials:{}, textures:{}, images:{} };

			try { json = getObjectByEntityId().toJSON( meta ); } 
			catch(err){ return exitEditMode( entity_droplist ); }

			if ( !(json && json.object) ) return exitEditMode( entity_droplist );

			debugMode && console.log( json, meta );

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

		//	objects.

		//	json.object children.

			(function(collection,children){

				if ( !children ) return;

				children.forEach(function(child, i){

					var result; // important!

					collection.find({uuid:child.uuid}).forEach(

						function(doc){
							result = true;
							return collection.update({_id:doc._id}, {$set:child}, function(err){
								if (err) throw err; return doc;
							//	console.log("child updated!");
							});
						},

						function(err){ if (err) throw err; }

					).then(function(results){

						debugMode && console.log("child results:", results);
						if (!result) return collection.insert(child, function(err){ 
							if (err) throw err; return child;
						//	console.log( "child inserted!" );
						});

						return results;

					}).then(function(results){

						debugMode && console.log( "child saved!" );
						debugMode && console.log( "child results:", results );

					}).catch(function(err){
						console.error(err);
					});

				});

			})( Objects, json.object.children );

		//	json.object.

			(function(collection,object){

				var result; // important!

				collection.find({uuid:object.uuid}).forEach(

					function(doc){
						result = true;
						return collection.update({_id:doc._id}, {$set:object}, function(err){
							if (err) throw err; return doc;
						//	console.log("object updated!");
						});
					},

					function(err){ if (err) throw err; }

				).then(function(results){

					debugMode && console.log("object results:", results);
					if (!result) return collection.insert(object, function(err){ 
						if (err) throw err; return object;
					//	console.log( "object inserted!" );
					});

					return results;

				}).then(function(results){

					debugMode && console.log( "object saved!" );
					debugMode && console.log( "object results:", results );

				}).catch(function(err){
					console.error(err);
				});

			})( Objects, json.object );

		});

	})( 
		metaDB, TabUI.Geometry.tab.querySelector("div#geometry-save-button"), // db,save_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		exitEditMode // function.
	);


//	octree-add-button.js

	(function(add_button,entity_droplist,localPlayer,octree,exitEditMode){

		watch( add_button, "onclick", function( prop, event, value ){

		//	DevNote: You have to add all objects with the 
		//	same geometry.uuid. 
		//	READ explanation at removefromOctree comments.

			var object = getObjectByEntityId( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;
			if ( localPlayer.getObjectById(object.id) ) return; // localPlayer child.

		//	Import to octree.
		//	octree.importThreeMesh( object );
		//	Import all objects with same geometry to octree.
		//	READ explanation at removefromOctree() comments.
			var uuid = object.geometry.uuid;
			var meshes = getObjectsByGeometry(uuid);
			while ( meshes.length ) {
				octree.importThreeMesh( meshes.shift() );
			}

		//	Exit edit mode.
			exitEditMode( entity_droplist );
		});

	})(
		TabUI.Geometry.tab.querySelector("div#octree-add-button"),         // add_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		localPlayer, octree, exitEditMode // localPlayer, octree, function.
	);

//	octree-remove-button.js

	(function(remove_button,entity_droplist,octree,exitEditMode){

		watch( remove_button, "onclick", function( prop, event, value ){

		//	Removes from octree all objects (geometry
		//	faces) that have the same geometry.uuid.
		//	DevNote: It would be better if was using
		//	mesh.uuid and not geometry.uuid. (TODO).

			var object = getObjectByEntityId( value );

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;
			if ( !object.geometry.isGeometry ) return;

		//	Remove from octree.
		//	DevNote: removes all object's geometry 
		//	faces that have same geometry.uuid.
			var uuid = object.geometry.uuid;
			uuid && octree.removeThreeMesh( uuid );

		//	Exit edit mode.
			exitEditMode( entity_droplist );
		});

	})(
		TabUI.Geometry.tab.querySelector("div#octree-remove-button"),      // remove_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		octree, exitEditMode //  octree, scene, function.
	);

