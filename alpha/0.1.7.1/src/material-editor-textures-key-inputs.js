
//	material-editor-textures-key-inputs.js

	(function(editor,viewer,text_input,value_input,vector_x,vector_y,key_droplist,vector_droplist,map_droplist){

		const RAD2DEG = 57.29577951308232; const DEG2RAD = 0.017453292519943295;

		function get_textures(material){
			var maps  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
				maps += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
			return maps.split(",").map(function(name){ return material[name]; }).filter(Boolean); 
		}

		watch( vector_x, "onchange", function(property, event, value){

			var key = vector_droplist.value;

			if ( !value ) return vector_x.value = "";
			if ( !get_textures(editor).length ) return vector_x.value = "";

			switch( key ){

				case "offset":
				case "repeat":

					return (function(value){
						if ( isNaN(value) ) return vector_x.value = get_textures(editor)[0][key].x.toFixed(3);
						get_textures(editor).forEach(function(texture){ texture[key].x = value; });
						return vector_x.value = value.toFixed(3);
					})( THREE.Math.clamp( Number(value), -100, 100 ) );

				break;

				case "center":
					return (function(value){
						if ( isNaN(value) ) return vector_x.value = get_textures(editor)[0][key].x.toFixed(3);
						get_textures(editor).forEach(function(texture){ texture[key].x = value; });
					//	update viewer center position (x).
						try { viewer.center.position.x = -125 + (250 * value); } catch(err){ debugMode && console.error(err); }
						return vector_x.value = value.toFixed(3);
					})( Number(THREE.Math.clamp( Number(value), 0, 1 )) );
				break;
			}

		});

		watch( vector_y, "onchange", function(property, event, value){

			var key = vector_droplist.value;

			if ( !value ) return vector_y.value = "";
			if ( !get_textures(editor).length ) return vector_y.value = "";

			switch( key ){

				case "offset":
				case "repeat":

					return (function(value){
						if ( isNaN(value) ) return vector_y.value = get_textures(editor)[0][key].y.toFixed(3);
						get_textures(editor).forEach(function(texture){ texture[key].y = value; });
						return vector_y.value = value.toFixed(3);
					})( THREE.Math.clamp( Number(value), -100, 100 ) );

				break;

				case "center":
					return (function(value){
						if ( isNaN(value) ) return vector_y.value = get_textures(editor)[0][key].y.toFixed(3);
						get_textures(editor).forEach(function(texture){ texture[key].y = value; });
					//	update center position (z).
						try { viewer.center.position.z =  125 - (250 * value); } catch(err){ debugMode && console.error(err); }
						return vector_y.value = value.toFixed(3);
					})( Number(THREE.Math.clamp( Number(value), 0, 1 )) );
				break;
			}

		});

	//	text input.

		watch( text_input, "onchange", function(property, event, value){

			var key = key_droplist.value;

			if ( !value ) return text_input.value = "";
			var name = map_droplist.value; if ( !name ) return text_input.value = "";
			var texture = editor[ name ]; if ( !texture ) return text_input.value = "";

			switch ( key ){
				case "name":
				case "uuid":
					return text_input.value = texture[key];
				break;
			}

			value_input.value = "";
		});

	//	value input.

		watch( value_input, "onchange", function( prop, event, value ){

			var key = key_droplist.value;

			if ( !value ) return value_input.value = "";
			if ( !get_textures(editor).length ) return value_input.value = "";

			switch( key ){

			//	boolean types:
				case "flipY":
				case "premultiplyAlpha":
				case "matrixAutoUpdate":
				case "generateMipmaps":
					return (function(value){
						if ( value === "0") value = false;
						else if ( value === "1") value = true;
						else if ( value.toLowerCase() === "true") value = true;
						else if ( value.toLowerCase() === "false") value = false;
						get_textures(editor).forEach(function(texture){ texture[key] = value; });
						return value_input.value = value;
					})( value );
				break;

			//	number types:
				case "type":
				case "wrapS":
				case "wrapT":
				case "format":
				case "mapping":
				case "minFilter":
				case "magFilter":

					return (function(value){
					//	TODO: check value.
					//	value_input.value = value.toFixed(0);
						return value_input.value = get_textures(editor)[0][key].toFixed(0); // debug!
					})( value );

				break;
				case "anisotropy":

					return (function(value){
						if ( isNaN(value) ) return value_input.value = 
							get_textures(editor)[0][key].toFixed(2);
						get_textures(editor).forEach(function(texture){ texture[key] = value; });
						return value_input.value = value.toFixed(2);
					})( Number(value) );

				break;
				case "rotation":

					return (function(value){
						if ( isNaN(value) ) return value_input.value = 
							(RAD2DEG*get_textures(editor)[0][key]).toFixed(1);
						get_textures(editor).forEach(function(texture){ texture[key] = value; });
						return value_input.value = (RAD2DEG*value).toFixed(1);
					})( DEG2RAD*Number(value) );

				break;
			}
		});

		vector_x.addEventListener( "change", function(){ this.blur(); callWatchers(this, "onchange", "change", this.value); });
		vector_y.addEventListener( "change", function(){ this.blur(); callWatchers(this, "onchange", "change", this.value); });
		text_input.addEventListener( "change", function(){ this.blur(); callWatchers(this, "onchange", "change", this.value); });
		value_input.addEventListener( "change", function(){ this.blur(); callWatchers(this, "onchange", "change", this.value); });

	})(
		materialEditor, materialEditorViewer, // editor, viewer,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-text-input"),       // text_input,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-value-input"),      // value_input,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-x-input"),   // vector_x,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-y-input"),   // vector_y,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-key-droplist"),    // key_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-vector-droplist"), // vector_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist")     // map_droplist.
	);
