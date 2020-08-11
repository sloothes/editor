
//	apply-editor-matrix.js

	(function( editor,apply_button,vector_droplist,entity_droplist ){

	//	var interval;

		watch( apply_button, "onclick", function( property, event, value ){

			var object = getObjectByEntityId( value ); if ( !object ) return;
		//	if ( !(object.children && object.children.length) ) return;

			object.traverse(function(child){
				if ( child.geometry ) child.geometry.applyMatrix( editor.matrix );
			});

			setTimeout( function(){
				editor.position.set(0,0,0); editor.rotation.set(0,0,0); 
				editor.scale.set(1,1,1); editor.matrixWorldNeedsUpdate = true; 
				callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
			});

		});

	//	Call watchers.

	//	apply_button.addEventListener( "click", function(){ 
	//		clearTimeout( interval ); interval = setTimeout(function( button ){
	//			callWatchers( button, "onclick", "click", entity_droplist.value );
	//		}, 250, this); 
	//	});

	})(
		objectEditor, // editor,
		TabUI.Editor.tab.querySelector("div#apply-editor-matrix"),        // apply_button,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist"),  // vector_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist") // entity_droplist.
	);

//	matrix-needs-update.js

	(function( editor,matrix_button ){

		watch( matrix_button, "onclick", function( property, event, key ){

			editor.matrixWorldNeedsUpdate = true;
		});

	})(
		objectEditor, TabUI.Editor.tab.querySelector("div#matrix-needs-update") // matrix_button,
	);

//	exit-edit-mode.js

	(function(exit_button,entity_droplist,exitEditMode){

		watch( exit_button, "onclick", function( prop, event, value ){

			 exitEditMode( entity_droplist );
		});

	})( 
		TabUI.Editor.tab.querySelector("div#editor-exit-mode"), // exit_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist.
		exitEditMode // function.
	 ); 

//	reset-vectors.js

	(function( editor,reset_button,vector_w,vector_droplist ){

		watch( reset_button, "onclick", function( property, event, key ){

			switch ( key ) {
				case "position":
					editor.position.set(0,0,0);
				break;
				case "rotation":
					editor.rotation.set(0,0,0);
				break;
				case "scale":
					editor.scale.set(1,1,1);
				break;
				case "quaternion":
					editor.quaternion.set(0,0,0,1);
				break;
			}

		});

	})(
		objectEditor, // editor,
		TabUI.Editor.tab.querySelector("div#editor-vectors-reset"), // reset_button,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist") // vector_droplist.
	);

//	entity-save-button.js

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

			var json; var meta = { geometries:{}, materials:{}, textures:{}, images:{} };

			try { json = getObjectByEntityId().toJSON( meta ); } 
			catch(err){ return exitEditMode( entity_droplist ); }

			debugMode && console.log( json, meta );

			if ( !json ) return exitEditMode(entity_droplist);
			if ( !json.object ) return exitEditMode(entity_droplist);

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

					saveto(Materials, meta.materials[key], "material");

				}

			//	geometries.

				for (var key in meta.geometries){

					saveto(Geometries, meta.geometries[key], "geometry");

				}

			})( meta );

			function saveto( collection, data, keyword ){

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

		//	children.

			(function(object){

				if ( !object ) return;
				if ( !object.children ) return;
				if ( !object.children.length ) return;

			//	children.
				var children = object.children.filter(function(child){
					return child.uuid !== water.uuid && child.uuid !== mirror.uuid;
				}); if ( !children || !children.length ) return;

				var length = children.length;
				for (var i = 0; i < length; i++){

					saveto(Objects, children[i], "child");

				}

			})( json.object );

		//	object.

			(function(object){

				if ( !object ) return;
				if ( object.uuid === water.uuid ) return exitEditMode(entity_droplist); // hack!
				if ( object.uuid === mirror.uuid ) return exitEditMode(entity_droplist); // hack!

				saveto(Objects, json.object, "object");

			})( json.object );

		//	exit edit.

			return exitEditMode(entity_droplist);
		});

	})( 
		metadB, TabUI.Editor.tab.querySelector("div#editor-save-button"), // db, save_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		exitEditMode // exit function.
	);
