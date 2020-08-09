
//	create-new-material-buttons.js

	(function(viewer,button,input,map_droplist){

		var interval, k=0;

	//	Creates new material, and replaces material viewer material.
		watch( button, "onclick", function(prop, event, material){ map_droplist.value = "";
			viewer.dispose(); viewer.mesh.material = material; input.value = material.name;
			debugMode && console.log({item:button,event:event,material:material}); // debug.
		});

		button.addEventListener( "click", function(){
			clearTimeout(interval); interval = setTimeout(function(button){
				callWatchers(button, "onclick", "click", new THREE.MeshStandardMaterial({ 
					name:"untitled material " + (++k), normalScale:new THREE.Vector2(1,1),
					bumpScale:0.01, displacementBias:0, displacementScale:0 })
				);
			}, 250, this);
		})

	})( materialViewer, 
		TabUI.NewMaterial.tab.querySelector("div#create-new-material-button"), // button,
		TabUI.NewMaterial.tab.querySelector("input#create-new-material-name-input"), // input,
		TabUI.NewMaterial.tab.querySelector("select#create-new-material-map-droplist") // map_droplist,
	);

//	create-matcap-remove-button.js

	(function(viewer,icon,remove_button,map_droplist){

		var interval;

		watch( remove_button, "onclick", function(prop, event, value){ 

			if ( !value ) return; if ( !map_droplist.value ) return;
			if ( viewer.mesh.material[value] === undefined ) return;

			var material = viewer.mesh.material; 
			var texture  = viewer.mesh.material[value];
			texture && texture.image && texture.dispose();

			switch (value){
				case "envMap":
					viewer.mesh.material.roughness = 0.5; // important?
					viewer.mesh.material.metalness = 0.5; // important?
				break;
				case "emissiveMap":
					viewer.mesh.material.emissive.setHex(0x000000); 
				break;
			}

			material[value] = null; viewer.render(); // important!
			icon.getContext("2d").clearRect(0,0,icon.width,icon.height); 
		//	callWatchers( viewer.mesh, "material", "render", material );

		});

		remove_button.addEventListener( "click", function(){
			clearTimeout(interval); interval = setTimeout(function(button){
				callWatchers( button, "onclick", "click", map_droplist.value );
			}, 250, this);
		});

	})( materialViewer, 
		TabUI.NewMaterial.tab.querySelector("canvas#create-new-material-icon"),        // icon,
		TabUI.NewMaterial.tab.querySelector("div#create-new-material-remove-button"),  // remove_button,
		TabUI.NewMaterial.tab.querySelector("select#create-new-material-map-droplist") // map_droplist,
	);


//	create-new-material-name-input.js

	(function(viewer,name_input){

		watch( name_input, "onchange", function(prop, event, value){ viewer.mesh.material.name = value;
			debugMode && console.log({item:name_input,event:event,value:value}); // debug.
		});

		name_input.addEventListener( "change", function(){
			callWatchers( this, "onchange", "change", this.value );
		});

	})( materialViewer, TabUI.NewMaterial.tab.querySelector("input#create-new-material-name-input") ); // name_input,


//	create-new-material-image-input.js

	(function(viewer,icon,image_button,image_input,map_droplist){

		watch( image_button, "onclick", function(prop, event, value){ 
			image_input.value = ""; image_input.click(); 
		});

		watch( map_droplist, "onchange", function(prop, event, value){ 
			image_input.value = ""; image_input.click(); 
			icon.getContext("2d").clearRect(0,0,icon.width,icon.height); // clear icon.
		});

		image_input.addEventListener( "change", function(){

			if ( !map_droplist.value ) return;
			if ( !image_input.files.length ) return;

			var file = image_input.files[0];

			var img = new Image();
			img.addEventListener("load", function(){

				var key = map_droplist.value; if ( !key ) return;

			//	draw icon.
				icon.getContext( "2d" ).drawImage( img, 0, 0, icon.width, icon.height );

			//	create texture.
				var texture = new THREE.Texture(img); // or canvas.
				texture.name = file.name.replace(".jpg","").replace(".png","").replace(/_/g," ");
				texture.sourceFile = file.name; viewer.mesh.material[key] = texture; 
				viewer.mesh.material[key].needsUpdate = viewer.mesh.material.needsUpdate = true;

			//	render material. // important!
				callWatchers( viewer.mesh, "material", "set", viewer.mesh.material );
			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name;
				img.src = reader.result;
			});

			reader.readAsDataURL(file);
		});

		image_button.addEventListener( "click", function(){ callWatchers( image_button, "onclick", "click"); });

	})( materialViewer, 
		TabUI.NewMaterial.tab.querySelector("canvas#create-new-material-icon"), // icon,
		TabUI.NewMaterial.tab.querySelector("div#create-new-material-img-button"), // image_button,
		TabUI.NewMaterial.tab.querySelector("input#create-new-material-file-input"), // image_input,
		TabUI.NewMaterial.tab.querySelector("select#create-new-material-map-droplist") // map_droplist,
	);


//	create-new-material-save-button.js

	(function(db,viewer,validator,button_new,thumb_icon,save_button,name_input,map_droplist,col_droplist){

		var interval;

		function onSaveButtonClick(){
			clearTimeout( interval ); 

			if ( !name_input.value ) {
				var msg = "Please type a name for this material and try again.";
				return viewer.mesh.material.name = name_input.value = prompt(msg);
			}

			interval = setTimeout( function(){ callWatchers( save_button, "onclick", "click", viewer.mesh.material ); }, 250);
		}

	//	Parses material viewer mesh material to watcher.
		save_button.addEventListener( "click", onSaveButtonClick );

		watch(save_button, "onclick", function(prop, event, material){
			debugMode && console.log({item:save_button, event:event, material:material});
			save_button.removeEventListener( "click", onSaveButtonClick ); // important!

			var meta = {geometries:{},materials:{},textures:{},images:{}};
			var json = viewer.mesh.toJSON(meta); // debugMode && console.log(meta);

		//	makes power of two and convert image/png; 
		//	dataURL to data:image/jpeg;base64 dataURL.

			var promises = [];

			for ( var uuid in meta.images ) {
				promises.push( 
					(function(image){
						return new Promise(function(resolve,reject){
							var img = new Image(); 
							img.addEventListener("load", function(){
								var canvas = document.createElement("canvas");
								canvas.width = THREE.Math.floorPowerOfTwo( img.width );
								canvas.height = THREE.Math.floorPowerOfTwo( img.height );
								canvas.getContext("2d").drawImage( img, 0, 0, canvas.width, canvas.height );
								image.url = canvas.toDataURL("image/jpeg"); resolve( image );
							}); img.src = image.url; // important!
						}).catch(function(err){ 
							console.error(err);
						}).then(function(){ return image; });
					})( meta.images[uuid] )
				);
			} 

			var entry = {}; 
			entry.name = name_input.value;               // string.
			entry.collection = col_droplist.value;       // string.
			entry.images = Object.keys(meta.images);     // uuid array.
			entry.textures = Object.keys(meta.textures); // uuid array.
			entry.preview = viewer.canvas.toDataURL();   // dataURL.
			entry.uuid = Object.keys(meta.materials).join(); // uuid.
			entry.links = []; entry.imgIds = [];

			debugMode && console.log("meta:", meta);     // debug!
			debugMode && console.log("entry:", entry);   // debug!

			var k = promises.length; // counter.

			Promise.all(promises).then(function(images){
				debugMode && console.log("images:", images); // debug!

			//	Save meta.images.
				if ( images.length ) {
					var collection = db.collection("images");
					return collection.insert( images, function(err){ 
						if (err) throw err; 
					}).then(function(){ 
						console.log("images saved!"); 
					}).then(function(){ 
						return images; 
					}).catch(function(err){ 
						console.error(err); 
					});
				}

			}).then(function( images ){

			//	Save meta.textures.
				if ( Object.keys(meta.textures).length ) {
					var collection = db.collection("textures");
					collection.insert( Object.values(meta.textures), 
						function(err){ if (err) throw err; })
					.then(function(){ console.log("textures saved!"); 
					}).catch(function(err){ console.error(err); });
				}

				return images;

			}).then(function( images ){

			//	Save meta.materials.
				if ( Object.keys(meta.materials).length ) {
					var collection = db.collection("materials");
					collection.insert( Object.values(meta.materials), 
						function(err){ if (err) throw err; })
					.then(function(){ console.log("material saved!"); 
					}).catch(function(err){ console.error(err); });
				}

				return images;

			}).then(function( images ){

			//	Save material entry.
				var collection = db.collection( entry.collection );
				collection.insert(entry, function(err){ 
					if (err) throw err; 
				}).then(function(){

				//	Success!
					callWatchers(button_new, "onclick", "click", 
						new THREE.MeshStandardMaterial({ bumpScale:0.01,
							normalScale:new THREE.Vector2(1,1),
							displacementBias:0, displacementScale:0, 
						})
					); 

					console.log( "material saved successfully!" ); name_input.value = ""; map_droplist.value = "";
					thumb_icon.getContext("2d").clearRect(0,0,thumb_icon.width,thumb_icon.height); // clear icon.

				}).catch(function(err){ 
					console.error(err); 
				});

				return images;

			}).then(function( images ){

				if ( images && images.length ) images.forEach(function(image){

					if ( !validator.isDataURI(image.url) ) {
						throw "image url is not DataURL:"+image.url;
					}

				//	important: data must NOT contain the prefix "data:image/jpeg;base64,"
					var name = "IMAGE:"+image.uuid; var data = image.url.split(","); 
					var type = data.shift().replace("data:","").replace(";base64","");
					data = data.shift(); // important! or .pop(); or .join();
				//	debugMode && console.log({data:data, type:type, name:name}); // debug!

					//	Upload dataURL to imgur.

					uploadDataURL(data, type, name).then(function(data){

						debugMode && console.log( data );
						if ( data.error ) throw data.error;

					//	Save meta data.
						db.collection("imgur")
						.insert( data, function(err){ 
							if (err) throw err; 
						}).catch(function(err){ 
							console.error(err); 
						});

						return data;

					}).then(function(data){

					//	Replace dataURL with link.
						db.collection("images")
						.update( {uuid:image.uuid}, // selector, 
							{$set:{url:data.link}}, // modifier, 
							function(err){ if (err) throw err; 
						}).catch(function(err){ 
							console.error(err); 
						});

						return data;

					}).then(function(data){

					//	Update material entry.
						db.collection(entry.collection)
						.update({uuid:entry.uuid}, {$push:{
							links:data.link,imgIds:data.id}},
							function(err){ if (err) throw err; 
						}).catch(function(err){ 
							console.error(err); 
						});

						return data.link;

					}).then(function(url){

					//	Cache texture image.
						return caches.open("textures").then(function(cache){
							return cache.add(url).then(function(){ return url; });
						}).then(function(url){ 
							console.log( --k+":", url, "texture completed!");
						}).catch(function(err){ console.error(err); });

					}).catch(function(err){
						console.error(err); 
					});

				}); // end forEach.

			}).then(function(){

			//	Upload entry.preview (.png).
/*
				if ( !validator.isDataURI(entry.preview) ) {
					throw "preview is not dataURL:"+entry.preview;
				}

			//	important: data must NOT contain the prefix "data:image/jpeg;base64,"
				var name = entry.name+"-preview.png"; var data = entry.preview.split(","); 
				var type = data.shift().replace("data:","").replace(";base64","");
				data = data.shift(); // or .pop(); or .join(); important!
			//	debugMode && console.log({data:data, type:type, name:name}); // debug!

				//	Upload dataURL to imgur.

				uploadDataURL(data, type, name).then(function(data){

					debugMode && console.log( data );
					if ( data.error ) throw data.error;

				//	Save meta data.
					db.collection("imgur")
					.insert( data, function(err){ 
						if (err) throw err; 
					}).catch(function(err){ 
						console.error(err); 
					});

					return data;

				}).then(function(data){

				//	Replace dataURL with link.
					db.collection(entry.collection)
					.update( {uuid:entry.uuid},     // selector, 
						{$set:{preview:data.link}}, // modifier, 
						function(err){ if (err) throw err; 
					}).catch(function(err){ 
						console.error(err); 
					});

					return data.link;

				}).then(function(url){

				//	Cache material preview.
					caches.open("previews").then(function(cache){
						return cache.add(url).then(function(){ return url; });
					}).then(function(url){ 
						console.log( url, "preview completed!");
					}).catch(function(err){ console.error(err); });

				}).catch(function(err){
					console.error(err); 
				});
*/
			}).catch(function(err){
				console.error(err); console.log("material", entry.name, "failed to save!");
			}).then(function(){ 
				save_button.addEventListener( "click", onSaveButtonClick ); // important!
			});

		});

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
						//	debugMode && console.log(response);
							resolve(response.data); // resolve promise.
						} else {
							var err = JSON.parse(this.responseText).data.error;
							console.error( err.type, err ); reject( err );
						}
					}
				};

				xhttp.send(formdata);
				xhttp = null;
			});
		}

	})( materialdB, materialViewer, validator, // db, viewer, validator,

		TabUI.NewMaterial.tab.querySelector("div#create-new-material-button"),             // button_new,
		TabUI.NewMaterial.tab.querySelector("canvas#create-new-material-icon"),            // thumb_icon,
		TabUI.NewMaterial.tab.querySelector("div#create-new-material-save-button"),        // save_button,
		TabUI.NewMaterial.tab.querySelector("input#create-new-material-name-input"),       // name_input,
		TabUI.NewMaterial.tab.querySelector("select#create-new-material-map-droplist"),    // map_droplist,
		TabUI.NewMaterial.tab.querySelector("select#create-material-collection-droplist")  // col_droplist,
	);


/*
	function saveto(collection,data,keyword){

		var result;

		collection.find({uuid:data.uuid}).forEach(

			function(doc){

				result = doc.uuid;

				collection.update({_id:doc._id}, {$set:data}, function(err){
					if (err) throw err; console.log(keyword, doc.uuid, "updated!" )
				}).catch(function(err){ console.error(err); });

			},

			function(err){

				if (err) throw err;  

				if (!result) return collection.insert(data, function(err){ 
					if (err) throw err; console.log(keyword, data.uuid, "saved!" )
				}).catch(function(err){ console.error(err); });
			}

		).catch(function(err){ console.error(err); });

	}
*/
