
//	create-matcap-viewer.js

	const matcapViewer = {

		canvas: TabUI.NewMatcap.tab.querySelector("canvas#create-matcap-viewer"),

	};

//	Matcap Viewer scene.

	(function( viewer ){

		var interval;

	//	Viewer scene.

		viewer.scene = (function(){
			var scene = new THREE.Scene();
			scene.name = "material scene";
			return scene;
		})();

	//	Viewer camera.

		viewer.camera = (function( d ){
		//	var aspect = canvas.clientWidth / canvas.clientWidth;
			var camera = new THREE.OrthographicCamera( -d, +d, +d, -d, 1, 100 );
			camera.name = "camera"; camera.position.z = 10; camera.lookAt( 0,0,0 ); 
			viewer.scene.add( camera ); return camera;
		})( 1 );

	//	Viewer light.

		viewer.light = (function(){
			var light = new THREE.DirectionalLight( 0xffffff, 1 ); 
			light.name = "light"; light.position.set( 0,30,50 ); 
			viewer.scene.add( light ); return light;
		})();

	//  Viewr Renderer.

		viewer.renderer = new THREE.WebGLRenderer({
			alpha: true,  // for transparent rendering set alpha:true, important!
			canvas: viewer.canvas,
			antialias: true,
			preserveDrawingBuffer: true,
		});

		viewer.renderer.gammaInput = true;
		viewer.renderer.gammaOutput = true;
		viewer.renderer.shadowMap.enabled = true;
		viewer.renderer.setClearAlpha( 0 ); // for transparent rendering set clear alpha: 0.
		viewer.renderer.setClearColor( 0x000000, 0 ); // for transparent rendering set clear alpha: 0.
		viewer.renderer.setPixelRatio( window.devicePixelRatio );
		viewer.renderer.setSize( viewer.canvas.width, viewer.canvas.height );
		viewer.renderer.domElement.style.background = "none";  // transparent rendering. important!

	//	Viewer mesh.

		viewer.mesh = (function(){
			var mesh = new THREE.Mesh(
				new THREE.SphereGeometry(1,64,32), new THREE.MeshStandardMaterial()
			); mesh.material.bumpScale = 0; mesh.material.normalScale.set(1,1); 
			mesh.material.displacementBias = 0, mesh.material.displacementScale = 0;
			mesh.material.roughness = 0.5; mesh.material.metalness = 0.5; // important!
			mesh.material.name = "new matcap"; mesh.name = "matcap viewer mesh"; 
			viewer.scene.add( mesh ); return mesh;
		})();

	//	Viewer render.

		viewer.render = function(){ 
			viewer.mesh.material.needsUpdate = true; 
			viewer.renderer.render( viewer.scene, viewer.camera ); 
		};

	//	Viewer dispose.

		viewer.dispose = function(){

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
			})( viewer.mesh.material );

		//	remove textures.

			viewer.mesh.material.map = null;
			viewer.mesh.material.bumpMap = null;
			viewer.mesh.material.alphaMap = null;
			viewer.mesh.material.normalMap = null;
			viewer.mesh.material.emissiveMap = null;
			viewer.mesh.material.roughnessMap = null;
			viewer.mesh.material.metalnessMap = null;
			viewer.mesh.material.displacementMap = null;
			viewer.mesh.material.lightMap = null;
			viewer.mesh.material.envMap = null;
			viewer.mesh.material.aoMap = null;
		}

	//	Viewer Mesh Material render.
		watch( viewer.mesh, "material", function(prop, action, newValue, oldValue){ 
			debugMode && console.log({item:prop,action:action,"new material":newValue,"old material":oldValue}); // debug.
			clearTimeout( interval ); interval = setTimeout( viewer.render ); // important!
		}, 0);

	//	Viewer render.
		viewer.render(); // important!

	})( matcapViewer );
