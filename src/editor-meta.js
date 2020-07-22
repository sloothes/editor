//	editor-meta.js

	const metaDB = new zango.Db( "meta", {

		geometries: ["uuid"],
		materials:  ["uuid"],
		textures:   ["uuid"],
		images:     ["uuid"],
		shapes:     ["uuid"],

	});

	metaDB.open(function(err, database){
		if (err) console.error(err);
	}).then( function(){

		debugMode && console.log( 
			"Database " + metaDB.name 
			+ " (v" + metaDB.version 
			+ ") ready for use."
		);

	}).catch(function(err){
		console.error(err);
	});

	debugMode && console.log("editor DB loaded!");


//  export database.js

	const exportMetaCollection = function ( name ){

	//  throws error if collection not exist!
		if ( !metaDB.collection( name ) ) {
			throw "Collection " + name + " does not exist."; // important!
		}

		metaDB.collection(name).find()
		.toArray(function(err, docs){
			if (err) throw err;
			if ( !docs.length )  
				throw "collection " + name + " is empty";
		}).then(function(docs){ 
			return JSON.stringify(docs);
		}).then(function(data){ 
			debugMode && console.log( data );

		//  Save to desktop.
			var a = document.createElement("a");
			var file = new Blob([data], {type: "text/json"});
			a.href = URL.createObjectURL(file);
			a.download = name + "-" + metaDB.name + "v" + metaDB.version + ".json";
			a.click();

			return a.href; // OK.

		}).then(function(objectURL){
			URL.revokeObjectURL(objectURL); // OK.

		}).catch(function(err){
			console.error(err);
		});

	}

	const exportDatabase = function (db){

		if ( !db._open ) {
			throw "Database " + db.name + " is not open.";
		}

		var json = {};
		var promises = [];

		for ( var name in db._cols ){
			promises.push( (function(name){
				return db.collection(name).find()
				.toArray(function(err, docs){
					if (err) throw err;
				}).then(function(docs){ 
					if ( !docs.length ) console.warn( "None documents found in collection "+name);
					json[ name ] = docs ;
					debugMode && console.log( name+":", json[name] );
				}).catch(function(err){
					console.error(err);
				});
			})(name));
		}

		debugMode && console.log( promises );

		Promise.all(promises).then(function(){
			debugMode && console.log( "json:", json );

			return JSON.stringify( json );

		}).then(function(data){
			debugMode && console.log(data);

		//  Save to file.
			var a = document.createElement("a");
			var file = new Blob([data], {type: "text/json"});
			a.href = URL.createObjectURL(file);
			a.download = db.name + "v" + db.version + "-export.json";
			a.click();

			return a.href;

		}).then(function(objectURL){

			URL.revokeObjectURL(objectURL);

		}).catch(function(err){
			console.error(err);
		});

	}
