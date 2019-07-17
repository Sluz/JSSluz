
;
(function (module) {
    if (typeof module.Data !== 'undefined') {
        return;
    }

    module.Data = function (data) {
        this.data = data || [];
        this.pending = [];
        this.event = new module.Event();
        return this;
    };

    module.Data.prototype.addPendingData = function (url_or_params, blockCompleted) {
        if (typeof url_or_params === 'string')
            url_or_params = {
                method: 'GET',
                url: url_or_params,
                headers: {
                    'Content-Type': 'text/plain'
                },
                enableCORS: false
            };
        this.pending.push({
            http: url_or_params,
            block: blockCompleted
        });
    };

    module.Data.prototype.loadPendingData = function (synchronous, blockCompleted) {
        var self = this;
        synchronous = (typeof synchronous === 'indefined' ? true : synchronous);

        if (typeof blockCompleted === 'function') {
            self.event.addEventListener('completed', function () {
                self.event.removeEventListener('completed');
                blockCompleted(self.data);
            });
        }

        if (synchronous) {
            self.event.addEventListener('next', function () {
                if (self.pending.length > 0) {
                    var pendingData = self.pending.shift();
                    module.Http.loadData(pendingData.http, function (xhr) {
                        var data = self.parseData(xhr);
                        if (data != null) {
                            self.addData(data);
                        }
                        if (typeof (pendingData.block) === 'function') {
                            pendingData.block(data);
                        }
                        self.event.fireEvent('next');
                    });
                } else {
                    self.event.removeEventListener('next');
                    self.event.fireEvent('completed');
                }
            });
            self.event.fireEvent('next');
        } else {
            self.finised = 0;
            for (var index in self.pending) {
                var pendingData = self.pending[index];
                module.Http.loadData(pendingData.http, function (xhr) {
                    var data = self.parseData(xhr);
                    if (data != null) {
                        self.addData(data);
                    }
                    if (typeof (pendingData.block) === 'function') {
                        pendingData.block(data);
                    }
                    self.finised += 1;

                    if (self.finised >= self.pending.length) {
                        delete self.finised;
                        self.event.fireEvent('completed');
                    }
                });
            }

        }
    };

    module.Data.prototype.parseData = function (xhr) {
        var result = null;
        if (result == null && typeof this.prototype.parseJson === 'function') {
            result = this.parseJson(xhr);
        }

        if (result == null && typeof this.prototype.parseXml === 'function') {
            result = this.parseXml(xhr);
        }
        if (result == null) {
            result = xhr.reponseText || xhr.response;
        }
        return result;
    };

    module.Data.prototype.addData = function (data) {
        var self = this;
        var dataArray = Array.isArray(data);
        var datasisArray = Array.isArray(self.data);
        if (datasisArray === dataArray) {
            if (datasisArray) {
                Array.prototype.push.apply(self.data, data);
            } else {
                Object.assign(self.data, data);
            }
        } else if (datasisArray) {
            self.data.push(data);
        } else {
            Array.prototype.push.apply(self.datas, data);
        }
    };

    module.Data.prototype.getDataFromKeys = function (dataKeys, datas) {
        var result = datas;
        for (var key in dataKeys) {
            if (dataKeys[key].length > 0) {
                result = result[dataKeys[key]];
            }
        }
        return result;
    };
})(window.JSSluz);
