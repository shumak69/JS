window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        timer = require('./modules/timer'),
        card = require('./modules/card'),
        calc = require('./modules/calc'),
        form = require('./modules/form'),
        slider = require('./modules/slider');
        
        tabs();
        modal();
        timer();
        card();
        calc();
        form();
        slider();
    
});