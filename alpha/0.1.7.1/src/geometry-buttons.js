
//	copy-position-button.js

	(function(editor,localPlayer,button){

		var interval;

		watch( button, "onclick", function( prop, event ){

		//	Copy localPlayer location.
			editor.position.x = localPlayer.position.x;
		//	editor.position.y = localPlayer.position.y;
			editor.position.z = localPlayer.position.z;

		});

		button.addEventListener( "click", function(){ 
			clearTimeout( interval );
			interval = setTimeout(function(button){
				callWatchers( button, "onclick", "click" );
			}, 250, this); 
		});

	})( objectEditor, localPlayer, TabUI.Geometry.tab.querySelector("div#copy-position-button") );

//	geometry-create-button.js

	(function(editor,create_button,entity_droplist,material_entities,entities,scene){

		watch( create_button, "onclick", function( prop, event, type ){

			if ( type === "" || type === undefined ) return;

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
		material_entities, entities, scene // material_manager, entity_manager, scene.
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

			var meta = { geometries:{}, materials:{}, textures:{}, images:{} };
			try { getObjectByEntityId().toJSON( meta ); } catch(err){ 
				console.error("Couldn't save", getObjectByEntityId() ); return; 
			}

			debugMode && console.log( meta );

			(function(meta){

			//	images.

				for (var key in meta.images){

				//	saveto(Images, meta.images[key], "image");

				}

			//	textures.

				for (var key in meta.textures){

				//	saveto(Textures, meta.textures[key], "texture");

				}

			//	materials.

				for (var key in meta.materials){

				//	saveto(Materials, meta.materials[key], "material");

				}

			//	geometries.

				for (var key in meta.geometries){

					saveto(Geometries, meta.geometries[key], "geometry");

				}

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

			})( meta );

		});

	})( 
		metadB, TabUI.Geometry.tab.querySelector("div#geometry-save-button"), // db, save_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		exitEditMode // exit function.
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

