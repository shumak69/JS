"use strict";

const numberOfFilmls = +prompt('Сколько фильмос вы уже посмотрели','');
const personalMovideDB = {
    count: numberOfFilmls,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

const question1 = prompt('Один из последних просмотреных фильмов?','');
const question2 = prompt('На сколько оцените его?','');
const question3 = prompt('Один из последних просмотреных фильмов?','');
const question4 = prompt('На сколько оцените его?','');

personalMovideDB.movies[question1] = question2;
personalMovideDB.movies[question3] = question4;

console.log(personalMovideDB);