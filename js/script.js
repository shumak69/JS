"use strict";
const personalMovideDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        personalMovideDB.count = +prompt('Сколько фильмос вы уже посмотрели','');
        while(personalMovideDB.count == '' || personalMovideDB.count == null || isNaN(personalMovideDB.count)) {
            personalMovideDB.count = +prompt('Сколько фильмос вы уже посмотрели','');
        }
    },
    detectPersonalLevel: function() {
        if(personalMovideDB.count < 10 && personalMovideDB.count >= 1) {
            alert("Просмотрено довольно мало фильмов");
        } else if (personalMovideDB.count < 30 && personalMovideDB.count >= 10){
            alert("Вы классический зритель");
            
        } else if (personalMovideDB.count >= 30 && personalMovideDB.count >= 30) {
            alert("Вы киноман");
        } else {
            alert("Произошла ошибка");
        }
    },
    rememberMyFilms: function() {
        for (let i = 1; i <= 2; i++) {
            const question1 = prompt('Один из последних просмотреных фильмов?',''),
                question2 = prompt('На сколько оцените его?','');
            if (question1 != null && question2 != null && question1 != '' && question2 != '' && question1.length < 50) {
                personalMovideDB.movies[question1] = question2;
                console.log('done');
            }   else{
                console.log('error');
                i--;
            }
            
        }
    },
    showMyDB: function(privat) {
        if(!privat) {
            console.log(personalMovideDB);
        }
    },
    writeYourGenres: function() {
        for (let i = 0; i < 3; i++) {
            personalMovideDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i + 1}`, '');
            if(personalMovideDB.genres[i] == null || personalMovideDB.genres[i] == '') {
                    i--;
            }
        }
        personalMovideDB.genres.forEach(function (item, i) {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        });
    },
    toggleVisibleMyDB: function() {
        if(personalMovideDB.privat) {
            personalMovideDB.privat = false;
        } else {
            personalMovideDB.privat = true;
        }
    }
};

// personalMovideDB.start();
// personalMovideDB.detectPersonalLevel();
// personalMovideDB.rememberMyFilms();
personalMovideDB.toggleVisibleMyDB();
personalMovideDB.showMyDB(personalMovideDB.privat);


// personalMovideDB.writeYourGenres();


// rememberMyFilms();

// let i = 1;

// while (i <= 2) {
//     const question1 = prompt('Один из последних просмотреных фильмов?',''),
//         question2 = prompt('На сколько оцените его?','');
//     if (question1 != null && question2 != null && question1 != '' && question2 != '' && question1.length < 50) {
//         personalMovideDB.movies[question1] = question2;
//         console.log('done');
//     }   else{
//         console.log('error');
//         continue;
//     }
//     i++;
// }

// do {
//     i++;
//     const question1 = prompt('Один из последних просмотреных фильмов?',''),
//         question2 = prompt('На сколько оцените его?','');
//     if (question1 != null && question2 != null && question1 != '' && question2 != '' && question1.length < 50) {
//         personalMovideDB.movies[question1] = question2;
//         console.log('done');
//     }   else{
//         console.log('error');
//         i--;
//         continue;
//     }
    
// }
// while(i <= 2);


