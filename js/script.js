window.addEventListener('DOMContentLoaded', () => {

    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item '),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabcontainer');

    const hideTabContent = function() {
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
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item) {
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
            if(t <= 0) {
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
        if(num < 10 && num >= 0) {
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
        modalClose = document.querySelector('[data-close]'),
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

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', e => {
        if(e.code === "Escape" && modal.style.display == 'block') {
            closeModal();
        }
    });

    function showModalByScroll() {
        if(window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    const modalTime = setTimeout( showModal, 5 * 1000);
    if(checkModal) {
        window.addEventListener('scroll', showModalByScroll);
    }
    
});
