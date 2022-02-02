"use strict";

const numberOfFilmls = +prompt('Сколько фильмос вы уже посмотрели','');
const personalMovideDB = {
    count: numberOfFilmls,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

if(personalMovideDB.count < 10 && personalMovideDB.count >= 1) {
    alert("Просмотрено довольно мало фильмов");
} else if (personalMovideDB.count < 30 && personalMovideDB.count >= 10){
    alert("Вы классический зритель");
    
} else if (personalMovideDB.count >= 30 && personalMovideDB.count >= 30) {
    alert("Вы киноман");
} else {
    alert("Произошла ошибка");
}

// for (let i = 1; i <= 2; i++) {
//     const question1 = prompt('Один из последних просмотреных фильмов?',''),
//         question2 = prompt('На сколько оцените его?','');
//     if (question1 != null && question2 != null && question1 != '' && question2 != '' && question1.length < 50) {
//         personalMovideDB.movies[question1] = question2;
//         console.log('done');
//     }   else{
//         console.log('error');
//         i--;
//     }
    
// }

let i = 1;

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

do {
    i++;
    const question1 = prompt('Один из последних просмотреных фильмов?',''),
        question2 = prompt('На сколько оцените его?','');
    if (question1 != null && question2 != null && question1 != '' && question2 != '' && question1.length < 50) {
        personalMovideDB.movies[question1] = question2;
        console.log('done');
    }   else{
        console.log('error');
        i--;
        continue;
    }
    
}
while(i <= 2);

console.log(personalMovideDB);

