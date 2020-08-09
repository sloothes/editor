//	create-matcap-buttons.js

	(function(viewer,button,input,map_droplist){

		var interval, k = 0;

	//	Creates new material, and replaces matcap viewer material.
		watch( button, "onclick", function(prop, event, material){ 
			viewer.dispose(); map_droplist.value = ""; 
			material.name = "untitled matcap " + (++k); 
			viewer.mesh.material = material; input.value = material.name;
			debugMode && console.log({item:button,event:event,material:material}); // debug.
		});

		button.addEventListener( "click", function(){
			clearTimeout(interval); interval = setTimeout(function(button){
				callWatchers( button, "onclick", "click", new THREE.MeshStandardMaterial({ 
					bumpScale:0, displacementBias:0, displacementScale:0,roughness:0.5, metalness:0.5, })
				);
			}, 250, this);
		});

	})( matcapViewer, 
		TabUI.NewMatcap.tab.querySelector("div#create-matcap-button"), // button,
		TabUI.NewMatcap.tab.querySelector("input#create-matcap-name-input"), // input,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-map-droplist") // map_droplist,
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

	})( matcapViewer, 
		TabUI.NewMatcap.tab.querySelector("canvas#create-matcap-icon"),        // icon,
		TabUI.NewMatcap.tab.querySelector("div#create-matcap-remove-button"),  // remove_button,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-map-droplist") // map_droplist,
	);

//	create-matcap-name-input.js

	(function(viewer,name_input){

		watch( name_input, "onchange", function(prop, event, value){ viewer.mesh.material.name = value; });
		name_input.addEventListener( "change", function(){ callWatchers( this, "onchange", "change", this.value ); });

	})( matcapViewer, TabUI.NewMatcap.tab.querySelector("input#create-matcap-name-input") ); // name_input,

//	create-matcap-icon-draw.js

	(function(viewer,icon,map_droplist){

		watch( map_droplist, "onchange", function(prop, event, value){
		//	clear icon.
			icon.getContext("2d").clearRect(0,0,icon.width,icon.height); if ( !value ) return; 
			if ( !(viewer.mesh.material[value] && viewer.mesh.material[value].image) ) return;
		//	draw icon.
			icon.getContext( "2d" ).drawImage( viewer.mesh.material[value].image, 0, 0, icon.width, icon.height );
		});

	})( matcapViewer, 
		TabUI.NewMatcap.tab.querySelector("canvas#create-matcap-icon"), // icon,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-map-droplist") // map_droplist,
	);

//	create-matcap-image-input.js

	(function(viewer,icon,image_button,image_input,map_droplist){

		watch( image_button, "onclick", function(prop, event){ 
		//	icon.getContext("2d").clearRect(0,0,icon.width,icon.height); // clear icon.
			image_input.value = ""; image_input.click(); 
		});

		watch( map_droplist, "onchange", function(prop, event, value){ 
		//	icon.getContext("2d").clearRect(0,0,icon.width,icon.height); // clear icon.
			image_input.value = ""; image_input.click(); 
		});

		watch(image_input, "onchange", function(prop, event, key){
			debugMode && console.log({item:image_input,event:event,value:key});

		//	if ( !map_droplist.value ) return;
			if ( !key ) return; if ( !image_input.files.length ) return; 

			var file = image_input.files[0];

			var img = new Image();
			img.addEventListener("load", function(){

			//	var key = map_droplist.value; if ( !key ) return;

			//	draw icon.
				icon.getContext( "2d" ).drawImage( img, 0, 0, icon.width, icon.height );

			//	create texture.
				var texture = new THREE.Texture( img );

				switch (key){
					case "envMap":
						texture.mapping = THREE.SphericalReflectionMapping;
						viewer.mesh.material.roughness = 0; // important?
						viewer.mesh.material.metalness = 1; // important?
					break;
					case "emissiveMap":
					//	texture = new THREE.Texture( img ); 
					//	viewer.mesh.material.color.setHex(0x000000); 
						viewer.mesh.material.emissive.setHex(0xffffff); 
					break;
				}

				texture.name = file.name.replace(".jpg","").replace(".png","").replace(/_/g," ");
				texture.sourceFile = file.name; viewer.mesh.material[key] = texture; 
				viewer.mesh.material[key].needsUpdate = viewer.mesh.material.needsUpdate = true;

			//	render material. // important!
				callWatchers( viewer.mesh, "material", "render", viewer.mesh.material );
			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name; img.src = reader.result;
			});

			reader.readAsDataURL(file);
		});

		image_button.addEventListener( "click", function(){ 
			if ( !map_droplist.value ) return image_input.value = "";
			callWatchers( this, "onclick", "click" ); 
		});

		image_input.addEventListener( "change", function(){
			callWatchers( this, "onchange", "change", map_droplist.value );
		});

	})( matcapViewer, 
		TabUI.NewMatcap.tab.querySelector("canvas#create-matcap-icon"), // icon,
		TabUI.NewMatcap.tab.querySelector("div#create-matcap-img-button"), // image_button,
		TabUI.NewMatcap.tab.querySelector("input#create-matcap-file-input"), // image_input,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-map-droplist") // map_droplist,
	);



//	create-matcap-save-as-matcap.js

	(function(db,viewer,validator,button_new,thumb_icon,save_button,name_input,map_droplist,collection_droplist){

		var interval;

		function onSaveButtonClick(){
			clearTimeout( interval ); 

			if ( !name_input.value ) {
				var msg = "Please type a name for this matcap and try again.";
				return viewer.mesh.material.name = name_input.value = prompt(msg);
			}

			var mapping = THREE.SphericalReflectionMapping; // 305
			var texture = new THREE.Texture( viewer.canvas, mapping );
			debugMode && console.log( "envMap:", texture);

			var matcap = new THREE.MeshStandardMaterial({
				name: name_input.value, 
				envMap: texture, roughness:0, metalness:1, 
			}); debugMode && console.log( "matcap:", matcap);

			interval = setTimeout( function(){ 
				callWatchers( save_button, "onclick", "click", matcap.toJSON() ); 
			}, 250);
		}

	//	Parses material viewer mesh material to watcher.
		save_button.addEventListener( "click", onSaveButtonClick );

		watch(save_button, "onclick", function(prop, event, json){
		//	debugMode && console.log({item:save_button, event:event, matcap:matcap});
			save_button.removeEventListener( "click", onSaveButtonClick ); // important!

			debugMode && console.log( "json:", json);

			var entry = {}; 
			entry.name = name_input.value;                   // string.
			entry.collection = "matcap";                     // string.
			entry.preview = viewer.canvas.toDataURL();       // dataURL.
			entry.uuid = json.uuid;                          // uuid.
			entry.material = json;                           // json (material).

			return debugMode && console.log("entry:", entry); // breakpoint!

		//	Save matcap entry.
			var collection = db.collection( "matcap" );
			collection.insert(entry, function(err){ if (err) throw err; }).then(function(){

			//	Success!
				console.log( "matcap saved successfully!" ); name_input.value = ""; map_droplist.value = "";
				thumb_icon.getContext("2d").clearRect(0,0,thumb_icon.width,thumb_icon.height); // clear icon.

				callWatchers(button_new, "onclick", "click", new THREE.MeshStandardMaterial({ 
					bumpScale:0, displacementBias:0, displacementScale:0,roughness:0.5, metalness:0.5, })
				);

			}).catch(function(err){
				console.error(err); console.log("matcap", entry.name, "failed to save!");
			}).then(function(){ 
				save_button.addEventListener( "click", onSaveButtonClick ); // important!
			});

		});

	})( materialdB, matcapViewer, validator, // db, viewer, validator,
		TabUI.NewMatcap.tab.querySelector("div#create-matcap-button"),                 // button_new,
		TabUI.NewMatcap.tab.querySelector("canvas#create-matcap-icon"),                // thumb_icon,
		TabUI.NewMatcap.tab.querySelector("div#create-matcap-save-button"),            // save_button,
		TabUI.NewMatcap.tab.querySelector("input#create-matcap-name-input"),           // name_input,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-map-droplist"),        // map_droplist,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-collection-droplist")  // collection_droplist,
	);

	//	var meta = {geometries:{},materials:{},textures:{},images:{}};
	//	var mapping = THREE.SphericalReflectionMapping; // 305
	//	var texture = new THREE.Texture( viewer.canvas, mapping );
	//	debugMode && console.log( "envMap:", texture);
	//	var matcap = new THREE.MeshStandardMaterial({
	//		name: name_input.value, 
	//		envMap: texture, roughness:0, metalness:1, 
	//	}); debugMode && console.log( "matcap:", matcap);
	//	var mesh = new THREE.Mesh(new THREE.Geometry(), matcap);
	//	var json = matcap.toJSON(); // debugMode && console.log(meta);

//	create-matcap-save-as-material.js

	(function(db,viewer,validator,button_new,thumb_icon,name_input,map_droplist,save_button,collection_droplist){

		var interval;

		function onSaveButtonClick(){
			clearTimeout( interval ); 

			if ( !name_input.value ) {
				var msg = "Please type a name for this matcap and try again.";
				return viewer.mesh.material.name = name_input.value = prompt(msg);
			}

			interval = setTimeout( 
				function(){ callWatchers( save_button, "onclick", "click", viewer.mesh.material.toJSON() ); 
			}, 250);
		}

	//	Parses material viewer mesh material to watcher.
		save_button.addEventListener( "click", onSaveButtonClick );

		watch(save_button, "onclick", function(prop, event, json){
		//	debugMode && console.log({item:save_button, event:event, material:material});
			save_button.removeEventListener( "click", onSaveButtonClick ); // important!

		//	var meta = {geometries:{},materials:{},textures:{},images:{}};
		//	var mapping = THREE.SphericalReflectionMapping; // 305
		//	var texture = new THREE.Texture( viewer.canvas, mapping );
		//	debugMode && console.log( "envMap:", texture);
		//	var matcap = new THREE.MeshStandardMaterial({
		//		name: name_input.value, 
		//		envMap: texture, roughness:0, metalness:1, 
		//	}); debugMode && console.log( "matcap:", matcap);
		//	var mesh = new THREE.Mesh(new THREE.Geometry(), matcap);
		//	var json = mesh.toJSON(meta); // debugMode && console.log(meta);

		//	var entry = {}; 
		//	entry.name = name_input.value;                   // string.
		//	entry.collection = "environment";                // string.
		//	entry.images = Object.keys(meta.images);         // uuid array.
		//	entry.textures = Object.keys(meta.textures);     // uuid array.
		//	entry.preview = viewer.canvas.toDataURL();       // dataURL.
		//	entry.uuid = Object.keys(meta.materials).join(); // uuid.
		//	entry.links = []; entry.imgIds = [];             // urls array.
		//	debugMode && console.log("meta:", meta);         // debug!

			debugMode && console.log( "json:", json);

			var entry = {}; 
			entry.name = name_input.value;                   // string.
			entry.collection = collection_droplist.value;    // string.
			entry.preview = viewer.canvas.toDataURL();       // dataURL.
			entry.uuid = json.uuid;                          // uuid.
			entry.material = json;                           // json (material).

			return debugMode && console.log("entry:", entry); // breakpoint!

			var images = []; for ( var uuid in meta.images ) {
				images.push( meta.images[uuid] );
			} 

			debugMode && console.log("images:", images);   // debug!

			(function( images ){

			//	Save meta.images.
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

			})( images ).then(function(){

			//	Save meta.textures.
				if ( Object.keys(meta.textures).length ) {
					var collection = db.collection("textures");
					collection.insert( Object.values(meta.textures), 
						function(err){ if (err) throw err; })
					.then(function(){ console.log("textures saved!"); 
					}).catch(function(err){ console.error(err); });
				}

			}).then(function(){

			//	Save meta.materials.
				if ( Object.keys(meta.materials).length ) {
					var collection = db.collection("materials");
					collection.insert( Object.values(meta.materials), 
						function(err){ if (err) throw err; })
					.then(function(){ console.log("material saved!"); 
					}).catch(function(err){ console.error(err); });
				}

			}).then(function(){

			//	Save material entry.
				var collection = db.collection( "environment" );
				collection.insert(entry, function(err){ 
					if (err) throw err; 
				}).then(function(){

				//	Success!
					callWatchers(button_new, "onclick", "click", new THREE.MeshStandardMaterial({ 
						bumpScale:0, displacementBias:0, displacementScale:0,roughness:0.5, metalness:0.5, })
					); 

					console.log( "matcap saved as material!" ); name_input.value = ""; map_droplist.value = "";
					thumb_icon.getContext("2d").clearRect(0,0,thumb_icon.width,thumb_icon.height); // clear icon.

				}).catch(function(err){ 
					console.error(err); 
				});

			}).then(function(){

				if ( images && images.length ) images.forEach(function(image){

					if ( !validator.isDataURI(image.url) ) {
						throw "image url is not DataURL:"+image.url;
					}

				//	important: data must NOT contain the prefix "data:image/jpeg;base64,"
					var name = "IMAGE:"+image.uuid; var data = image.url.split(","); 
					var type = data.shift().replace("data:","").replace(";base64","");
					data = data.shift(); // important! or .pop(); or .join();
					debugMode && console.log({data:data, type:type, name:name}); // debug!

				/*
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
				*/

				}); // end forEach.

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

	})( materialdB, matcapViewer, validator, // db, viewer, validator,
		TabUI.NewMatcap.tab.querySelector("div#create-matcap-button"),                 // button_new,
		TabUI.NewMatcap.tab.querySelector("canvas#create-matcap-icon"),                // thumb_icon,
		TabUI.NewMatcap.tab.querySelector("input#create-matcap-name-input"),           // name_input,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-map-droplist"),        // map_droplist,
		TabUI.NewMatcap.tab.querySelector("div#create-matcap-save-as-material"),       // save_button,
		TabUI.NewMatcap.tab.querySelector("select#create-matcap-collection-droplist")  // collection_droplist,
	);



/*
	(function(){

		var material;
		var textures = {};
		var tab = TabUI.Material.tab;
		var Signal = signals.Signal;
		var textureClicked = new Signal();

		textures.dispose = function(){
			for (var uuid in this ) {
				var texture = this[ uuid ];
				texture.dispose && texture.dispose();
			}
		}

		textureClicked.add( function( uuid ){
			material.roughness = 0;
			material.metalness = 1;
			material.envMap = textures[ uuid ];
			material.envMap.needsUpdate = true;
			material.needsUpdate = true;
		});

		var matcaps = (
		//	"MZV8PzS,L509oY2,Bw7q38p,2FA0yx1,vVDGl7g,3nmnKd4,E36SPOB,MXqauTz,YHsPLdq,soRJv4a," // (large:2K)
			"bixnsMm,MS1GDja,pUytALG,4KwC8wH,Wiqsp9s,gXRFY3U,2tkhy7C,D64zaTR,Id8k2u4,Fx9154f,"
			+ "dqKYFPo,l0Lf1LN,7bH7Ajw,IeAwKEi,VysdwUU,dWAhf12,9ufYr2S,iAWd8i1,mkGDAn5,gf3PsvD,"
			+ "BeHwxKA,GYBQ8Xr,9gxylAS,0p2RT39,aHeUCko,epbmrGs,NKMFDGB,pvXMCj9,QbZ8H2v,aCAVXQb,"
			+ "qU0AEUM,yvwt1wj,D5UeFcC,6GZMeko,rSlm3oM,Xqg7n0A,PzHZLHy,MEzwCJq,wgf7Vl0,GcLQiey,"
			+ "3xH34nj,vhdhgMe,jRTIv3l,xELCxlQ,wtJaViy,Qb0qKtc,7kq8wQ3,F6kcile,0LRxFql,rxUXS8C,"
			+ "qXg0NKn,LSB7hqR,EolEkFt,gOtyiMy,YTE0R32,thsIYPF,ee6stBn,gyYhQao,QOEE3jO,0V4rQPV,"
			+ "l9Tugo0,R86xHzg,IDlk0H9,tUparH7,GISkhjO,JQzRceW,Jl6XqD0,4tyRlwP,aFIJ3Iu,BCqRnS4,"
			+ "1OcGlAa,PqIxyYE,S7J95Cf,QPUvzXD,Stdy1eT,k0nOt5N,rWuDYYe,SGRUmyD,1Ia4Qbk,FFYLtQa,"
			+ "szmc38X,NJSPJlS,8HsVNJA,n3wbE5E,88autaS,7jwTUiI,H1F3Yrv,kgV7aSY,PDFIrWw,Uun8Lpr,"
			+ "Oz16d2L,02gRNwL,bV94g46,eUEtBHC,e1N7JYN,bWpofvm,uzlo3mR,YaXveL2,mw2f1lF,HkWGQb1,"
			+ "N9xoehs,53rWmmo,sBPySdS,1YZKblR,ywKHb7r,3UcbBN7,pWPtSJS,n1a2nB8,lecZa2Q,e3bxY9I,"
			+ "WxVSuFW," // normal matcap.
		).split(",")

		matcaps.pop(); // removes last empty item. (important!)

		var container = document.createElement("div");
		container.id = "matcap-buttons";
		container.style.width = "300px";

		while ( matcaps.length ) {
			(function( id ){

				var button = document.createElement("div");
				button.id = id;
				button.classList.add("btn", "btn-white-outline", "btn-terrain");
				button.style.cssText = "background-size:contain;background-image:url(https://i.imgur.com/"+id+"s.png);";
			//
				var url = "https://i.imgur.com/"+id+".png";   // TODO: cache matcaps.
				var loader = new THREE.ImageLoader();
				loader.setCrossOrigin("anonymous");						// important!
				loader.load( url, function( image ){
					var mapping = THREE.SphericalReflectionMapping;		// important!
					var texture = new THREE.Texture( image, mapping );	// important!
					texture.sourceFile = url;							// important!
					textures[ texture.uuid ] = texture;
					button.setAttribute("uuid", texture.uuid);
					container.appendChild( button );
				});
			//
				button.addEventListener( "click", function(){
					var select = document.getElementById("material-droplist");
					var selected = scene.getObjectByProperty("uuid", select.value);
					if ( !selected ) return;
					var material = selected.material;
					if ( !material ) return;
					var uuid = button.getAttribute("uuid");
					material.roughness = 0;
					material.metalness = 1;
					material.envMap = textures[ uuid ];
					material.envMap.needsUpdate = true;
					material.needsUpdate = true;
					textures.dispose();
				//	textureClicked.dispatch( uuid );
				});

			})( matcaps.shift() );

		}

		tab.appendChild( container );

	})();
*/