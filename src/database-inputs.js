//	database-inputs.js

	(function(key_droplist,database_droplist,collection_droplist){

		watch( key_droplist, "onchange", function( prop, event, value ){ 
		//	debugMode && console.log({item:key_droplist,event:event,key:value});
		});

		watch( collection_droplist, "onchange", function( prop, event, value ){ 
		//	debugMode && console.log({item:collection_droplist,event:event,value:value});
		});

		watch( database_droplist, "onchange", function( prop, event, value ){ 
		//	debugMode && console.log({item:database_droplist,event:event,value:value});
		});

		key_droplist.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", this.value );
		});

		collection_droplist.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", this.value );
		});

		database_droplist.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", this.value );
		});

	})( 
		TabUI.Database.tab.querySelector("select#doc-keys-droplist"),  // key_droplist,
		TabUI.Database.tab.querySelector("select#database-droplist"),  // database_droplist,
		TabUI.Database.tab.querySelector("select#collection-droplist") // collection_droplist,
	);

	(function(skip_input,value_input){

		watch( value_input, "onchange", function( prop, event, value ){ 
		//	debugMode && console.log({item:value_input,event:event,value:value});
		});

		value_input.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", this.value );
		});

	//	watch( skip_input, "onchange", function( prop, event, value ){ 
	//		debugMode && console.log({item:skip_input,event:event,skip:value});
	//	});

	//	skip_input.addEventListener( "change", function(){
	//		this.blur(); callWatchers( this, "onchange", "change", this.value );
	//	});

	})( 
		TabUI.Database.tab.querySelector("input#doc-skip-input"),     // skip_input,
		TabUI.Database.tab.querySelector("input#doc-value-input")     // value_input,
	);

//	database-inputs.js

	(function(
		image,next_doc,prev_doc,next_key,prev_key,skip_input,value_input,
		key_droplist,database_droplist,collection_droplist,upload_data
	){

		var _id, _uuid, _doc;
		var max = 0, skip = 0, db = metadB;
		var collection = db.collection(collection_droplist.value);
		var default_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

		function count(collection){
		//	returns promise: count(col).then(function(result){...})
			var k = 0; return collection.find()
				.on("end", function(){ 
					debugMode && console.log("end event!");  // debug!
				}).on("data", function(data){ 
					debugMode && console.log("data event:", ++k);  // debug!
				})
			//	.forEach( function(doc){ ++k; })
				.catch(function(err){console.error(err);})
				.then(function(){ return k; });
		}

		function get_doc(skip){

			collection.find().skip(skip).limit(1).toArray( function(err,docs){ 
				if (err) throw err; if ( !docs.length ) throw "None doc found!";
			}).then(function(result){

			//	remove old key options.
				if (!result.length) throw "None result found!";
				while (key_droplist.options.length) {
					key_droplist.options.remove(0);
					if (!key_droplist.options.length)
						return result[0]; // important!
				}

			}).then(function(doc){

				if ( !doc ) throw "None doc found!";

			//	create new key options.
				Object.keys(doc).forEach(function( key ){
					var option = document.createElement("option");
					option.text = option.value = key;
					key_droplist.appendChild( option );
				}); return doc;

			}).then(function(doc){

				debugMode && console.log( doc );

				[ _doc, _id, _uuid ] = [ doc, doc._id, doc.uuid ];

				callWatchers(key_droplist, "onchange", "change", key_droplist.value); 

			}).catch(function(err){
				debugMode && console.error(err);
			});
		}

	//	Skip mouse inputs.

		(function(){

			var interval;

			window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

			watch( next_doc, "onclick", function( prop, event, value ){
				debugMode && console.log({item:next_doc,event:event,skip:value});
			});

			watch( prev_doc, "onclick", function( prop, event, value ){
				debugMode && console.log({item:prev_doc,event:event,skip:value});
			});

			watch( skip_input, "onchange", function( prop, event, value ){ 
				debugMode && console.log({item:skip_input,event:event,skip:value});
			});

		//	on key change.

			skip_input.addEventListener( "change", function(){
				skip_input.value = skip = THREE.Math.clamp( this.value, 0, max - 1 );
				this.blur(); callWatchers( this, "onchange", "change", skip );
			});

		//	on mouse down.

			next_doc.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout(function increase(){
					skip_input.value = skip = THREE.Math.clamp( ++skip, 0, max - 1 );
					if ( !skip || skip == max - 1 ) return;
					interval = setTimeout(increase, 50);
				}, 500);
			});

			prev_doc.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout(function decrease(){
					skip_input.value = skip = THREE.Math.clamp( --skip, 0, max - 1 );
					if ( !skip || skip == max - 1 ) return;
					interval = setTimeout(decrease, 50);
				}, 500);
			});

		//	on mouse click.

			next_doc.addEventListener( "click", function(){
				clearTimeout( interval ); // important!
				skip_input.value = skip = THREE.Math.clamp( ++skip, 0, max - 1 );
				interval = setTimeout( get_doc, 250, skip );
				callWatchers( this, "onclick", "click", skip ); // important!
			});

			prev_doc.addEventListener( "click", function(){
				clearTimeout( interval ); // important!
				skip_input.value = skip = THREE.Math.clamp( --skip, 0, max - 1 );
				interval = setTimeout( get_doc, 250, skip );
				callWatchers( this, "onclick", "click", skip ); // important!
			});

		})();

		//	next_key.addEventListener( "mousedown", function(){
		//		clearTimeout( interval ); // important!
		//		interval = setTimeout(function increase(){
		//
		//			interval = setTimeout(increase, 50);
		//		}, 500);
		//	});

		//	prev_key.addEventListener( "mousedown", function(){
		//		clearTimeout( interval ); // important!
		//		interval = setTimeout(function decrease(){
		//
		//			interval = setTimeout(decrease, 50);
		//		}, 500);
		//	});


	//	Value mouse inputs.

		(function(){

			var interval;

		//	on mouse click.

			next_key.addEventListener( "click", function(){
				clearTimeout( interval ); // important!

				var key = key_droplist.value; if ( !key ) return; 

			//	images collection.
				if ( collection.name === "images" && key === "url"
				&& Array.isArray(_doc[key]) && _doc[key].length ) {
				//	if ( value_input.value === "" ) return;
					if ( isNaN(value_input.value) ) return;
					var index = Number( value_input.value );
					value_input.value = index = 
					THREE.Math.clamp( ++index, 0, _doc[key].length - 1 );
					interval = setTimeout( function(index){
						image.src = _doc.url[index]; 
					}, 250, index ); return;
				}

			});

			prev_key.addEventListener( "click", function(){
				clearTimeout( interval ); // important!

				var key = key_droplist.value; if ( !key ) return; 

			//	images collection.
				if ( collection.name === "images" && key === "url"
				&& Array.isArray(_doc[key]) && _doc[key].length ) {
				//	if ( value_input.value === "" ) return;
					if ( isNaN(value_input.value) ) return;
					var index = Number( value_input.value );
					value_input.value = index = 
					THREE.Math.clamp( --index, 0, _doc[key].length - 1 );
					interval = setTimeout( function(index){
						image.src = _doc.url[index]; 
					}, 250, index ); return;
				}

			});

		})();

		watch( value_input, "onchange", function( prop, event, value ){ 

			var key = key_droplist.value; if ( !key ) return; 

		//	images collection.
			if ( collection.name === "images" && key === "url"
			&& Array.isArray(_doc[key]) && _doc[key].length ) {
				return (function(value){
					var max = _doc[key].length - 1;
					var index = THREE.Math.clamp( value, 0, max );
					if ( isNaN(index) ) index = 0;
					value_input.value = index = parseInt(index);
					image.src = _doc.url[ index ];
				})(value);
			}

		});

	//	Upload image data.

		(function(){

			var interval;

			function uploadDataURL(data, type, name){

			//  Returns a resolved promise with record data from imgur.com.
			//	debugMode && console.log("uploading:", file.name);
				return new Promise(function( resolve, reject ){

					var formdata = new FormData();
					formdata.append("image", data);
					formdata.append("type",  type);
					formdata.append("name",  name);

					var endpoint = "https://api.imgur.com/3/image";
					var clientID = "06217f601180652";  // sloothes app Client-ID.

					var xhttp = new XMLHttpRequest();
					xhttp.open("POST", endpoint, true);
					xhttp.setRequestHeader("Authorization", "Client-ID " + clientID);
					xhttp.onreadystatechange = function () {
						if (this.readyState === 4) {
							var response = "";
							if (this.status >= 200 && this.status < 300) {
								response = JSON.parse(this.responseText);
								debugMode && console.log(response);
								resolve(response.data); // resolve promise.
							} else {
								var err = JSON.parse(this.responseText).data.error;
								console.error( err.type, err );
								reject( err );
							}
						}
					};

					xhttp.send(formdata);
					xhttp = null;
				});
			}

			watch( upload_data, "onclick", function( prop, event, value ){ 
				debugMode && console.log({item:upload_data,property:prop,event:event,value:value});

				var key = key_droplist.value; if ( !key ) return; 
				var default_src = "https://i.imgur.com/rnZZU0i.png";

				if ( collection.name === "images" && key === "url" ) {

					if ( Array.isArray(_doc[key]) && _doc[key].length ) 

						return (function(key){

							var index = parseInt(value_input.value); if ( isNaN(index) ) return;

							if ( !_doc[key] || !_doc[key][index] ) return;

							var data = _doc[key][index].split(","); 
							var type = data.shift().replace("data:","").replace(";base64","");
							var name = "IMG-" + _doc.uuid + " (" + (index+1) + " of " + (_doc[key].length) + ")";
							data = data.shift(); // important! or data = data.pop(); or data = data.join();
							debugMode && console.log({data:data, type:type, name:name}); // debug!

							var dotkey = key+"."+index;
							uploadDataURL(data, type, name).then(function(data){
								debugMode && console.log( data );

								return collection.update(
									{_id:_doc._id}, 
									{ $set:{ [dotkey]:data.link } }, 
									function(err){ if (err) throw err; }
								).then(function(){
									return collection.findOne({_id:_doc._id})
									.then(function(doc){ return doc; })
								}).catch(function(err){
									console.error(err);
								});

							}).then(function(results){
								debugMode && console.log( results );
							}).catch(function(err){
								console.error(err);
							})

						})(key); 

					else

						return (function(key){

							if ( !_doc[key] ) return;
							var data = _doc[key].split(","); 
							var type = data.shift().replace("data:","").replace(";base64","");
							var name = "IMG-" + _doc.uuid; 
							data = data.shift(); // important! or data = data.pop(); or data = data.join();
							debugMode && console.log({data:data, type:type, name:name}); // debug!

							uploadDataURL(data, type, name).then(function(data){
								debugMode && console.log( data );

								return collection.update(
									{_id:_doc._id}, 
									{ $set:{ [key]:data.link } }, 
									function(err){ if (err) throw err; }
								).then(function(){
									return collection.findOne({_id:_doc._id})
									.then(function(doc){ return doc; })
								}).catch(function(err){
									console.error(err);
								});

							}).then(function(results){
								debugMode && console.log( results );
							}).catch(function(err){
								console.error(err);
							})

						})(key); 
				}

			});

		//	Call watchers.

			upload_data.addEventListener( "click", function(){ 
				clearTimeout( interval );
				interval = setTimeout(function(button){
					callWatchers( button, "onclick", "click", value_input.value );
				}, 250, this); 
			});

		})();


	//	Key droplist.

		watch( key_droplist, "onchange", function( prop, event, key ){ 

			if ( !key ) return; debugMode && console.log({ [key]: _doc[key] });

		//	images collection.

			if ( collection.name === "images" && key === "url" ) {

				if ( Array.isArray(_doc[key]) && _doc[key].length ) {

					var index = 0;
					image.src = _doc.url[index]; 
					value_input.value = index; return;
				}

				image.src = _doc.url; value_input.value = ""; return;

			}

			value_input.value = _doc[ key ]; // JSON.stringify(_doc[key]);

			if ( image.src !== default_src ) image.src = default_src;
		});

	//	Collection droplist.

		watch( collection_droplist, "onchange", function( prop, event, value ){

			max = 0; skip = 0; // reset.

			try { 

				collection = db.collection(value); // debugMode && console.log( "collection:", collection ); 

			} catch(err){

				return callWatchers(collection_droplist, "onchange", "change", collection_droplist.value = collection.name);
			}

			count(collection)
				.then(function(k){ max = k; })
				.then(function(){ get_doc( skip ); })
				.then(function(){ skip_input.value = skip; });

		});

	//	Call collection droplist watchers.
		callWatchers( collection_droplist, "onchange", "change", collection_droplist.value ); // important!

	})( 
		TabUI.Database.tab.querySelector("img#image-url-viewer"),       // image,
		TabUI.Database.tab.querySelector("li#doc-skip-increase"),       // next_doc,
		TabUI.Database.tab.querySelector("li#doc-skip-decrease"),       // prev_doc,
		TabUI.Database.tab.querySelector("li#doc-key-increase"),        // next_key,
		TabUI.Database.tab.querySelector("li#doc-key-decrease"),        // prev_key,
		TabUI.Database.tab.querySelector("input#doc-skip-input"),       // skip_input,
		TabUI.Database.tab.querySelector("input#doc-value-input"),      // value_input,
		TabUI.Database.tab.querySelector("select#doc-keys-droplist"),   // key_droplist,
		TabUI.Database.tab.querySelector("select#database-droplist"),   // database_droplist,
		TabUI.Database.tab.querySelector("select#collection-droplist"), // collection_droplist,
		TabUI.Database.tab.querySelector("div#upload-image-data")       // upload_data,
	);



//	database-buttons.js

//	todo: update-meta-doc-button.js

//	update-meta-value-button.js

	(function( 
		db,next_doc,prev_doc,skip_input,value_input,
		update_value,key_droplist,collection_droplist,
		textures_entities,material_entities,entities 
	){

		var interval, max;
		var key = key_droplist.value;
		var skip = parseInt(skip_input.value); 
		if ( isNaN(skip) ) skip_input.value = skip = 0;
		var collection = db.collection(collection_droplist.value);

	//	collection droplist.
		watch( collection_droplist, "onchange", function( prop, event, value ){ 
			collection = db.collection( value ); 
		});

	//	skip inputs.
		watch(next_doc, "onclick", function(prop, event, value){ skip = value; });
		watch(prev_doc, "onclick", function(prop, event, value){ skip = value; });
		watch( skip_input, "onchange", function( prop, event, value ){ skip = value; });

	//	key droplist.
		watch( key_droplist, "onchange", function( prop, event, value ){ key = value; });

	//	value input.
		watch( value_input, "onchange", function( prop, event, value ){ 
			debugMode && console.log({item:value_input,property:prop,event:event,value:value});
		});


	//	database-update-value-button.js

		watch( update_value, "onclick", function( prop, event ){ 
		//	debugMode && console.log({item:update_value,property:prop,event:event});

			function get_doc(skip){

				return collection.find().skip(skip).limit(1).toArray( function(err,docs){ 
					if (err) throw err; if ( !docs.length ) throw "None doc found!";
				}).then(function(results){ return results[0]; }).then(function(doc){

					return doc; // important!

				}).catch(function(err){
					debugMode && console.error(err);
				});
			}

			get_doc(skip).then(function(doc){
				debugMode && console.log(doc);

				if ( collection.name === "objects" ) return (function(){

					switch ( key ){
					//	string.
						case "name":
							return (function( value ){
								if ( !value ) 
									return value_input.value = doc[key];
								updateValue( doc._id, key, value );
							})( value_input.value );
						break;
					//	number.
						case "layer":
							return (function( value ){
								if ( isNaN(value) ) 
									return value_input.value = doc[key];
								value = THREE.Math.clamp( value, 0, 31);
								updateValue( doc._id, key, value );
							})( parseInt(value_input.value) );
						break;
					//	boolean.
						case "visible":
							return (function( value ){
								if ( value === "1" ) value = true;
								if ( value === "0" ) value = false;
								if ( value.toLowerCase() === "true" ) value = true;
								if ( value.toLowerCase() === "false" ) value = false;
								if ( typeof value !== "boolean" ) 
									return value_input.value = doc[key];
								updateValue( doc._id, key, value );
							})( value_input.value );
						break;
						default:
							value_input.value = doc[key];
						break;
					}

				})();

				if ( collection.name === "geometries" ) return (function(){


				})();

				if ( collection.name === "materials" ) return (function(){



				})();

				if ( collection.name === "textures" ) return (function(){



				})();

				if ( collection.name === "images" ) return (function(){



				})();

				function updateValue( id, key, value ){

					var selector = {_id:id};
					var modifier = {$set: { [key]:value } };

					collection.update( selector, modifier, function(err){ 

						if (err) throw err; 

						collection.findOne(selector).then(function(doc){ 

						//	Fatal Error.
							if ( !doc ) 
								throw "FatalError: document did not found!";

						//	return value.
							return doc[key]; 

						}).then(function(value){

						//	Success.
							value_input.value = value; // update input.
							console.log( "Success:", key, "value updated:", value );

						}).catch(function(err){
							console.error(err);
							value_input.value = doc[ key ];
						});

					}).catch(function(err){
						console.error(err);
						value_input.value = doc[ key ];
						console.log("Failed:", key, "value did not updated!")
					});
				}

			});

		});

	//	Call watchers.

		update_value.addEventListener( "click", function(){ 
			clearTimeout( interval );
			interval = setTimeout(function(button){
				callWatchers( button, "onclick", "click" );
			}, 250, this); 
		});

	})( 
		metadB, // db, 
		TabUI.Database.tab.querySelector("li#doc-skip-increase"),       // next_doc,
		TabUI.Database.tab.querySelector("li#doc-skip-decrease"),       // prev_doc,
		TabUI.Database.tab.querySelector("input#doc-skip-input"),       // skip_input,
		TabUI.Database.tab.querySelector("input#doc-value-input"),      // value_input,
		TabUI.Database.tab.querySelector("div#update-value-button"),    // update_value,
		TabUI.Database.tab.querySelector("select#doc-keys-droplist"),   // key_droplist,
		TabUI.Database.tab.querySelector("select#collection-droplist"), // collection_droplist,
		textures_entities, material_entities, entities
	);


//	load-meta-doc-button.js

	(function( db,load_button,skip_input,collection_droplist,textures_entities,material_entities,entities ){

		var interval;
		var skip = skip_input.value;
		var collection = db.collection(collection_droplist.value);

		watch( collection_droplist, "onchange", function(prop, event, value){ 
			collection = db.collection(value); 
		});

		watch( skip_input, "onchange", function( prop, event, value ){ skip = parseInt(value); });

	//	load from database.

		watch( load_button, "onclick", function( prop, event, value ){ 
			debugMode && console.log({item:load_button,property:prop,event:event,value:value});

			var skip = parseInt(skip_input.value); if ( isNaN(skip) ) return;
			var collection = db.collection(collection_droplist.value); if ( !collection ) return; 

			if ( skip !== undefined && collection.name === "objects" ) {

				return collection.find().skip(skip).limit(1).toArray()
				.then(function(docs){ return docs[0]; }).then(function(doc){

				//	Create json.

					var json = {};
				//	json.shapes = [];
					json.images = [];
					json.textures = [];
					json.materials = [];
					json.geometries = [];
					json.metadata = {
						version: 4.5, type: "Object",
						generator: "Object3D.toJSON"
					}

					json.object = doc; // important!

				//	Collect geometry, material.

					return Promise.all([

						db.collection("geometries")
						.findOne({uuid:doc.geometry})
						.then(function(doc){
							json.geometries.push(doc); 
							return json.geometries; 
						}).catch(function(err){
							console.error(err);
						}),

						db.collection("materials")
						.findOne({uuid:doc.material})
						.then(function(doc){
							json.materials.push(doc); 
							return json.materials; 
						}).catch(function(err){
							console.error(err);
						}),

					]).then(function([geometries, materials]){
						debugMode && console.log(geometries, materials);

					//	Collect textures, images.

						var texture_uuids = [];
						materials.forEach(function(material){
							if (material.map) texture_uuids.push(material.map);
							if (material.aoMap) texture_uuids.push(material.aoMap);
							if (material.envMap) texture_uuids.push(material.envMap);
							if (material.lightMap) texture_uuids.push(material.lightMap);
							if (material.bumpMap) texture_uuids.push(material.bumpMap);
							if (material.alphaMap) texture_uuids.push(material.alphaMap);
							if (material.normalMap) mtexture_uuids.push(material.normalMap);
							if (material.specularMap) texture_uuids.push(material.specularMap);
							if (material.gradiendMap) texture_uuids.push(material.gradiendMap);
							if (material.emissiveMap) texture_uuids.push(material.emissiveMap);
							if (material.metalnessMap) texture_uuids.push(material.metalnessMap);
							if (material.roughnessMap) texture_uuids.push(material.roughnessMap);
							if (material.displacementMap) texture_uuids.push(material.displacementMap);
						}); 

						debugMode && console.log("texture_uuids:", texture_uuids);

						var promises = [];

						texture_uuids.forEach(function(uuid){ 
							promises.push(
								(function(){

									return db.collection("textures")
									.findOne({uuid:uuid})
									.then(function(doc){

										if (!doc) return;
										doc && json.textures.push(doc); 
										return doc; 

									}).then(function(doc){
										if (!doc) return;

										return db.collection("images")
										.findOne({uuid:doc.image})
										.then(function(doc){
											doc && json.images.push(doc); 
										}).catch(function(err){
											console.error(err);
										});

									}).catch(function(err){
										console.error(err);
									});

								})()
							);
						});

						debugMode && console.log("promises:", promises);

						if (!promises.length ) return json;

						return Promise.all(promises)
						.catch(function(err){
							console.error(err);
						}).then(function(){ return json; });

					}).then(function(json){
						debugMode && console.log("json:", json);

					//	Parse json.

						var loader = new THREE.ObjectLoader();
						return loader.parse( json );

					}).then(function(mesh){

					//	Replace uuids.

						mesh.geometry.uuid = THREE.Math.generateUUID();
						mesh.material.uuid = THREE.Math.generateUUID();

						var material = mesh.material;
						if (material.map) mesh.material.map.uuid = THREE.Math.generateUUID();
						if (material.aoMap) mesh.material.aoMap.uuid = THREE.Math.generateUUID();
						if (material.envMap) mesh.material.envMap.uuid = THREE.Math.generateUUID();
						if (material.lightMap) mesh.material.lightMap.uuid = THREE.Math.generateUUID();
						if (material.bumpMap) mesh.material.bumpMap.uuid = THREE.Math.generateUUID();
						if (material.alphaMap) mesh.material.alphaMap.uuid = THREE.Math.generateUUID();
						if (material.normalMap) mesh.material.normalMap.uuid = THREE.Math.generateUUID();
						if (material.specularMap) mesh.material.specularMap.uuid = THREE.Math.generateUUID();
						if (material.gradiendMap) mesh.material.gradiendMap.uuid = THREE.Math.generateUUID();
						if (material.emissiveMap) mesh.material.emissiveMap.uuid = THREE.Math.generateUUID();
						if (material.metalnessMap) mesh.material.metalnessMap.uuid = THREE.Math.generateUUID();
						if (material.roughnessMap) mesh.material.roughnessMap.uuid = THREE.Math.generateUUID();
						if (material.displacementMap) mesh.material.displacementMap.uuid = THREE.Math.generateUUID();

						return mesh;

					}).then(function(mesh){
						debugMode && console.log("mesh:", mesh);

					//	Add to scene.
						scene.add(mesh);

					//	Add to entities managers.
						entities.add(mesh);
						material_entities.add(mesh.material);

						var material = mesh.material;
						if (material.map) textures_entities.add( mesh.material.map );
						if (material.aoMap) textures_entities.add( mesh.material.aoMap );
						if (material.envMap) textures_entities.add( mesh.material.envMap );
						if (material.lightMap) textures_entities.add( mesh.material.lightMap );
						if (material.bumpMap) textures_entities.add( mesh.material.bumpMap );
						if (material.alphaMap) textures_entities.add( mesh.material.alphaMap );
						if (material.normalMap) textures_entities.add( mesh.material.normalMap );
						if (material.specularMap) textures_entities.add( mesh.material.specularMap );
						if (material.gradiendMap) textures_entities.add( mesh.material.gradiendMap );
						if (material.emissiveMap) textures_entities.add( mesh.material.emissiveMap );
						if (material.metalnessMap) textures_entities.add( mesh.material.metalnessMap );
						if (material.roughnessMap) textures_entities.add( mesh.material.roughnessMap );
						if (material.displacementMap) textures_entities.add( mesh.material.displacementMap );


					}).catch(function(err){
						console.error(err);
					});

				}).catch(function(err){
					console.error(err);
				});
			}

		});

	//	Call watchers.

		load_button.addEventListener( "click", function(){ 
			clearTimeout( interval );
			interval = setTimeout(function(button){
				callWatchers( button, "onclick", "click" );
			}, 250, this); 
		});

	})( 
		metadB, // db, 
		TabUI.Database.tab.querySelector("div#doc-load-button"),         // load_button,
		TabUI.Database.tab.querySelector("input#doc-skip-input"),        // skip_input,
		TabUI.Database.tab.querySelector("select#collection-droplist"),  // collection_droplist,
		textures_entities, material_entities, entities
	);







/*
//	collection-droplist.js

	(function(skip_input,key_droplist,database_droplist,collection_droplist){

		var db = metadB; 
		var collection = db.collection(collection_droplist.value);

		watch( collection_droplist, "onchange", function( prop, event, value ){ 

			if ( !db ) return; if ( !value ) return;

			try { 

				collection = db.collection(value); debugMode && console.log( "collection:", collection );

			} catch(err){

				callWatchers(collection_droplist, "onchange", "change", collection_droplist.value = collection.name);
			}

			collection.findOne({},{},function(err, doc){

				if (err) throw err; // console.log( "doc:", doc );
			//	if ( !doc ) throw "None doc found in collection!";

			}).then(function(doc){

			//	remove old key options.

				if ( !doc ) {

					while (key_droplist.options.length) {
						key_droplist.options.remove(0);
						if (!key_droplist.options.length)
							throw "None doc found in collection!";
					}

				} else {

					while (key_droplist.options.length) {
						key_droplist.options.remove(0);
						if (!key_droplist.options.length)
							return doc; // important!
					}

				}

			}).then(function(doc){
				debugMode && console.log( doc );
				if ( !doc ) throw "None doc found in collection!";

			//	create new key options.
			//	var keys = Object.keys(doc).join();
				Object.keys(doc).forEach(function( key ){
					var option = document.createElement("option");
					option.text = option.value = key;
					key_droplist.appendChild( option );
				});

			//	return doc;

			}).catch(function(err){
				skip_input.value = ""; debugMode && console.error(err);
			});

		});

	})( 
	//	TabUI.Database.tab.querySelector("input#doc-skip-input"),      // skip_input,
	//	TabUI.Database.tab.querySelector("select#doc-keys-droplist"),  // key_droplist,
		TabUI.Database.tab.querySelector("select#database-droplist"),  // database_droplist,
		TabUI.Database.tab.querySelector("select#collection-droplist") // collection_droplist,
	);
*/

/*
	collection.find().skip(skip).limit(1).toArray( function(err,docs){ 
		if (err) throw err; if ( !docs.length ) throw "None doc found!";
	}).then(function(result){ 
		if ( result.length ) return result[0]; else throw "No results!";
	}).then(function(doc){

	//	var index = 0;
	//	if ( typeof doc[key] === "object" )
	//		return Object.values(doc[key])[index];

		return doc[ key ];

	}).then(function(value){
		debugMode && console.log(value);

		value_input.value = value; // JSON.stringify(value);

	}).catch(function(err){
		debugMode && console.error(err);
	});
*/

/*
//	database-skip-inputs.js

	(function( db,next_doc,prev_doc,skip_input,key_droplist,collection_droplist ){

		var interval;
		var max = 0, skip = 0;
		var collection = db.collection(collection_droplist.value);

		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function count(collection){
		//	returns promise: count(col).then(function(result){...})
			var k = 0; 
			return collection.find()
				.forEach( function(doc){ ++k; })
				.catch(function(err){console.error(err);})
				.then(function(){ return k; });
		}

		function get_doc(skip){

			collection.find().skip(skip).limit(1).toArray( function(err,docs){ 
				if (err) throw err; if ( !docs.length ) throw "None doc found!";
			}).then(function(results){ return results[0]; }).then(function(doc){

				debugMode && console.log(doc);
				return doc; // important!

			}).catch(function(err){
				debugMode && console.error(err);
			});
		}

	//	Update collection.
		watch( collection_droplist, "onchange", function( prop, event, value ){
			collection = db.collection(value); // debugMode && console.log( "collection:", collection ); 
		});

	//	Get skip.
		watch( skip_input, "onchange", function(prop, event, value){

			max = 0; skip = 0; // reset.

		//	skip = parseInt(value); if ( isNaN(skip) ) skip_input.value = skip = 0;

			count(collection).then(function(k){ max = k; }).then(function(){ 

				value = THREE.Math.clamp(value, 0, max - 1);
				if ( isNaN(value) ) value = 0; return( value );

			}).then(function(value){ 

				skip_input.value = skip = value; 

			//	get doc.
				return collection.find().skip(skip)
				.limit(1).toArray( function(err,docs){ 
					if (err) throw err;
				}).then(function(docs){ 
					return docs[0]; 
				});

			}).then(function(doc){

				if ( !doc ) throw "none document found!"

			//	remove old key options.
				while (key_droplist.options.length) {
					key_droplist.options.remove(0);
					if (!key_droplist.options.length) return doc;
				}

			}).then(function(doc){

				debugMode && console.log(doc);

			//	create new key options.
				Object.keys(doc).forEach(function( key ){
					var option = document.createElement("option");
					option.text = option.value = key;
					key_droplist.appendChild( option );
				});

				callWatchers(key_droplist, "onchange", "change", key_droplist.value); 

			}).catch(function(err){
				console.error(err);
			});

		});

	//	on mouse down.

		next_doc.addEventListener( "mousedown", function(){
			clearTimeout( interval ); // important!
			interval = setTimeout(function increase(){
				skip_input.value = skip = THREE.Math.clamp( ++skip, 0, max - 1 );
				if ( !skip || skip == max - 1 ) return;
				interval = setTimeout(increase, 50);
			}, 500);
		});

		prev_doc.addEventListener( "mousedown", function(){
			clearTimeout( interval ); // important!
			interval = setTimeout(function decrease(){
				skip_input.value = skip = THREE.Math.clamp( --skip, 0, max - 1 );
				if ( !skip || skip == max - 1 ) return;
				interval = setTimeout(decrease, 50);
			}, 500);
		});

	//	on mouse click.

		next_doc.addEventListener( "click", function(){
			clearTimeout( interval ); // important!
			skip_input.value = skip = THREE.Math.clamp( ++skip, 0, max - 1 );
			interval = setTimeout( get_doc, 250, skip );
		});

		prev_doc.addEventListener( "click", function(){
			clearTimeout( interval ); // important!
			skip_input.value = skip = THREE.Math.clamp( --skip, 0, max - 1 );
			interval = setTimeout( get_doc, 250, skip );
		});

	})( 
		metadB, // db,
		TabUI.Database.tab.querySelector("li#doc-skip-increase"),      // next_doc,
		TabUI.Database.tab.querySelector("li#doc-skip-decrease"),      // prev_doc,
		TabUI.Database.tab.querySelector("input#doc-skip-input"),      // skip_input,
		TabUI.Database.tab.querySelector("select#doc-keys-droplist"),  // key_droplist,
		TabUI.Database.tab.querySelector("select#collection-droplist") // collection_droplist,
	);
*/

/*
	function count(collection){
	//	returns promise: count(col).then(function(result){...})
		var k = 0; 
		return collection.find()
			.forEach( function(doc){ ++k; })
			.catch(function(err){console.error(err);})
			.then(function(){ return k; });
	}

	watch( skip_input, "onchange", function( prop, event, value ){ 
	//	skip = parseInt(value); if ( isNaN(skip) ) skip_input.value = skip = 0;

		max = 0; skip = 0; // reset.

		count(collection).then(function(k){ max = k; }).then(function(){ 

			value = THREE.Math.clamp(value, 0, max - 1);
			if ( isNaN(value) ) value = 0; return value;

		}).then(function(value){ 

			skip_input.value = skip = value; 

		//	get doc.
			return collection.find().skip(skip)
			.limit(1).toArray( function(err,docs){ 
				if (err) throw err;
			}).then(function(docs){ 
				return docs[0]; 
			});

		}).then(function(doc){

			if ( !doc ) throw "none document found!"

		//	remove old key options.
			while (key_droplist.options.length) {
				key_droplist.options.remove(0);
				if (!key_droplist.options.length) return doc;
			}

		}).then(function(doc){

			debugMode && console.log(doc);

		//	create new key options.
			Object.keys(doc).forEach(function( key ){
				var option = document.createElement("option");
				option.text = option.value = key;
				key_droplist.appendChild( option );
			});

			callWatchers(key_droplist, "onchange", "change", key_droplist.value); 

		}).catch(function(err){
			console.error(err);
		});

	});
*/
