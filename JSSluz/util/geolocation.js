
;
(function (window, module) {
    if (typeof module.Geo !== 'undefined') {
        return;
    }

    module.Geo = {
        search: function (event) {
            if (navigator.geolocation) {
                event.coordinates = {latitude: 0, longitude: 0};
                navigator.geolocation.getCurrentPosition(function (position) {
                    for (var index in position.coords) {
                        event.coordinates[index] = position.coords[index];
                    }
                    event.fireEvent('location');
                });
            } else
                throw new Error('Geolocation is not supported by this browser.');
            return event.coordinates;
        }
    };

})(window, window.JSSluz);