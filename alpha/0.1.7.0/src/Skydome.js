//  Skydome.js

	const skydome = (function(scene,entities,material_entities,textures_entities){

		var loader = new THREE.TextureLoader();
		loader.setCrossOrigin( "anonymous" );
		var geometry = new THREE.SphereGeometry( 2000, 64, 32 );
		var texture = loader.load( "https://i.imgur.com/IMVEV3T.jpg" ); // xQsNP0X.png
		texture.wrapS = texture.wrapT = 1000; texture.name="skydome";
		var material = new THREE.MeshBasicMaterial({
			map:texture,transparent:false,opacity:1,side:1,
		}); var dome = new THREE.Mesh( geometry, material );
		dome.scale.set(0.10,0.08,0.10); dome.name = "skydome";
		scene.add(dome); entities && entities.add(dome);
		textures_entities && textures_entities.add(texture);
		material_entities && material_entities.add(material);
		return dome;

	})(scene, entities, material_entities, textures_entities);
