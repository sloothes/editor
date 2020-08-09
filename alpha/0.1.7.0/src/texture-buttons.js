
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

//	texture-needs-update.js

	(function( needs_update ){

		watch( needs_update, "onclick", function( prop, event, value ){

			var texture = getTextureByEntityId(value);
			if ( texture ) texture.needsUpdate = true;

		});

	})( TabUI.Texture.tab.querySelector("div#texture-needs-update") );

//	replace-image.js

	(function(viewer,input,button,entity_droplist){

		var interval;

		input.addEventListener( "change", function(e){

			if ( input.files.length === 0 ) return;

			var file = input.files[0];

		//	get texture.
			var texture = getTextureByEntityId( entity_droplist.value );
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
			if ( !entity_droplist.value ) return;
			input.value = ""; input.click();
		});

	})(
		null, // textureViewer,
		TabUI.Texture.tab.querySelector("input#image-file-input"), // input,
		TabUI.Texture.tab.querySelector("div#replace-image-button"), // button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // entity_droplist.
	);

//	exit-edit.js

	(function(exit_button,entity_droplist,exitEditMode){

		watch( exit_button, "onclick", function( prop, event, value ){

			 exitEditMode( entity_droplist );
		});

	})( 
		TabUI.Texture.tab.querySelector("div#texture-exit-mode"), // exit_button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		exitEditMode // function.
	 ); 

//	texture-create.js

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

//	material-map-replace.js

	(function( replace_button,map_droplist,entity_droplist,exitEditMode ){

		watch( replace_button, "onclick", function( property, event, map ){

			if ( !map_droplist.value ) return; if ( !map ) return;
			var texture = getTextureByEntityId(); if ( !texture ) return;
			var material = getMaterialByEntityId(); if ( !material ) return;

		//	Replace texture.
			if ( map && material && texture ) {
				material[ map ] = texture; 
				material[ map ].needsUpdate = material.needsUpdate = true;
			}

		//	Exit material edit mode.
			map_droplist.value = ""; exitEditMode( entity_droplist );
		});

	})(
		TabUI.Texture.tab.querySelector("div#replace-map-button"), // replace_button,
		TabUI.Texture.tab.querySelector("select#textures-map-droplist"), // map_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist,
		exitEditMode // function.
	);

//	texture-save.js

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

			var meta = { geometries:{}, materials:{}, textures:{}, images:{} };
			try { getTextureByEntityId( value ).toJSON( meta ); } catch(err){ 
				console.error("Couldn't save", getTextureByEntityId() ); return; 
			}

			debugMode && console.log( meta );

			(function(meta){

			//	images.

				for (var key in meta.images){

					saveto(Images, meta.images[key], "image");

				}

			//	textures.

				for (var key in meta.textures){

					saveto(Textures, meta.textures[key], "texture");

				}

			//	materials.

				for (var key in meta.materials){

				//	saveto(Materials, meta.materials[key], "material");

				}

			//	geometries.

				for (var key in meta.geometries){

				//	saveto(Geometries, meta.geometries[key], "geometry");

				}

				function saveto(collection,data,keyword){

					var result;

					collection.find({uuid:data.uuid}).forEach(

						function(doc){

							result = doc.uuid;

							collection.update({_id:doc._id}, {$set:data}, function(err){
								if (err) throw err; console.log(keyword, doc.uuid, "updated!" )
							}).catch(function(err){ console.error(err); });

						},

						function(err){

							if (err) throw err;  

							if (!result) return collection.insert(data, function(err){ 
								if (err) throw err; console.log(keyword, data.uuid, "saved!" )
							}).catch(function(err){ console.error(err); });
						}

					).catch(function(err){ console.error(err); });

				}

			})( meta );

		});

	})(
		metadB, // database,
		TabUI.Texture.tab.querySelector("div#texture-save-button"), // save_button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // entity_droplist.
	);
