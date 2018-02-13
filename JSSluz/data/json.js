
;
(function (window, module) {
    if (typeof module.Json !== 'undefined') {
        return;
    }

    module.Json = function () {
        this.datas = [];
        return this;
    };

    module.Json.prototype.addPendingData = function (url_or_params, synchrone, blockCompleted) {
        synchrone = synchrone || true;
        var self = this;
        if (typeof url_or_params === 'string')
            url_or_params = {method: 'GET', url: url_or_params};

        self.pending = self.pending || [];
        self.event = self.event || new module.Event();
        self.pending.push(url_or_params);

        if (typeof blockCompleted === 'function' && typeof self.event.listenCompleted === 'undefined') {
            self.event.listenCompleted = true;
            self.event.addEventListener('completed', function (evt) {
                self.event.removeEventListener('completed');
                delete self.event.listenCompleted;
                blockCompleted(evt);
            });
        }

        if (synchrone) {
            if (typeof self.event.listenNext === 'undefined') {
                self.event.listenNext = true;
                self.event.addEventListener('next', function () {
                    self.loadPendingData(synchrone);
                });
            }
        } else {
            self.loadPendingData(synchrone);
        }
    };

    module.Json.prototype.loadPendingData = function (synchrone) {
        var self = this;
        synchrone = synchrone || true;
        if (synchrone) {
            if (self.pending.length > 0) {
                var params = self.pending.shift();
                module.Support.loadData(params, function (ressource) {
                    var xhr = ressource.target;
                    self.addDatas(JSON.parse(xhr.responseText));
                    self.event.fireEvent('next');
                });
            } else {
                self.event.removeEventListener('next');
                delete self.event.listenNext;
                self.event.fireEvent('completed');
            }
        } else {
            for (var key in this.pending) {
                module.Support.loadData(this.pending[key], function (ressource) {
                    var xhr = ressource.target;
                    self.addDatas(JSON.parse(xhr.responseText));
                });
            }
            self.event.fireEvent('completed');
        }
    };

    module.Json.prototype.addDatas = function (datas) {
        this.datas.push.apply(this.datas, datas);
    };

    module.Json.prototype.getDataFromKeys = function (dataKeys, datas) {
        var result = datas;
        for (var key in dataKeys) {
            if (dataKeys[key].length > 0) {
                result = result[dataKeys[key]];
            }
        }
        return result;
    };
})(window, window.JSSluz);
