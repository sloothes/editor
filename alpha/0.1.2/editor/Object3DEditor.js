//	Object3DEditor.js

	function Object3DEditor(){
		var object = new THREE.Object3D();
		Object.setPrototypeOf( object, Object3DEditor.prototype );
		return object; // important!
	}

	Object3DEditor.prototype = Object.create(THREE.Object3D.prototype); // important!

	Object3DEditor.prototype.reset = function(){ 

		var editor = this;
		editor.copy( new THREE.Object3D() );
		editor.uuid = THREE.Math.generateUUID();
		editor.name = "object editor";
	};

	Object3DEditor.prototype.update = function( value ){ 

	//	Copies the values of the target object3D of
	//	scene. Does not updates the target object3D.
	//	dependences: entities {scene},
	//	param: a object3D id {string or number}.

		var editor = this;

	//	Reset editor.
		editor.reset();

	//	Get new object.
		var object = getObjectByEntityId( value ); 
		var isEditing = !!object; // boolean!

	//	Update editor (copy).
		object && editor.copy( object );

	//	uuid.
		if ( object ) editor.uuid = object.uuid; 
		else editor.uuid = THREE.Math.generateUUID();

	//	return boolean.
	//	console.log("editor isEditing:", isEditing);
		return isEditing; // boolean, important!

	};

	Object3DEditor.prototype.edit = function( value ){ 

		var entity_droplist = document.querySelector("select#editor-entities-droplist");
		entity_droplist && callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = value );

	};

	Object3DEditor.prototype.exit = function(){ this.prototype.edit.call( this, "" ); };

//	Note: When editor is not added in scene
//	doesn't update matrix/matrixWorld json.
//	When is added in scene updates matrixes.

	const objectEditor = new Object3DEditor();
	scene.add( objectEditor ); // important!

