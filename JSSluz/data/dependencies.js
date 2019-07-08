
;
(function (window, document, module) {
    if (typeof module.Dependencies !== 'undefined') {
        return;
    }

    module.Dependencies = function (list) {
        this.dependenciesList = list || [];
    };

    module.Dependencies.prototype.loadDependencies = function () {
        var self = this;
        if (this.dependenciesList.length > 0) {
            this.loadScript(this.dependenciesList.shift(), function(evt) {
                self.loadDependencies();
            });
        } else {
            module.event.dispatchEvent(new Event('load'));
        }
    };

    module.Dependencies.prototype.loadScript = function (src, success, error) {
        var script = document.createElement('script');
        var element = document.body || document.head;
        //--- Configure script source
        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', src);
        script.setAttribute('async', true);

        //--- Configure callback
        script.onload = script.onreadystatechange = function (evt) {
            if (success) {
                success();
            }
        };
        if (error)
            script.onerror = error;
        else
            script.onerror = function (evt) {
                throw new Error('Script from "' + evt.target.src + '" cannot be loaded.');
                this.loadDependencies();
            };
        //--- Integrate script into file
        element.appendChild(script);
        return script;
    };

})(window, document, window.JSSluz);
