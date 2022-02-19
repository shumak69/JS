/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/card.js":
/*!****************************!*\
  !*** ./js/modules/card.js ***!
  \****************************/
/***/ ((module) => {

function cards() {
    class Card {
        constructor(title, descr, price, img, alt, parentSelector, ...classes) {
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.img = img;
            this.parentSelector = document.querySelector(parentSelector);
            this.alt = alt;
            this.trasfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.trasfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parentSelector.append(element);
        }
    }

    const getCards = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${fetch.status}`);
        }

        return  await res.json();
    };

    getCards('http://localhost:3000/menu').then(data => {
        data.forEach(({title, descr, price, img, altimg}) => {
            new Card(title, descr, price, img, altimg, '.menu .container').render();
        });
    });
}

module.exports = cards;

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((module) => {

function form() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: data
        });

        return await res.json();
    };



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            window.removeEventListener('scroll', showModalByScroll);
            checkModal = false;
            clearInterval(modalTime);
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            //XMLHTTPREQUEST
            /* const request = new XMLHttpRequest();
            request.open('POST', 'server.php'); */

            //JSON
            /* request.setRequestHeader('Content-type', 'application/json'); */
            const formData = new FormData(form);

            //JSON
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            }); 

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // JSON
            // const json = JSON.stringify(object);

            //JSON
            /*  request.send(json); */

            // request.send(formData);
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            //XMLHTTPREQUEST
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        // prevModalDialog.style.opacity = 0;
        // prevModalDialog.style.visibility = 'hidden';
        showModal();
        prevModalDialog.style.display = 'none';

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.style.opacity = 1;
            prevModalDialog.style.visibility = 'visible';
            // prevModalDialog.style.display = 'block';
            closeModal();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
}

module.exports = form;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
 
    let checkModal = true;

    const modalOpen = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    modalOpen.forEach(item => {
        item.addEventListener('click', () => {
            showModal();
        });
    });
    modal.style.display = 'block';
    
    modal.style.opacity = 0;
    modal.style.visibility = 'hidden';

    function showModal() {
        modal.style.transition = '.5s';
        modal.style.opacity = 1;
        // modal.style.display = 'block';
        document.querySelector('.modal__dialog').style.display = 'block';
        modal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        checkModal = false;
        window.removeEventListener('scroll', showModalByScroll);
        clearInterval(modalTime);
    }

    function closeModal() {
        modal.style.opacity = 0;
        modal.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.code === "Escape" && modal.style.display == 'block') {
            closeModal();
        }
    });

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    const modalTime = setTimeout(showModal, 25 * 1000);
    if (checkModal) {
        window.addEventListener('scroll', showModalByScroll);
    }   
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    const slide = document.querySelectorAll('.offer__slide');
    const prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current'),
            sliderWrapper = document.querySelector('.offer__slider-wrapper'),
            slidesField = document.querySelector('.offer__slider-inner'),
            width = window.getComputedStyle(sliderWrapper).width,
            img = document.querySelectorAll('img');
    let currentSlide = 0;
    let counterSlider = slide.length;
    let offset = 0;

    img.forEach(item => {
        item.style.userSelect = 'none';
    });
    slidesField.style.width = 100 * slide.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    total.textContent = checkNumber(counterSlider);
    current.textContent = checkNumber(currentSlide + 1);

    sliderWrapper.style.overflow = 'hidden';
    slide.forEach(item => {
        item.style.width = width;
    }); 
    next.addEventListener('click', () => {
        if(offset == retNumbers(width) * (slide.length - 1)) {
            offset = 0;
            currentSlide = 0;
        } else {
            offset += retNumbers(width);
            currentSlide ++;
        }
        removeDotsActive();
        dots[currentSlide].classList.add('active');
        current.textContent = checkNumber(currentSlide + 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    prev.addEventListener('click', () => {
        if(offset <= 0) {
            offset = retNumbers(width) * (slide.length - 1);
            currentSlide = slide.length - 1;
        } else {
            offset -= retNumbers(width);
            currentSlide --;
        }
        removeDotsActive();
        dots[currentSlide].classList.add('active');
        current.textContent = checkNumber(currentSlide + 1);
        slidesField.style.transform = `translateX(-${offset}px)`;
    });
    // function hideSlide() {
    //     slide.forEach((item) =>{
    //     item.classList.add('hide');
    // });
    // }
    // function checkSlider() {
    //     if(currentSlide == -1) {
    //         currentSlide = counterSlider - 1;
    //     }else if(currentSlide == counterSlider) {
    //         currentSlide = 0;
    //     }
    // }
    // function showSlide() {
    //     slide.forEach((item, i) =>{
    //     if(currentSlide == i) {
    //         item.classList.add('show');
    //         item.classList.remove('hide');
    //     }
        
    // });
    // }
    
    function checkNumber(num) {
        if(num >= 0 && num <10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    // function slider() {
    //     const prev = document.querySelector('.offer__slider-prev'),
    //         next = document.querySelector('.offer__slider-next'),
    //         total = document.querySelector('#total'),
    //         current = document.querySelector('#current');
    //     total.textContent = checkNumber(counterSlider);
    //     current.textContent = checkNumber(currentSlide + 1);
    //     prev.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         currentSlide --;
    //         checkSlider();
    //         current.textContent = checkNumber(currentSlide + 1);
    //         hideSlide();
    //         showSlide();
    //     });
    //     next.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         currentSlide ++;
    //         checkSlider();
    //         current.textContent = checkNumber(currentSlide + 1);
    //         hideSlide();
    //         showSlide();
    //     });
    //     hideSlide();
    //     showSlide();
    // }
    // slider();

    // Slider dots 
    const dotsWrapper = document.querySelector('.carousel-indicators'),
        clider = document.querySelector('.offer__slider');
    clider.style.position = 'relative';
    for(let i = 0; i < slide.length; i++) {
        const dots = document.createElement('div');
        dotsWrapper.append(dots);
        dots.classList.add('dot');
    }

    function retNumbers(n) {
        return +n.replace(/\D/g, '');
    }

    function removeDotsActive() {
        dots.forEach(item => {
            item.classList.remove('active');
        });
    }

    const dots = document.querySelectorAll('.dot');
    dots[0].classList.add('active');
    dots.forEach((item, i) => {
        item.addEventListener('click', () =>{
            offset = retNumbers(width) * i;
            currentSlide = i;
            current.textContent = checkNumber(currentSlide + 1);
            removeDotsActive();
            item.classList.add('active');
            slidesField.style.transform = `translateX(-${offset}px)`;
        });
    });
}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item '),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabcontainer');

    const hideTabContent = function () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    };
    const showTabContent = function (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    };
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function Timer() {
    const deadline = '2022-03-9';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);
        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num < 10 && num >= 0) {
            num = '0' + num;
        }
        return num;
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {

            const t = getTimeRemaining(endTime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('.timer', deadline);
}

module.exports = Timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        card = __webpack_require__(/*! ./modules/card */ "./js/modules/card.js"),
        calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        form = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
        
        tabs();
        modal();
        timer();
        card();
        calc();
        form();
        slider();
    
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map