
//	geometry-create-button.js

	(function(create_button,type_droplist,entity_droplist,material_manager,entity_manager,scene){

		watch( create_button, "onclick", function( prop, event, type ){

		//	Get type.
			if ( type === "" || type === undefined ) return;

		//	Create geometry.
			var geometry = new THREE[ type ]();
			if ( geometry === undefined ) return;

		//	Init params based on type.
			switch (type) {
				case "PlaneGeometry":
					geometry.translate(0, 0.5, 0);
				break;
			//	case "BoxGeometry":
			//	case "ConeGeometry":
			//	case "TorusGeometry":
			//	case "SphereGeometry":
			//	case "CylinderGeometry":
			//	case "OctahedronGeometry":
			//	case "DodecahedronGeometry":
			//	case "IcosahedronGeometry":
			//	case "TetrahedronGeometry":
			//	case "TorusKnotGeometry":
			//	case "CircleGeometry":
			//	case "RingGeometry":
			//	break;
			}

		//	Create mesh.
			var material = new THREE.MeshLambertMaterial({side:2});
			var mesh = new THREE.Mesh(geometry, material);
			mesh.name = type.replace("Geometry","");
			scene.add( mesh );

		//	Add entities.
			entity_manager && entity_manager.add( mesh );
			material_manager && material_manager.add( material );

		//	Enter edit mode.
			entity_droplist.value = String(mesh.id);
			callWatchers(entity_droplist, "onchange", "change", entity_droplist.value );
		});

	})(
		TabUI.Geometry.tab.querySelector("div#geometry-create-button"),    // create_button,
		TabUI.Geometry.tab.querySelector("select#geometry-type-droplist"), // type_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		material_entities, entities, scene  // material_manager, entity_manager, scene.
	);

//	geometry-clone-button.js

	(function(clone_button,entity_droplist,entity_manager,scene){

		watch( clone_button, "onclick", function( prop, event, value ){

			if ( value === undefined || value === "" ) return;

		//	Get source.
			var source = getObjectByEntityId( Number(value) ); // id.
			if ( !(source && source.isMesh && source.geometry) ) return;

		//	Clone source.
			if ( source.isMesh && source.geometry ) {

			//	clone.
				var mesh = source.clone();

			//	rename.
				if ( source.name ) 
					mesh.name = source.name.replace(/:clone/g,"") + ":clone";
				else
					mesh.name = mesh.type.replace(/Geometry/g,"") + ":clone";

			//	translate.
				mesh.position.y += 1; // (m)

			//	add to scene.
				scene.add( mesh );

			//	add to entities.
				entity_manager.add( mesh );

			//	enter to edit mode.
				entity_droplist.value = String(mesh.id);
				callWatchers(entity_droplist, "onchange", "change", entity_droplist.value );
			}

		});

	})(
		TabUI.Geometry.tab.querySelector("div#geometry-clone-button"),     // clone_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		entities, scene // entity_manager, scene.
	);

//	geometry-remove-button.js

	(function(remove_button,entity_droplist,entity_manager,rigid_objects,octree,scene,octreeIncludes,exitEditMode){

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
			entity_manager && entity_manager.remove( object );

		//	Remove from camera rigid objects.
			rigid_objects.remove( Number(value) ); // id.
		//	removefromRigidObjects( Number(value) ); // id.

		//	Exit edit mode.
			exitEditMode( entity_droplist );
		});

	})(
		TabUI.Geometry.tab.querySelector("div#geometry-remove-button"),    // remove_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		entities, rigidObjects, octree, scene, // entity_manager, rigidObjects, scene,
		octreeIncludes, exitEditMode // function, function.
	);


//	octree-add-button.js

	(function(add_button,entity_droplist,localPlayer,octree,scene,exitEditMode){

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
		localPlayer, octree, scene, exitEditMode // localPlayer, octree, scene, function.
	);

//	octree-remove-button.js

	(function(remove_button,entity_droplist,octree,scene,exitEditMode){

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
		octree, scene, exitEditMode //  octree, scene, function.
	);

