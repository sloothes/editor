
//	texture-needs-update.js

	(function( needs_update ){

		watch( needs_update, "onclick", function( prop, event, value ){

			var texture = getTextureByEntityId(value);
			if ( texture ) texture.needsUpdate = true;

		});

	})( TabUI.Texture.tab.querySelector("div#texture-needs-update") );


//	exit-edit-mode.js

	(function(exit_button,entity_droplist,exitEditMode){

		watch( exit_button, "onclick", function( prop, event, value ){

			 exitEditMode( entity_droplist );
		});

	})( 
		TabUI.Texture.tab.querySelector("div#texture-exit-mode"), // exit_button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		exitEditMode // function.
	 ); 

//	reset-vectors.js

	(function( editor,reset_button,vector_w,vector_droplist ){

		watch( reset_button, "onclick", function( property, event, key ){

			switch ( key ) {
				case "center":
				case "offset":
					editor[key].set(0,0);
				break;
				case "repeat":
					editor[key].set(1,1);
				break;
			}

		});

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("div#texture-vectors-reset"), // reset_button,
		TabUI.Texture.tab.querySelector("select#texture-vector-droplist") // vector_droplist.
	);

//	create-texture.js

	(function(viewer,input,button,entity_droplist,textures_entities){

		var interval;

		input.addEventListener( "change", function(e){

			if ( input.files.length === 0 ) return;

			var file = input.files[0];

			var img = new Image();
			img.addEventListener("load", function(){

			//	make power of two.
				var canvas = document.createElement("canvas");
				canvas.width = THREE.Math.floorPowerOfTwo( img.width );
				canvas.height = THREE.Math.floorPowerOfTwo( img.height );
				var context = canvas.getContext( "2d" );
				context.drawImage( img, 0, 0, canvas.width, canvas.height );
				debugMode && console.log( canvas );

			//	create texture.
				var texture = new THREE.Texture(canvas);
				texture.name = file.name;
				texture.sourceFile = file.name;
				texture.wrapS = texture.wrapT = 1000; // THREE.RepeatWrapping.
				debugMode && console.log( texture );

			//	add texture entity.
				textures_entities.add( texture ); // entity manager.

			//	texture viewer.
				if ( texture.image !== undefined ) texture.needsUpdate = true;
				if ( viewer && viewer.material ) viewer.material.needsUpdate = true;

			//	TODO: add to database.
				var meta = {geometries:{},materials:{},textures:{},images:{},shapes:{}};
				var json = texture.toJSON(meta); debugMode && console.log( json, meta );

			//	Enter edit mode.
				callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = String(texture.id) );

			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name;
				img.src = reader.result;
			});

			reader.readAsDataURL(file);

		});

		button.addEventListener( "click", function(){ 
			input.value = ""; input.click();
		});

	})(
		null, // textureViewer,
		TabUI.Texture.tab.querySelector("input#texture-file-input"), // input,
		TabUI.Texture.tab.querySelector("div#texture-create-button"), // button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		textures_entities // entity_manager.
	);

//	replace-image.js

	(function(viewer,input,button,droplist){

		var interval;

		input.addEventListener( "change", function(e){

			if ( input.files.length === 0 ) return;

			var file = input.files[0];

		//	get texture.
			var texture = getTextureByEntityId( droplist.value ); // string.
			if ( !texture ) return; debugMode && console.log( texture );

			var img = new Image();
			img.addEventListener("load", function(){

			//	make power of two.
				var canvas = document.createElement("canvas");
				canvas.width = THREE.Math.floorPowerOfTwo( img.width );
				canvas.height = THREE.Math.floorPowerOfTwo( img.height );
				var context = canvas.getContext( "2d" );
				context.drawImage( img, 0, 0, canvas.width, canvas.height );
				debugMode && console.log( canvas );

			//	texture has gotten.
				if ( !texture ) return;
				texture.image = canvas;
				texture.name = file.name;
				texture.sourceFile = file.name;
				if ( texture.image !== undefined ) texture.needsUpdate = true; // important!
				if ( viewer && viewer.material ) viewer.material.needsUpdate = true; // important!
			//	TODO: Update texture entity option text.

			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name;
				img.src = reader.result;
			});

			reader.readAsDataURL(file);

		});

		button.addEventListener( "click", function(){ 
			input.value = ""; input.click();
		});

	})(
		null, // textureViewer,
		TabUI.Texture.tab.querySelector("input#image-file-input"), // input,
		TabUI.Texture.tab.querySelector("div#replace-image-button"), // button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // droplist.
	);

//	save-texture.js

	(function(db,save_button,entity_droplist){

	//	var Geometries, Materials, Textures, Images, Shapes; // collections.

	//	Images = db.collection("images");
	//	Textures = db.collection("textures");
	//	Materials = db.collection("materials");
	//	Geometries = db.collection("geometries");
	//	Shapes = db.collection("shapes");
	//	var meta = { geometries:{}, materials:{}, textures:{}, images:{}, shapes:{} };

		watch( save_button, "onclick", function( property, event, value ){

			if ( !db ) return;

		//	collections.

			var Images = db.collection("images"); if ( !Images ) return;
			var Textures = db.collection("textures"); if ( !Textures ) return;
			var Materials = db.collection("materials"); if ( !Materials ) return;
			var Geometries = db.collection("geometries"); if ( !Geometries ) return;

		//	json.

			var texture = getTextureByEntityId(); if ( !texture ) return;
			var meta = { geometries:{}, materials:{}, textures:{}, images:{} };
			var json = texture.toJSON(meta); debugMode && console.log( meta );

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
		TabUI.Texture.tab.querySelector("div#texture-save-button"), // save_button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // entity_droplist.
	);

/*
		//	colect images.
			var images = [];
			for ( var uuid in meta.images ){
				images.push( meta.images[uuid] );
			}

		//	collect textures.
			var textures = [];
			for ( var uuid in meta.textures ){
				textures.push( meta.textures[uuid] );
			}

		//	debugMode && console.log( "Images insert:", images );
		//	debugMode && console.log( "Textures insert:", textures );

		//	save images.

			if ( images.length ) images.forEach(function(data, i){

			//	var data = images[i];
				var collection = Images;
				var results = collection.find({uuid:data.uuid}); // cursor.

				results.toArray(function(err,docs){

					if (err) throw err;

					var _ids = [];
					for (var doc of docs){
						_ids.push( doc._id);
					}
					return _ids;

				}).then(function(_ids){

				//	update.
					if ( _ids.length ) _ids.forEach(function(_id){
						collection.update({_id:_id}, {$set:data}, function(err){
							if (err) throw err; console.log("image updated!");
						});
					});

				//	insert.
					else collection.insert( data, function(err){ 
						if (err) throw err; console.log( "image inserted!" );
					});

				}).then(function(){
					console.log( "image saved!" );
				}).catch(function(err){
					console.error(err);
				});

			});
				
		//	save textures.

			if ( textures.length ) textures.forEach(function(data, i){

			//	var data = textures[i];
				var collection = Textures;
				var results = collection.find({uuid:data.uuid}); // cursor.

				results.toArray(function(err,docs){

					if (err) throw err;

					var _ids = [];
					for (var doc of docs){
						_ids.push( doc._id);
					}
					return _ids;

				}).then(function(_ids){

				//	update.
					if ( _ids.length ) _ids.forEach(function(_id){
						collection.update({_id:_id}, {$set:data}, function(err){
							if (err) throw err; console.log("texture updated!");
						});
					});

				//	insert.
					else collection.insert( data, function(err){ 
						if (err) throw err; console.log( "texture inserted!" );
					});

				}).then(function(){
					console.log( "texture saved!" );
				}).catch(function(err){
					console.error(err);
				});

			});
*/

