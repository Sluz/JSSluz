/* global GoshGallery */

GoshGallery.prototype.animationStylePrev = function (style_id, duration) {
  return '-webkit-animation: slideprev' + style_id + ' ' + duration + ';\n\
          -moz-animation: slideprev' + style_id + ' ' + duration + ';\n\
          -ms-animation: slideprev' + style_id + ' ' + duration + ';\n\
          -o-animation: slideprev' + style_id + ' ' + duration + ';\n\
          animation-name: slideprev' + style_id + ';\n\
          animation-duration: ' + duration + ';';
};

GoshGallery.prototype.animationStyleNext = function (style_id, duration) {
  return '-webkit-animation: slidenext' + style_id + ' ' + duration + ';\n\
          -moz-animation: slidenext' + style_id + ' ' + duration + ';\n\
          -ms-animation: slidenext' + style_id + ' ' + duration + ';\n\
          -o-animation: slidenext' + style_id + ' ' + duration + ';\n\
          animation-name: slidenext' + style_id + ';\n\
          animation-duration: ' + duration + ';';
};

GoshGallery.prototype.animationCSS = function (style_id, container_class, property, init, distance) {
  var style = document.querySelector('#' + style_id);
  if (style === null) {
    style = document.createElement("style");
    document.getElementsByTagName('body')[0].appendChild(style);
  }

  style.id = style_id;
  style.textContent =
     '@-webkit-keyframes slideprev' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init + distance) + 'px; } }\n\
      @-moz-keyframes slideprev' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init + distance) + 'px; } }\n\
      @-ms-keyframes slideprev' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init + distance) + 'px; } }\n\
      @-o-keyframes slideprev' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init + distance) + 'px; } }\n\
      @keyframes slideprev' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init + distance) + 'px; } }\n\
      @-webkit-keyframes slidenext' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init - distance) + 'px; } }\n\
      @-moz-keyframes slidenext' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init - distance) + 'px; } }\n\
      @-ms-keyframes slidenext' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init - distance) + 'px; } }\n\
      @-o-keyframes slidenext' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init - distance) + 'px; } }\n\
      @keyframes slidenext' + style_id + ' { 0% { '+property+': ' + init + 'px; } 100% { '+property+': ' + (init - distance) + 'px; } }\n\
      .' + this.uniqId + ' .' + container_class + ' .items.prev { ' + this.animationStylePrev(style_id, this.animDuration) + ' }\n\
      .' + this.uniqId + ' .' + container_class + ' .items.next { ' + this.animationStyleNext(style_id, this.animDuration) + ' }';
};