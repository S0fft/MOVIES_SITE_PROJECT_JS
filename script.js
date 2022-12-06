'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

document.querySelector(".promo__genre").textContent = "Драмма";
document.querySelector(".promo__bg").style.backgroundImage = "url('img/bg.jpg')";
document.querySelectorAll(".promo__adv img").forEach(function (items) {
    items.remove();
});

const siteMovieList = document.querySelector(".promo__interactive-list");
const addForm = document.querySelector(".add");
const userFilm = document.querySelector(".adding__input");
const checkBox = document.querySelector("input[type=checkbox]");

function createMovieList(arrMovie, siteElement) {
    siteElement.innerHTML = "";
    arrMovie.sort();

    arrMovie.forEach(function (films, index) {
        siteElement.innerHTML += `
        <li class="promo__interactive-item"> ${index + 1} ${films}
            <div class="delete"></div>
        </li>`
    });
    document.querySelectorAll(".delete").forEach(function (btn, i) {
        btn.addEventListener("click", function () {
            arrMovie.splice(i, 1);
            createMovieList(movieDB.movies, siteMovieList);
        });
    })
}
createMovieList(movieDB.movies, siteMovieList);
// У нас на сайте есть список фильмов, которые нужно удалить и заполнить данными из обьекта который выше. Мы создаем функцию, которая чистит наш
// первоночальный элемент, после фильтрует. После, мы перебираем наши новые фильмы, который через innerHTML вписываем в "тег", добовляе к ним index (номер).
// Рядом с названием фильма на сайте есть кнопка "Удалить". Мы собираем колекцию из этих кнопок, вешаем на них слушатель, который срабатывает по нажатию и удаляет
// с нашего массива конкертный элемент, и после того как в массиве удален элемент мы вызываем функцию createMovieList (РЕКУРСИЯ) которая занаво отчищает наш массив
// сортирует элементы и добовляет их на стариницу (только уже без удаленного фильма).

addForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let userFilmAsk = userFilm.value;
    let favorit = checkBox.checked;

    if (userFilmAsk.length > 21) {
        userFilmAsk = userFilmAsk.substring(0, 22) + "...";
    }
    movieDB.movies.push(userFilmAsk);

    createMovieList(movieDB.movies, siteMovieList);

    if (favorit) {
        console.log("Добовляем любимый фильм!");
    }
});
