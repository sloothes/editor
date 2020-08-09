//	texture-key-inputs.js

	(function(editor,text_input,value_input,key_droplist,entity_droplist,undo_button){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	text input.

		watch( text_input, "onchange", function(property, event, value){

			var key = key_droplist.value;

			switch ( key ){

				case "uuid":
					return text_input.value = editor[key];
				break;

				case "name":

					if ( !value ) return text_input.value = editor[key];

				//	rename option.
					setTimeout( function( option, name, id ){
						if ( !option ) return;
						var str="",dot=".",col=":";
						option.text = str+id+dot+name;
					}, null, 
						entity_droplist.selectedOptions[0], value, entity_droplist.value 
					);

				//	Update editor.
					return editor[key] = value;

				break;

			}

			value_input.value = "";

		});

	//	value input.

		watch( value_input, "onchange", function( prop, event, value ){

			var key = key_droplist.value;

			switch( key ){

			//	boolean types:
				case "flipY":
				case "premultiplyAlpha":
				case "matrixAutoUpdate":
				case "generateMipmaps":
					if ( value === "0") return editor[key] = false;
					else if ( value === "1") return editor[key] = true;
					else if ( value.toLowerCase() === "true") return editor[key] = true;
					else if ( value.toLowerCase() === "false") return editor[key] = false;
					return value_input.value = editor[key];
				break;
			//	number types:
				case "type":
				case "wrapS":
				case "wrapT":
				case "format":
				case "mapping":
				case "minFilter":
				case "magFilter":
					return value_input.value = editor[key].toFixed(0);
				break;
				case "anisotropy":
					editor[key] = Number(value);
					return value_input.value = editor[key].toFixed(2);
				break;
				case "rotation":
					editor[key] = DEG2RAD*Number(value);
					return value_input.value = (RAD2DEG*editor[key]).toFixed(1);
				break;
			}
		});

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-text-input"),          // text_input,
		TabUI.Texture.tab.querySelector("input#texture-value-input"),         // value_input,
		TabUI.Texture.tab.querySelector("select#texture-key-droplist"),       // key_droplist
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		TabUI.Texture.tab.querySelector("div#texture-undo-button")            // undo_button,
	);

//	vector inputs.

	(function(editor,vector_x,vector_y,vector_droplist,entity_droplist,undo_button){

		watch( vector_x, "onchange", function(property, event, value){

			var key = vector_droplist.value;

			value = THREE.Math.clamp( Number(value), -100, 100 )
			if ( isNaN(value) ) return vector_x.value = editor[key].x.toFixed(3);
			editor[key].x = value; vector_x.value = value.toFixed(3);


		});

		watch( vector_y, "onchange", function(property, event, value){

			var key = vector_droplist.value;

			value = THREE.Math.clamp( Number(value), -100, 100 )
			if ( isNaN(value) ) return vector_y.value = editor[key].y.toFixed(3);
			editor[key].y = value; vector_y.value = value.toFixed(3);

		});

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-vector-x-input"),      // vector_x,
		TabUI.Texture.tab.querySelector("input#texture-vector-y-input"),      // vector_y,
		TabUI.Texture.tab.querySelector("select#texture-vector-droplist"),    // vector_droplist,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist,
		TabUI.Texture.tab.querySelector("div#texture-undo-button")            // undo_button,
	);
