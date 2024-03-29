import {randomColor} from "@/utils/helper";

export default [
    {
        id: 5,
        type: 'Подборка',
        title: 'Арт-пространства, культурные центры, креативные кластеры, общественные зоны',
        image: 'images/5.png',
        totalPlaces: 10,
        places: [
            {
                id: 1,
                title: 'Лофт Проект Этажи',
                image: randomColor(),
                lastVisit: null,
                atPlace: false,
            },
            {
                id: 2,
                title: 'Севкабель Порт',
                image: randomColor(),
                lastVisit: null,
                atPlace: true,
            },
            {
                id: 3,
                title: 'Новая Голландия',
                image: randomColor(),
                lastVisit: 1,
                atPlace: true,
            },
            {
                id: 4,
                title: 'Никольские ряды',
                image: randomColor(),
                lastVisit: 1,
                atPlace: true,
            }
        ],
    },
    {
        id: 4,
        type: 'Квест',
        title: 'Марафон по разводу мостов',
        image: 'images/4.jpg',
        totalPlaces: 0,
        places: [],
    },
    {
        id: 1,
        type: 'Подборка',
        title: 'Никто не забыт, ничто не забыто!',
        image: 'images/1.jpg',
        totalPlaces: 4,
        places: [
            {
                id: 1,
                title: 'Парк Победы',
                image: randomColor(),
                lastVisit: null,
                atPlace: false,
            },
            {
                id: 2,
                title: 'Музей блокады Ленинграда',
                image: randomColor(),
                lastVisit: null,
                atPlace: true,
            },
            {
                id: 3,
                title: 'Пискаревское мемориальное кладбище',
                image: randomColor(),
                lastVisit: 1,
                atPlace: true,
            }
        ],
    },
    {
        id: 2,
        type: 'Квест',
        title: 'Король и Шут. Между Купчино и Ржевкой',
        image: 'images/2.jpg',
        totalPlaces: 0,
        places: [],
    },
    {
        id: 3,
        type: 'Достопримечательность',
        title: 'Люблю тебя, Петра творенье',
        image: 'images/3.jpg',
        totalPlaces: 1,
        places: [
            {
                id: 1,
                title: 'Медный всадник',
                image: randomColor(),
                lastVisit: null,
                atPlace: false,
            },
        ],
    },
]
