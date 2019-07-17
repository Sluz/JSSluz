
;
(function (module) {
    if (typeof module.Json !== 'undefined'
        || typeof module.Data === 'undefined') {
        return;
    }
    
    module.Json = function (data) {
        this.data = data || [];
        this.event = new module.Event();
        this.pending = [];
        return this;
    };

    for (var key in module.Data.prototype) {
        module.Json.prototype[key] = module.Data.prototype[key];
    }
    
    module.Data.prototype.parseJson = function (xhr) {
        try {
            return JSON.parse(xhr.reponseText || xhr.response);
        } catch (error) {
            return null;
        }
    };
    
    module.Json.prototype.parseData = module.Data.prototype.parseJson;
    
})(window.JSSluz);
