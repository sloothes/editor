//	edges-helper.js, (mouse input callers).

	(function( editor,scene,tab,entity_droplist ){

		var edgeshelper;

		function destroyEdgesHelper(){
			if ( !edgeshelper ) return;
			scene.remove( edgeshelper ); 
			edgeshelper.geometry.dispose();
			edgeshelper.material.dispose();
			edgeshelper = undefined;
		}

		function createEdgesHelper( object ){

			if ( !object ) return;
			if ( !object.isMesh ) return;
			if ( !object.geometry ) return;

			var geometry = new THREE.EdgesGeometry( object.geometry );
			var material = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
			var helper = new THREE.LineSegments( geometry, material );
			helper.scale.copy( object.scale );       // important!
			helper.position.copy( object.position ); // important!
			helper.rotation.copy( object.rotation ); // important!
			helper.name = object.name + ":edgeshelper";
		//	debugMode && console.log({"edges helper": helper})
			scene.add( helper );
			edgeshelper = helper;
		}

	//	Create/Remove edges helper.

		watch( entity_droplist, "onchange", function( prop, event, value ){

		//	Remove old edges helper.
			destroyEdgesHelper(); // remove old helper.

		//	Get object.
			var object = getObjectByEntityId( value );

		//	Create new edges helper.
			object && createEdgesHelper( object ); // add new helper.
		});

	//	on input change.

		function onInputChangeWatcher( input ){

			watch( input, "onchange", function( prop, event, value ){ 
				if  ( !edgeshelper ) return;
				edgeshelper.copy( editor );
				edgeshelper.visible = true;
			});

		}

	//	on mouse click.

		function onMouseClickWatcher( button ){

			watch( button, "onclick", function( prop, event ){ 
				if  ( !edgeshelper ) return;
				edgeshelper.copy( editor );
				edgeshelper.visible = true;
			});

		}

		onInputChangeWatcher( tab.querySelector("input#editor-vector-x-input") ); // vector_x,
		onInputChangeWatcher( tab.querySelector("input#editor-vector-y-input") ); // vector_y,
		onInputChangeWatcher( tab.querySelector("input#editor-vector-z-input") ); // vector_z,
		onInputChangeWatcher( tab.querySelector("input#editor-vector-w-input") ); // vector_w,

		onMouseClickWatcher( tab.querySelector("li#editor-vector-x-increase") ); // increase_x,
		onMouseClickWatcher( tab.querySelector("li#editor-vector-y-increase") ); // increase_y,
		onMouseClickWatcher( tab.querySelector("li#editor-vector-z-increase") ); // increase_z,
		onMouseClickWatcher( tab.querySelector("li#editor-vector-w-increase") ); // increase_w,
		onMouseClickWatcher( tab.querySelector("li#editor-vector-x-decrease") ); // decrease_x,
		onMouseClickWatcher( tab.querySelector("li#editor-vector-y-decrease") ); // decrease_y,
		onMouseClickWatcher( tab.querySelector("li#editor-vector-z-decrease") ); // decrease_z,
		onMouseClickWatcher( tab.querySelector("li#editor-vector-w-decrease") ); // decrease_w,

	})( objectEditor, scene, TabUI.Editor.tab, // editor, scene, tab,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist")  // entity_droplist.
	);

