
//	model3d-viewer.js

	const model3DViewer = {

		img: TabUI.ModelLoader.tab.querySelector("img#model-3d-image-viewer"), 
		canvas: TabUI.ModelLoader.tab.querySelector("canvas#model-3d-viewer"),

	};

//	model-loader-inputs.js
//	sweethome models loader (admin). Imports .obj model to database.

	(function( db, 
		canvas,next_doc,prev_doc,name_input,increase,decrease,scale_input,
		load_button,apply_button,save_button,img_viewer,collection_droplist 
	){

		var model; var index = 0, limit = 100, items = []; var names = {};

	//	collections: "animals,bathroom,bedroom,doors,walls,windows,floor,kitchen,lights,"
	//	"office,livingroom,staircases,vehicles,exterior,trees,characters,miscellaneous,"

		names.trees = "palm";
		names.vehicles = "conceptSedan01,peugeot308cc";
		names.characters = "blondeElexisNude";

	//	Collection droplist.

		watch( collection_droplist, "onchange", function(prop, event, key){

			index = 0; items.length = 0; name_input.value = ""; // reset.
			canvas.getContext( "2d" ).clearRect( 0, 0, canvas.width, canvas.height );
			if ( names[key] === undefined ) return; items = names[key].split(",");

		//	Get names.

			if ( items.length > index ) {

				var src = "/"+"models"+"/"+items[index]+".png";
				name_input.value = items[index]; img_viewer.src = src;

			} else {

				name_input.value = ""; img_viewer.src = ":error.png";
			}

		});

	//	Name input.

		(function(){

			var interval; window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

			watch( next_doc, "onclick", function( prop, event, value ){
			//	debugMode && console.log({item:next_doc,event:event,index:value});
			});

			watch( prev_doc, "onclick", function( prop, event, value ){
			//	debugMode && console.log({item:prev_doc,event:event,index:value});
			});

			watch( name_input, "onchange", function( prop, event, value ){ 
				debugMode && console.log({item:name_input,event:event,index:value});
			});

		//	on mouse down.

			next_doc.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				if ( !items.length ) { name_input.value = ""; img_viewer.src = ":error.png"; return; }
				var max = items.length - 1; interval = setTimeout(function increase(){
					var i = index = THREE.Math.clamp(++index, 0, max);
					canvas.getContext( "2d" ).clearRect( 0, 0, canvas.width, canvas.height );
					name_input.value = items[index]; interval = setTimeout(increase, 100);
				//	img_viewer.src = "/"+"models"+"/"+items[index]+".png"; 
				}, 500);
			});

			prev_doc.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				if ( !items.length ) { name_input.value = ""; img_viewer.src = ":error.png"; return; }
				var max = items.length - 1; interval = setTimeout(function decrease(){
					var i = index = THREE.Math.clamp(--index, 0, max);
					canvas.getContext( "2d" ).clearRect( 0, 0, canvas.width, canvas.height );
					name_input.value = items[index]; interval = setTimeout(decrease, 100);
				//	img_viewer.src = "/"+"models"+"/"+items[index]+".png";
				}, 500);
			});

		//	on mouse click.

			next_doc.addEventListener( "click", function(){
				clearTimeout( interval ); // important!

				if ( !items.length ) { name_input.value = ""; img_viewer.src = ":error.png"; return; }
				var max = items.length - 1; var i = index = THREE.Math.clamp(++index, 0, max);

				canvas.getContext( "2d" ).clearRect( 0, 0, canvas.width, canvas.height );
				name_input.value = items[index]; img_viewer.src = "/"+"models"+"/"+items[index]+".png";

				callWatchers( this, "onclick", "click", index ); // important!
			});

			prev_doc.addEventListener( "click", function(){
				clearTimeout( interval ); // important!

				if ( !items.length ) { name_input.value = ""; img_viewer.src = ":error.png"; return; }
				var max = items.length - 1; var i = index = THREE.Math.clamp(--index, 0, max);

				canvas.getContext( "2d" ).clearRect( 0, 0, canvas.width, canvas.height );
				name_input.value = items[index]; img_viewer.src = "/"+"models"+"/"+items[index]+".png";

				callWatchers( this, "onclick", "click", index ); // important!
			});

			collection_droplist.addEventListener( "change", function(){
				this.blur(); callWatchers( this, "onchange", "change", this.value );
			});

		})();

	//	Load button.

		(function(){

			var interval;

			watch( load_button, "onclick", function(prop, event, name){

				var mtlfile = name + ".mtl"; var objfile = name + ".obj";
				var baseUrl = "/"+"models"+"/"+name+"/";    // important!

				var mtlLoader = new THREE.MTLLoader(); 
				mtlLoader.setCrossOrigin("anonymous"); mtlLoader.setPath( baseUrl ); 
				mtlLoader.load( mtlfile, function onLoad( materials ) {

					materials.preload(); debugMode && console.log( materials ); 

				//	add material entities.
					for ( var key in materials.materials ) {
						material_entities.add( materials.materials[key] );
					}

					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials( materials ); objLoader.setPath( baseUrl ); 
					objLoader.load( objfile, function ( group ) {

						var s = 0.01; group.scale.set(s,s,s); // scale.
						group.name = name; scene.add( group ); model = group;

						setTimeout(function(){
						//  when add to scene apply matrix to children geometries.
							group.traverse(function(child){ 
								if ( child.geometry ) child.geometry.applyMatrix( group.matrix );
							}); 
						});

						setTimeout(function(){
							group.scale.set(1,1,1); // group.position.set(0,0,0); group.rotation.set(0,0,0);
						//	group.traverse(function(mesh){ entities.add(object); })
						//	var entity_droplist = document.querySelector("select#editor-entities-droplist");
						//	entity_droplist && callWatchers( entity_droplist, "onchange", "change", entity_droplist.value = group.id );
							entities.add( group ); debugMode && console.log( group );
							scale_input.value = group.scale.y.toFixed(3); // update scale_input.
						});

					}); // end obj loader.

				}); // end mtl loader.

			}); // end watch.

			load_button.addEventListener("click", function(){
				clearTimeout( interval );
				interval = setTimeout(function(button){
					callWatchers( button, "onclick", "click", items[index] );
				}, 250, this);
			});

			callWatchers(collection_droplist, "onchange", "change", collection_droplist.value);

		})();

	//	Scale inputs.

		(function(){

			var interval; window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		//	on mouse down.

			function onMouseDown(){ 
				clearTimeout( interval ); 
				if ( !model ) return; var button = this;
				interval = setTimeout( function update() {
					var step = 0.001; 
					var value = round(model.scale.y, 3); // copy.
					if ( button === increase ) value += step;
					if ( button === decrease ) value -= step;
					model.scale.set(value,value,value);
					scale_input.value = value.toFixed(3);
					interval = setTimeout( update, 20 );
				}, 500);
			}

		//	on mouse click.

			function onMouseClick(){
				clearTimeout( interval ); 
				if ( !model ) return; var step = 0.001; 
				var value = round(model.scale.y, 3); // copy.
				if ( this === increase ) value += step;
				if ( this === decrease ) value -= step;
				model.scale.set(value,value,value);
				scale_input.value = value.toFixed(3);
			}

			increase.addEventListener( "click", onMouseClick );
			decrease.addEventListener( "click", onMouseClick );
			increase.addEventListener( "mousedown", onMouseDown );
			decrease.addEventListener( "mousedown", onMouseDown );

		})();

	//	Apply Model Matrix button.

		(function(){

			var interval; 

			watch( apply_button, "onclick", function( prop, event ){
				debugMode && console.log({item:apply_button,event:event,model:model});

				if ( !model ) return; model.traverse(function(child){
					if ( child.geometry ) child.geometry.applyMatrix( model.matrix );
				});

				model.position.set(0,0,0); model.rotation.set(0,0,0); model.scale.set(1,1,1);

			});

			apply_button.addEventListener( "click", function(){
				clearTimeout( interval ); interval = setTimeout(function(){
					callWatchers( apply_button, "onclick", "click" );
				}, 250);
			})

		})();

	//	Save to database button.

		(function(){

			var interval; 

			//	"models",                        // entry collection,
			//	"names",imgur",                  // meta collections,
			//	"groups",objects","geometries",  // data collections,
			//	"materials","textures","images", // data collections,

			function saveto( collection, data, keyword ){

				var result; // important!

				collection.find({uuid:data.uuid}).forEach(

					function(doc){

						result = doc.uuid; // important!
						collection.update({_id:doc._id}, {$set:data}, function(err){
							if (err) throw err; console.log(keyword, doc.uuid, "updated!" )
						}).catch(function(err){ console.error(err); });

					},

					function(err){

						if (err) throw err; // debugMode && console.log( "result:", result );
						if ( !result ) return collection.insert(data, function(err){ 
							if (err) throw err; console.log(keyword, data.uuid, "saved!" )
						}).catch(function(err){ console.error(err); });
					}

				).catch(function(err){ console.error(err); });

			}

			watch( save_button, "onclick", function( prop, event, object ){

			//	apply model matrix to children geometries.
				if ( !object ) return; object.traverse(function(child){
					if ( child.geometry ) child.geometry.applyMatrix( object.matrix );
				}); object.position.set(0,0,0); object.rotation.set(0,0,0); object.scale.set(1,1,1);

			//	collections.

				if ( !db ) return;

				var Names = db.collection("names"); if ( !Names ) return;
				var Models = db.collection("models"); if ( !Models ) return;
				var Groups = db.collection("groups"); if ( !Groups ) return;
				var Objects = db.collection("objects"); if ( !Objects ) return;

				var Images = db.collection("images"); if ( !Images ) return;
				var Textures = db.collection("textures"); if ( !Textures ) return;
				var Materials = db.collection("materials"); if ( !Materials ) return;
				var Geometries = db.collection("geometries"); if ( !Geometries ) return;

			//	json.
				var meta = { images:{}, textures:{}, materials:{}, geometries:{} }; 
				var json = object.toJSON( meta );  debugMode && console.log( json, meta );
				var group = json.object; debugMode && console.log( "group:", group );
				var children = json.object.children; debugMode && console.log( "children:", children );

			//	save meta.
				for (var key in meta.images){ saveto(Images, meta.images[key], "image"); }
				for (var key in meta.textures){ saveto(Textures, meta.textures[key], "texture"); }
				for (var key in meta.materials){ saveto(Materials, meta.materials[key], "material"); }
				for (var key in meta.geometries){ saveto(Geometries, meta.geometries[key], "geometry"); }

			//	save children.
				for ( var i = 0; i < children.length; i++ ) { saveto(Objects, children[i], "mesh"); }

			//	save group (model).
				saveto( Groups, group, "model" );

			//	scene.remove(model); scale_input.value = "";
			//	at the very end: model = undefined; // important!

			});

			save_button.addEventListener( "click", function(){
				clearTimeout( interval ); interval = setTimeout(function(){
					callWatchers( save_button, "onclick", "click", model );
				}, 250);
			})

		})();

	})( 
		modeldB, // db,
		TabUI.ModelLoader.tab.querySelector("canvas#model-loader-viewer"),     // canvas,
		TabUI.ModelLoader.tab.querySelector("li#model-loader-doc-next"),       // next_doc,
		TabUI.ModelLoader.tab.querySelector("li#model-loader-doc-previous"),   // prev_doc,
		TabUI.ModelLoader.tab.querySelector("input#model-loader-name-input"),  // name_input,
		TabUI.ModelLoader.tab.querySelector("li#model-loader-scale-increase"), // increase,
		TabUI.ModelLoader.tab.querySelector("li#model-loader-scale-decrease"), // decrease,
		TabUI.ModelLoader.tab.querySelector("input#model-loader-scale-input"), // scale_input,
		TabUI.ModelLoader.tab.querySelector("div#model-loader-load-button"),   // load_button,
		TabUI.ModelLoader.tab.querySelector("div#model-loader-apply-matrix"),  // apply_button,
		TabUI.ModelLoader.tab.querySelector("div#model-loader-save-button"),   // save_button,
		TabUI.ModelLoader.tab.querySelector("img#model-loader-image-viewer"),  // img_viewer,
		TabUI.ModelLoader.tab.querySelector("select#model-loader-collection-droplist") // collection_droplist,
	);
















/*
//	model3D-obj-upload-droplist.js

	(function(img_viewer,mtl_fileinput,obj_fileinput,img_fileinput,textures_fileinput,uploader_droplist){

		watch( uploader_droplist, "onchange", function(prop, event, value){ 

			switch ( value ) {
				case "":
				//	reset!
				//	img_fileinput.value = "";
				//	mtl_fileinput.value = "";
				//	obj_fileinput.value = "";
				//	textures_fileinput.value = "";
				break;
				case "img":
					img_fileinput.value = "";
					img_fileinput.click();
				break;
				case "mtl":
					mtl_fileinput.value = "";
					mtl_fileinput.click();
				break;
				case "obj":
					obj_fileinput.value = "";
					obj_fileinput.click();
				break;
				case "textures":
					textures_fileinput.value = "";
					textures_fileinput.click();
				break;
			}

		});

		uploader_droplist.addEventListener( "change", function(){ this.blur(); callWatchers(this, "onchange", "change", this.value )})

	})( 
		TabUI.Model3D.tab.querySelector("img#model-3d-image-viewer"),           // img_viewer,
		TabUI.Model3D.tab.querySelector("input#model-3d-mtl-file-input"),       // mtl_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-obj-file-input"),       // obj_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-preview-file-input"),   // image_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-textures-file-input"),  // textures_fileinput,
		TabUI.Model3D.tab.querySelector("select#model-3d-obj-upload-droplist"), // uploader_droplist,
	);
*/
/*
//	New upload button.

	(function(viewer,name_input,button_new,mtl_fileinput,obj_fileinput,img_fileinput,textures_fileinput,uploader_droplist){

		var interval;

		watch( button_new, "onclick", function(prop, event, value){ 

			mtl_fileinput.value = ""; obj_fileinput.value = "";
			name_input.value = ""; viewer.img.src = ":error.png";
			img_fileinput.value = ""; textures_fileinput.value = "";
		//	viewer.canvas.getContext( "2d" ).clearRect( 0, 0, viewer.canvas.width, viewer.canvas.height );

		});

		button_new.addEventListener( "click", function(){ 
			clearTimeout(interval);
			interval = setTimeout(function(){
				callWatchers(button, "onclick", "click"); 
			}, 250, this);
		});

	})( 
		model3DViewer, // viewer,
		TabUI.Model3D.tab.querySelector("input#model-3d-name-input"),           // name_input,
		TabUI.Model3D.tab.querySelector("div#model-3d-new-upload-button"),      // button_new,
		TabUI.Model3D.tab.querySelector("input#model-3d-mtl-file-input"),       // mtl_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-obj-file-input"),       // obj_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-preview-file-input"),   // image_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-textures-file-input"),  // textures_fileinput,
		TabUI.Model3D.tab.querySelector("select#model-3d-obj-upload-droplist"), // uploader_droplist,
	);

//	Uploader droplist.

	(function(viewer,name_input,button_new,mtl_fileinput,obj_fileinput,img_fileinput,textures_fileinput,uploader_droplist){

		watch( uploader_droplist, "onchange", function(prop, event, value){ 

			switch ( value ) {

				case "":
				break;

				case "img":
					img_fileinput.value = "";
				//	img_fileinput.click();
				break;
				case "mtl":
					mtl_fileinput.value = "";
				//	mtl_fileinput.click();
				break;
				case "obj":
					obj_fileinput.value = "";
				//	obj_fileinput.click();
				break;
				case "textures":
					textures_fileinput.value = "";
				//	textures_fileinput.click();
				break;
			}

		});

		uploader_droplist.addEventListener( "change", function(){ this.blur(); callWatchers(this, "onchange", "change", this.value )})

	})( 
		model3DViewer, // viewer,
		TabUI.Model3D.tab.querySelector("input#model-3d-name-input"),           // name_input,
		TabUI.Model3D.tab.querySelector("div#model-3d-new-upload-button"),      // button_new,
		TabUI.Model3D.tab.querySelector("input#model-3d-mtl-file-input"),       // mtl_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-obj-file-input"),       // obj_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-preview-file-input"),   // image_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-textures-file-input"),  // textures_fileinput,
		TabUI.Model3D.tab.querySelector("select#model-3d-obj-upload-droplist"), // uploader_droplist,
	);

//	MTL file input.

//	OBJ file input.

//	Upload button.

	(function(viewer,name_input,upload_button,mtl_fileinput,obj_fileinput,img_fileinput,textures_fileinput,uploader_droplist){

		var interval;

		watch( upload_button, "onclick", function(prop, event, value){ 

			if ( !name_input.value ) return;
			if ( !img_fileinput.files.length ) return;

			var entry = {};
			entry.name = name_input.value;

			(function(fileinput){
				var file = fileinput.files[0];
				var reader = new FileReader();
				reader.addEventListener( "load", function(){
					entry.icon = reader.result;
				}); reader.readAsDataURL(file);
			})( img_fileinput );

			debugMode && console.log( entry );
		});

		upload_button.addEventListener( "click", function(){ 
			clearTimeout(interval);
			interval = setTimeout(function(button){
				callWatchers(button, "onclick", "click"); 
			}, 250, this);
		});


	})( 
		model3DViewer, // viewer,
		TabUI.Model3D.tab.querySelector("input#model-3d-name-input"),           // name_input,
		TabUI.Model3D.tab.querySelector("div#model-3d-upload-button"),          // upload_button,
		TabUI.Model3D.tab.querySelector("input#model-3d-mtl-file-input"),       // mtl_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-obj-file-input"),       // obj_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-preview-file-input"),   // image_fileinput,
		TabUI.Model3D.tab.querySelector("input#model-3d-textures-file-input"),  // textures_fileinput,
		TabUI.Model3D.tab.querySelector("select#model-3d-obj-upload-droplist"), // uploader_droplist,
	);
*/

	//	names.scopia  = "bathroom3,bathroom4,bed1,iron_bed,wardrobe1,ext_chair,parque,farola1,littlebank,";
	//	names.scopia += "ext_table,silla_teca,wood_bank,bowl,old_jar,pottery,sushi_tray,kitchen_tool1,";
	//	names.scopia += "kitchen_tool2,kitchen_tool3,kitchen_tool4,tray,wine_bottle,armchair3,armchair,";
	//	names.scopia += "armchair1,black_table,dining_room,box_room,chair3,chair4,chair,clear_sofa,saloon_table,";
	//	names.scopia += "coffee_table,dvd,maceta,simple_sofa,table3,table4,tv,vase1,vase2,vase3,jar,";
	//	names.scopia += "office_furniture1,office_box,office_chair,desk_lamp1,pencil1,apple_pc,com_bath3,";
	//	names.scopia += "puerta,complements2,desk_lamp2,little_lamp1,little_lamp2,little_lamp3,saloon_lamp,";
	//	names.scopia += "seat_leon,vase5,wooden_table_office,tubular_chair,table_lamp,metal_glass_table,";
	//	names.scopia += "livingroom_lamp1,glass_table_office,desk_table,bathroom1,armchair2,apples,bar_chair,";
	//	names.scopia += "bar_table,bathroom_vanity,beige_sofa_2seats,beige_sofa,burlap_sofa,children_bed,";
	//	names.scopia += "contemp_living_room,crib,double_vanity,kids_desk_chair,kids_desk_table,kids_shelves,";
	//	names.scopia += "kids_wooden_desk,kitchen_stool,leather_sofa,living_lamp,living_room_table,modern_armchair,";
	//	names.scopia += "plastic_chair,table_wood_and_iron,white_kitchen_chair,wooden_office_alder_table,";
	//	names.scopia += "wooden_office_pear_table_rect,wooden_office_pear_table,wooden_office_teak_table,";
	//	names.scopia += "white_kitchen_table,bandeja,beach_chair,calla_lily_with_roses,chandelier-lamp,";
	//	names.scopia += "coffee_machine,com_bath,com_bath2_cepillo,com_bath2_esponja,com_bath2_jabon_pijo,";
	//	names.scopia += "com_bath2_peineta,#com_bath2_soap,com_bath3_toalla,corner_bathtub,creamer,cup,";
	//	names.scopia += "frame1,frame2,glasses,medicoscopia_bottle,medicoscopia_bottle2,medicoscopia_box,";
	//	names.scopia += "penbox,phone,small_lavatory,sugar,teapot,pencil2,sofa_white_beige,baby_high_chair,";
	//	names.scopia += "basic_camera,birthday_cake,child_swing,christmas_tree,clothes_washing_machine,";
	//	names.scopia += "dryer_machine,electric_water_heater_big,electric_water_heater,external-unity-air-conditioning,";
	//	names.scopia += "folded_clothes,gaz_water_heater,inkjet_and_scanner_printer,intercom_with_screen,intercom,";
	//	names.scopia += "internal-unity-air-conditioning,letters_box,mini_stereo,mp3_base_for_ipad,puff,reflex_camera,";
	//	names.scopia += "sneakers,stereo_amplifier,water_cooler,woman_shoes,japanese_style_screen,basketball_net_and_board,";
	//	names.scopia += "broom,curtain,dart_game,shovel,ficus,flipper,jacuzzi,wood_logs,cat,dog,elevator-door,elevator,";
	//	names.scopia += "fireplace1,fireplace2,indoor-bike,peugeot-308,rectangle-swimming-pool,renault-scenic,round-swimming-pool,";
	//	names.scopia += "sandpit,yamaha-yzr-r6,cardboard-box,chest-freezer,clothes-horse,coffee-table2,dog-house,garden-faucet,";
	//	names.scopia += "open-cardboard-box,punching-ball,scooter,shopping-basket,squeezer,step-ladder-metal,step-ladder-wood,";
	//	names.scopia += "stroller,trampoline,tricycle,wall-hanger,aquarium,bonsai-tree,changing-table,clothes-basket,";
	//	names.scopia += "diving-board,oll-house,doll,furnace,garage-door,hospital-bed,induction-cooker-2-zones,";
	//	names.scopia += "induction-cooker-4-zones,mocassin,mower,rabbit,roasted-chicken,round-carpet,swimming-pool,";
	//	names.scopia += "video-projector,wall-flat-tv,air-mattress,truck,ceiling-lamp,turn-window,tablet,door,double_door_2,";
	//	names.scopia += "double_door_with_little_part,double_door,window_2x1_medium_with_large_pane,window_2x1_with_sliders,";
	//	names.scopia += "window_2x3_arched,window_2x3_regular,window_2x3,window_2x4_arched,window_2x4,window_2x6,window_3x1,";
	//	names.scopia += "window_4x1,window_4x3_arched,window_4x3,window_4x5,iron-railing-1,iron-railing-2,iron-railing-3";

	//	names.walls  = "wall10,wall10Arc";
	//	names.trees  = "blackTupelo,fanPalm,lombardyPoplar,palm,quakingAspen,sassafras,weepingWillow";
	//	names.animals = "bulldog,cat,chicken,dog,horse,horse2,rabbit,siameseCat";
	//	names.characters = "female01,female02,female03,male01,male02,male03,holdingMale01,holdingFemale01,holdingFemale02,holdingFemale03,";
	//	names.characters += "sitMale03,lyingDownFemale01,lyingDownMale01,lyingDownMale02,sitFemale01,sitFemale02,sitFemale03,sitMale01,sitMale02,";
	//	names.characters += "boyLying,boySitting,boyStanding,girlSittingGround,girlSittingTable,girlStanding";
	//	names.vehicles = "bicycle,childBike";
