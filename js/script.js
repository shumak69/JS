window.addEventListener('DOMContentLoaded', () => {

    // Tabs

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

    // Timer
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

    // Modal

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

    // Cards

    // class Card {
    //     constructor(title, descr, price, img, alt, parentSelector, ...classes) {
    //         this.title = title;
    //         this.descr = descr;
    //         this.price = price;
    //         this.classes = classes;
    //         this.img = img;
    //         this.parentSelector = document.querySelector(parentSelector);
    //         this.alt = alt;
    //         this.trasfer = 27;
    //         this.changeToUAH();
    //     }

    //     changeToUAH() {
    //         this.price = this.price * this.trasfer;
    //     }

    //     render() {
    //         const element = document.createElement('div');
    //         if (this.classes.length === 0) {
    //             this.classes = 'menu__item';
    //             element.classList.add(this.classes);
    //         } else {
    //             this.classes.forEach(className => element.classList.add(className));
    //         }
    //         element.innerHTML = `
    //             <img src=${this.img} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">${this.descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //             </div>
    //         `;
    //         this.parentSelector.append(element);
    //     }
    // }

    const getCards = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${fetch.status}`);
        }

        return  await res.json();
    };

    // getCards('http://localhost:3000/menu').then(data => {
    //     data.forEach(({title, descr, price, img, altimg}) => {
    //         new Card(title, descr, price, img, altimg, '.menu .container').render();
    //     });
    // });

    getCards('http://localhost:3000/menu').then(data => createCard(data));

    function createCard(data) {
        data.forEach(({title, descr, price, img, altimg}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');
            price*=27;
            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `

            document.querySelector('.menu .container').append(element);
        }); 
    }

    // new Card(
    //     'Меню "Фитнес"', `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`, 9, "img/tabs/vegy.jpg", "vegy", '.menu .container'
    // ).render();
    // new Card(
    //     'Меню “Премиум”', `Меню "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`, 20, "img/tabs/elite.jpg", "elite", '.menu .container'
    // ).render();
    // new Card(
    //     'Меню "Постное"', `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`, 16, "img/tabs/post.jpg", "post", '.menu .container',
    // ).render();

    // Forms
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

    // Slider

    const slide = document.querySelectorAll('.offer__slide');
    let currentSlide = 0;
    let counterSlider = slide.length;
    function hideSlide() {
        slide.forEach((item) =>{
        item.classList.add('hide');
    });
    }
    function checkSlider() {
        if(currentSlide == -1) {
            currentSlide = counterSlider - 1;
        }else if(currentSlide == counterSlider) {
            currentSlide = 0;
        }
    }
    function showSlide() {
        slide.forEach((item, i) =>{
        if(currentSlide == i) {
            item.classList.add('show');
            item.classList.remove('hide');
        }
        
    });
    }
    
    function checkNumber(num) {
        if(num >= 0 && num <10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function slider() {
        const prev = document.querySelector('.offer__slider-prev'),
            next = document.querySelector('.offer__slider-next'),
            total = document.querySelector('#total'),
            current = document.querySelector('#current');
        total.textContent = checkNumber(counterSlider);
        current.textContent = checkNumber(currentSlide + 1);
        prev.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide --;
            checkSlider();
            current.textContent = checkNumber(currentSlide + 1);
            hideSlide();
            showSlide();
        });
        next.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide ++;
            checkSlider();
            current.textContent = checkNumber(currentSlide + 1);
            hideSlide();
            showSlide();
        });
        hideSlide();
        showSlide();
    }
    slider();
});