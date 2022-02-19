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