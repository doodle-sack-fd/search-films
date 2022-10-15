const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const adv = document.querySelectorAll('.promo__adv img'),
    poster = document.querySelector('.promo__bg'),
    genre = poster.querySelector('.promo__genre'),
    movieList = document.querySelector('.promo__interactive-list');

// Удаление рекламных блоков со страницы
adv.forEach(item => {
    item.remove();
});

// Изменил жанр фильма
genre.textContent = 'Драма';

// Изменил задний фон постреа
poster.style.backgroundImage = 'url("./img/bg.jpg")';

// Очищение list с фильмами, их сортировка по алфавиту + нумерация
movieList.innerHTML = ' ';
movieDB.movies.sort();

// Каждый фильм, и номер по порядку
movieDB.movies.forEach((film, i) => {
    movieList.innerHTML += `
    <li class="promo__interactive-item">${i + 1} ${film}
        <div class="delete"></div>
    </li>
    `;
});
