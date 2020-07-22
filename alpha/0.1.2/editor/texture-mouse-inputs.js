//	texture-mouse-inputs.js

//	key/value.

	(function( editor,increase,decrease,text_input,value_input,key_droplist,entity_droplist,undo_button ){

		var interval, key = key_droplist.value; debugMode && console.log( "key:", key );

		watch( key_droplist, "onchange", function( prop, event, value ){ key = value; });
		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function onMouseClickInputValue(button){ 

			function updateFloatRotationValue(button, min, max, step){
				var step = 0.1 * Math.PI/180; // 0.1 deg.
				var min = -Math.PI, max = Math.PI;
				var value = Number(editor[ key ]); // get value from editor, rad.
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase ) value = THREE.Math.clamp( value+step, min, max ); // rad.
				if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max ); // rad.
				editor[ key ] = Number(value); // material manager updates input value, rad.
			}

			function updateFloatNumberValue(button, min, max, step){
				var value = Number(editor[ key ]); // get value from editor.
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
				editor[ key ] = Number(value); // material manager updates input value.
			}

			function updateConstantNumberValue( button, values ){
				var min = 0, max = values.length;
				var value = Number(editor[ key ]); // get value from editor.
				var index = values.findIndex(function( item ){ return item === value; });
				if ( button === increase ) value = values[ ( ++index % max + max ) % max ]; // mod();
				if ( button === decrease ) value = values[ ( --index % max + max ) % max ]; // mod();
				editor[ key ] = Number(value); // material manager updates input value.
			}

			function update_texture_value( button ){

				switch( key ){

				//	string types:

					case "uuid": 
						return editor[ key ] = THREE.Math.generateUUID();
					break;

				//	boolean types:

					case "flipY":
					case "premultiplyAlpha":
					case "matrixAutoUpdate":
					case "generateMipmaps":
						return editor[key] = !editor[key]; // material manager updates input value.
					break;

				//	number types:

					case "wrapS":
					case "wrapT":
						return updateConstantNumberValue(button, [
							THREE.RepeatWrapping,THREE.ClampToEdgeWrapping,THREE.MirroredRepeatWrapping 
						]);
					break;

					case "type":
						return updateConstantNumberValue(button, []);
					break;

					case "format":
						return updateConstantNumberValue(button, [
							THREE.AlphaFormat,THREE.RGBFormat,THREE.RGBAFormat,
							THREE.LuminanceFormat,THREE.LuminanceAlphaFormat
						]);
					break;

					case "mapping":
						return updateConstantNumberValue(button, [
							THREE.UVMapping,THREE.CubeReflectionMapping,THREE.CubeRefractionMapping,
							THREE.EquirectangularReflectionMapping,THREE.EquirectangularRefractionMapping,
							THREE.SphericalReflectionMapping,THREE.CubeUVReflectionMapping,THREE.CubeUVRefractionMapping
						]);
					break;

					case "encoding":
						return updateConstantNumberValue(button, [
							THREE.LinearEncoding,THREE.sRGBEncoding,THREE.GammaEncoding,THREE.RGBEEncoding,
							THREE.LogLuvEncoding,THREE.RGBM7Encoding,THREE.RGBM16Encoding,THREE.RGBDEncoding,
							THREE.BasicDepthPacking,THREE.RGBADepthPacking 
						]);
					break;

					case "magFilter":
						return updateConstantNumberValue(button, [THREE.NearestFilter,THREE.LinearFilter]);
					break;

					case "minFilter":
						return updateConstantNumberValue(button, [
							THREE.NearestFilter,THREE.NearestMipMapNearestFilter,
							THREE.NearestMipMapLinearFilter,THREE.LinearFilter,
							THREE.LinearMipMapNearestFilter,THREE.LinearMipMapLinearFilter 
						]);
					break;

					case "anisotropy":
						return updateFloatNumberValue(button, -1, 1, 1/100);
					break;

					case "rotation":
						return updateFloatRotationValue(button);
					break;
				}
			}

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout( function update_texture(button){
					switch( key ){
						case "anisotropy":
							interval = setTimeout( update_texture, 20, button );
							return updateFloatNumberValue( button,-1, 1, 1/100 );
						break;
						case "rotation":
							interval = setTimeout( update_texture, 20, button );
							return updateFloatRotationValue( button );
						break;
					}
				}, 500, this);
			});

			button.addEventListener( "click", function(){
				clearTimeout( interval );
				update_texture_value( this );
			});

		}

		onMouseClickInputValue(increase);
		onMouseClickInputValue(decrease);

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("li#texture-value-increase"),         // increase,
		TabUI.Texture.tab.querySelector("li#texture-value-decrease"),         // decrease,
		TabUI.Texture.tab.querySelector("input#texture-text-input"),          // text_input,
		TabUI.Texture.tab.querySelector("input#texture-value-input"),         // value_input,
		TabUI.Texture.tab.querySelector("select#texture-key-droplist"),       // key_droplist
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		TabUI.Texture.tab.querySelector("div#texture-undo-button")            // undo_button,
	);


//	vectors.

	(function( editor,vector_x,vector_y,increase_x,increase_y,decrease_x,decrease_y,vector_droplist,entity_droplist,undo_button ){

		var interval, key = vector_droplist.value; debugMode && console.log( "key:", key );

		watch( vector_droplist, "onchange", function( prop, event, value ){ key = value; });
		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function onMouseClickInputValue(button){ 

			function updateVectorValues( button, min,max,step ){
				if ( !editor[key] ) return;
				if ( button === increase_x ) editor[key].x = round( THREE.Math.clamp( editor[key].x+step, min, max ), 6);
				if ( button === decrease_x ) editor[key].x = round( THREE.Math.clamp( editor[key].x-step, min, max ), 6);
				if ( button === increase_y ) editor[key].y = round( THREE.Math.clamp( editor[key].y+step, min, max ), 6);
				if ( button === decrease_y ) editor[key].y = round( THREE.Math.clamp( editor[key].y-step, min, max ), 6);
			}

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout( function update_texture( button ){
					switch ( key ){
						case "center":
							interval = setTimeout( update_texture, 20, button );
							return updateVectorValues( button, 0, 1, 1/100 );
						break;
						case "offset":
							interval = setTimeout( update_texture, 10, button );
							return updateVectorValues( button,-100,100,1/1000 );
						break;
						case "repeat":
							interval = setTimeout( update_texture, 10, button );
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

		onMouseClickInputValue(increase_x);
		onMouseClickInputValue(increase_y);
		onMouseClickInputValue(decrease_x);
		onMouseClickInputValue(decrease_y);

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("input#texture-vector-x-input"),      // vector_x,
		TabUI.Texture.tab.querySelector("input#texture-vector-y-input"),      // vector_y,
		TabUI.Texture.tab.querySelector("li#texture-vector-x-increase"),      // increase_x,
		TabUI.Texture.tab.querySelector("li#texture-vector-y-increase"),      // increase_y,
		TabUI.Texture.tab.querySelector("li#texture-vector-x-decrease"),      // decrease_x,
		TabUI.Texture.tab.querySelector("li#texture-vector-y-decrease"),      // decrease_y,
		TabUI.Texture.tab.querySelector("select#texture-vector-droplist"),    // vector_droplist
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		TabUI.Texture.tab.querySelector("div#texture-undo-button")            // undo_button,
	);
