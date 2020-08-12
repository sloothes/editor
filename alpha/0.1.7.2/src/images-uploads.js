/*
	var wood  = "8FJqT7z,7G3WznH,8o9cRNK,1uWqJLG,vl2ryRH,wAGZPn4,3ph5z3J,puG3VIB,IMAahk4,5SQcwGe,HJtqlpp,9FrRmTC,";
		wood += "lfM4UAa,Ea4M7Jv,FBvMmz2,TMgEXht,XZJkczA,Viot8su,8C6sFAr,OpyirUZ,ns2tCi2,MTAbvqZ,3GF4ckG,6qvz5z4,";
		wood += "q8Qo7bm,fk8kKPG,7kb2TWa,XQ1wJin,1gM4FcG,OpBXs3r,bhhc2hX,dUx8nup,9z22EUb,LJ2Pf26,CuYHkV2,8mBbPlq,";
		wood += "ghIMpmE,Ysv8TgK,tQCp2If,7rr1BEK,1AcKJsu,QODar5C,ihC80AA,zuddRU7,9mzupW7,9QVA1jK,7GfIIyI,pw7qvBJ,";
		wood += "8aRytTK,rqEycLi,hgrHC4T,rUgWGtV,XeOX2B6,njRSutx,E5YWtga,fKvQUs5,rBlEXsw,KRDqNc1,T3lQE8l,cIrfoyA,";
		wood += "YRAT8aH,v5gqP21,PK6a3Gn,jjQbrOr,IgREPgc,zOoV0Ws,j9Qte6s,hRvzhMW,lbPOzxF,9Ds6hwB,UjzsnAI,oCvYCoy,";
		wood += "Ww44V5G,JdvGneh,A2odz2C,aminLgl,c3W5jSn,HJfqDHV,4lpAHBy,1ZHBVLB,uNKPcIx,MbUX8fT,7ZPdKsC,j9gw7RZ,";
		wood += "KXnIYsb,Zoa1TcN,rU35csr,DWxWlCI,Wr596Yx,bsRE5cZ,mNw7v0H,mUAiUWL,MvJVVye,yoRnERa,eTILlHx,YeJ6UJY,";
		wood += "ttz63s5,n1zeBtr,MK7PWmN";

	var trees  = "p4Z3suT,UVrNNde,WJxghjv,K77iM71,kD8QmtA,U13oMhh,PJgv516,MfBKHdn,TF0Tuz4,HY3hmWB,Pajub6W,ya1AnVS,";
		trees += "yu7X8WW,Bw0Dey5,dqirxIw,XSKDrYa,uHZOeyD,bz9bUkz,zE8RsDk,KG7DNkP,IZdumsy,yTusorw,SHAvHs1,LGXuUKY,";
		trees += "tVLyAvX,xJiaLsH,mY8Rc5L,FsAgsfP,fttc0Ef,fJFG9O5,5TlKJ7u,hO5CLz4,nDmBIJF,BAz6DZC,VcuEnl7,Mci0roo,";
		trees += "wpb8gmx,GX9LG1f,qwmAH5Z,V27m5Lq";

	var matcaps  = "bixnsMm,MS1GDja,pUytALG,4KwC8wH,Wiqsp9s,gXRFY3U,2tkhy7C,D64zaTR,Id8k2u4,Fx9154f,dqKYFPo,l0Lf1LN,";
		matcaps += "7bH7Ajw,IeAwKEi,VysdwUU,dWAhf12,9ufYr2S,iAWd8i1,mkGDAn5,gf3PsvD,BeHwxKA,GYBQ8Xr,9gxylAS,0p2RT39,";
		matcaps += "aHeUCko,epbmrGs,NKMFDGB,pvXMCj9,QbZ8H2v,aCAVXQb,qU0AEUM,yvwt1wj,D5UeFcC,6GZMeko,rSlm3oM,Xqg7n0A,";
		matcaps += "PzHZLHy,MEzwCJq,wgf7Vl0,GcLQiey,3xH34nj,vhdhgMe,jRTIv3l,xELCxlQ,wtJaViy,Qb0qKtc,7kq8wQ3,F6kcile,";
		matcaps += "0LRxFql,rxUXS8C,qXg0NKn,LSB7hqR,EolEkFt,gOtyiMy,YTE0R32,thsIYPF,ee6stBn,gyYhQao,QOEE3jO,0V4rQPV,";
		matcaps += "l9Tugo0,R86xHzg,IDlk0H9,tUparH7,GISkhjO,JQzRceW,WxVSuFW,4tyRlwP,aFIJ3Iu,BCqRnS4,1OcGlAa,PqIxyYE,";
		matcaps += "S7J95Cf,QPUvzXD,Stdy1eT,k0nOt5N,rWuDYYe,SGRUmyD,1Ia4Qbk,FFYLtQa,szmc38X,NJSPJlS,8HsVNJA,n3wbE5E,";
		matcaps += "88autaS,7jwTUiI,H1F3Yrv,kgV7aSY,PDFIrWw,Uun8Lpr,Oz16d2L,02gRNwL,bV94g46,eUEtBHC,e1N7JYN,bWpofvm,";
		matcaps += "uzlo3mR,YaXveL2,mw2f1lF,HkWGQb1,N9xoehs,53rWmmo,sBPySdS,1YZKblR,ywKHb7r,3UcbBN7,pWPtSJS,n1a2nB8,";
		matcaps += "lecZa2Q,e3bxY9I,Jl6XqD0";
*/

//	imgur-upload-button.js

	(function(db,input,button,collection_droplist){

		input.addEventListener( "change", function onChange(){

			var collection = db.collection(collection_droplist.value);

			if ( !input.files.length ) return;
			debugMode && console.log( input.files );

			input.removeEventListener( "change", onChange );

			var uploads = [], promises = [], results = [];

			for (var i = 0; i < input.files.length; i++ ){
				(function(file){
					uploads.push( function(){
						return uploadTexture( file )
						.then(function( data ){
							if ( !data.error ) {
								results.push( data );
								collection.insert(data);
							}
						}).catch(function(err){
							console.error(err);
						});
					});
				})( input.files[i] );
			}

			debugMode && console.log( "uploads:", uploads );

			while ( uploads.length ){
				promises.push( uploads.shift().call() );
			}

			Promise.all(promises).then(function(){

				debugMode && console.log( "results:", results );

				if ( results.length ) {

					var success = results.map( function( data ){ 
						return {name:data.name, id:data.id}; 
					}).filter(Boolean);

					debugMode && console.log( success );
					debugMode && console.log( JSON.stringify(success) );
					console.log( "Success:", results.length, "of", 
					input.files.length, "files uploaded successfully.");

				}

			}).catch(function(err){
				console.error(err);
			}).then( function(){
				input.addEventListener( "change", onChange );
			});

			function uploadTexture(file){
			//  Returns a resolved promise with record data from imgur.com.
				debugMode && console.log("uploading", file.name, "...");
				return new Promise(function( resolve, reject ){

					var formdata = new FormData();
					formdata.append("image", file);
					formdata.append("type",  file.type);
					formdata.append("name",  file.name);

					var xhttp = new XMLHttpRequest();
					var clientid = "06217f601180652";  // slothes app.
					var endpoint = "https://api.imgur.com/3/image";
					xhttp.open("POST", endpoint, true);
					xhttp.setRequestHeader("Authorization", "Client-ID " + clientid);
					xhttp.onreadystatechange = function () {
						if (this.readyState === 4) {
							var response = "";
							if (this.status >= 200 && this.status < 300) {
								response = JSON.parse(this.responseText);
								debugMode && console.log(response.data);
								resolve(response.data); // resolve promise.
							} else {
								var err = JSON.parse(this.responseText).data.error;
								console.error( err.type, err );
								resolve( {file:file.name, error:err.type, message:err} ); // throw err;
							}
						}
					};

					xhttp.send(formdata);
					xhttp = null;
				});
			}

		});

	//	Call watchers.

		button.addEventListener( "click", function(){ 
			input.value = "";
			input.click();
			return false;
		});

	})(
		imgurdB, // db,
		TabUI.Images.tab.querySelector("input#imgur-file-input"), // input,
		TabUI.Images.tab.querySelector("div#imgur-upload-button"), // button,
		TabUI.Images.tab.querySelector("select#imgur-collection-droplist") // collection_droplist,
	);

/*
	(function(){

		matcaps.split(",").forEach(function(id){
			new Promise(function( resolve, reject ){

				var endpoint = "https://api.imgur.com/3/image/"+id;
				var clientID = "06217f601180652";  // sloothes app Client-ID.

				var xhttp = new XMLHttpRequest();
				xhttp.open("GET", endpoint, true);
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

				xhttp.send();
				xhttp = null;
			}).then(function(data){
				imgurdB.collection("matcap").insert(data);
			})
		});

	})();
*/
