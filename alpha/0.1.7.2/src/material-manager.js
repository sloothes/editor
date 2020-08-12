//	material-manager.js

//	Type. (DONT CHANGE MATERIAL TYPE).

	(function( editor,text_input,value_input,key_droplist,type_droplist ){

		watch( editor, "type", function( key, action, value ){
			type_droplist.value = value; // dummy droplist.
			if ( key_droplist.value === key ) text_input.value = value;
		});

	})( 
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-text-input"),     // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"),    // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist"), // key_droplist,
		TabUI.Material.tab.querySelector("select#material-type-droplist")  // type_droplist
	);

//	Vectors.

	(function( editor,vector_x,vector_y,vector_droplist,entity_droplist ){

		var material;

		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

	//	normalScale.

		watch( editor, "normalScale",  function( key, action, value ){
			var scale = editor.normalScale; //console.log("normalScale:", scale);
			material && material.normalScale && material.normalScale.copy(scale);
			if ( vector_droplist.value === "normalScale" ) {
				vector_x.value = scale.x.toFixed(2);
				vector_y.value = scale.y.toFixed(2);
			}
		});

	})( 
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-vector-x-input"),    // vector_x,
		TabUI.Material.tab.querySelector("input#material-vector-y-input"),    // vector_y,
		TabUI.Material.tab.querySelector("select#material-vector-droplist"),  // vector_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist") // entity_droplist,
	);

//	Colors.

	(function( editor,color_r,color_g,color_b,color_droplist,entity_droplist ){

		var material;

		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

	//	color.

		watch( editor, "color", function( key ){
			var color = editor.color; //console.log("color:", color);
			material && material.color && material.color.copy(color);
			if ( color_droplist.value === "color" ) {
				color_r.value = (255*color.r).toFixed(0);
				color_g.value = (255*color.g).toFixed(0);
				color_b.value = (255*color.b).toFixed(0);
			}
		});

	//	emissive.

		watch( editor, "emissive", function( key ){
			var color = editor.emissive; //console.log("emissive:", color);
			material && material.emissive && material.emissive.copy(color);
			if ( color_droplist.value === "emissive" ) {
				color_r.value = (255*color.r).toFixed(0);
				color_g.value = (255*color.g).toFixed(0);
				color_b.value = (255*color.b).toFixed(0);
			}
		});

	//	specular.

		watch( editor, "specular", function( key ){
			var color = editor.specular; //console.log("specular:", color);
			material && material.specular && material.specular.copy(color);
			if ( color_droplist.value === "specular" ) {
				color_r.value = (255*color.r).toFixed(0);
				color_g.value = (255*color.g).toFixed(0);
				color_b.value = (255*color.b).toFixed(0);
			}
		});

	})( 
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-color-r-input"),     // color_r,
		TabUI.Material.tab.querySelector("input#material-color-g-input"),     // color_g,
		TabUI.Material.tab.querySelector("input#material-color-b-input"),     // color_b,
		TabUI.Material.tab.querySelector("select#material-color-droplist"),   // color_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist") // entity_droplist,
	);

//	Strings.

	(function( editor,text_input,value_input,key_droplist,type_droplist,entity_droplist ){

		var material;

		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

		function update_material_value( key, action, value ){
			if ( material ) material[key] = String(value);
			if ( key_droplist.value === key ) text_input.value = value;
		}

		watch( editor, "name", update_material_value );
		watch( editor, "uuid", update_material_value );
		watch( editor, "linecap", update_material_value );
		watch( editor, "linejoin", update_material_value );
		watch( editor, "precision", update_material_value );
		watch( editor, "wireframeLinecap", update_material_value );
		watch( editor, "wireframeLinejoin", update_material_value );

	})( 
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-text-input"),        // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"),       // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist"),    // key_droplist,
		TabUI.Material.tab.querySelector("select#material-type-droplist"),    // type_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist") // entity_droplist,
	);

//	Boolean.

	(function( editor,text_input,value_input,key_droplist,entity_droplist ){

		var material;

		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

		function update_material_value( key, action, value ){
			if ( material ) material[key] = Boolean(value);
			if ( key_droplist.value === key ) value_input.value = value; // display.
		}

		watch( editor, "fog", update_material_value );
		watch( editor, "lights", update_material_value );
		watch( editor, "visible", update_material_value );
		watch( editor, "skinning", update_material_value );
		watch( editor, "dithering", update_material_value );
		watch( editor, "alphaTest", update_material_value );
		watch( editor, "wireframe", update_material_value );
		watch( editor, "depthTest", update_material_value );
		watch( editor, "depthWrite", update_material_value );
		watch( editor, "colorWrite", update_material_value );
		watch( editor, "clipShadows", update_material_value );
		watch( editor, "flatShading", update_material_value );
		watch( editor, "transparent", update_material_value );
		watch( editor, "morphTargets", update_material_value );
		watch( editor, "morphNormals", update_material_value );
		watch( editor, "polygonOffset", update_material_value );
		watch( editor, "clipIntersection", update_material_value );
		watch( editor, "premultipliedAlpha", update_material_value );

	})( 
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-text-input"),        // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"),       // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist"),    // key_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist") // entity_droplist,
	);

//	Numbers.

	(function( editor,text_input,value_input,key_droplist,entity_droplist ){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		var material; // important!

		watch( entity_droplist, "onchange", function( property, event, value ){
			material = getMaterialByEntityId( value );
		});

		function update_material_value( key, action, value ){
			if ( material ) material[key] = Number(value);
			if ( key_droplist.value === key ) value_input.value = value.toFixed(2);
		}

		function update_material_constant( key, action, value ){
			if ( material ) material[key] = Number(value);
			if ( key_droplist.value === key ) value_input.value = value.toFixed(0);
		}

	//	Rad.

		watch( editor, "rotation", function( key, action, value ){
			if ( material ) material[key] = Number(value);
			if ( key_droplist.value === key ) value_input.value = (RAD2DEG*value).toFixed(1);
		});

	//	Floats.

		watch( editor, "opacity", update_material_value );
		watch( editor, "overdraw", update_material_value );
		watch( editor, "alphaTest", update_material_value );
		watch( editor, "shininess", update_material_value ); // deprecated.
		watch( editor, "bumpScale", update_material_value );
		watch( editor, "metalness", update_material_value );
		watch( editor, "roughness", update_material_value );
		watch( editor, "reflectivity", update_material_value );
		watch( editor, "refractionRatio", update_material_value );
		watch( editor, "aoMapIntensity", update_material_value );
		watch( editor, "envMapIntensity", update_material_value );
		watch( editor, "emissiveIntensity", update_material_value );
		watch( editor, "lightMapIntensity", update_material_value );
		watch( editor, "displacementBias", update_material_value );
		watch( editor, "displacementScale", update_material_value );
		watch( editor, "polygonOffsetUnits", update_material_value );
		watch( editor, "polygonOffsetFactor", update_material_value );

	//	Constants.

		watch( editor, "size", update_material_constant );
		watch( editor, "side", update_material_constant );
		watch( editor, "scale", update_material_constant );
		watch( editor, "gapSize", update_material_constant );
		watch( editor, "combine", update_material_constant );
		watch( editor, "dashSize", update_material_constant );
		watch( editor, "blending", update_material_constant );
		watch( editor, "blendSrc", update_material_constant );
		watch( editor, "blendDst", update_material_constant );
		watch( editor, "depthFunc", update_material_constant );
		watch( editor, "linewidth", update_material_constant );
		watch( editor, "vertexColors", update_material_constant );
		watch( editor, "normalMapType", update_material_constant );
		watch( editor, "blendEquation", update_material_constant );
		watch( editor, "blendSrcAlpha", update_material_constant );
		watch( editor, "blendDstAlpha", update_material_constant );
		watch( editor, "blendEquationAlpha", update_material_constant );
		watch( editor, "wireframeLinewidth", update_material_constant );

	})( 
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-text-input"),  // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"),  // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist"), // key_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist") // entity_droplist,
	);
