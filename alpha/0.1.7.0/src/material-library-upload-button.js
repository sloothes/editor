//	material-library-upload-button.js
//	Checks material dB images collection and uploads an image every 60 secs.

	(function(db,validator,upload_button){

		var interval; 
		var collection = db.collection("images");
		var index = 0; var timeout = 60 * 60 * 1000; // min * sec * msec.

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
							debugMode && console.error( err.type, err.message ); 
							reject( err );
						}
					}
				};
				xhttp.send(formdata); xhttp = null;
			});
		}

		function onUploadImagesButtonClick(){
			clearTimeout(interval);
			interval = setTimeout(function(){ callWatchers( upload_button, "onclick", "click", ++index ); }, 250);
		}

		upload_button.addEventListener( "click", onUploadImagesButtonClick );

		watch( upload_button, "onclick", function( prop, event, value ){
		//	debugMode && console.log({item:upload_button,event:event,index:value,interval:interval});

			var k = 0; upload_button.removeEventListener( "click", onUploadImagesButtonClick ); // important!

			collection.find().forEach( 

				function(doc){

					console.log({ "index":index++, "doc":doc, "isDataURI":validator.isDataURI(doc.url) });

					if ( validator.isURL(doc.url) ) return; if ( k >= 50 ) throw "maximum uploads reached: "+k;

					if ( validator.isDataURI(doc.url) ) {

					//	data must NOT contain the prefix "data:image/jpeg;base64," important!
						var name = "IMAGE:"+doc.uuid; var data = doc.url.split(","); 
						var type = data.shift().replace("data:","").replace(";base64","");
						data = data.shift(); // important! or .pop(); or .join();
						console.log({"k":++k, "uploading":{data:data, type:type, name:name, _id:doc._id}}); // debug! ++k;

						(function(k){

							 return uploadDataURL(data, type, name).then(function(data){

							//	debugMode && console.log(data);
								if ( data.error ) throw data.error;

							//	Save meta data.
								db.collection("imgur").insert( data, 
									function(err){ if (err) throw err; 
								}).catch(function(err){ console.error(err); });

								return data;

							}).then(function(data){

							//	Replace dataURL with link.
								collection.update( {_id:doc._id}, {$set:{url:data.link}}, 
									function(err){ if (err) throw err; 
								}).catch(function(err){ console.error(err); });

								return data.link;

							}).then(function(url){

							//	Cache material preview.
								return caches.open("textures").then(function(cache){
									return cache.add(url).then(function(){ return url; });
								}).then(function(url){ 
									return console.log( k, name, "completed:", url);
								}).catch(function(err){ console.error(err); });

							});

						})( k );

					}

				},

				function(err){ if (err) throw err; }

			).catch(function(err){ 

				if ( err.code !== undefined && err.code === 429 && err.message ) {
					console.warn( err.message ); return setTimeout(function(){ 
						callWatchers( upload_button, "onclick", "click", index ); 
					}, timeout); // Call upload_button watcher after 60 min.
				}

				console.error(err);  upload_button.addEventListener( "click", onUploadImagesButtonClick );  // important!
			});

		});

	})( materialdB, validator, TabUI.MaterialLibrary.tab.querySelector("div#material-library-images-upload-button") ); // db, validator, upload_button
