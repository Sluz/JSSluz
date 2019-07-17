/* global JSSluz */

;
(function (window, document, dependencies) {
  if (typeof window.JSSluz !== 'undefined') {
    return;
  }

  window.JSSluz = {
    name: 'JSSluz',
    version: '1.0.0',
    event: document.createElement('div')
  };

  window.addEventListener("load", function (event) {
    var root = null;
    var regex = new RegExp('JSSluz/main\.js');
    var scripts = document.getElementsByTagName('script');
    var length = scripts.length;
    for (var i = 0; i < length; ++i) {
      var src = scripts[i].getAttribute('src');
      if (regex.test(src)) {
        root = scripts[i].getAttribute('root-site');
        break;
      }
    }

    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', root + 'JSSluz/data/dependencies.js');
    script.setAttribute('async', true);
    
    script.onerror = function (evt) {
      throw new Error('Script from "JSSluz/data/dependencies.js" cannot be loaded.');
    };
    
    script.onload = script.onreadystatechange = function (evt) {
      if (root == null) {
        root = "";
      }
      
      var loader = new JSSluz.Dependencies([
        root + 'JSSluz/data/http.js',
        root + 'JSSluz/data/data.js',
        root + 'JSSluz/data/json.js',
        root + 'JSSluz/data/xml.js',
        root + 'JSSluz/util/geolocation.js',
        root + 'JSSluz/util/helper.js',
        root + 'JSSluz/view/controller.js',
        root + 'JSSluz/view/event.js'
      ]);
      loader.loadDependencies();
    };

    var element = document.body || document.head;
    element.appendChild(script);
  });
})(window, document);
