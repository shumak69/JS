require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import card from './modules/card';
import calc from './modules/calc';
// import form from './modules/form';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {
        
        tabs('.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
        modal('form');
        timer('.timer', '2022-03-9');
        card();
        calc();
        // form();
        slider({
            container: '.offer__slide',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            field: '.offer__slider-inner',
            slides: '.offer__slider'
        });
    
});