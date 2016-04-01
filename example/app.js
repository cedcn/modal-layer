import $ from 'jquery';
import ModalLayer from '../src/modal-layer.js';

require('../src/modal-layer.scss');

var modalFade = new ModalLayer('.modal-fade', {
  effect: 'fade',
});

var modalSlide= new ModalLayer('.modal-slide', {
  effect: 'slide',
});

var modalScale = new ModalLayer('.modal-scale', {
  effect: 'scale',
});


$('.open-fade').on('click', () => {
  modalFade.open();
})

$('.open-slide').on('click', () => {
  modalSlide.open();
})

$('.open-scale').on('click', () => {
  modalScale.open();
})
