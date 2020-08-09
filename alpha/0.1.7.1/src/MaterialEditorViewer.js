
//	MaterialEditorViewer.js

	const materialEditorViewer = {

		canvas: TabUI.MaterialEditorTextures.tab.querySelector("canvas#material-editor-textures-viewer"),

	};

	(function( viewer, materialEditor ){

	//	Viewer scene.

		viewer.scene = (function(){
			var scene = new THREE.Scene();
			scene.name = "viewer scene";
			return scene;
		})();

	//	Viewer camera.

		viewer.camera = (function(){
			var camera  = new THREE.OrthographicCamera( -128,128,128,-128, 1, 1000 );
			camera.name = "viewer camera"; camera.position.y = 10; camera.lookAt( 0,0,0 );
			viewer.scene.add( camera ); return camera;
		})();

	//	Viewer light.

		viewer.light = (function(){
			var light = new THREE.DirectionalLight( 0xffffff, 1 );
			light.name = "viewer light"; light.position.set( -1, 10, 1 );
			viewer.scene.add( light ); return light;
		})();

	//	Viewer grid.

		viewer.grid = (function(){
			var helper = new THREE.GridHelper( 250, 10, 0x444444, 0x444444 );
			helper.name = "viewer grid";  helper.visible = true; 
			helper.position.y = 0.01; viewer.scene.add( helper ); return helper;
		})();

	//  Viewer Renderer.

		viewer.renderer = new THREE.WebGLRenderer({
			alpha: true,  // for transparent rendering set alpha:true, important!
			canvas: viewer.canvas, antialias: true, preserveDrawingBuffer: true,
		});

		viewer.renderer.gammaInput = true;
		viewer.renderer.gammaOutput = true;
		viewer.renderer.shadowMap.enabled = true;
		viewer.renderer.setClearAlpha( 0 ); // for transparent rendering set clear alpha: 0.
		viewer.renderer.setClearColor( 0x000000, 0 ); // for transparent rendering set clear alpha: 0.
		viewer.renderer.setPixelRatio( window.devicePixelRatio );
		viewer.renderer.setSize( viewer.canvas.width, viewer.canvas.height );
		viewer.renderer.domElement.style.background = "none";  // transparent rendering. important!
		viewer.render = function(){ viewer.renderer.render( viewer.scene, viewer.camera ); };

		(function render(){ requestAnimationFrame( render ); viewer.render(); })(); // debug!

	//	Viewer material.

		viewer.material = materialEditor;

		viewer.mesh = (function( material ){
			var geometry = new THREE.PlaneGeometry(252,252,1,1);
		//	geometry.rotateX(-Math.PI/2);
			var mesh = new THREE.Mesh( geometry, material ); 
			mesh.name = "viewer mesh"; 
			mesh.rotation.x = -Math.PI/2; 
			viewer.scene.add( mesh ); 
			return mesh;
		})( materialEditor );

	//	Viewer center helper.

		viewer.center = (function(){

			var object = new THREE.Object3D(); // helper.
			var material = new THREE.LineBasicMaterial( { color: 0x000000 } );

		//	cycle.

			(function(){
				var cycleGeometry = new THREE.CircleGeometry(5,32).rotateX(-Math.PI/2);
				var geometry = new THREE.EdgesGeometry( cycleGeometry );
				var segments = new THREE.LineSegments( geometry, material );
				object.add( segments );
			})();

		//	haircross.

			(function(){
				var geometry = new THREE.Geometry();
				geometry.vertices.push(
					new THREE.Vector3( -10, 0, 0 ),
					new THREE.Vector3(  10, 0, 0 )
				);
				var segments = new THREE.LineSegments( geometry, material );
				object.add( segments );
			})();

			(function(){
				var geometry = new THREE.Geometry();
				geometry.vertices.push(
					new THREE.Vector3( 0, 0, -10 ),
					new THREE.Vector3( 0, 0,  10 )
				);
				var segments = new THREE.LineSegments( geometry, material );
				object.add( segments );
			})();

			return object;
		})();

		viewer.scene.add( viewer.center );
		viewer.center.position.set(-125,0.1,125); // (x,y) = (0,0) important!
	//	debugMode && console.log( viewer.center );

	//	dispose.

		viewer.dispose = function(){

			(function( material ){
			//	dispose textures.
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
			})( viewer.material );

			(function(){
			//	remove textures.
				viewer.material.map = null;
				viewer.material.bumpMap = null;
				viewer.material.alphaMap = null;
				viewer.material.normalMap = null;
				viewer.material.emissiveMap = null;
				viewer.material.roughnessMap = null;
				viewer.material.metalnessMap = null;
				viewer.material.displacementMap = null;
				viewer.material.lightMap = null;
				viewer.material.envMap = null;
				viewer.material.aoMap = null;
			})();

		//	update material.
			viewer.material.needsUpdate = true; // important!
		}

	//	reset.

		viewer.reset = function(){
			viewer.dispose();
			viewer.material.color.setHex(0xffffff);
			viewer.center.position.set(-125, 0.1, 125); // reset!
		}


	})( materialEditorViewer, materialEditor ); // viewer, material.
