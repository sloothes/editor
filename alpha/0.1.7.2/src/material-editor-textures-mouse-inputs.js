//	material-editor-textures-mouse-inputs.js

//	material-editor-textures-value-mouse-input.js

	(function( editor,entity_droplist,text_input,value_input,increase,decrease,key_droplist,map_droplist ){

		const RAD2DEG = 57.29577951308232; const DEG2RAD = 0.017453292519943295;

		var key, textures = []; 
		const maps = (function(){
			var keys  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
				keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
			return keys.split(",")
		})(); 

		watch( key_droplist, "onchange", function(prop, event, value){ key = value; }); // important!
		var interval; window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function get_textures(){
			textures.length = 0; maps.forEach(function(name){ if ( editor[name] ) textures.push( editor[name] ); });
		}

		watch( map_droplist,    "onchange", function(prop, event, value){ get_textures(); });
		watch( key_droplist,    "onchange", function(prop, event, value){ get_textures(); });
		watch( entity_droplist, "onchange", function(prop, event, value){ get_textures(); });

		function onMouseClickInputValue(button){ 

			function updateFloatRotationValue(button, min, max, step, value){
				var step = 0.1 * Math.PI/180; // 0.1 deg.
				var min = -Math.PI, max = Math.PI;
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase ) value = THREE.Math.clamp( value+step, min, max ); // rad.
				if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max ); // rad.
				textures.forEach(function(texture, i){ textures[i][key] = value; })
				value_input.value = (RAD2DEG*value).toFixed(1);
			}

			function updateFloatNumberValue(button, min, max, step, value){
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
				textures.forEach(function(texture, i){ textures[i][key] = value; })
				value_input.value = value.toFixed(3);
			}

			function updateConstantNumberValue(button, values, value){
				var min = 0, max = values.length;
				var index = values.findIndex(function( item ){ return item === value; });
				if ( button === increase ) value = values[ ( ++index % max + max ) % max ]; // mod();
				if ( button === decrease ) value = values[ ( --index % max + max ) % max ]; // mod();
				textures.forEach(function(texture, i){ textures[i][key] = value; })
				value_input.value = value.toFixed(0);
			}

			function update_textures_value( button, texture ){

				switch( key ){

				//	string types:

					case "uuid": 
						return (function( value ){
							if (!map_droplist.value) return;
							var name = map_droplist.value;
							if ( texture.id === editor[name].id ) 
								text_input.value = texture[ key ] = value;
						})( THREE.Math.generateUUID() );
					break;

				//	boolean types:

					case "flipY":
					case "premultiplyAlpha":
					case "matrixAutoUpdate":
					case "generateMipmaps":
						return (function( value ){
							textures.forEach(function(texture, i){ 
								textures[i][key] = value; 
								textures[i].needs_update = true;
							}); value_input.value = value;
						})( !texture[ key ] );
					break;

				//	number types:

					case "wrapS":
					case "wrapT":
						updateConstantNumberValue(button, [
							THREE.RepeatWrapping,THREE.ClampToEdgeWrapping,THREE.MirroredRepeatWrapping 
						], texture[key]); 
						return textures.forEach(function(texture, i){ textures[i].needsUpdate = true; });  // important!
					break;

					case "type":
						updateConstantNumberValue(button, [], texture[key]);
						return textures.forEach(function(texture, i){ textures[i].needsUpdate = true; });  // important!
					break;

					case "format":
						updateConstantNumberValue(button, [
							THREE.AlphaFormat,THREE.RGBFormat,THREE.RGBAFormat,
							THREE.LuminanceFormat,THREE.LuminanceAlphaFormat
						], texture[key]);
						return textures.forEach(function(texture, i){ textures[i].needsUpdate = true; });  // important!
					break;

					case "mapping":
						updateConstantNumberValue(button, [
							THREE.UVMapping,THREE.CubeReflectionMapping,THREE.CubeRefractionMapping,
							THREE.EquirectangularReflectionMapping,THREE.EquirectangularRefractionMapping,
							THREE.SphericalReflectionMapping,THREE.CubeUVReflectionMapping,THREE.CubeUVRefractionMapping
						], texture[key]);
						return textures.forEach(function(texture, i){ textures[i].needsUpdate = true; });  // important!
					break;

					case "encoding":
						updateConstantNumberValue(button, [
							THREE.LinearEncoding,THREE.sRGBEncoding,THREE.GammaEncoding,THREE.RGBEEncoding,
							THREE.LogLuvEncoding,THREE.RGBM7Encoding,THREE.RGBM16Encoding,THREE.RGBDEncoding,
							THREE.BasicDepthPacking,THREE.RGBADepthPacking 
						], texture[key]);
						return textures.forEach(function(texture, i){ textures[i].needsUpdate = true; });  // important!
					break;

					case "magFilter":
						updateConstantNumberValue(button, [THREE.NearestFilter,THREE.LinearFilter], texture[key]);
						return textures.forEach(function(texture, i){ textures[i].needsUpdate = true; });  // important!
					break;

					case "minFilter":
						updateConstantNumberValue(button, [
							THREE.NearestFilter,THREE.NearestMipMapNearestFilter,
							THREE.NearestMipMapLinearFilter,THREE.LinearFilter,
							THREE.LinearMipMapNearestFilter,THREE.LinearMipMapLinearFilter 
						], texture[key]);
						return textures.forEach(function(texture, i){ textures[i].needsUpdate = true; });  // important!
					break;

					case "anisotropy":
						return updateFloatNumberValue(button, -1, 1, 1/100, texture[key]);
					break;

					case "rotation":
						return updateFloatRotationValue(button, null, null, null, texture[key]);
					break;
				}
			}

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!

				var texture; var name = map_droplist.value;
				if ( name && editor[ name ] ) texture = editor[ name ];
				else if ( textures.length ) texture = textures[0]; 
				else return;

				interval = setTimeout( function update_textures(button){

					switch( key ){
						case "anisotropy":
							interval = setTimeout( update_textures, 20, button );
							return updateFloatNumberValue( button,-1, 1, 1/100, texture[key] );
						break;
						case "rotation":
							interval = setTimeout( update_textures, 20, button );
							return updateFloatRotationValue( button, null, null, null, texture[key]);
						break;
					}

				}, 500, this);
			});

			button.addEventListener( "click", function(){
				clearTimeout( interval );

				var texture; var name = map_droplist.value;
				if ( name && editor[ name ] ) texture = editor[ name ];
				else if ( textures.length ) texture = textures[0];
				else return;

				update_textures_value( this, texture );
			});

		}

		onMouseClickInputValue(increase);
		onMouseClickInputValue(decrease);

	})(
		materialEditor, TabUI.Material.tab.querySelector("select#material-entities-droplist"), // (material) entity_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-text-input"),    // text_input,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-value-input"),   // value_input,
		TabUI.MaterialEditorTextures.tab.querySelector("li#material-editor-textures-value-increase"),   // increase,
		TabUI.MaterialEditorTextures.tab.querySelector("li#material-editor-textures-value-decrease"),   // decrease,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-key-droplist"), // key_droplist
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist")  // map_droplist.
	);

//	material-editor-textures-vector-mouse-input.js

	(function( editor,viewer,entity_droplist,vector_x,vector_y,increase_x,increase_y,decrease_x,decrease_y,vector_droplist,map_droplist ){

		var key, textures = []; 
		const maps = (function(){
			var keys  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
				keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
			return keys.split(",")
		})(); 

		watch( vector_droplist, "onchange", function(prop, event, value){ key = value; }); // important!
		var interval; window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function get_textures(){
			textures.length = 0; maps.forEach(function(name){ if ( editor[name] ) textures.push( editor[name] ); }); // debugMode && console.log( textures );
		}

		watch( map_droplist,    "onchange", function(prop, event, value){ get_textures(); });
		watch( vector_droplist, "onchange", function(prop, event, value){ get_textures(); });
		watch( entity_droplist, "onchange", function(prop, event, value){ get_textures(); });

		function onMouseClickInputValue(button){ 

			function updateVectorValues( button, min,max,step ){
				if ( textures.length ) { 
					var texture = textures[0];
					if ( button === increase_x ) texture[key].x = round( THREE.Math.clamp( texture[key].x+step, min, max ), 6);
					if ( button === decrease_x ) texture[key].x = round( THREE.Math.clamp( texture[key].x-step, min, max ), 6);
					if ( button === increase_y ) texture[key].y = round( THREE.Math.clamp( texture[key].y+step, min, max ), 6);
					if ( button === decrease_y ) texture[key].y = round( THREE.Math.clamp( texture[key].y-step, min, max ), 6);
					for ( var i = 1; i < textures.length; i++ ) { textures[i][key].copy( texture[key] ); }
					[ vector_x.value, vector_y.value ] = [ texture[key].x.toFixed(3),  texture[key].y.toFixed(3) ];

					(function( key ){ // Update viewer center helper.
						if ( vector_droplist.value !== key ) return;
						try {	viewer.center.position.x = -125 + (250 * texture.center.x); // update center position (x).
								viewer.center.position.z =  125 - (250 * texture.center.y); // update center position (z).
						} catch(err){ debugMode && console.error(err); }
					})( "center" );

				}
			}

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout( function update_textures( button ){
					switch ( key ){
						case "center":
							interval = setTimeout( update_textures, 20, button );
							return updateVectorValues( button, 0, 1, 1/100 );
						break;
						case "offset":
							interval = setTimeout( update_textures, 10, button );
							return updateVectorValues( button,-100,100,1/1000 );
						break;
						case "repeat":
							interval = setTimeout( update_textures, 10, button );
							return updateVectorValues( button, -100,100,1/1000 );
						break;
					}
				}, 500, this);
			});

			button.addEventListener( "click", function(){
				clearTimeout( interval );
				switch ( key ){
					case "center":
						return updateVectorValues( button, 0, 1, 1/100 );
					break;
					case "offset":
						return updateVectorValues( button, -100,100,1/1000 );
					break;
					case "repeat":
						return updateVectorValues( button, -100,100,1/1000 );
					break;
				}
			});

		}

		onMouseClickInputValue(increase_x); onMouseClickInputValue(increase_y);
		onMouseClickInputValue(decrease_x); onMouseClickInputValue(decrease_y);

	})(
		materialEditor, materialEditorViewer, // editor, viewer,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // (material) entity_droplist.
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-x-input"),   // vector_x,
		TabUI.MaterialEditorTextures.tab.querySelector("input#material-editor-textures-vector-y-input"),   // vector_y,
		TabUI.MaterialEditorTextures.tab.querySelector("li#material-editor-textures-vector-x-increase"),   // increase_x,
		TabUI.MaterialEditorTextures.tab.querySelector("li#material-editor-textures-vector-y-increase"),   // increase_y,
		TabUI.MaterialEditorTextures.tab.querySelector("li#material-editor-textures-vector-x-decrease"),   // decrease_x,
		TabUI.MaterialEditorTextures.tab.querySelector("li#material-editor-textures-vector-y-decrease"),   // decrease_y,
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-vector-droplist"), // vector_droplist
		TabUI.MaterialEditorTextures.tab.querySelector("select#material-editor-textures-map-droplist")     // map_droplist.
	);
