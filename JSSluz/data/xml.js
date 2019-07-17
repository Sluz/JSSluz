
;
(function (module) {
    if (typeof module.Xml !== 'undefined'
        || typeof module.Data === 'undefined') {
        return;
    }

    module.Xml = function (data) {
        this.data = data || [];
        this.pending = [];
        this.event = new module.Event();
        return this;
    };

    module.Xml.prototype.convertNodetXml = function (node) {
        var result = {
            '@name': node.nodeName
        };
        var attributes = node.attributes;
        var length = attributes.length;
        for (var i = 0; i < length; ++i) {
            var attr = attributes[i];
            result[attr.name] = attr.value;
        }

        length = node.children.length;
        if (length > 0) {
            var children = [];
            for (var i = 0; i < length; ++i) {
                var child = node.children[i];
                children.push(this.convertNodetXml(child));
            }
            result['@children'] = children;
        } else {
            if (node.textContent !== '') {
                result['@value'] = node.textContent;
            }
        }
        return result;
    };

    for (var key in module.Data.prototype) {
        module.Xml.prototype[key] = module.Data.prototype[key];
    }

    module.Data.prototype.parseXml = function (xhr) {
        try {
            var document = xhr.responseXML;
            if (document == null) {
                document = new DOMParser()
                    .parseFromString(xhr.responseText || xhr.response, "text/xml");
            }

            return this.convertNodetXml(document.children[0]);
        } catch (error) {
            return null;
        }
    };

    module.Xml.prototype.parseData = module.Data.prototype.parseXml;

})(window.JSSluz);
