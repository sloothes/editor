//	material-library-update-button.js

	(function(db,validator,next_doc,name_input,img_viewer,update_button,collection_droplist){

		var interval, collection, index = 0, limit = 0;

		watch( collection_droplist, "onchange", function(prop, event, value){ collection = db.collection( value ); index = 0, limit = 0;
			db.collection( value ).find().on("data", function(data){ ++limit; }).on("end", function(){ index = 0; }).toArray()
			.then(function(){ debugMode && console.log( "index:", index, "limit:", limit ); }).catch(function(err){ console.error(err); });
		});

		watch( update_button, "onclick", function( prop, event, value ){
		//	debugMode && console.log({item:update_button,event:event,index:value,interval:interval});

			if ( !limit ) return console.warn("Collection does not contain some document!");
			if ( limit && index > limit) return console.warn("end of collection reached:", index); 

			collection.find().skip(value).limit(1).toArray().then(function(docs){return docs[0];}).then(function(doc){

				if ( !doc ) throw "end of collection docs detected!"; // fatal!

				if ( doc.name === undefined ) name_input.value = doc._id; else name_input.value = doc.name;
				if ( doc.preview === undefined ) img_viewer.src = ":0"; else img_viewer.src = doc.preview;

				if (  doc.images === undefined ) throw "doc images is undefined!";
				if ( !doc.images.length ) throw "doc doesn't have texture images!";
				if ( doc.images.length && doc.links.length === doc.images.length && doc.imgIds.length === doc.images.length ) {
					return console.log("doc images are up to date:", {links:doc.links,imgIds:doc.imgIds}); 
				}

				var imgIds = []; var links = []; var promises = []; debugMode && console.log( doc ); 

				doc.images.forEach(function(uuid){ promises.push( 

						db.collection("images").findOne({uuid:uuid}, 
						function(err){ if (err) throw err; }).then(function(img){

							if ( !img ) throw "image", uuid, "not found!";
							if ( !validator.isURL(img.url) ) throw "image "+uuid+" is not URL!";

						//	collect.

							if ( validator.isURL(img.url) ) { links.push( img.url ); 
								imgIds.push( img.url.replace("https://i.imgur.com/","")
								.replace(".png","").replace(".jpg","").replace(".jpeg","") )
							}

						})

					); // end push.

				}); // end forEach.

				return Promise.all(promises).then(function(results){

					debugMode && console.log({imgIds:imgIds, links:links}); // debug!

				//	update.

					if ( links.length === doc.images.length && imgIds.length === doc.images.length ) {
						return collection.update({_id:doc._id}, {$set:{links:links,imgIds:imgIds}}, 
							function(err){ if (err) throw err; 
						}).then(function(){ collection.findOne({_id:doc._id}).then(function(doc){ 
							return console.log(doc.name, "images are up to date:", doc); });
						}).catch(function(err){ console.error(err); });
					}

					return;

				}).catch(function(err){ console.error(err); });

			}).then(function(){ 
				callWatchers(update_button, "onclick", "click", ++index ); 
			}).catch(function(err){ console.error(err); });

		});

		update_button.addEventListener( "click", function(){ 
			clearTimeout(interval); 
			++index; if ( index > limit ) index = 0;
			interval = setTimeout(function(){ 
				callWatchers(update_button, "onclick", "click", index ); 
			}, 250);
		});

	})( 
		materialdB, validator, // db, validator,
		TabUI.MaterialLibrary.tab.querySelector("li#material-library-next"),                   // next_doc,
		TabUI.MaterialLibrary.tab.querySelector("input#material-library-name-input"),          // name_input,
		TabUI.MaterialLibrary.tab.querySelector("img#material-library-preview-viewer"),        // img_viewer,
		TabUI.MaterialLibrary.tab.querySelector("div#material-library-images-update-button"),  // update_button,
		TabUI.MaterialLibrary.tab.querySelector("select#material-library-collection-droplist") // collection_droplist,
	);
