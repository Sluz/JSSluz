
;
(function (window, document, module) {
    if (typeof module.Helper !== 'undefined') {
        return;
    }

    if (typeof Math.trunc === 'undefined') {
        Math.trunc = function (number) {
            parseInt(number + '');
        };
    }

    if (typeof String.includes === 'undefined') {
        String.includes = function (include) {
            var regex = new RegExp(include, 'i');
            return (this.toLocalString().math(regex).length > 0);
        };
    }

    if (typeof module.Helper !== 'undefined') {
        return;
    }


    module.Helper = {
        isMobile: function () {
            return !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
        },

        parameters: function () {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            var result = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                result[pair[0]] = decodeURIComponent(pair[1]);
            }
            return result;
        },

        parseQuery: function (query) {
            var params = new Object();
            if (!query)
                return params; // return empty object
            var pairs = query.split(/[;&]/);
            for (var i = 0; i < pairs.length; i++) {
                var keyVal = pairs[i].split('=');
                if (!keyVal || keyVal.length !== 2)
                    continue;
                var key = unescape(keyVal[0]);
                var val = unescape(keyVal[1]);
                val = val.replace(/\+/g, ' ');
                params[key] = val;
            }
            return params;
        },

        updateWindowSize: function () {
            var width = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
            module.windowSize = module.windowSize || {};
            module.windowSize.width = width;
            module.windowSize.height = height;
            return module.windowSize;
        }
    };
})(window, document, window.JSSluz);
