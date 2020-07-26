    function uploadDataURL(data, type, name){

    //  Returns a resolved promise with record data from imgur.com.
        debugMode && console.log("uploading:", file.name);
        return new Promise(function( resolve, reject ){

            var formdata = new FormData();
            formdata.append("image", data);
            formdata.append("type",  type);
            formdata.append("name",  name);

        //	var endpoint = "https://api.imgur.com/3/image";
        //	var clientID = "06217f601180652";  // sloothes app Client-ID.

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

    };

    function uploadImageFile(file){

    //  Returns a resolved promise with record data from imgur.com.
        debugMode && console.log("uploading:", file);
        return new Promise(function( resolve, reject ){

            var formdata = new FormData();
            formdata.append("image", file);
            formdata.append("type",  file.type);
            formdata.append("name",  file.name);

        //	var endpoint = "https://api.imgur.com/3/image";
        //	var clientID = "06217f601180652";  // sloothes app Client-ID.

            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", endpoint, true);
            xhttp.setRequestHeader("Authorization", "Client-ID " + clientID);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    var response = "";
                    if (this.status >= 200 && this.status < 300) {
                        response = JSON.parse(this.responseText);
                    //	debugMode && console.log(response.data);
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

    };

    function deleteImage(deletehash){

    //  Returns a resolved promise with success response if from api.imgur.com.
        debugMode && console.log("DELETE https://api.imgur.com/3/image/" + deletehash);
        return new Promise(function( resolve, reject ){

        //	var endpoint = "https://api.imgur.com/3/image/" + deletehash;
        //	var clientID = "06217f601180652";  // sloothes app Client-ID.

            var xhttp = new XMLHttpRequest();
            var endpoint = endpoint + "/" + deletehash;
            xhttp.open("DELETE", endpoint, true);
            xhttp.setRequestHeader("Authorization", "Client-ID " + clientID);
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    var response = "";
                    if (this.status >= 200 && this.status < 300) {
                        response = JSON.parse(this.responseText);
                        debugMode && console.log(response);
                        resolve(response); // resolve promise.
                    } else {
                        var err = JSON.parse(this.responseText).data.error;
                        console.error( err.type, err );
                        reject( err );
                    }
                }
            };

            xhttp.send();
            xhttp = null;
        });

    };



//  upload-imgur.js

    function uploadToImgur(file, callback){
        return new Promise( function(resolve, reject){
            var clientid = "95e1ecaf14ca5e6";
            var endpoint = "https://api.imgur.com/3/image";
            var formdata = new FormData();
            formdata.append("image", file);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", endpoint, true);
            xhttp.setRequestHeader("Authorization", "Client-ID " + clientid);
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                    var response = "";
                    if (this.status >= 200 && this.status < 300) {
                        response = JSON.parse(this.responseText);
                        if (!!callback) callback.call(window, response);
                        resolve( response );
                    } else {
                        var error = this.responseText;
                        throw Error( error );
                    }
                }
            };
            xhttp.send(formdata);
            xhttp = null;
        });
    }

    function uploadToImgurXHR(file, callback) {

        var clientid = "95e1ecaf14ca5e6";
        var endpoint = "https://api.imgur.com/3/image";

        var formdata = new FormData();
        formdata.append("image", file);

        var xhttp = new XMLHttpRequest();

        xhttp.open("POST", endpoint, true);
        xhttp.setRequestHeader("Authorization", "Client-ID " + clientid);
        xhttp.onreadystatechange = function () {

            if (this.readyState === 4) {

                var response = "";

                if (this.status >= 200 && this.status < 300) {

                    try {
                        response = JSON.parse(this.responseText);
                    } catch (err) {
                        response = this.responseText;
                    }

                    callback.call(window, response);

                } else {

                    try {
                        response = JSON.parse(this.responseText);
                        console.log( "Error response:", response );
                        var error = response.data.error;
                        var code = error.code || response.status;
                        var message = error.message || error;
                        alert( "<b>Error code: " + code + "</b><br>" + message );
                        console.error( "Error status:", this.status, "- error.code:", error.code, "- error:", error );
                    } catch (err) {
                        var error = this.responseText;
                        console.error( "Error:" + this.status, error );
                    }

                }

            }
        };

        xhttp.send(formdata);
        xhttp = null;

    }
