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