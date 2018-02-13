
;
(function (window, document, module) {
    if (typeof module.Controller !== 'undefined') {
        return;
    }

    module.Controller = function () {
        if (module.Controller.prototype.isInit === false) {
            module.Controller.prototype.isInit = true;
            if (window.Mustache !== 'undefined') {
                module.Controller.prototype.parse = window.Mustache.parse;
                module.Controller.prototype.render = window.Mustache.render;
            }
        }
    };

    module.Controller.prototype.isInit = false;

    module.Controller.prototype.loadView = function (id, view, datas) {
        var elements = document.querySelectorAll(id);
        var length = elements.length;
        for (var i = 0; i < length; ++i) {
            elements[i].innerHTML = this.render(view, datas);
        }
    };

    module.Controller.prototype.appendViewChild = function (id, view, datas) {
        var elements = document.querySelectorAll(id);
        var length = elements.length;
        for (var i = 0; i < length; ++i) {
            var children = this.parseFromString(this.render(view, datas));
            var childrenLength = children.length;
            for (var j = 0; j < childrenLength; ++j) {
                elements[i].appendChild(children[j]);
            }
        }
    };

    module.Controller.prototype.loadUrlView = function (id, url_viewer, datas) {
        var self = this;
        module.Support.loadData(url_viewer, function (xhr) {
            var view = xhr.responseText;
            self.loadView(id, view, datas);
        });
    };

    module.Controller.prototype.appendUrlViewChild = function (id, url_viewer, datas) {
        var self = this;
        module.Support.loadData(url_viewer, function (xhr) {
            var view = xhr.responseText;
            self.appendChild(id, view, datas);
        });
    };

    module.Controller.prototype.parseFromString = function (source) {
        var element;
//    var parser = new DOMParser();
//    element = parser.parseFromString(source, "text/html").body;
        element = document.createElement('div');
        element.innerHTML = source;
        return element.childNodes;
    };

    module.Controller.prototype.parse = function () {
    };

    module.Controller.prototype.render = function () {
        return arguments[0];
    };

})(window, document, window.JSSluz);
