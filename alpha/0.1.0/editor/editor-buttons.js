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
