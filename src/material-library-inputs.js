
//	material-library-inputs.js

	(function(db,next_doc,prev_doc,load_btn,name_input,img_viewer,collection_droplist){

		var interval, index = 0, limit = 1000, items = [];

		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		watch( next_doc, "onclick", function( prop, event, value ){ 
			if ( index > limit ) index = 0; if ( items[index] === undefined ) return;
			if ( items[index].name === undefined ) name_input.value = items[index]._id; else name_input.value = items[index].name;
			if ( items[index].preview === undefined ) img_viewer.src = ":0"; else img_viewer.src = items[index].preview;
		});

		watch( prev_doc, "onclick", function( prop, event, value ){ if ( 
			index < 0 ) index = limit; if ( items[index] === undefined ) return;
			if ( items[index].name === undefined ) name_input.value = items[index]._id; else name_input.value = items[index].name;
			if ( items[index].preview === undefined ) img_viewer.src = ":0"; else img_viewer.src = items[index].preview;
		});


	//	on mouse down.

		next_doc.addEventListener( "mousedown", function(){
			clearTimeout( interval );
			interval = setTimeout(function increase(){ 
				++index; if ( index > limit ) index = 0; if ( items[index] === undefined ) return;
				if ( items[index].name === undefined ) name_input.value = items[index]._id; else name_input.value = items[index].name;
				if ( items[index].preview === undefined ) img_viewer.src = ":0"; else img_viewer.src = items[index].preview;
				interval = setTimeout(increase, 100);
			}, 500);
		});

		prev_doc.addEventListener( "mousedown", function(){
			clearTimeout( interval ); 
			interval = setTimeout(function decrease(){ 
				--index;  if ( index < 0 ) index = limit; if ( items[index] === undefined ) return;
				if ( items[index].name === undefined ) name_input.value = items[index]._id; else name_input.value = items[index].name;
				if ( items[index].preview === undefined ) img_viewer.src = ":0"; else img_viewer.src = items[index].preview;
				interval = setTimeout(decrease, 100);
			}, 500);
		});

	//	on mouse click.

		next_doc.addEventListener( "click", function(){
			clearTimeout( interval ); callWatchers( this, "onclick", "click", ++index ); // important!
		});

		prev_doc.addEventListener( "click", function(){
			clearTimeout( interval ); callWatchers( this, "onclick", "click", --index ); // important!
		});


	//	Load button.

		watch( load_btn, "onclick", function( prop, event, index ){ 

			if ( !collection_droplist.value ) return;

			var name = collection_droplist.value;

			db.collection( name ).find().skip(index).limit(1).toArray()
			.then(function(docs){ return docs[0]; }).then(function(data){

				debugMode && console.log( data );

				var object = new THREE.Mesh( new THREE.BoxGeometry() );
				var json = object.toJSON(); json.object.material = data.uuid;

				return db.collection("materials").findOne({uuid:data.uuid})
				.then(function(doc){ if ( !doc ) throw "material not found!";
					json.materials = [doc]; return {json:json, data:data};
				}).catch(function(err){ console.error(err); });

			}).then(function(results){

				var data = results.data; var json = results.json;
			//	debugMode && console.log( JSON.parse(JSON.stringify(json)) );

				var promises = []; data.textures.forEach( function(uuid){
					promises.push( db.collection("textures").findOne({uuid:uuid})
						.then(function(doc){ 
							if (!doc) throw "texture "+uuid+" not found!"; return doc;
						}).catch(function(err){ console.error(err); })
					);
				});

				return Promise.all(promises).then(function(textures){
					debugMode && console.log( "textures:", textures );
					json.textures = textures; return {json:json, data:data};
				}).catch(function(err){ console.error(err); });

			}).then(function(results){

				var data = results.data; var json = results.json;
			//	debugMode && console.log( JSON.parse(JSON.stringify(json)) );

				var promises = []; data.images.forEach( function(uuid){
					promises.push( db.collection("images").findOne({uuid:uuid})
						.then(function(doc){
							if (!doc) throw "image "+uuid+" not found!"; return doc;
						}).catch(function(err){ console.error(err); })
					);
				});

				return Promise.all(promises).then(function(images){
					debugMode && console.log( "images:", images );
					json.images = images; return json;
				}).catch(function(err){ console.error(err); });

			}).then(function(json){

				debugMode && console.log( "json:", json );
				var loader = new THREE.ObjectLoader(); 
				var object = loader.parse( json );
				debugMode && console.log( "object:", object );

				return object.material;

			}).then(function(material){

				if ( !material ) return; debugMode && console.log("material:", material); 

				var keys  = "map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
					keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";

			//	replace uuids.
				material.uuid = THREE.Math.generateUUID(); // replace material uuid.
				keys.split(",").forEach(function(key){ 
					if ( material[key] != null ) material[key].uuid = THREE.Math.generateUUID();
				});

			//	add entities.
				material_entities.add( material ); // add to material entities.
				keys.split(",").forEach(function(key){ 
					if ( material[key] != null ) textures_entities.add( material[ key ] ); // add to texture entities.
				});

			}).catch(function(err){ console.error(err); })

		});

		load_btn.addEventListener( "click", function(){
			clearTimeout( interval );  interval = setTimeout( function(){ callWatchers( load_btn, "onclick", "click", index ); }, 250); // important!	
		});


	//	Collection droplist.

		watch(collection_droplist, "onchange", function(prop, event, value){

			var collection = db.collection( value ); // debugMode && console.log( "collection:", collection ); 

		//	Reset.

			index = 0; items = [];

		//	Get names.

			db.collection( value ).find().on("data", function(data){

				if ( data === undefined ) return;

				var item = { _id: data._id };
				if ( data.uuid !== undefined ) item.uuid = data.uuid;
				if ( data.name !== undefined ) item.name = data.name;
				if ( data.preview !== undefined ) item.preview = data.preview;
				items.push( item ); ++index; ++limit; // debugMode && console.log( item );

			}).on("end", function(){

				index = 0; limit = items.length - 1;  // debugMode && console.log( items ); // important!

			}).toArray().then(function(){ 

				if ( items[index] === undefined ) { name_input.value = ""; img_viewer.src = ":0"; return; }
				if ( items[index].name === undefined ) name_input.value = ""; else name_input.value = items[index].name;
				if ( items[index].preview === undefined ) img_viewer.src = ":0"; else img_viewer.src = items[index].preview;

			}).catch(function(err){ console.error(err); });

		});

		callWatchers( collection_droplist, "onchange", "change", collection_droplist.value );

	})(
		materialdB, // db,
		TabUI.MaterialLibrary.tab.querySelector("li#material-library-next"),                   // next_doc,
		TabUI.MaterialLibrary.tab.querySelector("li#material-library-previous"),               // prev_doc,
		TabUI.MaterialLibrary.tab.querySelector("div#material-library-load-button"),           // load_btn,
		TabUI.MaterialLibrary.tab.querySelector("input#material-library-name-input"),          // name_input,
		TabUI.MaterialLibrary.tab.querySelector("img#material-library-image-viewer"),          // img_viewer,
		TabUI.MaterialLibrary.tab.querySelector("select#material-library-collection-droplist") // collection_droplist,
	);








/*
	(function(db){

	//	Call a material from database 
	//	and add to material entities (demo).

		db.collection("terrain").find().skip(3).limit(1)
		.toArray().then(function(docs){ return docs[0]; })
		.then(function(data){

			debugMode && console.log( data );

			var object = new THREE.Mesh( new THREE.SphereGeometry(0.5,64,32) );
			var json = object.toJSON(); json.object.material = data.uuid;

			return db.collection("materials").findOne({uuid:data.uuid})
			.then(function(doc){ if ( !doc ) throw "material not found!";
				json.materials = [doc]; return {json:json, data:data};
			}).catch(function(err){ console.error(err); });

		}).then(function(results){

			var data = results.data; var json = results.json;
			debugMode && console.log( JSON.parse(JSON.stringify(json)) );

			var promises = []; data.textures.forEach( function(uuid){
				promises.push( db.collection("textures").findOne({uuid:uuid})
					.then(function(doc){ 
						if (!doc) throw "texture "+uuid+" not found!"; return doc;
					}).catch(function(err){ console.error(err); })
				);
			});

			return Promise.all(promises).then(function(textures){
				console.log( "textures:", textures );
				json.textures = textures; return {json:json, data:data};
			}).catch(function(err){ console.error(err); });

		}).then(function(results){

			var data = results.data;
			var json = results.json;

			debugMode && console.log( JSON.parse(JSON.stringify(json)) );

			var promises = []; data.images.forEach( function(uuid){
				promises.push( db.collection("images").findOne({uuid:uuid})
					.then(function(doc){
						if (!doc) throw "image "+uuid+" not found!"; return doc;
					}).catch(function(err){ console.error(err); })
				);
			});

			return Promise.all(promises).then(function(images){
				console.log( "images:", images );
				json.images = images; return json;
			}).catch(function(err){ console.error(err); });

		}).then(function(json){

			debugMode && console.log( json );

			var loader = new THREE.ObjectLoader();
			var object = loader.parse( json );
			debugMode && console.log( object );

			return object.material;

		}).then(function(material){

			debugMode && console.log(material);
			material_entities.add( material );

		}).catch(function(err){
			console.error(err);
		})

	})( materialdB );
//	var json = {};
//	json.images = [];
//	json.textures = [];
//	json.materials = [];
//	json.metadata = {
//		version: 4.5, type: "Object",
//		generator: "Object3D.toJSON"
//	}
*/