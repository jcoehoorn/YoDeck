// Easy way to use the YoDeck API descibed here:
// https://www.yodeck.com/docs/user-manual/player-http-api/
// Current as of June 2023. Changes to the API since that date are not included.

function YDAPI(token) {
    var tk = token;

	var baseURL = "http://localhost:9999/";
	
	
	function callAPI(method, endpoint, payload, content_type)
	{
		var base = "http://localhost:9999/";
		var wc = new XMLHttpRequest();
		wc.open(method, base + endpoint, false);
		if (content_type) {
			wc.setRequestHeader('Content-Type', content_type);
		}
		wc.setRquestHeader('Authorization', 'widget ' + tk);
		wc.send(payload);
		return wc.responseText;
	}

    return {
  
		// /device
		// Example result:
		// {"id": 12345, "location": [40.4280106, -3.6990943], '"name": "test device"}
		"GetDeviceData":function() {
			return callAPI("GET", "device", null);
		},
		
		// /device/name
		// Example result:
		// "test device"
		"GetDeviceName":function() {			
			return callAPI("GET", "device/name", null);
		},
		// /device/id
		// Example result:
		//  12345
		"GetDeviceID":function() {
			return callAPI("GET", "device/id", null);
			
		},
		// /device/location
		// Example result:
		// [40.4280106, -3.6990943] (json array)
		"GetLocation":function() {
			return callAPI("GET", "device/location" , null);
		}, 
		// /request
		"RequestURL_JSON":function(payload) {
			// this is a POST.
			// No validation on the payload. That is up to the caller
			return callAPI("POST", "request", payload);
		},
		"RequestURL":function(url, method, headers, body, b64_body, cache) {
			// convert to JSON
			
			var json = {"url":url,"method":method,"headers":headers,"cache":cache};
			if (body && body.length > 0) {json["body"] = body;}
			if (b64_body && b64_body.length > 0) {json["b64_body"] = b64_body; }
			
			return callAPI("POST","request",json);			
		},
		// /storage/ (POST)
		"GetSavedKeyList":function() {
			// trailing / is shown in the documentation. This is different from the /device enpoint
			return callAPI("GET","storage/",null);
		},
		// /storage/<key> (POST)
		"SaveValue":function(key, value, type) {
			if (!type) type = "text/plain";
			return callAPI("POST","storage/" + key,value,type);
		},
		// /storage/<key>
		"GetValue":function(key) {
			//TODO: handle 404
			return callAPI("GET","storage/"+key,null);
		},
		// /storage/<key> (DELETE)
		"DeleteValue":function(key) {
			return callAPI("DELETE","storage/"+key,null);
		},
		// /storage/ (DELETE)
		"ClearAllValues":function() {
			return callAPI("DELETE","storage/",null);
		}	
    };
}