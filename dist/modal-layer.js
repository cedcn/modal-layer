'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
  effect: 'fade', // 'fade' | 'scale' | 'slide'
  maskcolor: 'rgba(0, 0, 0, 0.2)',
  delay: '500',
  closeStartFun: new Function(),
  closeEndFun: new Function(),
  openStartFun: new Function(),
  openEndFun: new Function()
};

var ModalLayer = function ModalLayer() {
  var elem = arguments.length <= 0 || arguments[0] === undefined ? '.js-modal' : arguments[0];
  var options = arguments[1];

  var $elem = (0, _jquery2.default)(elem).first();
  var $body = (0, _jquery2.default)('html body');
  var m = this;
  var o = _extends({}, defaults, $elem.data(), options);

  var _isOpen = false,
      _isAniming = false,
      effectClass = 'effect-fade';

  switch (o.effect) {
    case 'scale':
      effectClass = 'effect-scale';
      break;
    case 'slide':
      effectClass = 'effect-slide';
      break;
  }

  init();

  function init() {
    // add wrap and close button
    $elem.addClass('modal-layer-content');
    $elem.wrap('<section class="modal-layer-container"></section>');
    $elem.append('<div class="modal-layer-close"/>');
  }

  var $container = $elem.parents('.modal-layer-container');
  var $closeBtn = $container.find('.modal-layer-close');

  $container.css({
    'transition-duration': o.delay / 1000 + 's',
    'background-color': o.maskcolor
  });

  $elem.css({
    'transition-duration': o.delay / 1000 + 's'
  });

  $container.addClass(effectClass);
  $container.on('mousedown', function (e) {
    e.stopPropagation();
    if (e.which === 1) m.close();
  });

  $elem.on('mousedown', function (e) {
    e.stopPropagation();
  });
  $closeBtn.on('click', function () {
    m.close();
  });

  // var
  m.closeStartFun = o.closeStartFun;
  m.closeEndFun = o.closeEndFun;
  m.openStartFun = o.openStartFun;
  m.openEndFun = o.openEndFun;

  // methods
  m.open = function () {
    if (_isOpen) return;
    _isOpen = true;
    $container.css('display', 'block');
    $body.addClass('open-modal-layer');
    (0, _jquery2.default)(document).on('keydown', escCloseModal);

    var openAnima = setTimeout(function () {
      $container.addClass('modal-show');
      clearTimeout(openAnima);
    }, 10);

    var openEnd = setTimeout(function () {
      if (typeof m.openEndFun === 'function') m.openEndFun();
      clearTimeout(openEnd);
    }, o.delay);

    if (typeof m.openStartFun === 'function') m.openStartFun();
  };

  m.close = function () {
    if (!_isOpen) return;
    _isOpen = false;
    $container.removeClass('modal-show');
    $body.removeClass('open-modal-layer');
    (0, _jquery2.default)(document).off('keydown', escCloseModal);

    var closeAnima = setTimeout(function () {
      $container.css('display', 'none');
      clearTimeout(closeAnima);
      if (typeof m.closeEndFun === 'function') m.closeEndFun();
    }, o.delay);

    if (typeof m.closeStartFun === 'function') m.closeStartFun();
  };

  m.toggle = function (cb) {
    if (_isOpen) {
      m.close();
    } else {
      m.open();
    }
  };

  function escCloseModal(e) {
    if (e.which === 27) m.close();
  }
};

exports.default = ModalLayer;
