;(function (window, document, dependencies) {
  if (typeof window.Sluz !== 'undefined') {
    return;
  }
  
  window.JSSluz = {
      name: 'JSSluz',
      version: '1.0.0',
      dependencies: [
          'JSSluz/data/dependencies.js',
          'JSSluz/data/http.js',
          'JSSluz/data/json.js',
          'JSSluz/util/geolocation.js',
          'JSSluz/util/helper.js',
          'JSSluz/view/animation.js',
          'JSSluz/view/controller.js',
          'JSSluz/view/event.js'
      ]
  };
})(window, document, []);
