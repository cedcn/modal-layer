import $ from 'jquery';

const defaults = {
  effect: 'fade',     // 'fade' | 'scale' | 'slide'
  maskcolor: 'rgba(0, 0, 0, 0.2)',
  delay: '500',
  closeStartFun: new Function(),
  closeEndFun: new Function(),
  openStartFun: new Function(),
  openEndFun: new Function()
};

const ModalLayer = function(elem = '.js-modal', options) {
  const $elem = $(elem).first();
  const $body = $('html body');
  const m = this;
  const o = Object.assign({}, defaults, $elem.data(), options);

  let _isOpen = false,
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

  const $container = $elem.parents('.modal-layer-container');
  const $closeBtn = $container.find('.modal-layer-close');

  $container.css({
    'transition-duration': `${ o.delay / 1000 }s`,
    'background-color': o.maskcolor
  });

  $elem.css({
    'transition-duration': `${ o.delay / 1000 }s`
  })

  $container.addClass(effectClass);
  $container.on('mousedown', (e) => {
    e.stopPropagation();
    if (e.which === 1) m.close();
  });

  $elem.on('mousedown', (e) => { e.stopPropagation() });
  $closeBtn.on('click', () => { m.close() });

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
    $(document).on('keydown', escCloseModal);

    const openAnima = setTimeout( () => {
      $container.addClass('modal-show');
      clearTimeout(openAnima);
    }, 10);

    const openEnd = setTimeout( () => {
      if (typeof m.openEndFun === 'function') m.openEndFun();
      clearTimeout(openEnd);
    }, o.delay);

    if (typeof m.openStartFun === 'function') m.openStartFun();
  }

  m.close = function () {
    if (!_isOpen) return;
    _isOpen = false;
    $container.removeClass('modal-show');
    $body.removeClass('open-modal-layer');
    $(document).off('keydown', escCloseModal);

    const closeAnima = setTimeout( () => {
      $container.css('display', 'none');
      clearTimeout(closeAnima);
      if (typeof m.closeEndFun === 'function') m.closeEndFun();
    }, o.delay);

    if (typeof m.closeStartFun === 'function') m.closeStartFun();
  }

  m.toggle = function(cb) {
    if (_isOpen) { m.close() } else { m.open() }
  }

  function escCloseModal (e) {
    if (e.which === 27) m.close();
  }
}

export default ModalLayer;
