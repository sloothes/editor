//	ObjectEditor.js

	const RAD2DEG = 57.29577951308232;
	const DEG2RAD = 0.017453292519943295;

	function ObjectEditor(){
		var object = new THREE.Object3D();
		Object.setPrototypeOf( object, ObjectEditor.prototype );
		return object; // important!
	}

	ObjectEditor.prototype = Object.create(THREE.Object3D.prototype); // important!

	ObjectEditor.prototype.reset = function(){ 

		var editor = this;
		editor.copy( new THREE.Object3D() );
		editor.uuid = THREE.Math.generateUUID();
		editor.name = "object editor";
	};

	ObjectEditor.prototype.update = function( value ){ 

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

	ObjectEditor.prototype.edit = function( value ){ 

		var entity_droplist = document.querySelector("select#editor-entities-droplist");
		entity_droplist && callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = value );

	};

	ObjectEditor.prototype.exit = function(){ this.prototype.edit.call( this, "" ); };

	const objectEditor = new ObjectEditor();
//	Note: When editor is not added in scene
//	doesn't update matrix/matrixWorld json.
//	When is added in scene updates matrixes.
	scene.add( objectEditor ); // important!

