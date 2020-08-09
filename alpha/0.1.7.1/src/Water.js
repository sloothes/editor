//  Water.js

	const water = (function(renderer,camera,scene,light,textures_entities){

		var waterNormals = loadTexture("https://i.imgur.com/gd4Gr7Q.png");
		waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
		textures_entities && textures_entities.add(waterNormals);

	//  the water effect.
		return new THREE.Water(renderer, camera, scene, {
			textureWidth:256,  textureHeight:256,
			waterNormals:waterNormals, alpha:0.9,
			sunDirection:light.position.normalize(),
			sunColor:0xffffff,  waterColor:0x001e0f,
			betaVersion:0, side:2,
		});

		function loadTexture( url, mapping) {
			var loader = new THREE.TextureLoader();
			loader.setCrossOrigin( "anonymous" );
			var texture = loader.load( url );
			if ( mapping ) texture.mapping = mapping;
			return texture;
		}

	})( renderer, camera, scene, cameraLight, textures_entities );

	const mirror = (function( scene,water,material_entities,entities ){

	//	material_entities && material_entities.add(water.material);
		var material = water.material; // entities && entities.add(water); 
		var geometry = new THREE.PlaneBufferGeometry(10000, 10000, 100, 100);
		var mirror = new THREE.Mesh( geometry, material );
		mirror.add(water); mirror.name = "mirror";
		mirror.rotation.x = -Math.PI/2; 
		mirror.position.y = -0.01;
		scene.add(mirror);

		var clock = new THREE.Clock();
		(function render(){
			var dt = clock.getDelta();
			requestFrameID = requestAnimationFrame( render );
			water.material.uniforms.time.value += Math.max(dt, 1/60);
			water.render();
		})();

		return mirror;

	})( scene, water, material_entities, entities );
