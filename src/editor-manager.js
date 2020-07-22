//	editor-manager.js

	(function(editor,vector_x,vector_y,vector_z,vector_w,vector_droplist,entity_droplist){

		var object;

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	Add a watcher to update object only when entity droplist changes.
		watch( entity_droplist, "onchange", function( property, event, value ){
		//	debugMode && console.log({item:entity_droplist,event:event,value:value});
			object = getObjectByEntityId( value ); debugMode && console.log(object);
		});

		watch( editor.position, ["x","y","z"], function( key, action, value ){
		//	var object = getObjectByEntityId(); debugMode && console.log(object);
		//	debugMode && console.log({property:"position",key:key,value:value});
		//	Update object ( value === editor.position[key] ).
			if ( object && object.position ) object.position[key] = Number(value);
		//	Display value.
			if ( vector_droplist.value === "position" ) {
				if ( key === "x" ) vector_x.value = value.toFixed(2);
				if ( key === "y" ) vector_y.value = value.toFixed(2);
				if ( key === "z" ) vector_z.value = value.toFixed(2);
			}
		});

		watch( editor.rotation, ["_x","_y","_z"], function( key, action, value ){
		//	var object = getObjectByEntityId(); debugMode && console.log(object);
		//	debugMode && console.log({property:"rotation",key:key,value:value});
		//	Update object ( value === editor.rotation[key] ).
			if ( object && object.rotation && key === "_x" ) object.rotation.x = Number(value);		
			if ( object && object.rotation && key === "_y" ) object.rotation.y = Number(value);		
			if ( object && object.rotation && key === "_z" ) object.rotation.z = Number(value);		
		//	Display value.
			if ( vector_droplist.value === "rotation" ) {
				if ( key === "_x" ) vector_x.value = (RAD2DEG*value).toFixed(1);
				if ( key === "_y" ) vector_y.value = (RAD2DEG*value).toFixed(1);
				if ( key === "_z" ) vector_z.value = (RAD2DEG*value).toFixed(1);
			}
		});

		watch( editor.scale, ["x","y","z"], function( key, action, value ){
		//	var object = getObjectByEntityId(); debugMode && console.log(object);
		//	debugMode && console.log({property:"scale",key:key,value:value});
		//	Update object ( value === editor.scale[key] ).
			if ( object && object.scale ) object.scale[key] = Number(value); // todo: scale:0.
		//	Display value.
			if ( vector_droplist.value === "scale" ) {
				if ( key === "x" ) vector_x.value = value.toFixed(3);
				if ( key === "y" ) vector_y.value = value.toFixed(3);
				if ( key === "z" ) vector_z.value = value.toFixed(3);
				vector_w.value = ((editor.scale.x+editor.scale.y+editor.scale.z)/3).toFixed(3);
			}
		});

		watch( editor.quaternion, ["_x","_y","_z","_w"], function( key, action, value ){
		//	var object = getObjectByEntityId();
		//	debugMode && console.log({property:"quaternion",key:key,value:value});
		//	DO NOT MODIFY QUATERNION (value === editor.quaternion[key]).
		//	if ( object && object.quaternion && key === "_x" ) object.quaternion.x = Number(editor.quaternion[key]);		
		//	if ( object && object.quaternion && key === "_y" ) object.quaternion.y = Number(editor.quaternion[key]);		
		//	if ( object && object.quaternion && key === "_z" ) object.quaternion.z = Number(editor.quaternion[key]);		
		//	if ( object && object.quaternion && key === "_w" ) object.quaternion.w = Number(editor.quaternion[key]);		
		//	Display value.
			if ( vector_droplist.value === "quaternion" ) {
				if ( key === "_x" ) vector_x.value = value.toFixed(3);
				if ( key === "_y" ) vector_y.value = value.toFixed(3);
				if ( key === "_z" ) vector_z.value = value.toFixed(3);
				if ( key === "_w" ) vector_w.value = value.toFixed(3);
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

	(function(editor,input,value_input,key_droplist,entity_droplist){

		var object;

		watch( entity_droplist, "onchange", function( property, event, value ){
			object = getObjectByEntityId( value );
		});

		function update_object_value( key, action, value ){
			if (object) object[key] = editor[key]; value_input.value = "";
			if ( key_droplist.value === key ) input.value = editor[ key ];
		}

		watch( editor, "name", update_object_value );
		watch( editor, "uuid", update_object_value );

	})(
		objectEditor, // editor,
		TabUI.Editor.tab.querySelector("input#editor-text-input"), // input,
		TabUI.Editor.tab.querySelector("input#editor-value-input"), // value_input,
		TabUI.Editor.tab.querySelector("select#editor-key-droplist"), // key_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist") // entity_droplist.
	);

	(function(editor,text_input,input,key_droplist,entity_droplist){

		var object;

		watch( entity_droplist, "onchange", function( property, event, value ){
			object = getObjectByEntityId( value );
		});

		function update_object_value( key, action, value ){
			if (object) object[key] = editor[key]; text_input.value = "";
			if ( key_droplist.value === key ) input.value = editor[ key ];
		}

		watch( editor, "visible", update_object_value );
		watch( editor, "castShadow", update_object_value );
		watch( editor, "renderOrder", update_object_value );
		watch( editor, "receiveShadow", update_object_value );
		watch( editor, "frustumCulled", update_object_value );
		watch( editor, "matrixAutoUpdate", update_object_value );

	})(
		objectEditor, // editor,
		TabUI.Editor.tab.querySelector("input#editor-text-input"), // text_input,
		TabUI.Editor.tab.querySelector("input#editor-value-input"), // input,
		TabUI.Editor.tab.querySelector("select#editor-key-droplist"), // key_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist") // entity_droplist.
	);
