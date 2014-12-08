function HttpRequest(url, callback) {
    this.url = url;
    this.callBack = callback;
    this.async = true;
    this.request = new XMLHttpRequest();
};

HttpRequest.prototype.send = function() {
    this.request.open("GET", this.url, this.async);

    if (this.async) {
        var tempRequest = this.request;
        var callback = this.callBack;

        function requestReadystatechange() {
            if (tempRequest.readyState == 4) {
                if (tempRequest.status == 200) {
                    callback(tempRequest.responseText);
                } else {
                    alert("An error occurred while attempting to " +
                        "contact the server.");
                }
            }
        }

        this.request.onreadystatechange = requestReadystatechange;
    }

    this.request.send(null);

    if (!this.async) {
        this.callBack(this.request.responseText);
    }
};