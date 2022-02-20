import { postData } from "../services/services";

function modal(formSelector) {
 
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
        modal.style.display = 'block';
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
        modal.style.display = 'none';
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
        const forms = document.querySelectorAll(formSelector);
    
        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся',
            failure: 'Что-то пошло не так...'
        };
    
        forms.forEach(item => {
            bindPostData(item);
        });
    
        
    
    
    
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
                    
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                    statusMessage.remove();
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

export default modal;