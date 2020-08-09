//	rigid-objects-add-button.js

	(function(add_button,entity_droplist,rigidObjects,exitEditMode){

		watch( add_button, "onclick", function( prop, event, value ){

			var object = getObjectByEntityId( value );

			if ( object && rigidObjects.findIndex( function( item ){ 
				return item.id === object.id;
			}) > -1 ) return; // already exists in rigidObjects.
			object && object.isMesh && rigidObjects.push( object );

		//	Exit edit mode.
			exitEditMode( entity_droplist );
		});

	})(
		TabUI.Editor.tab.querySelector("div#rigid-add-button"), // clone_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		rigidObjects, exitEditMode // rigidObjects, function.
	);

//	rigid-objects-remove-button.js

	(function(remove_button,entity_droplist,rigidObjects,exitEditMode){

		watch( remove_button, "onclick", function( prop, event, value ){

			var object = getObjectByEntityId( value );
			var index = rigidObjects.findIndex( 
				function( object ){
					return object.id === parseInt( value );
				});
			if ( index < 0 ) return; // important!
			rigidObjects.splice( index, 1 );

		//	Exit edit mode.
			exitEditMode( entity_droplist );
		});

	})(
		TabUI.Editor.tab.querySelector("div#rigid-remove-button"), // clone_button,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		rigidObjects, exitEditMode // rigidObjects, function.
	);

