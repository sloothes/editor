//	imgurdB.js
//	For textures have a look at:
//	"https://hdrihaven.com/hdris"
//	"https://texturehaven.com/textures",

	const imgurdB = new zango.Db( "imgur", 2, {

		wood:      ["id"],
		rock:      ["id"],
		glass:     ["id"],
		metal:     ["id"],
		floor:     ["id"],
		plant:     ["id"],
		trees:     ["id"],
		paster:    ["id"],
		matcap:    ["id"],
		bricks:    ["id"],
		fabric:    ["id"],
		roofing:   ["id"],
		terrain:   ["id"],
		concrete:  ["id"],
		sandstone: ["id"],

	//	environments.

		urban:     ["id"],
		night:     ["id"],
		cloudy:    ["id"],
		midday:    ["id"],
		skybox:    ["id"],
		indoor:    ["id"],
		nature:    ["id"],
		studio:    ["id"],
		sunset:    ["id"],
		outdoor:   ["id"],
		skydome:   ["id"],
		sunrise:   ["id"],
		overcast:  ["id"]

	});

	imgurdB.open(function(err, database){
		if (err) console.error(err);
	}).then( function(){

		debugMode && console.log( 
			"Database " + imgurdB.name 
			+ " (v" + imgurdB.version 
			+ ") ready for use."
		);

	}).catch(function(err){
		console.error(err);
	});
