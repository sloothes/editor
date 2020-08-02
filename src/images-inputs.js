//	imgur-skip-inputs.js

	(function(db,next_doc,prev_doc,name_input,img_viewer,collection_droplist){

		var interval, index = 0, limit = 100, items = [];

		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

	//	Collection droplist.

		watch(collection_droplist, "onchange",function(prop, event, value){

			try { 

				var collection = db.collection( value ); // debugMode && console.log( "collection:", collection ); 

			} catch(err){

				return callWatchers(collection_droplist, "onchange", "change", collection_droplist.value = "matcap");
			}

		//	Reset.

			index = 0; items = [];

		//	Get names.

			db.collection( value ).find().skip(index)
			.limit(limit).on("data", function(data){

				if ( data === undefined ) return;

				var item = { _id: data._id };
				if ( data.id   !== undefined ) item.id   = data.id;
				if ( data.link !== undefined ) item.link = data.link;
				if ( data.name !== undefined ) item.name = data.name;

				items.push( item ); // debugMode && console.log( item );

		//	}).on("end", function(){

		//		debugMode && console.log( items );

			}).toArray().then(function(docs){ 

				if ( items.length > index ) {

					if ( items[index].name !== undefined )

						name_input.value = items[index].name
						.replace(".jpg","").replace(".png","").replace(".jpeg","");

					else 
						name_input.value = items[index]._id; 

					img_viewer.src = "https://i.imgur.com/"+items[index].id+"t.jpg";

				} else {

					name_input.value = ""; img_viewer.src = ":0";
				}

			}).catch(function(err){ console.error(err); });

		});

		watch( next_doc, "onclick", function( prop, event, value ){
		//	debugMode && console.log({item:next_doc,event:event,index:value});
		});

		watch( prev_doc, "onclick", function( prop, event, value ){
		//	debugMode && console.log({item:prev_doc,event:event,index:value});
		});

		watch( name_input, "onchange", function( prop, event, value ){ 
			debugMode && console.log({item:name_input,event:event,index:value});
		});

	//	on key change.

		name_input.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", index );
		});

	//	on mouse down.

		next_doc.addEventListener( "mousedown", function(){
			clearTimeout( interval ); // important!
			interval = setTimeout(function increase(){

				if ( !items.length ) { 
					name_input.value = ""; 
					img_viewer.src = ":0"; return;
				}

				var max = items.length - 1;
				var i = index = THREE.Math.clamp(++index, 0, max);

				if ( items[i].name !== undefined )
					name_input.value = items[i].name
					.replace(".jpg","").replace(".png","")
					.replace(".jpeg","");
				else 
					name_input.value = items[i]._id; 

				interval = setTimeout(increase, 100);
			}, 500);
		});

		prev_doc.addEventListener( "mousedown", function(){
			clearTimeout( interval ); // important!
			interval = setTimeout(function decrease(){

				if ( !items.length ) { 
					name_input.value = ""; 
					img_viewer.src = ":0"; return;
				}

				var max = items.length - 1;
				var i = index = THREE.Math.clamp(--index, 0, max);

				if ( items[i].name !== undefined )
					name_input.value = items[i].name
					.replace(".jpg","").replace(".png","")
					.replace(".jpeg","");
				else 
					name_input.value = items[i]._id; 

				interval = setTimeout(decrease, 100);
			}, 500);
		});

	//	on mouse click.

		next_doc.addEventListener( "click", function(){
			clearTimeout( interval ); // important!

			if ( !items.length ) { 
				name_input.value = ""; 
				img_viewer.src = ":0"; return;
			}

			var max = items.length - 1;
			var i = index = THREE.Math.clamp(++index, 0, max);


			if ( items[i].name !== undefined )
				name_input.value = items[i].name
				.replace(".jpg","").replace(".png","")
				.replace(".jpeg","");
			else 
				name_input.value = items[i]._id; 

			interval = setTimeout(function(){
				img_viewer.src = "https://i.imgur.com/"+items[i].id+"t.jpg";
			},250);

			callWatchers( this, "onclick", "click", index ); // important!
		});

		prev_doc.addEventListener( "click", function(){
			clearTimeout( interval ); // important!

			if ( !items.length ) { 
				name_input.value = ""; 
				img_viewer.src = ":0"; return; 
			}

			var max = items.length - 1;
			var i = index = THREE.Math.clamp(--index, 0, max);

			if ( items[i].name !== undefined )
				name_input.value = items[i].name
				.replace(".jpg","").replace(".png","")
				.replace(".jpeg","");
			else 
				name_input.value = items[i]._id; 

			interval = setTimeout(function(){
				img_viewer.src = "https://i.imgur.com/"+items[i].id+"t.jpg";
			},250);

			callWatchers( this, "onclick", "click", index ); // important!
		});

		collection_droplist.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", this.value );
		});

		callWatchers(collection_droplist, "onchange", "change", collection_droplist.value);

	})(
		imgurdB, // db,
		TabUI.Images.tab.querySelector("li#imgur-doc-next"), // next_doc,
		TabUI.Images.tab.querySelector("li#imgur-doc-previous"), // prev_doc,
		TabUI.Images.tab.querySelector("input#imgur-name-input"), // name_input,
		TabUI.Images.tab.querySelector("img#imgur-image-viewer"), // img_viewer,
		TabUI.Images.tab.querySelector("select#imgur-collection-droplist") // collection_droplist,
	);

