"use strict";

let numberOfFilmls;

function start() {
    numberOfFilmls = +prompt('Сколько фильмос вы уже посмотрели','');
    while(numberOfFilmls == '' || numberOfFilmls == null || isNaN(numberOfFilmls)) {
        numberOfFilmls = +prompt('Сколько фильмос вы уже посмотрели','');
    }
}

start();

const personalMovideDB = {
    count: numberOfFilmls,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};



function detectPersonalLevel() {
    if(personalMovideDB.count < 10 && personalMovideDB.count >= 1) {
        alert("Просмотрено довольно мало фильмов");
    } else if (personalMovideDB.count < 30 && personalMovideDB.count >= 10){
        alert("Вы классический зритель");
        
    } else if (personalMovideDB.count >= 30 && personalMovideDB.count >= 30) {
        alert("Вы киноман");
    } else {
        alert("Произошла ошибка");
    }
}

detectPersonalLevel();

function rememberMyFilms() {
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
}

rememberMyFilms();

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
function showMyDB(privat) {
    if(!privat) {
        console.log(personalMovideDB);
    }
}

showMyDB(personalMovideDB.privat);

function writeYourGenres() {
    for (let i = 0;i < 3; i++) {
        personalMovideDB.genres[i] = prompt(`Ваш любимый жанр под номером ${i + 1}`, '');
    }
}

writeYourGenres();