//	material-key-inputs.js

	(function(editor,text_input,value_input,key_droplist,entity_droplist,undo_button){

		watch( text_input, "onchange", function(property, event, value){

			var key = key_droplist.value;

			switch ( key ){

				case "uuid":
				case "type":
				case "linecap":
				case "linejoin":
				case "wireframeLinecap":
					return text_input.value = editor[key];
				break;

				case "name":

					if ( !value ) return text_input.value = editor[key];

				//	rename option.
					setTimeout( function( type, name, id ){
						var str="",dot=".",col=":";
						var selector = "option[value='" + id + "']";
						var option = entity_droplist.querySelector(selector); 
					//	debugMode && console.log({params:{id:id,name:name,type:type,option:option}});
						if ( !option ) return;
						switch ( type ) {
							case "MeshToonMaterial":
							case "MeshBasicMaterial":
							case "MeshPhongMaterial":
							case "MeshDepthMaterial":
							case "MeshNormalMaterial":
							case "MeshLambertMaterial":
							case "MeshStandardMaterial":
							case "MeshPhysicalMaterial":
								type = type.replace("Mesh","");
							break;
							case "LineBasicMaterial":
							case "LineDashedMaterial":
							case "RawShaderMaterial":
								type = type.replace("Material","");
							break;
						}
						option.text = str+id+dot+type+col+name; // +id;
					}, null, editor.type, value, entity_droplist.value );

				//	Update editor.
					return editor[key] = value;

				break;
			}

			value_input.value = "";

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-text-input"), // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"), // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist"), // key_droplist
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		TabUI.Material.tab.querySelector("div#material-undo-button") // undo_button,
	);

//	value input.

	(function(editor,text_input,value_input,key_droplist,entity_droplist,undo_button){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( value_input, "onchange", function(property, event, value){

			var key = key_droplist.value;

			switch ( key ){

			//	typeof editor[key] === "boolean" || typeof editor[key] === "undefined"

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
					if ( value === "0" ) return editor[key] = false;                        // accept "0", string.
					else if ( value === "1" ) return editor[key] = true;                    // accept "1", string.
					else if ( value.toLowerCase() === "true" ) return editor[key] = true;   // accept "true" string.
					else if ( value.toLowerCase() === "false" ) return editor[key] = false; // accept "false" string.
					else return value_input.value = editor[key];
				break;

			//	typeof editor[key] === "number" || typeof editor[key] === "undefined"

				case "displacementScale":
				case "polygonOffsetUnits":
				case "polygonOffsetFactor":
					return editor[key] = THREE.Math.clamp(Number(value), -100, 100); // number.
				break;
				case "opacity":
				case "overdraw":
				case "alphaTest":
				case "reflectivity":
					return editor[key] = THREE.Math.clamp(Number(value), 0, 1); // number.
				break;
				case "refractionRatio":
					return editor[key] = THREE.Math.clamp(Number(value), -1, 1); // number.
				break;
				case "bumpScale":
				case "metalness":
				case "roughness":
				case "displacementBias":
				case "aoMapIntensity":
				case "envMapIntensity":
				case "emissiveIntensity":
				case "lightMapIntensity":
				case "wireframeLinewidth":
					return editor[key] = THREE.Math.clamp(Number(value), -10, 10); // number.
				break;
				case "linewidth":
					return editor[key] = THREE.Math.clamp(Number(value), 0, 100); // number.
				break;
				case "size":
				case "scale":
				case "gapSize":
				case "dashSize":
				case "shininess":
					return editor[key] = THREE.Math.clamp(Number(value), 0, 1000); // number.
				break;
				case "rotation":
					return editor[key] = DEG2RAD*THREE.Math.clamp(Number(value), -180, 180); // number.
				break;
				case "blending":
					if ( "0,1,2,3,4,5".split(",").includes(value) ) return editor[key] = Number(value); 
				break;
				case "side":
					if ( "0,1,2".split(",").includes(value) ) return editor[key] = Number(value); 
				break;
				case "vertexColors":
					if ( "0,1,2".split(",").includes(value) ) return editor[key] = Number(value); 
				break;
				case "blendDst":
				case "blendSrc":
					if ( "200,201,202,203,204,205,206,207,208,209,210".split(",").includes(value) ) return editor[key] = Number(value); 
				break;
				case "blendEquation":
					if ( "100,101,102,103,104".split(",").includes(value) ) return editor[key] = Number(value); 
				break;
				case "depthFunc":
					if ( "0,1,2,3,4,5,6,7".split(",").includes(value) ) return editor[key] = Number(value); 
				break;
				case "normalMapType":
					if ( "0,1".includes(value) ) return editor[key] = Number(value); 
				break;
				case "combine":
					if ( "0,1,2".includes(value) ) return editor[key] = Number(value); 
				break;
			}

			text_input.value = "";

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-text-input"), // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"), // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist"), // key_droplist
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		TabUI.Material.tab.querySelector("div#material-undo-button") // undo_button,
	);

//	vector inputs.

	(function(editor,vector_x,vector_y,vector_droplist,entity_droplist,undo_button){

		watch( vector_x, "onchange", function(property, event, value){

			var key = vector_droplist.value;

			value = THREE.Math.clamp( Number(value), -100, 100 )
			if ( isNaN(value) ) return vector_x.value = editor[key].x.toFixed(2);
			editor[key].x = value; vector_x.value = value.toFixed(2);


		});

		watch( vector_y, "onchange", function(property, event, value){

			var key = vector_droplist.value;

			value = THREE.Math.clamp( Number(value), -100, 100 )
			if ( isNaN(value) ) return vector_y.value = editor[key].y.toFixed(2);
			editor[key].y = value; vector_y.value = value.toFixed(2);

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-vector-x-input"), // vector_x,
		TabUI.Material.tab.querySelector("input#material-vector-y-input"), // vector_y,
		TabUI.Material.tab.querySelector("select#material-vector-droplist"), // vector_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		TabUI.Material.tab.querySelector("div#material-undo-button") // undo_button,			);
	);

//	color inputs.

	(function(editor,color_r,color_g,color_b,color_droplist,entity_droplist,undo_button){

		watch( color_r, "onchange", function(property, event, value){

			var key = color_droplist.value;

			value = THREE.Math.clamp(Number(value),0,255);
			if ( isNaN(value) ) return color_r.value = 255*editor[key].r;
			editor[key].r = value/255; color_r.value = value.toFixed(0);

		});

		watch( color_g, "onchange", function(property, event, value){

			var key = color_droplist.value;

			value = THREE.Math.clamp(Number(value),0,255);
			if ( isNaN(value) ) return color_g.value = 255*editor[key].g;
			editor[key].g = value/255; color_g.value = value.toFixed(0);

		});

		watch( color_b, "onchange", function(property, event, value){

			var key = color_droplist.value;

			value = THREE.Math.clamp(Number(value),0,255);
			if ( isNaN(value) ) return color_b.value = 255*editor[key].b;
			editor[key].b = value/255; color_b.value = value.toFixed(0);

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-color-r-input"), // color_r,
		TabUI.Material.tab.querySelector("input#material-color-g-input"), // color_g,
		TabUI.Material.tab.querySelector("input#material-color-b-input"), // color_b,
		TabUI.Material.tab.querySelector("select#material-color-droplist"), // color_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		TabUI.Material.tab.querySelector("div#material-undo-button"), // undo_button,
	);
