
//	editor-key-droplist.js

	(function(editor,text_input,input,key_droplist,entity_droplist){

		watch( key_droplist, "onchange", function( prop, event, key ){
			switch ( key ) {
				case "visible":
				case "castShadow":
				case "renderOrder":
				case "receiveShadow":
				case "frustumCulled":
				case "matrixAutoUpdate":
					input.value = editor[ key ];
				break;
				default:
					text_input.value = editor[ key ];
				break;
			}
		});

	})(
		objectEditor, // editor,
		TabUI.Editor.tab.querySelector("input#editor-text-input"), // text_input,
		TabUI.Editor.tab.querySelector("input#editor-value-input"), // input,
		TabUI.Editor.tab.querySelector("select#editor-key-droplist"), // key_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist") // entity_droplist.
	);


//	editor-vector-droplist.js

	(function(editor,vector_x,vector_y,vector_z,vector_w,vector_droplist,entity_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( vector_droplist, "onchange", function( prop, event, key ){
			switch ( key ) {
				case "position":
					vector_w.value = "";
					vector_x.value = editor[key].x.toFixed(2);
					vector_y.value = editor[key].y.toFixed(2);
					vector_z.value = editor[key].z.toFixed(2);
				break;
				case "rotation":
					vector_w.value = editor[key].order;
					vector_x.value = RAD2DEG*editor[key].x.toFixed(1);
					vector_y.value = RAD2DEG*editor[key].y.toFixed(1);
					vector_z.value = RAD2DEG*editor[key].z.toFixed(1);
				break;
				case "scale":
					vector_x.value = editor[key].x.toFixed(3);
					vector_y.value = editor[key].y.toFixed(3);
					vector_z.value = editor[key].z.toFixed(3);
					vector_w.value = ((editor[key].x+editor[key].y+editor[key].z)/3).toFixed(3);
				break;
				case "quaternion":
					vector_x.value = editor[key].x.toFixed(3);
					vector_y.value = editor[key].y.toFixed(3);
					vector_z.value = editor[key].z.toFixed(3);
					vector_w.value = editor[key].w.toFixed(3);
				break;
			}

		});

	})(
		objectEditor, // editor,
		TabUI.Editor.tab.querySelector("input#editor-vector-x-input"),  // vector_x,
		TabUI.Editor.tab.querySelector("input#editor-vector-y-input"),  // vector_y,
		TabUI.Editor.tab.querySelector("input#editor-vector-z-input"),  // vector_z,
		TabUI.Editor.tab.querySelector("input#editor-vector-w-input"),  // vector_w,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist"), // vector_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist") // entity_droplist.
	);


//	editor-entity-droplist.js

//	Keep last editor entity droplist value.

	var latestEntityId; // keeps track of last entity droplist value.

	(function( entity_droplist ){

		const current = {value:""};

	//	when you change lastEntity.value you can get the old value.
		watch( current, "value", function(property, action, newValue, oldValue ){ latestEntityId = oldValue; });

	//	Update current value.
		watch( entity_droplist, "onchange", function( property, event, value ){ current.value = value; });

	})( TabUI.Editor.tab.querySelector("select#editor-entities-droplist") ); // entity_droplist.


//	Update object editor.

	(function(editor,cameraControls,rigidObjects,localPlayer,keyInputControls,key_droplist,vector_droplist,entity_droplist){

	//	Exit from edit mode.

		function resetLatestEntityValue(){
			entity_droplist.value = "";
		}

		function enableKeyInputControls(){
			keyInputControls.isDisabled = false;
		}

		function disableKeyInputControls(){
			keyInputControls.isDisabled = true;
		}

		function takeCameraControls( object, offset ){
			cameraControls.trackObject = object;
			cameraControls.offset.y = offset || 0;
		}

		function enableCameraRigidObjects(){
			while (rigidObjects.length) {
				var object = rigidObjects.shift();
				object.isMesh && cameraControls.rigidObjects.push( object ); // cleanup.
			}
		}

		function disableCameraRigidObjects(){
			while (cameraControls.rigidObjects.length) {
				var object = cameraControls.rigidObjects.shift()
				object.isMesh && rigidObjects.push( object ); // cleanup.
			}
		}

		function exitFromEditMode(){
			editor.reset(); // important!
			resetLatestEntityValue();
			enableKeyInputControls();
			enableCameraRigidObjects();
			takeCameraControls( localPlayer );
			return;
		}

	//

		watch( entity_droplist, "onchange", function( property, event, value ){

			if ( editor.update( value ) ) {

			//	switchToEditMode.

				var object = getObjectByEntityId( value );
				if ( !object ) return exitFromEditMode();

			//	camera controls offset.
				if ( object.geometry && object.geometry.boundingSphere ) {
					var offset = object.geometry.boundingSphere.center;
					cameraControls.offset.copy( offset ); 
					cameraControls.offset.y *= 0.5;
				}

			//	Disable camera rigid objects.
				disableCameraRigidObjects();

			//	editor take camera controls.
				cameraControls.trackObject = editor; // or object?

			//	Disable key input controls.
				disableKeyInputControls(); // important!

			} else {

				exitFromEditMode();

			}

		//	Call droplist watchers anyway.
			setTimeout(function(){
				callWatchers( key_droplist, "onchange", "change", key_droplist.value );
				callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );
			});

		});

	})(
		objectEditor, cameraControls, rigidObjects, localPlayer, keyInputControls, 
		TabUI.Editor.tab.querySelector("select#editor-key-droplist"),     // key_droplist,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist"),  // vector_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist") // entity_droplist.
	);


//	Call material entity droplist.

	(function(entity_droplist){

		watch( entity_droplist, "onchange", function( property, event, value ){

		//	Get material entities droplist.
			var selector = "select#material-entities-droplist";
			var material_droplist = document.querySelector(selector); if (!material_droplist) return;

		//	Get material id.
			var object = getObjectByEntityId( value ); if ( !object ) 
				return callWatchers( material_droplist, "onchange", "change", material_droplist.value = "" );

			var material = object.material; if ( !material ) 
				return callWatchers( material_droplist, "onchange", "change", material_droplist.value = "" );

			material && callWatchers( material_droplist, "onchange", "change", material_droplist.value = String(material.id) );
		});

	})( TabUI.Editor.tab.querySelector("select#editor-entities-droplist") ); // entity_droplist.


//	editors-helper.

	const exitEditMode = function( entity_droplist ){

		entity_droplist && callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = "" );
	}

