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