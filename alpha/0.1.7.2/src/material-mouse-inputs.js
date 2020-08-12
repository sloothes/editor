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
			//	value_input.value = (RAD2DEG*editor[key]).toFixed(1); // display.
			}

			function updateFloatNumberValue(button, min, max, step){
				var value = Number(editor[ key ]); // get value from editor.
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
				if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
				editor[ key ] = Number(value); // material manager updates input value.
			//	value_input.value = editor[key].toFixed(2); // display.
			}

			function updateIntegerNumberValue(button, min, max){
				var value = parseInt(editor[ key ]); // get value from editor.
				if ( isNaN(value) ) return value_input.value = ""; // avoid to pass NaN editor[key] value.
				if ( button === increase ) value = THREE.Math.clamp( ++value, min, max );
				if ( button === decrease ) value = THREE.Math.clamp( --value, min, max );
				editor[ key ] = parseInt(value); // editor watcher updates value input.
			}

			function updateConstantStringValue( button, values ){
				var min = 0, max = values.length;
				var value = editor[ key ]; // string.
				var index = values.findIndex(function( item ){ return item === value; });
				if ( button === increase ) value = values[ ( ++index % max + max ) % max ]; // mod();
				if ( button === decrease ) value = values[ ( --index % max + max ) % max ]; // mod();
				editor[ key ] = String(value); // material manager updates input value.
			}

			function updateConstantNumberValue( button, values ){
				var min = 0, max = values.length;
				var value = Number(editor[ key ]); // get value from editor.
				var index = values.findIndex(function( item ){ return item === value; });
				if ( button === increase ) value = values[ ( ++index % max + max ) % max ]; // mod();
				if ( button === decrease ) value = values[ ( --index % max + max ) % max ]; // mod();
				editor[ key ] = Number(value); // material manager updates input value.
			}

			function update_material_value( button ){

				switch( key ){

				//	string types:

					case "uuid": 
						return editor[ key ] = THREE.Math.generateUUID();
					break;
					case "linecap":
					case "wireframeLinecap":
						return updateConstantStringValue(button, ["butt","round","square"]);
					break;
					case "linejoin":
						return updateConstantStringValue(button, ["bevel","round","miter"]);
					break;
					case "precision":
						return updateConstantStringValue(button, ["highp","mediump","lowp"]);
					break;

				//	boolean types:

					case "fog":
					case "lights":
					case "flatShading":
					case "transparent":
					case "depthTest":
					case "depthWrite":
					case "clipIntersection":
					case "clipShadows":
					case "colorWrite":
					case "polygonOffset":
					case "dithering":
					case "premultipliedAlpha":
					case "visible":
					case "wireframe":
					case "skinning":
					case "morphTargets":
					case "morphNormals":
				//	case "needsUpdate":
					case "sizeAttenuation":
						return editor[key] = !editor[key]; // material manager updates input value.
					break;

				//	number types:

					case "blending":
						return updateConstantNumberValue(button, [
							THREE.NoBlending,THREE.NormalBlending,THREE.AdditiveBlending,
							THREE.SubtractiveBlending,THREE.MultiplyBlending,THREE.CustomBlending
						]);
					break;
					case "side":
						return updateConstantNumberValue(button, [THREE.FrontSide,THREE.BackSide,THREE.DoubleSide]);
					break;
					case "vertexColors":
						return updateConstantNumberValue(button, [THREE.NoColors,THREE.FaceColors,THREE.VertexColors]);
					break;
					case "blendDst":
					case "blendSrc":
						return updateConstantNumberValue(button, [
							THREE.ZeroFactor,THREE.OneFactor,THREE.SrcColorFactor,THREE.OneMinusSrcColorFactor,
							THREE.SrcAlphaFactor,THREE.OneMinusSrcAlphaFactor,THREE.DstAlphaFactor,THREE.OneMinusDstAlphaFactor,
							THREE.DstColorFactor,THREE.OneMinusDstColorFactor,THREE.SrcAlphaSaturateFactor
						]);
					break;
					case "blendEquation":
						return updateConstantNumberValue(button, [
							THREE.AddEquation,THREE.SubtractEquation,
							THREE.ReverseSubtractEquation,THREE.MinEquation,THREE.MaxEquation
						]);
					break;
					case "depthFunc":
						return updateConstantNumberValue(button, [
							THREE.NeverDepth,THREE.AlwaysDepth,THREE.LessDepth,THREE.LessEqualDepth,
							THREE.GreaterEqualDepth,THREE.GreaterDepth,THREE.NotEqualDepth
						]);
					break;
					case "normalMapType":
						return updateConstantNumberValue(button, [THREE.TangentSpaceNormalMap,THREE.ObjectSpaceNormalMap]);
					break;
					case "combine":
						return updateConstantNumberValue(button, [THREE.MultiplyOperation,THREE.MixOperation,THREE.AddOperation]);
					break;
				//
					case "polygonOffsetUnits":
					case "polygonOffsetFactor":
						return updateIntegerNumberValue(button, -100, 100);
					break;
					case "displacementScale":
						return updateFloatNumberValue(button, -100, 100, 1/100);
					break;
					case "bumpScale":
					case "metalness":
					case "roughness":
					case "displacementBias":
						return updateFloatNumberValue(button, -10, 10, 1/100);
					break;
					case "refractionRatio":
						return updateFloatNumberValue(button, -1, 1, 1/100);
					break;
					case "opacity":
					case "overdraw":
					case "alphaTest":
					case "reflectivity":
					case "wireframeLinewidth":
						return updateFloatNumberValue(button, 0, 1, 1/100);
					break;
					case "linewidth":
					case "aoMapIntensity":
					case "envMapIntensity":
					case "emissiveIntensity":
					case "lightMapIntensity":
						return updateFloatNumberValue(button, 0, 100, 1/100);
					break;
					case "depthPacking": 
						// ???
					break;
					case "size":
					case "scale":
					case "gapSize":
					case "dashSize":
					case "shininess":
						return updateFloatNumberValue(button, 0, 1000, 1/100);
					break;
					case "rotation":
						return updateFloatRotationValue(button);
					break;

				}

			}

			function update_material( button ){
			//	debugMode && console.log({button:button,value:editor[key]});

				switch ( key ){

				//	enabled on mouse down.
					case "polygonOffsetUnits":
					case "polygonOffsetFactor":
						interval = setTimeout( update_material, 20, button );
						return updateIntegerNumberValue(button, -100, 100);
					break;
					case "displacementScale":
						interval = setTimeout( update_material, 20, button );
						return updateFloatNumberValue(button, -100, 100, 1/100);
					break;
					case "bumpScale":
					case "metalness":
					case "roughness":
					case "displacementBias":
						interval = setTimeout( update_material, 20, button );
						return updateFloatNumberValue(button, -10, 10, 1/100);
					break;
					case "refractionRatio":
						interval = setTimeout( update_material, 20, button );
						return updateFloatNumberValue(button, -1, 1, 1/100);
					break;
					case "opacity":
					case "overdraw":
					case "alphaTest":
					case "reflectivity":
					case "wireframeLinewidth":
						interval = setTimeout( update_material, 20, button );
						return updateFloatNumberValue(button, 0, 1, 1/100);
					break;
					case "linewidth":
					case "aoMapIntensity":
					case "envMapIntensity":
					case "emissiveIntensity":
					case "lightMapIntensity":
						interval = setTimeout( update_material, 20, button );
						return updateFloatNumberValue(button, 0, 100, 1/100);
					break;
					case "size":
					case "scale":
					case "gapSize":
					case "dashSize":
					case "shininess":
						interval = setTimeout( update_material, 20, button );
						return updateFloatNumberValue(button, 0, 1000, 1/100);
					break;
					case "rotation":
						interval = setTimeout( update_material, 20, button );
						return updateFloatRotationValue(button);
					break;
				}

			}

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout( update_material, 500, this);
			});

			button.addEventListener( "click", function(){
				clearTimeout( interval );
				update_material_value( this );
			});

		}

		onMouseClickInputValue(increase);
		onMouseClickInputValue(decrease);

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("li#material-value-increase"),        // increase,
		TabUI.Material.tab.querySelector("li#material-value-decrease"),        // decrease,
		TabUI.Material.tab.querySelector("input#material-text-input"),         // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"),        // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist"),     // key_droplist
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		TabUI.Material.tab.querySelector("div#material-undo-button")           // undo_button,
	);


//	vectors.

	(function( editor,vector_x,vector_y,increase_x,increase_y,decrease_x,decrease_y,vector_droplist,entity_droplist,undo_button ){

		var interval, key = vector_droplist.value; debugMode && console.log( "key:", key );

		watch( vector_droplist, "onchange", function( prop, event, value ){ key = value; });
		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function onMouseClickInputValue(button){ 

			function updateNormalScaleValue( button, min, max, step){
				if ( !editor[key] ) return;
			//	var step = 1/100, min = -100, max = 100; 
				if ( button === increase_x ) editor[key].x = round( THREE.Math.clamp( editor[key].x+step, min, max ), 2);
				if ( button === decrease_x ) editor[key].x = round( THREE.Math.clamp( editor[key].x-step, min, max ), 2);
				if ( button === increase_y ) editor[key].y = round( THREE.Math.clamp( editor[key].y+step, min, max ), 2);
				if ( button === decrease_y ) editor[key].y = round( THREE.Math.clamp( editor[key].y-step, min, max ), 2);
			}

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout( function update_material( button ){
					interval = setTimeout( update_material, 20, button );
					return updateNormalScaleValue(button,-100,100,1/100);
				}, 500, this);
			});

			button.addEventListener( "click", function(){
				clearTimeout( interval );
				updateNormalScaleValue(button,-100,100,1/100);
			});

		}

		onMouseClickInputValue(increase_x);
		onMouseClickInputValue(increase_y);
		onMouseClickInputValue(decrease_x);
		onMouseClickInputValue(decrease_y);

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-vector-x-input"),     // vector_x,
		TabUI.Material.tab.querySelector("input#material-vector-y-input"),     // vector_y,
		TabUI.Material.tab.querySelector("li#material-vector-x-increase"),     // increase_x,
		TabUI.Material.tab.querySelector("li#material-vector-y-increase"),     // increase_y,
		TabUI.Material.tab.querySelector("li#material-vector-x-decrease"),     // decrease_x,
		TabUI.Material.tab.querySelector("li#material-vector-y-decrease"),     // decrease_y,
		TabUI.Material.tab.querySelector("select#material-vector-droplist"),   // vector_droplist
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		TabUI.Material.tab.querySelector("div#material-undo-button")           // undo_button,
	);


//	colors.

	(function( editor,color_r,color_g,color_b,increase_r,increase_g,increase_b,decrease_r,decrease_g,decrease_b,color_droplist,entity_droplist,undo_button ){

		var interval, key = color_droplist.value; debugMode && console.log( "key:", key );

		watch( color_droplist, "onchange", function( prop, event, value ){ key = value; });
		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function onMouseClickInputValue(button){ 

			function updateMaterialColorValue(button){

				var min=0, max=1, step=1/255; if ( !editor[key] ) return;

				if ( button === increase_r ) editor[key].r = THREE.Math.clamp( editor[key].r+step, min, max );
				if ( button === increase_g ) editor[key].g = THREE.Math.clamp( editor[key].g+step, min, max );
				if ( button === increase_b ) editor[key].b = THREE.Math.clamp( editor[key].b+step, min, max );
				if ( button === decrease_r ) editor[key].r = THREE.Math.clamp( editor[key].r-step, min, max );
				if ( button === decrease_g ) editor[key].g = THREE.Math.clamp( editor[key].g-step, min, max );
				if ( button === decrease_b ) editor[key].b = THREE.Math.clamp( editor[key].b-step, min, max );

			}

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout( function update_material(button){
					interval = setTimeout( update_material, 20, button );
					return updateMaterialColorValue(button);
				}, 500, this );
			});

			button.addEventListener( "click", function(){
				clearTimeout( interval );
				updateMaterialColorValue(button);
			});

		}

		onMouseClickInputValue(increase_r);
		onMouseClickInputValue(increase_g);
		onMouseClickInputValue(increase_b);
		onMouseClickInputValue(decrease_r);
		onMouseClickInputValue(decrease_g);
		onMouseClickInputValue(decrease_b);

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-color-r-input"),      // color_r,
		TabUI.Material.tab.querySelector("input#material-color-g-input"),      // color_g,
		TabUI.Material.tab.querySelector("input#material-color-b-input"),      // color_b,
		TabUI.Material.tab.querySelector("li#material-color-r-increase"),      // increase_r,
		TabUI.Material.tab.querySelector("li#material-color-g-increase"),      // increase_g,
		TabUI.Material.tab.querySelector("li#material-color-b-increase"),      // increase_b,
		TabUI.Material.tab.querySelector("li#material-color-r-decrease"),      // decrease_r,
		TabUI.Material.tab.querySelector("li#material-color-g-decrease"),      // decrease_g,
		TabUI.Material.tab.querySelector("li#material-color-b-decrease"),      // decrease_b,
		TabUI.Material.tab.querySelector("select#material-color-droplist"),    // color_droplist
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		TabUI.Material.tab.querySelector("div#material-undo-button")           // undo_button,
	);
