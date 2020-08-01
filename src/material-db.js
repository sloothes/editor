//	material-db.js

	const materialdB = new zango.Db( "material", [
		"imgur",                      // metadata collection.
		"materials","textures","images", // data collections.
		"rock","floor","wood","metal","fabric","brick","matcap","plaster", // entry collections.
		"roofing","terrain","concrete","sandstone","environment","others"  // entry collections.
	]);

	(function(db){
		db.open(function(err, database){ if (err) console.error(err);
		}).then( function(){ debugMode && console.log( 
			"Database", db.name, "(v"+db.version+")", "ready for use.");
		}).catch(function(err){ console.error(err); });
	})( materialdB );

