//	geometry-tab-ui.js

	TabUI.add( "Geometry", "geometry-tab" );
	TabUI.append("Geometry");

//	geometry-type-ui.js

	(function( tab ){

	//	Geometries droplist.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "Geometry:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "geometry-type-droplist"; // renamed from "editor-geometry-droplist".
		select.style.cssText = "width:150px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		(function(){

			var geometries = "PlaneGeometry,BoxGeometry,SphereGeometry,CylinderGeometry,"
			+"ConeGeometry,DodecahedronGeometry,IcosahedronGeometry,OctahedronGeometry,"
			+"TetrahedronGeometry,TorusGeometry,TorusKnotGeometry,CircleGeometry,RingGeometry";

			geometries.split(",").forEach(function( name ){
				var option = document.createElement("option");
				option.text = name;
				option.value = name;
				select.appendChild( option );
			});

		})();

	//	Dont call watchers (dummy droplist).
		select.addEventListener( "change", function(){ this.blur(); }); // important!

		select.value = "BoxGeometry";
		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	sphere-droplist-ui.js

	(function( tab ){

	//	Bounding Sphere droplist.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "select:";
		row.style.cssText = "height:40px;"

		var select = document.createElement("select");
		select.id = "geometry-sphere-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var modes = "translate,scale"; // rotate,center,
		modes.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	center-x-ui.js

	(function( tab ){

	//	center x.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "axis x:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-center-x-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-center-x-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-center-x-input";
		input.setAttribute("placeholder", "x" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	center-y-ui.js

	(function( tab ){

	//	center y.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "axis y:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-center-y-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-center-y-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-center-y-input";
		input.setAttribute("placeholder", "y" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	center-z-ui.js

	(function( tab ){

	//	center z.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "axis z:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-center-z-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-center-z-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-center-z-input";
		input.setAttribute("placeholder", "z" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	radius-ui.js

	(function( tab ){

	//	vector r.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.textContent = "radius:";
		row.style.cssText = "margin:10px 15px;height:40px;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "geometry-radius-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "geometry-radius-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "geometry-radius-input";
		input.setAttribute("placeholder", "r" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	create-geometry-ui.js

	(function( tab ){

	//	Create geometry button.
	//	Creates a mesh geometry
	//	and switch to EditMode.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "geometry-create-button";
		button.textContent = "Create Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	clone-geometry-ui.js

	(function( tab ){

	//	Clone geometry button.
	//	Clones selected mesh 
	//	with the same geometry
	//	and switch to EditMode.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "geometry-clone-button";
		button.textContent = "Clone Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	remove-geometry-ui.js

	(function( tab ){

	//	Remove entity button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "geometry-remove-button";
		button.textContent = "Remove Geometry Entity";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

//	octree-geometry-ui.js

	(function( tab ){

	//	Add to world octree button.
	//	var tab = TabUI.Geometry.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "octree-add-button";
		button.textContent = "Add to MeshWorld";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

	(function( tab ){

	//	Remove from world octree button.
	//	var tab = TabUI.MeshWorld.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "octree-remove-button";
		button.textContent = "Remove from MeshWorld";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Geometry.tab );

