//	model-db.js

	const modeldB = new zango.Db( "model", [
		"names","imgur",                 // meta-data collections,
		"groups","objects","geometries", // data collections,
		"materials","textures","images", // data collections,
		"models"                         // entry collections,
	]);

	(function(db){
		db.open(function(err, database){ if (err) console.error(err);
		}).then( function(){ debugMode && console.log( 
			"Database", db.name, "(v"+db.version+")", "ready for use.");
		}).catch(function(err){ console.error(err); });
	})( modeldB );
