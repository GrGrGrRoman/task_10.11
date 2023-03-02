const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

let colorClass = {
  'violet': 'fruit_violet',
  'green': "fruit_green",
  'carmazin': "fruit_carmazin",
  'yellow': 'fruit_yellow',
  'lightbrown': 'fruit_lightbrown',
};

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);
//console.log(fruits);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = null;
  for (let i = 0; i < fruits.length; i++) {
    // формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    const li = document.createElement('li');
    const divInfo = document.createElement('div');
    const divIndex = document.createElement('div');
    const divKind = document.createElement('div');
    const divColor = document.createElement('div');
    const divWeight = document.createElement('div');

    divIndex.innerText = 'index:' + i;
    divKind.innerText = 'kind:' + fruits[i].kind;
    divColor.innerText = 'color:' + fruits[i].color;
    divWeight.innerText = 'weight (кг):' + fruits[i].weight;

    divInfo.className = 'fruit__info';
    divInfo.appendChild(divIndex);
    divInfo.appendChild(divKind);
    divInfo.appendChild(divColor);
    divInfo.appendChild(divWeight);
    li.appendChild(divInfo);
    //соответствие цветов и фруктов
    if (fruits[i].kind == 'Мангустин') {
    li.classList.add('fruit__item', `${colorClass.violet}`);
  }
    if (fruits[i].kind == 'Дуриан') {
    li.classList.add('fruit__item', `${colorClass.green}`);
  }
    if (fruits[i].kind == 'Личи') {
    li.classList.add('fruit__item', `${colorClass.carmazin}`);
  }
    if (fruits[i].kind == 'Карамбола') {
    li.classList.add('fruit__item', `${colorClass.yellow}`);
  }
    if (fruits[i].kind == 'Тамаринд') {
    li.classList.add('fruit__item', `${colorClass.lightbrown}`);
  }
    fruitsList.appendChild(li);

  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let arrMixChk = false;

  while (fruits.length > 0) {
    // находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)

    const indexFruits = getRandomInt(0, fruits.length - 1); //вычисляем случайный индекс элемента из массива fruits
    const elem = fruits.splice(indexFruits, 1,); //удаляем случайный элемент из массива fruits и записываем его значение в переменную elem - это новый массив
    result.push(elem[0]); //добавляем в конец нового массива result значение, которое удалили из friits, это элемент массива, поэтому обращаемся по индексу
  }

  fruits = result;

  //проверка на то, было ли перемешивание
  for (let i = 0; i < result.length - 1; i++) {
    //let arrOriginal = [...fruits];
    let arrOriginal = JSON.parse(fruitsJSON);
    if (arrOriginal[i].kind == result[i].kind && arrOriginal[i].color == result[i].color && arrOriginal[i].weight == result[i].weight) {
      arrMixChk = true;
      console.log(arrOriginal);
    }
  }

  if (arrMixChk) alert('Перемешивание не удалось, повторите попытку!');

};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});


/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let minweight = parseInt(document.querySelector('.minweight__input').value);
  let maxweight = parseInt(document.querySelector('.maxweight__input').value);
  let item = fruits.filter((item) => {
    if (item.weight >= minweight && item.weight <= maxweight)
    return item;  
  });

  if (isNaN(minweight) || isNaN(maxweight)) {
    alert('Введите минимальное и максимальное значение веса!');
  };
  fruits = item;
}

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (color1, color2) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  // сортирую по алфавиту
return color1.color < color2.color ? true : false;
};
const sortAPI = {
  bubbleSort(fruits, comparationColor) {
    // TODO: допишите функцию сортировки пузырьком
    const n = fruits.length;
    // внешняя итерация по элементам
    for (let i = 0; i < n-1; i++) { 
        // внутренняя итерация для перестановки элемента в конец массива
        for (let j = 0; j < n-1-i; j++) { 
            // сравниваем элементы
            if (comparationColor(fruits[j], fruits[j+1])) { 
                // делаем обмен элементов
                let temp = fruits[j+1]; 
                fruits[j+1] = fruits[j]; 
                fruits[j] = temp; 
            }
        }
    }  
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
