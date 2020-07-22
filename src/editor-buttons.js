
//	matrix-needs-update.js

	(function( editor,matrix_button ){

		watch( matrix_button, "onclick", function( property, event, key ){

			editor.matrixWorldNeedsUpdate = true;
		});

	})(
		objectEditor, TabUI.Editor.tab.querySelector("div#matrix-needs-update") // matrix_button,
	);

//	exit-edit-mode.js

	(function(exit_button,entity_droplist,exitEditMode){

		watch( exit_button, "onclick", function( prop, event, value ){

			 exitEditMode( entity_droplist );
		});

	})( 
		TabUI.Editor.tab.querySelector("div#editor-exit-mode"), // exit_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist.
		exitEditMode // function.
	 ); 

//	reset-vectors.js

	(function( editor,reset_button,vector_w,vector_droplist ){

		watch( reset_button, "onclick", function( property, event, key ){

			switch ( key ) {
				case "position":
					editor.position.set(0,0,0);
				break;
				case "rotation":
					editor.rotation.set(0,0,0);
				break;
				case "scale":
					editor.scale.set(1,1,1);
				break;
				case "quaternion":
					editor.quaternion.set(0,0,0,1);
				break;
			}

		});

	})(
		objectEditor, // editor,
		TabUI.Editor.tab.querySelector("div#editor-vectors-reset"), // reset_button,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist") // vector_droplist.
	);
