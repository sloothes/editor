
//	texture-key-droplist.js

	(function(editor,text_input,value_input,key_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( key_droplist, "onchange", function( property, event, key ){

			switch ( key ) {
			//	string types:
				case "name":
				case "uuid":
					text_input.value = editor[key];
				break;
			//	boolean types:
				case "flipY":
				case "premultiplyAlpha":
				case "matrixAutoUpdate":
				case "generateMipmaps":
					value_input.value = editor[key];
				break;
			//	number types:
				case "type":
				case "wrapS":
				case "wrapT":
				case "format":
				case "mapping":
				case "minFilter":
				case "magFilter":
					value_input.value = editor[key].toFixed(0);
				break;
				case "anisotropy":
					value_input.value = editor[key].toFixed(2);
				break;
				case "rotation":
					value_input.value = (RAD2DEG*editor[key]).toFixed(1);
				break;
			}

		});

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-text-input"),    // text_input,
		TabUI.Texture.tab.querySelector("input#texture-value-input"),   // value_input,
		TabUI.Texture.tab.querySelector("select#texture-key-droplist")  // key_droplist.
	);

//	texture-vector-droplist.js

	(function(editor,vector_x,vector_y,vector_droplist){

		watch( vector_droplist, "onchange", function( property, event, key ){

			if ( key === "" )                         [vector_x.value, vector_y.value] = ["",""];
			else if ( editor[key] === undefined )     [vector_x.value, vector_y.value] = ["",""];
			else if ( !editor[key].isVector2 )        [vector_x.value, vector_y.value] = ["",""];
			else [ vector_x.value, vector_y.value ] = [ editor[key].x.toFixed(2), editor[key].y.toFixed(2) ];

		});

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-vector-x-input"),  // vector_x,
		TabUI.Texture.tab.querySelector("input#texture-vector-y-input"),  // vector_y,
		TabUI.Texture.tab.querySelector("select#texture-vector-droplist") // vector_droplist.
	);

//	textures-entity-droplist.js

	(function(editor,key_droplist,vector_droplist,entity_droplist,exitEditMode){

		watch( entity_droplist, "onchange", function( property, event, value ){

			editor.update( value );

		//	Call droplist watchers.

			callWatchers( key_droplist, "onchange", "change", key_droplist.value );
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );

		});

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("select#texture-key-droplist"),       // key_droplist.
		TabUI.Texture.tab.querySelector("select#texture-vector-droplist"),    // vector_droplist.
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		exitEditMode   // function.
	);
