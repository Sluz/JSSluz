
;
(function (window, module) {
    if (typeof module.Support !== 'undefined') {
        return;
    }
    
    module.Http = {
        loadData: function (url_or_params, success, error) {
            if (typeof url_or_params === 'string')
                url_or_params = {method: 'GET', url: url_or_params};
            url_or_params.complete = url_or_params.complete || function (xhr) {
                if (xhr.status === 200) {
                    if (success) {
                        success(xhr);
                    } else if (error) {
                        error(xhr);
                    }
                }
            };
            this.sendRequest(url_or_params);
        },

        Get: function (path, params, headers) {
            var paramData = '';
            if (typeof params !== 'undefined') {
                for (var key in params) {
                    if (paramData !== '') {
                        paramData += '&';
                    }
                    paramData += key + '=' + encodeURIComponent(params[key]);
                }
            }
            this.sendRequest({
                type: 'GET',
                url: path + '?' + paramData,
                headers: headers,
                asynchrone: false,
                enableCORS: true
            });
        },

        Post: function (path, params, headers) {
            var paramData = null;
            if (typeof params !== 'undefined') {
                paramData = new FormData();
                for (var key in params) {
                    paramData.append(key, params[key]);
                }
            }
            this.sendRequest({
                type: 'POST',
                url: path,
                body: paramData,
                headers: headers,
                asynchrone: false,
                enableCORS: true
            });
        },

        sendRequest: function (params) {
            if (typeof window.XMLHttpRequest === "undefined") {
                throw new Error('XMLHttpRequest not supported.');
            }
            if (typeof params === "undefined" ||
                    typeof params.url === "undefined") {
                throw new Error('URL missing.');
            }
            params.body = params.body || null;
            params.method = params.method || 'GET';
            params.asynchrone = params.asynchrone || true;
            var complete = params.complete || null;
            if (typeof complete !== 'function') {
                throw new Error('complete is nit a Function.');
            }

            var xhr = new XMLHttpRequest();
            if (params.enableCORS) {
                if ("withCredentials" in xhr) {
                    if (complete) {
                        xhr.onreadystatechange = function (evt) {
                            if (xhr.readyState === 4) {
                                complete(xhr);
                                xhr = null;
                            }
                        };
                    }
                    xhr.open(params.method, params.url, params.asynchrone, params.user, params.password);
                } else if (typeof window.XDomainRequest !== "undefined") {
                    //--- Info : credential not used.
                    xhr = new window.XDomainRequest();
                    if (complete) {
                        xhr.onload = function () {
                            complete(xhr);
                            xhr = null;
                        };
                        xhr.onerror = function () {
                            complete(xhr);
                            xhr = null;
                        };
                    }
                    xhr.open(params.method, params.url);
                } else {
                    xhr = null;
                    throw new Error('Otherwise, CORS is not supported by the browser.');
                }
            } else {
                if (complete) {
                    xhr.onload = function () {
                        complete(xhr);
                        xhr = null;
                    };
                    xhr.onerror = function () {
                        complete(xhr);
                        xhr = null;
                    };
                }
                xhr.open(params.method, params.url, params.asynchrone);
            }
            return xhr.send(params.body);
        }
    };
})(window, window.JSSluz);
