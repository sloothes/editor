//	editor-center-helper.js

	const editorCenter = (function(editor){

		var helper = new THREE.Object3D(); // helper.
		var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

	//	haircross.

		(function(x){
			var geometry = new THREE.Geometry();
			geometry.vertices.push(
				new THREE.Vector3( -x, 0, 0 ),
				new THREE.Vector3(  x, 0, 0 )
			);
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "axis x"; helper.add( segments );
		})( 1 );

		(function(y){
			var geometry = new THREE.Geometry();
			geometry.vertices.push(
				new THREE.Vector3( 0,-y, 0 ),
				new THREE.Vector3( 0, y, 0 )
			);
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "axis y"; helper.add( segments );
		})( 1 );

		(function(z){
			var geometry = new THREE.Geometry();
			geometry.vertices.push(
				new THREE.Vector3( 0, 0,-z ),
				new THREE.Vector3( 0, 0, z )
			);
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "axis z"; helper.add( segments );
		})( 1 );

	//	cycles.

		(function(r){
			var cycleGeometry = new THREE.CircleGeometry(r,32);
			var geometry = new THREE.EdgesGeometry( cycleGeometry );
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "plane xy"; helper.add( segments );
		})( 0.4 );

		(function(r){
			var cycleGeometry = new THREE.CircleGeometry(r,32).rotateX(-Math.PI/2);
			var geometry = new THREE.EdgesGeometry( cycleGeometry );
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "plane xz"; helper.add( segments );
		})( 0.4 );

		(function(r){
			var cycleGeometry = new THREE.CircleGeometry(r,32).rotateY(-Math.PI/2);
			var geometry = new THREE.EdgesGeometry( cycleGeometry );
			var segments = new THREE.LineSegments( geometry, material );
			segments.name = "plane yz"; helper.add( segments );
		})( 0.4 );

		scene.add( helper );

		watch( editor.position, ["x","y","z"], function( key, action, value ){
			helper.position[key] = editor.position[key];
		});

		return helper;

	})( objectEditor );
