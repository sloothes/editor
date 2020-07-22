
//	input-watchers-call.js

	(function(){

		function onInputChangeWatchersCall( input ){

			watch( input, "onchange", function( prop, event, value ){ 
				debugMode && console.log({item:input,event:event,value:value}); // debug.
			});

			input.addEventListener( "change", function(){
				this.blur(); callWatchers( this, "onchange", "change", this.value );
			});

		}

	//	inputs.

		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("input#editor-text-input") );             // text_input,
		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("input#editor-value-input") );            // value_input,
		onInputChangeWatchersCall( TabUI.Texture.tab.querySelector("input#texture-text-input") );           // text_input,
		onInputChangeWatchersCall( TabUI.Texture.tab.querySelector("input#texture-value-input") );          // value_input,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("input#material-text-input") );         // text_input,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("input#material-value-input") );        // value_input,
		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("input#editor-vector-x-input") );         // editor_vector_x,
		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("input#editor-vector-y-input") );         // editor_vector_y,
		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("input#editor-vector-z-input") );         // editor_vector_z,
		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("input#editor-vector-w-input") );         // editor_vector_w,
		onInputChangeWatchersCall( TabUI.Texture.tab.querySelector("input#texture-vector-x-input") );       // texture_vector_x,
		onInputChangeWatchersCall( TabUI.Texture.tab.querySelector("input#texture-vector-y-input") );       // texture_vector_y,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("input#material-vector-x-input") );     // material_vector_x,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("input#material-vector-y-input") );     // material_vector_y,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("input#material-color-r-input") );      // material_color_r,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("input#material-color-g-input") );      // material_color_g,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("input#material-color-b-input") );      // material_color_b,

	//	selects.

		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("select#editor-key-droplist") );          // key_droplist,
		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("select#editor-vector-droplist") );       // vector_droplist,
		onInputChangeWatchersCall( TabUI.Editor.tab.querySelector("select#editor-entities-droplist") );     // entity_droplist,
		onInputChangeWatchersCall( TabUI.Geometry.tab.querySelector("select#geometry-type-droplist") );     // type_droplist,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("select#material-map-droplist") );      // map_droplist,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("select#material-keys-droplist") );     // keys_droplist,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("select#material-type-droplist") );     // type_droplist,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("select#material-color-droplist") );    // color_droplist,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("select#material-vector-droplist") );   // vector_droplist,
		onInputChangeWatchersCall( TabUI.Material.tab.querySelector("select#material-entities-droplist") ); // entity_droplist,
		onInputChangeWatchersCall( TabUI.Texture.tab.querySelector("select#texture-key-droplist") );        // key_droplist,
		onInputChangeWatchersCall( TabUI.Texture.tab.querySelector("select#texture-vector-droplist") );     // vector_droplist,
		onInputChangeWatchersCall( TabUI.Texture.tab.querySelector("select#textures-entities-droplist") );  // entity_droplist,

	})();

//	mouse-watchers-call.js

	(function(entity_droplist,geometry_type,material_type,textures_droplist,material_droplist){

		function onMouseClickWatchersCall( button, droplist ){

			var interval;

			watch( button, "onclick", function( prop, event, value ){ 
				debugMode && console.log({item:button,property:prop,event:event,value:value}); // debug.
			});

		//	Call watchers.

			button.addEventListener( "click", function(){ 
				clearTimeout( interval );
				interval = setTimeout(function(button){
					callWatchers( button, "onclick", "click", droplist.value );
				}, 250, this); 
			});
		}

	//	editor-tab.
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("div#rigid-add-button"), entity_droplist );         // rigid_add,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("div#editor-exit-mode"), entity_droplist );         // exit_mode,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("div#editor-reset-button"), entity_droplist );      // vector_reset,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("div#matrix-needs-update"), entity_droplist );      // needs_update,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("div#rigid-remove-button"), entity_droplist );      // rigid_remove,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-value-increase"), material_droplist );   // increase,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-value-decrease"), material_droplist );   // decrease,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-x-increase"), entity_droplist );  // increase_x,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-y-increase"), entity_droplist );  // increase_y,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-z-increase"), entity_droplist );  // increase_z,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-w-increase"), entity_droplist );  // increase_w,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-x-decrease"), entity_droplist );  // decrease_x,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-y-decrease"), entity_droplist );  // decrease_y,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-z-decrease"), entity_droplist );  // decrease_z,
		onMouseClickWatchersCall( TabUI.Editor.tab.querySelector("li#editor-vector-w-decrease"), entity_droplist );  // decrease_w,
	//	geometry-tab.
		onMouseClickWatchersCall( TabUI.Geometry.tab.querySelector("div#octree-add-button"), entity_droplist );      // octree_add,
		onMouseClickWatchersCall( TabUI.Geometry.tab.querySelector("div#octree-remove-button"), entity_droplist );   // octree_remove,
		onMouseClickWatchersCall( TabUI.Geometry.tab.querySelector("div#geometry-create-button"), geometry_type );   // geometry_create,
		onMouseClickWatchersCall( TabUI.Geometry.tab.querySelector("div#geometry-clone-button"), entity_droplist );  // geometry_clone,
		onMouseClickWatchersCall( TabUI.Geometry.tab.querySelector("div#geometry-remove-button"), entity_droplist ); // geometry_remove,
	//	material-tab.
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("div#material-exit-mode"), material_droplist );        // material_exit,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("div#material-needs-update"), material_droplist );     // needs_update,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("div#create-material-button"), material_type );        // material_create,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("div#clone-material-button"), material_droplist );     // material_clone,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("div#remove-material-button"), material_droplist );    // material_remove,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-value-increase"), material_droplist );    // increase,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-value-decrease"), material_droplist );    // decrease,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-color-r-increase"), material_droplist );  // increase_r,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-color-g-increase"), material_droplist );  // increase_g,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-color-b-increase"), material_droplist );  // increase_b,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-color-r-decrease"), material_droplist );  // decrease_r,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-color-g-decrease"), material_droplist );  // decrease_g,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-color-b-decrease"), material_droplist );  // decrease_b,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-vector-x-increase"), material_droplist ); // increase_x,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-vector-y-increase"), material_droplist ); // increase_y,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-vector-x-decrease"), material_droplist ); // decrease_x,
		onMouseClickWatchersCall( TabUI.Material.tab.querySelector("li#material-vector-y-decrease"), material_droplist ); // decrease_y,
	//	texture-tab.
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("div#texture-exit-mode"), textures_droplist );        // texture_exit,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("div#texture-needs-update"), textures_droplist );     // needs_update,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("div#create-texture-button"), textures_droplist );    // texture_create,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("div#clone-texture-button"), textures_droplist );     // texture_clone,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("div#replace-image-button"), textures_droplist );     // image_replace,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("div#remove-texture-button"), textures_droplist );    // texture_remove,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("li#texture-value-increase"), textures_droplist );    // increase,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("li#texture-value-decrease"), textures_droplist );    // decrease,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("li#texture-vector-x-increase"), textures_droplist ); // increase_x,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("li#texture-vector-y-increase"), textures_droplist ); // increase_y,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("li#texture-vector-x-decrease"), textures_droplist ); // decrease_x,
		onMouseClickWatchersCall( TabUI.Texture.tab.querySelector("li#texture-vector-y-decrease"), textures_droplist ); // decrease_y,

	})( 
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"),    // entity_droplist,
		TabUI.Geometry.tab.querySelector("select#geometry-type-droplist"),    // geometry_type,
		TabUI.Material.tab.querySelector("select#material-type-droplist"),    // material_type,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // textures_droplist,
		TabUI.Material.tab.querySelector("select#material-entities-droplist") // material_droplist,
	);
