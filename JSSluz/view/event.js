
;
(function (window, document, module) {
    if (typeof module.Event !== 'undefined') {
        return;
    }

    /**
     * @param {String} queryElement : Element associate to event could be undefined
     * @returns {Event oject or null}
     */
    module.Event = function (queryElement) {
        var self = this;
        if (queryElement === 'undefined') {
            self.eventElement = document.createElement('div');
        } else {
            self.eventElement = document.querySelector(queryElement);
        }

        if (self.eventElement === 'undefined') {
            return null;
        } else {
            return this;
        }
    };

    module.Event.prototype.fireEvent = function (name) {
        this.eventElement.dispatchEvent(new Event(name));
    };

    module.Event.prototype.addEventListener = function (type, block) {
        this.eventElement.addEventListener(type, block);
    };

    /**
     * 
     * @param {function} block : function (deltaX, deltaY) {}
     * @param {uint} threshold : threshold of touch event must got to return delta values
     * @returns {undefined}
     */
    module.Event.prototype.addEventScroll = function (block, threshold) {
        if (typeof block !== 'function')
            throw new Error('Error args: ' + typeof block + ' is not function');

        threshold = threshold || 30;
        var self = this;
        if (module.Helper.isMobile()) {
            self.eventElement.addEventListener('touchstart', function (evt) {
                var touche = evt.changedTouches[0];
                self.touchStart = {
                    screenX: touche.screenX,
                    screenY: touche.screenY
                };
            });

            self.eventElement.addEventListener('touchend', function (evt) {
                var touche = evt.changedTouches[0];
                var moveX = touche.screenX - self.touchStart.screenX;
                var moveY = touche.screenY - self.touchStart.screenY;

                if (Math.abs(moveX) < threshold) {
                    moveX = 0;
                }

                if (Math.abs(moveY) < threshold) {
                    moveY = 0;
                }

                block(moveX, moveY);
            });
        } else {
            self.eventElement.addEventListener('wheel', function (evt) {
                evt.preventDefault();
                block(evt.deltaX, evt.deltaY);
            });
        }
    };

    /**
     * Listen resize event and delay it
     * @param {funtion} block
     * @param {uint} delay in ms
     * @returns {undefined}
     */
    module.Event.addEventDelayResize = function (block, delay) {
        if (typeof block !== 'function')
            throw new Error('Error args: ' + typeof block + ' is not function');

        var self = this;
        delay = delay || 500;
        window.addEventListener('resize', function (evt) {
            if (self.resizeTimer !== 'undefined') {
                clearTimeout(self.resizeTimer);
            }
            self.resizeTimer = setTimeout(function () {
                block(evt);
            }, delay);
        });
    };
})(window, document, window.JSSluz);
