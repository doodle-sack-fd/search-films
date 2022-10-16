// Код сработает, только тогда, когда DOM структура будет загружена
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

    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        formInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        // Записывает значение нового фильма от пользователя в перменную
        let newFilm = formInput.value;
        // Получение boolean значения у чекбокса, любимый/не любимый
        const favorite = checkbox.checked;
        // Если newFilm не пуст, условие выполнится.
        if (newFilm) {

            if (newFilm.length > 21) {
                //  Проверка длины строки, и в случае если больше 21 символа, добавляем ...
                newFilm = `${newFilm.substring(0, 22)}...`;
            }
            // Проверка чекбокса
            if (favorite) {
                console.log("Добавляем любимый фильм")
            }
            // Вносим фильм в массив movieDB и сортируем по алфавиту
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
            // Очищение формы. 2 Варианта:
            addForm.reset();
            // 2й способ, через evt
            // evt.target.reset();
        }

    });

    // Удаление рекламных блоков со страницы
    const deleteAdv = (arr) => {
        adv.forEach(item => {
            item.remove();
        });
    };

    deleteAdv(adv);

    const makeChanges = () => {
        // Изменил жанр фильма
        genre.textContent = 'Драма';
        // Изменил задний фон постреа
        poster.style.backgroundImage = 'url("./img/bg.jpg")';
    };

    makeChanges();

    const sortArr = (arr) => {
        arr.sort();
    };


    // 1-й аргумент, какие фильмы передаем, 2-й куда будем помещать (см.вызов функции)
    function createMovieList(films, parent) {
        // Очищение list с фильмами, их сортировка по алфавиту + нумерация
        parent.innerHTML = ' ';
        // Сортируем по алфавиту
        sortArr(films);
        // Каждый фильм, и номер по порядку
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i + 1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1);
                // Рекурсия, вызовывает сама себя, для повторной сортировки
                createMovieList(films, parent);
            });
        });
    }

    createMovieList(movieDB.movies, movieList);
});


