//	key-inputs.js

	(function( editor,text_input,value_input,key_droplist,entity_droplist,undo_button ){
	//	var keys = "uuid,name,visible,castShadow,renderOrder,receiveShadow,frustumCulled,matrixAutoUpdate";

		watch( text_input, "onchange", function( prop, event, value ){

			var key = key_droplist.value;

			switch( key ){

				case "uuid":
					return text_input.value = editor[key];
				break;

				case "name":

					if ( !value ) return text_input.value = editor[key];

				//	rename option.
					setTimeout( function( option, type, name, id ){
						if ( !option ) return;
						var str="",dot=".",col=":";
						option.text = str+id+dot+type+col+name; // +id;
					}, null, 
						entity_droplist.selectedOptions[0], 
						getObjectByEntityId().type, value, 
						entity_droplist.value 
					);

				//	Update editor.
					return editor[key] = value;

				break;
			}

		});

		watch( value_input, "onchange", function( prop, event, value ){

			var key = key_droplist.value;

			switch( key ){
			//	number.
				case "renderOrder":
					return value_input.value = editor[key];
				break;
			//	boolean.
				case "visible":
				case "castShadow":
				case "receiveShadow":
				case "frustumCulled":
				case "matrixAutoUpdate":
					if ( value === "0") return editor[key] = false;
					else if ( value === "1") return editor[key] = true;
					else if ( value.toLowerCase() === "true") return editor[key] = true;
					else if ( value.toLowerCase() === "false") return editor[key] = false;
					return value_input.value = editor[key];
				break;
			}
		});

	})( objectEditor,                                                      // editor,
		TabUI.Editor.tab.querySelector("input#editor-text-input"),         // text_input,
		TabUI.Editor.tab.querySelector("input#editor-value-input"),        // value_input,
		TabUI.Editor.tab.querySelector("select#editor-key-droplist"),      // key_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		TabUI.Editor.tab.querySelector("div#editor-undo-button")           // undo_button.
	);


	(function( editor,vector_x,vector_y,vector_z,vector_w,vector_droplist,undo_button ){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		var key; watch( vector_droplist, "onchange", function( prop, event, value ){ key = value; });

		function onVectorKeyInput( editor,v,input,undo_button ){

			watch( input, "onchange", function( prop, event, value ){

				value = Number(value); // var key = vector_droplist.value; 
				if ( value === "" ) return input.value = editor[key][v];
				if ( isNaN(value) ) return input.value = editor[key][v];

				switch ( key ) {
					case "position":
						return editor[key][v] = value;
					break;
					case "rotation":
						return editor[key][v] = DEG2RAD*value;
					break;
					case "scale":
						if ( !value ) return input.value = editor[key][v].toFixed(3); // avoid 0.
						return editor[key][v] = value;
					break;
					case "quaternion":
						return input.value = editor[key][v].toFixed(3);
					break;
				}

			});
		}

	//	onVectorKeyInput( editor,"x",vector_x,vector_droplist,undo_button );
	//	onVectorKeyInput( editor,"y",vector_y,vector_droplist,undo_button );
	//	onVectorKeyInput( editor,"z",vector_z,vector_droplist,undo_button );

		watch( vector_x, "onchange", function( prop, event, value ){

			value = Number(value); // var key = vector_droplist.value; 
			if ( value === "" ) return vector_x.value = editor[key].x; 
			if ( isNaN(value) ) return vector_x.value = editor[key].x; 

			switch ( key ) {
				case "position":
					return editor[key].x = value;
				break;
				case "rotation":
					return editor[key].x = DEG2RAD*value;
				break;
				case "scale":
					if ( !value ) return vector_x.value = editor[key].x.toFixed(3); // avoid 0.
					return editor[key].x = value;
				break;
				case "quaternion":
					return vector_x.value = editor[key].x.toFixed(3);
				break;
			}

		});

		watch( vector_y, "onchange", function( prop, event, value ){

			value = Number(value); // var key = vector_droplist.value; 
			if ( value === "" ) return vector_y.value = editor[key].y; 
			if ( isNaN(value) ) return vector_y.value = editor[key].y; 

			switch ( key ) {
				case "position":
					return editor[key].y = value;
				break;
				case "rotation":
					return editor[key].y = DEG2RAD*value;
				break;
				case "scale":
					if ( !value ) return vector_y.value = editor[key].y.toFixed(3); // avoid 0.
					return editor[key].y = value;
				break;
				case "quaternion":
					return vector_y.value = editor[key].y.toFixed(3);
				break;
			}

		});

		watch( vector_z, "onchange", function( prop, event, value ){

			value = Number(value); // var key = vector_droplist.value; 
			if ( value === "" ) return vector_z.value = editor[key].z; 
			if ( isNaN(value) ) return vector_z.value = editor[key].z; 

			switch ( key ) {
				case "position":
					return editor[key].z = value;
				break;
				case "rotation":
					return editor[key].z = DEG2RAD*value;
				break;
				case "scale":
					if ( !value ) return vector_z.value = editor[key].z.toFixed(3); // avoid 0.
					return editor[key].z = value;
				break;
				case "quaternion":
					return vector_z.value = editor[key].z.toFixed(3);
				break;
			}

		});

		watch( vector_w, "onchange", function( prop, event, value ){

			value = Number(value); // var key = vector_droplist.value; 

			switch ( key ) {
				case "position":
					return vector_w.value = "";
				break;
				case "rotation":
					return vector_w.value = editor[key].order;
				break;
				case "scale":
					return vector_w.value = ((editor[key].x+editor[key].y+editor[key].z)/3).toFixed(3);
				break;
				case "quaternion":
					return vector_w.value = editor[key].w;
				break;
			}
		});

	})( objectEditor,                                                      // editor,
		TabUI.Editor.tab.querySelector("input#editor-vector-x-input"),     // vector_x,
		TabUI.Editor.tab.querySelector("input#editor-vector-y-input"),     // vector_y,
		TabUI.Editor.tab.querySelector("input#editor-vector-z-input"),     // vector_z,
		TabUI.Editor.tab.querySelector("input#editor-vector-w-input"),     // vector_w,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist"),   // vector_droplist,
		TabUI.Editor.tab.querySelector("div#editor-undo-button")           // undo_button.
	);
