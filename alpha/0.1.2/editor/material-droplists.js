//	material-map-droplist.js

	(function(editor,map_droplist,vector_x,vector_y,vector_droplist){

		watch( map_droplist, "onchange", function( property, event, map ){

			var key = vector_droplist.value;

			if ( map !== "normalMap" )         [vector_x.value, vector_y.value] = ["",""];
			else if ( key !== "normalScale" )  [vector_x.value, vector_y.value] = ["",""];
			else if ( editor[map] == null)     [vector_x.value, vector_y.value] = ["",""];
			else if ( editor[key] == null)     [vector_x.value, vector_y.value] = ["",""];
			else if ( !editor[map].isTexture ) [vector_x.value, vector_y.value] = ["",""];
			else if ( !editor[key].isVector2 ) [vector_x.value, vector_y.value] = ["",""];
			else [ vector_x.value, vector_y.value ] = [ editor[key].x.toFixed(2), editor[key].y.toFixed(2) ];

		});

	//	Update texture entities droplist.
		watch( map_droplist, "onchange", function( property, event, map ){
			var entity_droplist = document.querySelector("select#textures-entities-droplist"); // texture editor droplist.
			entity_droplist && editor[map] && callWatchers( entity_droplist, "onchange", "change", entity_droplist = String(editor[map].id) );
		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("select#material-map-droplist"), // map_droplist.
		TabUI.Material.tab.querySelector("input#material-vector-x-input"),  // vector_x,
		TabUI.Material.tab.querySelector("input#material-vector-y-input"),  // vector_y,
		TabUI.Material.tab.querySelector("select#material-vector-droplist") // vector_droplist.
	);


//	material-key-droplist.js

	(function(editor,text_input,value_input,key_droplist){

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

		watch( key_droplist, "onchange", function( property, event, key ){

			switch ( typeof editor[key] ) {

				case "string":
					return text_input.value = editor[key];
				break;

				case "boolean":
					return value_input.value = editor[key];
				break;

				case "number":

					if ( key === "rotation" ) 

						return value_input.value = (RAD2DEG*editor[key]).toFixed(1);

					else if ( ("displacementScale,polygonOffsetUnits,polygonOffsetFactor,opacity,"
					+ "alphaTest,reflectivity,refractionRatio,bumpScale,metalness,roughness,displacementBias,"
					+ "aoMapIntensity,envMapIntensity,emissiveIntensity,lightMapIntensity,wireframeLinewidth,"
					+ "linewidth,size,scale,gapSize,dashSize,shininess").split(",").includes(key) ) 

						return value_input.value = editor[key].toFixed(2);

					else 

						return value_input.value = editor[key].toFixed(0);

				break;
			}

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-text-input"), // text_input,
		TabUI.Material.tab.querySelector("input#material-value-input"), // value_input,
		TabUI.Material.tab.querySelector("select#material-keys-droplist") // key_droplist.
	);


//	material-vector-droplist.js

	(function(editor,vector_x,vector_y,vector_droplist){

		watch( vector_droplist, "onchange", function( property, event, key ){

			if ( key === "" )                         [vector_x.value, vector_y.value] = ["",""];
			else if ( editor[key] === undefined )     [vector_x.value, vector_y.value] = ["",""];
			else if ( !editor[key].isVector2 )        [vector_x.value, vector_y.value] = ["",""];
			else [ vector_x.value, vector_y.value ] = [ editor[key].x.toFixed(2), editor[key].y.toFixed(2) ];

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-vector-x-input"),  // vector_x,
		TabUI.Material.tab.querySelector("input#material-vector-y-input"),  // vector_y,
		TabUI.Material.tab.querySelector("select#material-vector-droplist") // vector_droplist.
	);


//	material-color-droplist.js

	(function(editor,color_r,color_g,color_b,color_droplist){

		watch( color_droplist, "onchange", function( property, event, key ){

			if ( key === "" )                     [color_r.value, color_g.value, color_b.value] = ["","",""];
			else if ( editor[key] === undefined ) [color_r.value, color_g.value, color_b.value] = ["","",""];
			else if ( !editor[key].isColor )      [color_r.value, color_g.value, color_b.value] = ["","",""];

			else [ color_r.value, color_g.value, color_b.value ] = [ 
				( 255*editor[ key ].r ).toFixed(0),
				( 255*editor[ key ].g ).toFixed(0),
				( 255*editor[ key ].b ).toFixed(0)
			];

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("input#material-color-r-input"), // color_r,
		TabUI.Material.tab.querySelector("input#material-color-g-input"), // color_g,
		TabUI.Material.tab.querySelector("input#material-color-b-input"), // color_b,
		TabUI.Material.tab.querySelector("select#material-color-droplist") // color_droplist.
	);


//	material-entity-droplist.js

	(function(editor,map_droplist,key_droplist,color_droplist,vector_droplist,entity_droplist,exitEditMode){

		watch( entity_droplist, "onchange", function( property, event, value ){

			editor.update( value );

		//	Call droplist watchers.

			callWatchers( map_droplist, "onchange", "change", map_droplist.value );
			callWatchers( key_droplist, "onchange", "change", key_droplist.value );
			callWatchers( color_droplist, "onchange", "change", color_droplist.value );
			callWatchers( vector_droplist, "onchange", "change", vector_droplist.value );

		});

	})(
		materialEditor, // editor,
		TabUI.Material.tab.querySelector("select#material-map-droplist"),      // map_droplist.
		TabUI.Material.tab.querySelector("select#material-keys-droplist"),     // key_droplist.
		TabUI.Material.tab.querySelector("select#material-color-droplist"),    // color_droplist.
		TabUI.Material.tab.querySelector("select#material-vector-droplist"),   // vector_droplist.
		TabUI.Material.tab.querySelector("select#material-entities-droplist"), // entity_droplist.
		exitEditMode   // function.
	);
