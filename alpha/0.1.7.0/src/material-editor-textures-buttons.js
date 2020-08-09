//	material-editor-textures-buttons.js


//	material-editor-viewer-toggle-grid.js

	(function(viewer,grid_button){

		watch( grid_button, "onclick", function(prop, event, value){ debugMode && console.log({item:grid_button,event:event,value:value}); });  // debug!

		watch( grid_button, "onclick", function(prop, event, value){ viewer.grid.visible = !viewer.grid.visible; });
		grid_button.addEventListener( "click", function(){ callWatchers( this, "onclick", "click", viewer.grid.visible ); });

	})( materialEditorViewer, TabUI.MaterialEditorTextures.tab.querySelector("div#material-editor-textures-viewer-grid") ); // viewer, grid_button.

//	material-editor-textures-needs-update.js

	(function(editor,needs_update){

		watch( needs_update, "onclick", function(prop, event, value){ debugMode && console.log({item:needs_update,event:event,value:value}); });  // debug!

		var keys = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
			keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";

		const maps = keys.split(",");

		watch( needs_update, "onclick", function(prop, event, value){
			maps.forEach(function(name){ 
				if ( !editor[name] ) return; 
				editor[name].needsUpdate = true; // or value;
			}); editor.needsUpdate = true; 
		}); 

		needs_update.addEventListener( "click", function(){ callWatchers( this, "onclick", "click", true ); });

	})( materialEditor, TabUI.MaterialEditorTextures.tab.querySelector("div#material-editor-textures-needs-update") ); // editor, needs_update.

//	material-editor-textures-remove-map.js

	(function(editor,remove_button,map_droplist){

		watch( remove_button, "onclick", function(prop, event, value){ debugMode && console.log({item:remove_button,event:event,value:value}); });  // debug!

		watch( remove_button, "onclick", function(prop, event, key){ 
			if ( !key ) return; if ( !editor[key] ) return; editor[key] = null; editor.needsUpdate = true;
			callWatchers( map_droplist, "onchange", "change", map_droplist.value = "" ); // reset droplist.
		}); 

		remove_button.addEventListener( "click", function(){ callWatchers( this, "onclick", "click", map_droplist.value ); });

	})( 
		materialEditor, // editor,
		TabUI.MaterialEditorTextures.tab.querySelector("div#material-editor-textures-remove-map"),  // remove_button,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist") // map_droplist.
	);

//	material-editor-textures-apply-textures.js

	(function(editor,apply_button,map_droplist){

		watch( apply_button, "onclick", function(prop, event, value){ debugMode && console.log({item:apply_button,event:event,object:value}); });  // debug!

	//	watch( apply_button, "onclick", function(prop, event, object){ 
	//	});

		watch( apply_button, "onclick", function(prop, event, object){ 
			if ( !object ) return; 
		//	if ( object ) object.material.copy( editor ); return; // fast and dirty!
			var maps  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
				maps += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
			maps.split(",").forEach(function(name){ 
				if ( editor[name] !== undefined ) object.material[name] = editor[name]; 
			});
		}); 

		apply_button.addEventListener( "click", function(){ callWatchers( this, "onclick", "click", getObjectByEntityId() ); });

	//	function get_textures(material){
	//		var maps  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
	//			maps += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
	//		return maps.split(",").map(function(name){ return material[name]; }).filter(Boolean); 
	//	}

	})( 
		materialEditor, // editor,
		TabUI.MaterialEditorTextures.tab.querySelector("div#material-editor-textures-apply-button"),  // apply_button,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist") // map_droplist.
	);

//	material-editor-textures-replace-image.js

	(function(editor,input,button,map_droplist){

		watch( button, "onclick", function(prop, event){ debugMode && console.log({item:button,event:event}); }); // get_textures();

		function get_textures(material){
			var maps  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
				maps += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
			var textures = maps.split(",").map(function(name){ return material[name]; }).filter(Boolean); 
			if ( textures.length ) return textures[0]; return;
		}

		function copy_values( source, texture ){
			if ( !texture ) texture = new THREE.Texture(); if ( !source ) return texture; 
			var vectors = "offset,repeat,center"; 
			var keys = "flipY,format,rotation,mapping,minFilter,magFilter,anisotropy,wrapS,wrapT";
			keys.split(",").forEach(function(key){ texture[key] = source[key]; }); 
			vectors.split(",").forEach(function(vec){ texture[vec].copy(source[vec]); }); return texture;
		}

		watch( input, "onchange", function(prop, event, key){
			debugMode && console.log({item:button,event:event,value:key});

			if ( input.files.length === 0 ) return;

			var file = input.files[0];

			var img = new Image();
			img.addEventListener("load", function(){

			//	make power of two.
				var canvas = document.createElement("canvas");
				canvas.width = THREE.Math.floorPowerOfTwo( img.width );
				canvas.height = THREE.Math.floorPowerOfTwo( img.height );
				var context = canvas.getContext( "2d" );
				context.drawImage( img, 0, 0, canvas.width, canvas.height );
				debugMode && console.log( canvas );

			//	replace image.
				var texture; if ( editor[ key ] ) texture = editor[ key ];
				else texture = editor[ key ] = copy_values( get_textures(editor), new THREE.Texture() );
			//	var texture = editor[ key ]; if ( !editor[key] ) texture = editor[ key ] = new THREE.Texture(); 
				texture.image = canvas; texture.sourceFile = file.name; 
				texture.name = file.name.replace(".png","").replace(".jpg","").replace(/_/g," ");
				if ( texture.image !== undefined ) texture.needsUpdate = editor.needsUpdate = true; // important!
				debugMode && console.log( texture );

			//	reset map droplist.
				callWatchers( map_droplist, "onchange", "change", map_droplist.value = "" );
			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name;
				img.src = reader.result;
			});

			reader.readAsDataURL(file);
		});

		button.addEventListener( "click", function(){ 
			if ( !map_droplist.value ) return; input.value = "";
			callWatchers( this, "onclick", "click", input.click() );
		});

		input.addEventListener( "change", function(){
			callWatchers( input, "onchange", "change", map_droplist.value );
		});

	})( 
		materialEditor, // editor,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-file-input"),   // input,
		TabUI.MaterialEditorTextures.tab.querySelector("div#material-editor-textures-replace-image"),  // button,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist") // map_droplist.
	);
