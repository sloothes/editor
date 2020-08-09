//	texture-manager.js

//	Vectors.

	(function( editor,vector_x,vector_y,vector_droplist,entity_droplist ){

		var texture;

		watch( entity_droplist, "onchange", function( property, event, value ){
			texture = getTextureByEntityId( value );
		});

	//	offset.

		watch( editor, "offset",  function( key, action, value ){
			var offset = editor.offset; //console.log("offset:", offset);
			texture && texture.offset && texture.offset.copy(offset);
			if ( vector_droplist.value === "offset" ) {
				vector_x.value = offset.x.toFixed(3);
				vector_y.value = offset.y.toFixed(3);
			}
		});

	//	repeat.

		watch( editor, "repeat",  function( key, action, value ){
			var repeat = editor.repeat; //console.log("repeat:", repeat);
			texture && texture.repeat && texture.repeat.copy(repeat);
			if ( vector_droplist.value === "repeat" ) {
				vector_x.value = repeat.x.toFixed(3);
				vector_y.value = repeat.y.toFixed(3);
			}
		});

	//	center.

		watch( editor, "center",  function( key, action, value ){
			var center = editor.center; //console.log("center:", center);
			texture && texture.center && texture.center.copy(center);
			if ( vector_droplist.value === "center" ) {
				vector_x.value = center.x.toFixed(3);
				vector_y.value = center.y.toFixed(3);
			}
		});

	})( 
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-vector-x-input"),     // vector_x,
		TabUI.Texture.tab.querySelector("input#texture-vector-y-input"),     // vector_y,
		TabUI.Texture.tab.querySelector("select#texture-vector-droplist"),   // vector_droplist,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // entity_droplist,
	);


//	Strings.

	(function( editor,text_input,value_input,key_droplist,entity_droplist ){

		var texture;

		watch( entity_droplist, "onchange", function( property, event, value ){
			texture = getTextureByEntityId( value );
		});

		function update_texture_value( key, action, value ){
			if ( texture ) texture[key] = String(value);
			if ( key_droplist.value === key ) text_input.value = value;
		}

		watch( editor, "name", update_texture_value );
		watch( editor, "uuid", update_texture_value );

	})( 
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-text-input"),         // text_input,
		TabUI.Texture.tab.querySelector("input#texture-value-input"),        // value_input,
		TabUI.Texture.tab.querySelector("select#texture-key-droplist"),      // key_droplist,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // entity_droplist,
	);


//	Booleans.

	(function( editor,text_input,value_input,key_droplist,entity_droplist ){

		var interval, texture;

		watch( entity_droplist, "onchange", function( property, event, value ){
			texture = getTextureByEntityId( value );
		});

		function update_texture_value( key, action, value ){
			clearTimeout( interval );
			if ( texture ) texture[key] = Boolean(value);
			if ( key_droplist.value === key ) value_input.value = value; // display.
			interval = setTimeout(function(){
				if ( texture ) texture.needsUpdate = true; // important!
			}, 250);
		}

		watch( editor, "flipY", update_texture_value );
		watch( editor, "premultiplyAlpha", update_texture_value );
		watch( editor, "matrixAutoUpdate", update_texture_value );
		watch( editor, "generateMipmaps", update_texture_value );

	})( 
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-text-input"),         // text_input,
		TabUI.Texture.tab.querySelector("input#texture-value-input"),        // value_input,
		TabUI.Texture.tab.querySelector("select#texture-key-droplist"),      // key_droplist,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // entity_droplist,
	);


//	Numbers.

	(function( editor,text_input,value_input,key_droplist,entity_droplist ){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		var texture;

		watch( entity_droplist, "onchange", function( property, event, value ){
			texture = getTextureByEntityId( value );
		});

		function update_texture_value( key, action, value ){
			if ( texture ) texture[key] = Number(value);
			if ( key_droplist.value === key ) value_input.value = value.toFixed(2);
		}

		function update_texture_constant( key, action, value ){
			if ( texture ) texture[key] = Number(value);
			if ( key_droplist.value === key ) value_input.value = value.toFixed(0);
		}

	//	Rad.

		watch( editor, "rotation", function( key, action, value ){
			if ( texture ) texture[key] = Number(value);
			if ( key_droplist.value === key ) value_input.value = (RAD2DEG*value).toFixed(1);
		});

	//	Floats.

		watch( editor, "anisotropy", update_texture_value );

	//	Constants.

		watch( editor, "type", update_texture_constant );
		watch( editor, "wrapS", update_texture_constant );
		watch( editor, "wrapT", update_texture_constant );
		watch( editor, "format", update_texture_constant );
		watch( editor, "mapping", update_texture_constant );
		watch( editor, "minFilter", update_texture_constant );
		watch( editor, "magFilter", update_texture_constant );

	})( 
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-text-input"),         // text_input,
		TabUI.Texture.tab.querySelector("input#texture-value-input"),        // value_input,
		TabUI.Texture.tab.querySelector("select#texture-key-droplist"),      // key_droplist,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // entity_droplist,
	);
