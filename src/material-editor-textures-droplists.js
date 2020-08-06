//	material-editor-textures-droplists.js


//	material-editor-textures-key-droplist.js

	(function(editor,text_input,value_input,key_droplist,map_droplist){

		const RAD2DEG = 57.29577951308232; const DEG2RAD = 0.017453292519943295;

		function get_textures(material){
			var textures = []; // textures.length = 0;
			var keys  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
				keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
			keys.split(",").forEach(function(name){ if ( material[name] ) textures.push( material[name] ); }); 
			if ( textures.length ) return textures[0];
		}

		watch( key_droplist, "onchange", function(prop, event, key){ 

			var texture, name = map_droplist.value;
			if ( name ) texture = editor[ name ];
			if ( !texture ) texture = get_textures( editor );
			if ( !texture ) return [ text_input.value, value_input.value ] = [ "", "" ];

			switch ( key ){
				case "":
					text_input.value = ""; value_input.value = ""; return;
				break;
				case "name":
				case "uuid":
					text_input.value = texture[key]; value_input.value = ""; return;
				break;
				case "rotation":
					var value = RAD2DEG*texture[key];
					text_input.value = ""; value_input.value = value.toFixed(1); return;
				break;
				default:
					var value = texture[key];
					text_input.value = ""; value_input.value = value; return;
				break;
			}

		});

		key_droplist.addEventListener( "change", function(){ 
			this.blur(); callWatchers( this, "onchange", "change", this.value ); 
		});

	})(
		materialEditor, // editor,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-text-input"),       // text_input,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-value-input"),      // value_input,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-key-droplist"),    // key_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist")     // map_droplist.
	);

//	material-editor-textures-vector-droplist.js

	(function(editor,vector_x,vector_y,vector_droplist,map_droplist){

		function get_textures(material){
			var textures = []; // textures.length = 0;
			var keys  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
				keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
			keys.split(",").forEach(function(name){ if ( material[name] ) textures.push( material[name] ); }); 
			if ( textures.length ) return textures[0];
		}

		watch( vector_droplist, "onchange", function(prop, event, key){ 

			var texture, name = map_droplist.value;
			if ( name ) texture = editor[ name ];
			if ( !texture ) texture = get_textures( editor );

			if ( !( key && texture ) ) [ vector_x.value, vector_y.value ] = [ "", "" ];
			else [ vector_x.value, vector_y.value ] = [ texture[key].x, texture[key].y ];

		});

		vector_droplist.addEventListener( "change", function(){ 
			this.blur(); callWatchers( this, "onchange", "change", this.value ); 
		});

	})(
		materialEditor, // editor,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-x-input"),   // vector_x,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-y-input"),   // vector_y,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-vector-droplist"), // vector_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist")     // map_droplist.
	);

//	material-editor-textures-map-droplist.js

	(function(editor,text_input,value_input,vector_x,vector_y,key_droplist,vector_droplist,map_droplist){

		watch( map_droplist, "onchange", function(prop, event, value){ debugMode && console.log({item:map_droplist,event:event,value:value}); }); // debug!

		var keys = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";

		watch( map_droplist, "onchange", function(prop, event, value){ 

			var textures = []; var maps = keys.split(","); 
			maps.forEach(function(key){ if ( editor[key] ) textures.push( editor[key] ); }); 

			debugMode && console.log( textures );
		});

		watch( map_droplist, "onchange", function(prop, event, value){ 
			callWatchers( key_droplist, "onchange", "change", key_droplist.value ); 
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value ); 
		});

		map_droplist.addEventListener( "change", function(){ 
			this.blur(); callWatchers( this, "onchange", "change", this.value ); 
		});

		callWatchers( map_droplist, "onchange", "change", map_droplist.value );

	})(
		materialEditor, // editor,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-text-input"),       // text_input,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-value-input"),      // value_input,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-x-input"),   // vector_x,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-y-input"),   // vector_y,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-key-droplist"),    // key_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-vector-droplist"), // vector_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist")     // map_droplist.
	);
