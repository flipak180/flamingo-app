import {randomColor} from "@/utils/helper";

export default [
    {
        id: 5,
        type: 'Пешеходный квест',
        title: 'История Рыбацкого',
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
        id: 2,
        type: 'Квест',
        title: 'Король и Шут. Между Купчино и Ржевкой',
        image: 'images/2.jpg',
        totalPlaces: 0,
        places: [],
    },
]
