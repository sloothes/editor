
//	create-new-material-viewer.js

	const materialViewer = {

		canvas: TabUI.NewMaterial.tab.querySelector("canvas#create-new-material-viewer"),

	};

//	New Material Viewer scene.

	(function( materialViewer ){

		var interval;

	//	Viewer scene.

		materialViewer.scene = (function(){
			var scene = new THREE.Scene();
			scene.name = "material scene";
			return scene;
		})();

	//	Viewer camera.

		materialViewer.camera = (function( d ){
		//	var aspect = canvas.clientWidth / canvas.clientWidth;
			var camera = new THREE.OrthographicCamera( -d, +d, +d, -d, 1, 100 );
			camera.name = "camera"; camera.position.z = 10; camera.lookAt( 0,0,0 ); 
			materialViewer.scene.add( camera ); return camera;
		})( 1 );

	//	Viewer light.

		materialViewer.light = (function(){
			var light = new THREE.DirectionalLight( 0xffffff, 1 ); 
			light.name = "light"; light.position.set( 0,30,50 ); 
			materialViewer.scene.add( light ); return light;
		})();

	//  Viewr Renderer.

		materialViewer.renderer = new THREE.WebGLRenderer({
			alpha: true,  // for transparent rendering set alpha:true, important!
			canvas: materialViewer.canvas,
			antialias: true,
			preserveDrawingBuffer: true,
		});

		materialViewer.renderer.gammaInput = true;
		materialViewer.renderer.gammaOutput = true;
		materialViewer.renderer.shadowMap.enabled = true;
		materialViewer.renderer.setClearAlpha( 0 ); // for transparent rendering set clear alpha: 0.
		materialViewer.renderer.setClearColor( 0x000000, 0 ); // for transparent rendering set clear alpha: 0.
		materialViewer.renderer.setPixelRatio( window.devicePixelRatio );
		materialViewer.renderer.setSize( materialViewer.canvas.width, materialViewer.canvas.height );
		materialViewer.renderer.domElement.style.background = "none";  // transparent rendering. important!

	//	Viewer mesh.

		materialViewer.mesh = (function(){
			var mesh = new THREE.Mesh(
				new THREE.SphereGeometry(1,64,32), new THREE.MeshStandardMaterial()
			); mesh.material.bumpScale = 0.01; mesh.material.normalScale.set(1,1); 
			mesh.material.displacementBias = 0, mesh.material.displacementScale = 0;
			mesh.material.name = "new material"; mesh.name = "material viewer mesh"; 
			materialViewer.scene.add( mesh ); return mesh;
		})();

	//	Viewer render.

		materialViewer.render = function(){ materialViewer.mesh.material.needsUpdate = true; 
			materialViewer.renderer.render( materialViewer.scene, materialViewer.camera ); 
		};

	//	Viewer dispose.

		materialViewer.dispose = function(){

		//	dispose textures.

			(function( material ){
				material && material.map && material.map.dispose && material.map.dispose();
				material && material.bumpMap && material.bumpMap.dispose && material.bumpMap.dispose();
				material && material.alphaMap && material.alphaMap.dispose && material.alphaMap.dispose();
				material && material.normalMap && material.normalMap.dispose && material.normalMap.dispose();
				material && material.emissiveMap && material.emissiveMap.dispose && material.emissiveMap.dispose();
				material && material.roughnessMap && material.roughnessMap.dispose && material.roughnessMap.dispose();
				material && material.metalnessMap && material.metalnessMap.dispose && material.metalnessMap.dispose();
				material && material.displacementMap && material.displacementMap.dispose && material.displacementMap.dispose();
				material && material.lightMap && material.lightMap.dispose && material.lightMap.dispose();
				material && material.envMap && material.envMap.dispose && material.envMap.dispose();
				material && material.aoMap && material.aoMap.dispose && material.aoMap.dispose();
			})( materialViewer.mesh.material );

		//	remove textures.

			materialViewer.mesh.material.map = null;
			materialViewer.mesh.material.bumpMap = null;
			materialViewer.mesh.material.alphaMap = null;
			materialViewer.mesh.material.normalMap = null;
			materialViewer.mesh.material.emissiveMap = null;
			materialViewer.mesh.material.roughnessMap = null;
			materialViewer.mesh.material.metalnessMap = null;
			materialViewer.mesh.material.displacementMap = null;
			materialViewer.mesh.material.lightMap = null;
			materialViewer.mesh.material.envMap = null;
			materialViewer.mesh.material.aoMap = null;

		//	render.
		//	setTimeout( materialViewer.render ); // important!

		}

	//	Viewer Mesh Material render.
		watch( materialViewer.mesh, "material", function(prop, action, value){ 
			clearTimeout( interval ); interval = setTimeout(materialViewer.render, 50);
			debugMode && console.log({item:prop,action:action,value:value}); // debug.
		}, 0);

	//	Viewer render.
		materialViewer.render();

	})( materialViewer );
