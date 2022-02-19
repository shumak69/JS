function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');

    
    let gender, height, weight, age, ratio;

    if(localStorage.getItem('gender')) {
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 'female';
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalData(selector) {
        const input = document.querySelectorAll(selector);
        input.forEach((item) => {
            if(localStorage.getItem('height') && item.getAttribute('id') == 'height') {
                height = localStorage.getItem('height');
                item.value = height;
            }
            if(localStorage.getItem('weight') && item.getAttribute('id') == 'weight') {
                weight = localStorage.getItem('weight');
                item.value = weight;
            }
            if(localStorage.getItem('age') && item.getAttribute('id') == 'age') {
                age = localStorage.getItem('age');
                item.value = age;
            }
        });
       
    }
    initLocalData('#height');
    initLocalData('#weight');
    initLocalData('#age');
    

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.classList.remove(activeClass);
            if(item.getAttribute('id') === localStorage.getItem('gender')) {
                item.classList.add(activeClass);
            }
            if(item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if(!gender || !height || !weight || !age || !ratio) {
            result.textContent = '0';
            return;
        }

        if(gender === 'female') {
            result.textContent = Math.floor((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.floor((88.36 + (13.4 * weight) + (4.8  * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(item => {
            item.addEventListener('click',(e) => {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    gender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }
    
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
                calcTotal();
        });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const  input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    localStorage.setItem('height', height);
                    break;
                case 'weight':
                    weight = +input.value;
                    localStorage.setItem('weight', weight);
                    break;
                case 'age':
                    age = +input.value;
                    localStorage.setItem('age', age);
                    break;
            }
            calcTotal();
        });
    }
    
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

module.exports = calc;