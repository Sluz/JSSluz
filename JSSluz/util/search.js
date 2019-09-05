
;
(function (window, document, module) {
    if (typeof module.Search !== 'undefined') {
        return;
    }

    module.Search = function (input, list, func, regexStart, regexEnd) {
        var self = this;
        if (typeof regexStart === 'undefined') {
            this.regexStart = '';
        } else {
            this.regexStart = regexStart;
        }

        if (typeof regexEnd === 'undefined') {
            this.regexEnd = '';
        } else {
            this.regexEnd = regexEnd;
        }
        this.list = list;
        this.callback = func;
        this.inputEvent = new module.Event(input);
        this.inputEvent.addEventListener('keyup', function (evt) {
            var value = self.inputEvent.eventElement.value;
            if (value === '') {
                self.callback(self.list);
            } else {
                var regex = new RegExp(self.regexStart + value + self.regexEnd);
                var result = [];
                for (var index in self.list) {
                    if (self.list[index].match(regex)) {
                        result.push(self.list[index]);
                    }
                }
                self.callback(result);
            }
        });
        return self;
    };

    module.Search.prototype.destroy = function () {
        this.inputEvent.removeEventListener('keypress');
    };
})(window, document, window.JSSluz);