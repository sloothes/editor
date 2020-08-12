//	deck 0.

	(function(scene,octree,cameraControls,material_entities,entities){
		var w=110, h=0.5, d=60, x=-2, y=-h/2, z=2.6;
		var geometry = new THREE.BoxGeometry(w,h,d);
		geometry.translate(0, h/2, 0);
		var material = new THREE.MeshLambertMaterial();
		var mesh = new THREE.Mesh(geometry, material);
		mesh.name = "deck0"; mesh.visible = false;
		mesh.position.set(x,y,z); scene.add( mesh );
	//	var geometry = new THREE.EdgesGeometry( geometry );
	//	var segments = new THREE.LineSegments( geometry, material );
	//	segments.name = "water path edges";
	//	segments.position.copy( mesh.position );
	//	octree.importThreeMesh( mesh );
		entities && entities.add( mesh );
		material_entities && material_entities.add(material);
	//	cameraControls.rigidObjects.push( mesh );
	//	return mesh;
	})( scene, octree, cameraControls, material_entities, entities );

	(function(scene,octree,cameraControls,material_entities,entities){
		var w=100, h=0.5, d=50, x=-2, y=-0, z=2.6;
		var geometry = new THREE.BoxGeometry(w,h,d);
		geometry.translate(0, h/2, 0);
		var material = new THREE.MeshLambertMaterial();
		var mesh = new THREE.Mesh(geometry, material);
		mesh.name = "deck0_floor"; mesh.visible = false;
		mesh.position.set(x,y,z); scene.add( mesh );
	//	var geometry = new THREE.EdgesGeometry( geometry );
	//	var segments = new THREE.LineSegments( geometry, material );
	//	segments.name = "water path edges";
	//	segments.position.copy( mesh.position );
	//	octree.importThreeMesh( mesh );
		entities && entities.add( mesh );
		material_entities && material_entities.add(material);
	//	cameraControls.rigidObjects.push( mesh );
	//	return mesh;
	})( scene, octree, cameraControls, material_entities, entities );


//	Water path.

	(function(scene,octree,cameraControls,material_entities,entities){
		var w=2.5, h=0.5, d=200, x=-85, y=-h/2, z=100;
		var geometry = new THREE.BoxGeometry(w,h,d);
		geometry.translate(0, h/2, 0);
		var material = new THREE.MeshLambertMaterial();
		var mesh = new THREE.Mesh(geometry, material);
		mesh.name = "water path"; mesh.visible = false;
		mesh.position.set(x,y,z); scene.add( mesh );
	//	var geometry = new THREE.EdgesGeometry( geometry );
	//	var segments = new THREE.LineSegments( geometry, material );
	//	segments.name = "water path edges";
	//	segments.position.copy( mesh.position );
	//	octree.importThreeMesh( mesh );
		entities && entities.add( mesh );
		material_entities && material_entities.add(material);
	//	cameraControls.rigidObjects.push( mesh );
	//	return mesh;
	})( scene, octree, cameraControls, material_entities, entities );
