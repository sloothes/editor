//	octree-helpers.js

	function getObjectsByGeometry( uuid ){
		return scene.children.filter(function(child){
			return child.geometry && child.geometry.uuid === uuid; // same geometry.
		}).filter(function( object ){
			return !localPlayer.getObjectById(object.id); // not localPlayer child.
		});
	}

	function addtoOctree( value ){

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

		return object; // important!
	}

	function removefromOctree( value ){

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

		return object; // important!
	}

	function updateOctree( value ){
		var object = removefromOctree( value );

		if ( !object ) return;
		if ( !object.isMesh ) return;
		if ( !object.geometry ) return;
		if ( !object.geometry.isGeometry ) return;
		if ( localPlayer.getObjectById(object.id) ) return; // localPlayer child.

	//	Import to octree. 
	//	octree.importThreeMesh( object );
	//	Use addtoOctree() to import to octree.
	//	READ explanation at removefromOctree() comments.

		addtoOctree( value ); 
	}

	function octreeIncludes( uuid ){

		var result;

		octree.nodes.forEach(function (nodeDepth) {
			if ( result ) return;
			nodeDepth.forEach(function (node) {
				if ( result ) return;
				node.trianglePool.forEach(function (face) {
					if ( result ) return;
					if (face.meshID === uuid) result = true;
				});
			});
		});

		return result;
	}

