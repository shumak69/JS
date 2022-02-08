'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const ads = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        bg = document.querySelector('.promo__bg'),
        list = document.querySelector('.promo__interactive-list'),
        addingInput = document.querySelector('.adding__input'),
        form = document.querySelector('form.add'),
        checkbox = document.querySelector('input[type="checkbox"]');
    
    ads.forEach(item => {
        item.remove();
    });
    genre.innerHTML = 'Драма';
    bg.style.background = 'url(img/bg.jpg)';
    const additem = function()  {
        list.innerHTML = '';
        movieDB.movies.sort();
        movieDB.movies.forEach((item, i) => {
            list.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${item}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((deleting, i) => {
            deleting.addEventListener('click', () => {
                deleting.parentElement.remove();
                movieDB.movies.splice(i, 1);
                // movieDB.movies[i].remove();

                additem();
            });
        });
    };
    
    additem();
    


    form.addEventListener('submit', e => {
        e.preventDefault();
        if(addingInput.value != '') {
            if(21 < addingInput.value.length) {
                addingInput.value = addingInput.value.slice(0, 20) + '...';
                console.log(addingInput.value);
            }
            movieDB.movies.push(addingInput.value);
            additem();
            // addingInput.value = '';
            
            if(checkbox.checked) {
                console.log("Добавляем любимый фильм");
            }
           e.target.reset();
        }
    });
    // deleteMovie.forEach((item, i) => {
    //     item.addEventListener('click', () => {
    //         // movieDB.movies[i].remove();
    //         console.log( movieDB.movies);
    //     });
    // });
});
