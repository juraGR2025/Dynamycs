document.addEventListener('DOMContentLoaded', function () {

    const questions = [
        { image: './source/Vopros_1.jpg', question: 'Что такое колебания?', responseOptions: 4, answer: 'B' },
        { image: './source/Vopros_2.jpg', question: 'В чём измеряется частота колебаний?', responseOptions: 4, answer: 'B' },
        { image: './source/Vopros_3.jpg', question: 'Какой редуктор входит в состав механизма подъёма груза?', responseOptions: 4, answer: 'D' },
        { image: './source/Vopros_4.jpg', question: 'Что позволяет определить обработка записи осциллографа?', responseOptions: 3, answer: 'C' },
        { image: './source/Vopros_5.jpg', question: 'Какая команда подается при выявлении неисправности в ходе эксперимента?', responseOptions: 4, answer: 'B' },
        { image: './source/Vopros_6.jpg', question: 'Каким выражением определяется период колебаний математического маятника?', responseOptions: 4, answer: 'D' },
        { image: './source/Vopros_7.jpg', question: 'Гармонические колебания это такие колебания, которые описываются уравнением ..., где омега это?', responseOptions: 3, answer: 'B' },
        { image: './source/Vopros_8.jpg', question: 'Каким отрезком на графике представлен период колебания тела?', responseOptions: 3, answer: 'A' },
        { image: './source/Vopros_9.jpg', question: 'В каких единицах измеряется частота?', responseOptions: 3, answer: 'B' },
        { image: './source/Vopros_10.jpg', question: 'Какой тип кранов предназначен для работы в прямоугольной зоне?', responseOptions: 3, answer: 'B' },
        { image: './source/Vopros_11.jpg', question: 'Что такое траверса?', responseOptions: 3, answer: 'A' },
        { image: './source/Vopros_12.jpg', question: 'Что относится к гибким элементам ГПМ?', responseOptions: 3, answer: 'C' },
        { image: './source/Vopros_13.jpg', question: 'Выберите примеры штатной работы ГПМ?', responseOptions: 6, answer: 'B,C,E,F' },
        { image: './source/Vopros_14.jpg', question: 'Укажите слагаемое, характеризующее статическую деформацию.', responseOptions: 3, answer: 'B' },
        { image: './source/Vopros_15.jpg', question: 'Какие характеристики являются основными для колебательных процессов?', responseOptions: 3, answer: 'C' },
        { image: './source/Vopros_16.jpg', question: 'Какой инструктаж проводится с целью напоминания основных правил безопасности?', responseOptions: 4, answer: 'D' }
    ];

    // Перемешиваем массив вопросов
    shuffleArray(questions);

    // Оставляем только первые 10 вопросов
    const limitedQuestions = questions.slice(0, 10);

    let currentQuestionIndex = 0;
    let results = []; // Массив для хранения результатов

    // 🔴 ВАША ФУНКЦИЯ ОБРАБОТКИ ДАННЫХ УЧАЩИХСЯ 🔴
    var btnFIO = document.getElementById("fio-write");

    function buttonFIOclicked() {
        var FIOtext = document.getElementById('cadetName');
        var resultName = document.getElementById('groupNumber');

        var lblName = document.getElementById("Name");
        lblName.innerHTML = FIOtext.value;

        var lblGroup = document.getElementById("groupN");
        lblGroup.innerHTML = resultName.value;

        FIOtext.value = ''; // Обнуляем значение переменной в элементе input.
        FIOtext.hidden = true; // Прячем input.
        resultName.value = ''; // Обнуляем значение переменной в элементе input.
        resultName.hidden = true; // Прячем input.

        btnFIO.disabled = true; // Делаем кнопку неактивной.

        // Показываем кнопку "Выполнить тест"
        const startBtn = document.getElementById('start-test-btn');
        startBtn.style.display = 'block';
    }
// Добавляем слушателя для кнопки <button type="submit" id="fio-write">Принять</button>.
    btnFIO.addEventListener("click", buttonFIOclicked);


    // 🔵 КНОПКА НАЧАЛА ТЕСТА 🔵
    const startBtn = document.createElement('button');
    startBtn.id = 'start-test-btn';
    startBtn.className = 'start-button';
    startBtn.textContent = 'Выполнить тест';
    startBtn.style.display = 'none'; // Изначально скрыта

    // Размещаем кнопку в нужной секции
    const testSectionHeader = document.querySelector('.test-section h2');
    testSectionHeader.parentNode.insertBefore(startBtn, testSectionHeader.nextSibling);

    // Добавляем слушателя событий
    startBtn.addEventListener('click', beginTest);

    // Функция начала теста
    function beginTest() {
        startBtn.style.display = 'none'; // Прячем кнопку старта
        showNextQuestion(); // Показываем первый вопрос
    }

    // Функция для отображения следующего вопроса
    function showNextQuestion() {
        if (currentQuestionIndex >= limitedQuestions.length) {
            // Все вопросы закончены, показываем результаты
            document.getElementById('quiz-container').innerHTML = '';
            displayResults();
            return;
        }

        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = ''; // Очищаем контент предыдущего вопроса

        const questionData = limitedQuestions[currentQuestionIndex];
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card fade-in'; // Новый класс fade-in

        // Картинка вопроса
        const imgElem = document.createElement('img');
        imgElem.src = questionData.image;
        imgElem.alt = 'Вопрос';
        cardDiv.appendChild(imgElem);

        // Варианты ответов
        const options = [];
        for (let i = 0; i < questionData.responseOptions; i++) {
            const optionLetter = String.fromCharCode(65 + i); // Генерация букв A, B, C ...
            options.push(optionLetter);
        }

        // Блок для вариантов ответов
        const optionsBlock = document.createElement('div');
        optionsBlock.className = 'options';

        options.forEach((option) => {
            const optionLabel = document.createElement('label');
            const radioInput = document.createElement('input');
            radioInput.type = 'checkbox'; // Используем чекбокс, чтобы можно было выбирать несколько вариантов
            radioInput.name = 'answer';
            radioInput.value = option;

            optionLabel.textContent = `${option}`;
            optionLabel.prepend(radioInput);
            optionsBlock.appendChild(optionLabel);
        });

        cardDiv.appendChild(optionsBlock);

        // Кнопка для проверки ответа
        const submitButtonWrapper = document.createElement('div'); // Новый div-обёртка
        submitButtonWrapper.className = 'check-answer-wrapper';

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Проверить ответ';
        submitButton.onclick = checkAnswer;
        submitButtonWrapper.appendChild(submitButton);

        cardDiv.appendChild(submitButtonWrapper); // Прилепляем wrapper с кнопкой к карточке

        quizContainer.appendChild(cardDiv);
    }

    // Функция для проверки ответа
    function checkAnswer() {
        const checkedOptions = [...document.querySelectorAll('input[name="answer"]:checked')]
            .map(input => input.value)
            .sort()
            .join(', ');

        const correctAnswer = limitedQuestions[currentQuestionIndex].answer.split(',')
            .map(answer => answer.trim()) // Удаляем лишние пробелы
            .sort()
            .join(', ');

        const isCorrect = checkedOptions === correctAnswer;

        // Сохраняем результат в массив
        results.push({
            question: limitedQuestions[currentQuestionIndex].question, // Только тут сохраняется вопрос
            answerGiven: checkedOptions,
            isCorrect: isCorrect
        });

        // Индикатор правильного/неправильного ответа
        const resultIndicator = document.createElement('span');
        resultIndicator.className = isCorrect ? 'result-correct' : 'result-incorrect';
        resultIndicator.textContent = isCorrect ? '✅' : '❌';

        // Родительская карточка
        const parentCard = document.querySelector('.card');

        // Получаем кнопку проверки и её обёртку
        const submitButtonWrapper = parentCard.querySelector('.check-answer-wrapper');

        // Добавляем индикатор справа от кнопки
        submitButtonWrapper.appendChild(resultIndicator);

        // Затем начинаем процесс выхода карточки (добавляем класс fade-out)
        parentCard.classList.add('fade-out');

        // По завершении анимации удаляем карточку и показываем следующий вопрос
        setTimeout(() => {
            parentCard.remove();
            currentQuestionIndex++;
            showNextQuestion();
        }, 1000); // Время анимации (1 секунда)
    }

    // Функция для перемешивания массива вопросов
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Функционал для отображения результатов
    function displayResults() {
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'results';
        resultsContainer.className = 'results';

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';

            const questionSpan = document.createElement('span');
            questionSpan.textContent = result.question; // Выводим вопрос в результатах

            const indicatorSpan = document.createElement('span');
            indicatorSpan.className = result.isCorrect ? 'result-correct' : 'result-incorrect';
            indicatorSpan.textContent = result.isCorrect ? '✅' : '❌';

            resultItem.appendChild(questionSpan);
            resultItem.appendChild(indicatorSpan);

            resultsContainer.appendChild(resultItem);
        });

        document.getElementById('quiz-container').appendChild(resultsContainer);
    }

    // Функция для кнопок пульта мостового крана.
    document.querySelectorAll('.dir-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log(`Нажата кнопка ${btn.classList.contains('up') ? 'Вверх' : btn.classList.contains('down') ? 'Вниз' : btn.classList.contains('left') ? 'Влево' : btn.classList.contains('right') ? 'Вправо' : btn.classList.contains('forward') ? 'Вперед' : 'Назад'}`);
        });
    });

    document.getElementById('stopButton').addEventListener('click', () => {
        console.log('Нажата кнопка СТОП');
    });

 // Функция для завершения лабораторной работы. Обучающийся набирает вывод в элементе <textarea id="comments" name="comments" placeholder="Введите ваш вывод здесь"></textarea>
 // и сохраняет его на странице в элементе <div id="txt-finding"></div>.
    var btnFinding = document.getElementById("finding-write");

    function buttonFindingClicked() {
        var findingText = document.getElementById('comments');
        var divFinding = document.getElementById("txt-finding");
        divFinding.innerHTML = findingText.value;

        findingText.value = ''; // Обнуляем значение переменной в элементе input.

    }
// Добавляем слушателя для кнопки <button type="submit" id="fio-write">Принять</button>.
    btnFinding.addEventListener("click", buttonFindingClicked);

//----------------------------------------

const gsp = 9.8;              // ускорение свободного падения
const E_k = 1.2e+11;          // модуль упругости
const F_k = 0.0001;           // площадь поперечного сечения каната
const n_p = 1.0;              // количество полиспастов
const a_p = 2.0;              // кратность полиспаста
const M_1 = 200.0;            // приведённая масса барабана
const P_n = 15000;            // начальная сила привода

// Функция для генерации случайного числа в заданном диапазоне
    function generateRandomLength(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Генерируем случайную длину каната при загрузке страницы
    const L_k = generateRandomLength(8, 15); // Длина каната теперь варьируется от 8 до 20 м.

    class GraficsPanel {
        constructor(canvasId) {
            const canvas = document.getElementById(canvasId);

            this.ctx = canvas.getContext('2d');
            this.ctx.lineWidth = 1; // Толщина линии в пикселах
            this.width = canvas.width;
            this.height = canvas.height;
            this.ctx.clearRect(0, 0, this.width, this.height);
console.log('Панель создана!');

        }
        // Очистка холста перед работой
                clearCanvas() {

                    this.ctx.clearRect(0, 0, this.width, this.height);
                    console.log('Холст очищен!');
                }
    clearAndDrawGrid() {

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.strokeStyle = 'red';
        this.ctx.beginPath();

        // Горизонтальные линии сетки
        [...Array(5)].forEach((_, i) => {
            this.ctx.moveTo(0, i * 34 + 7);   // Линии идут сверху вниз
            this.ctx.lineTo(this.width, i * 34 + 7);
        });

        // Вертикальные линии сетки
        [...Array(6)].forEach((_, i) => {
            this.ctx.moveTo(i * 46 + 38, 0);     // Линии идут слева направо
            this.ctx.lineTo(i * 46 + 38, this.height);
        });

        this.ctx.stroke();
    }

    drawLabels(Function_1, Function_2, Function_3, Function_4) {
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = 'blue'; // Цвет подписей координатной сетки - голубой.

        if (Function_3 === 0 || Function_4 === 0) { // Подписи для вертикальных колебаний
            this.ctx.fillText("0", 6, 86); // Время
            this.ctx.fillText("0.2", 51, 86);
            this.ctx.fillText("0.4", 97, 86);
            this.ctx.fillText("0.6", 144, 86);
            this.ctx.fillText("0.8", 190, 86);
            this.ctx.fillText("1.0", 235, 86);
            this.ctx.fillText("1.2", 279, 86);

            this.ctx.fillText("0.02", 14, 140); // Амплитуда
            this.ctx.fillText("0.04", 14, 106);
            this.ctx.fillText("0.06", 14, 72);
            this.ctx.fillText("0.08", 14, 38);

        }

        if (Function_1 === 0 || Function_2 === 0) { // Подписи для горизонтальных колебаний
            this.ctx.fillText("0", 6, 86); // Время
            this.ctx.fillText("2", 47, 86);
            this.ctx.fillText("4", 93, 86);
            this.ctx.fillText("6", 140, 86);
            this.ctx.fillText("8", 186, 86);
            this.ctx.fillText("10", 234, 86);
            this.ctx.fillText("12", 279, 86);

            this.ctx.fillText("5", 10, 140); // Амплитуда
            this.ctx.fillText("4", 10, 106);
            this.ctx.fillText("3", 10, 72);
            this.ctx.fillText("2", 10, 38);
            this.ctx.fillText("1", 10, 4);
        }

    }

drawGraph(MG_1, count_gr, Function_1, Function_2, Function_3, Function_4) {
    let с_k, p_k, Qgr, A, t, Apos, tpos, p_qrkv, jhor, Ahor, thor, Ahorpos, thorpos;

    const ctx = this.ctx;
    ctx.strokeStyle = '#666666';
    ctx.beginPath();

    // Определение цветов и шрифтов для подписей
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = 'black';

    // Подпись для массы груза и длины каната
    ctx.fillText(`Приведённая масса: ${MG_1.toFixed(2)} кг`, 180, 20);
    ctx.fillText(`Длина каната: ${L_k.toFixed(2)}m`, 180, 35);

this.ctx.fillStyle = 'green';// Здесь выбирается цвет графиков - зеленый.

    if (count_gr > 0 && (Function_3 === 0 || Function_4 === 0)) { // Вертикальное колебание
        с_k = (E_k * F_k * n_p * a_p) / L_k;
        p_k = Math.sqrt(с_k / M_1 + с_k / MG_1);
        Qgr = gsp * MG_1;

        // Вернули исходный шаг по времени
        for (let t = 0; t <= 100; t += 0.01) {
            A = (-(Qgr / с_k - P_n / (MG_1 * Math.pow(p_k, 2))) *
                 Math.exp(-1.2 * t * 0.004) * Math.cos(t * 0.004 * p_k)
               ) + (
                   (Qgr / Math.pow(p_k, 2)) * ((M_1 + MG_1) / (M_1 * MG_1)) *
                   (1 - Math.cos(t * 0.004 * p_k)) * Math.exp(-1.2 * t * 0.004)
               ) - (
                   (1 / (MG_1 * Math.pow(p_k, 2))) *
                   (P_n + (P_n - Qgr) * (Math.exp(5 / (M_1 + MG_1)) - 1))
               );

            // Коэффициент масштабирования по Y (увеличим амплитуду)
            const scaleY = this.height*10; // коэффициент масштабирования по вертикали
            const shiftY = this.height/2 - MG_1/200 ; // Смещение по вертикали вверх, чтобы график был ближе к центру

            // Новые координаты с учётом масштабирования и смещения
            Apos = shiftY + A * scaleY;
            tpos = Math.floor(t * 4); // уменьшение масштаба по Х для лучшего заполнения

            ctx.fillRect(tpos, Apos, 2, 2);
        }
    }

    if (count_gr > 0 && (Function_1 === 0 || Function_2 === 0)) { // Горизонтальное колебание
        Qgr = gsp * MG_1;
        p_qrkv = (Qgr / L_k) * (1 / M_1 + 1 / MG_1);
        jhor = P_n / M_1;

        // Вернули исходный шаг по времени
        for (let thor = 0; thor <= 300; thor += 0.1) {
            Ahor = -jhor / p_qrkv * (1 - Math.cos(thor * 0.02 * Math.sqrt(p_qrkv)));

            // Коэффициент масштабирования по Y (увеличим амплитуду)
            const scaleYHor = 3; // коэффициент масштабирования по вертикали для горизонтальных колебаний

            const shiftYHor = this.height/(0.4*Math.log10(MG_1)); // Смещение по вертикали вверх, чтобы график был ближе к центру (для массы = 3000 кг) (MG_1*0.0012)

            // Новые координаты с учётом масштабирования и смещения
            Ahorpos = shiftYHor + Ahor * scaleYHor;
            thorpos = Math.floor(thor); // уменьшение масштаба по Х для лучшего заполнения

            ctx.fillRect(thorpos, Ahorpos, 2, 2);
        }
    }

    ctx.stroke();
}
}


// Сама функция осталась прежней
function reloadPageWithNewData() {
    // Массив ID для наших графиков
    const graphIds = ['graph1', 'graph2', 'graph3', 'graph4', 'graph5', 'graph6'];

    // Формируем данные для трёх масс и двух видов колебаний
    const masses = [1000, 2000, 3000]; // Приведённые массы
    const oscillationTypes = [
        {type: 'vertical'},
        {type: 'horizontal'}
    ];

    // Повторно создаём панели для каждого графика
    graphIds.forEach((id, idx) => {
        const massIndex = Math.floor(idx / 2); // Индекс массы
        const typeIndex = idx % 2; // Тип колебаний (вертикальный или горизонтальный)

        const currentMass = masses[massIndex];
        const currentType = oscillationTypes[typeIndex].type;

        const panel = new GraficsPanel(id);
        panel.clearCanvas();
        panel.clearAndDrawGrid(); // Очистка и создание сетчатой структуры

        // Настройка флагов в зависимости от типа колебаний
        const flags = {};
        if (currentType === 'vertical') {
            flags.Function_3 = 0; // Включено вертикальное колебание
            flags.Function_4 = 1;
        } else {
            flags.Function_1 = 0; // Включено горизонтальное колебание
            flags.Function_2 = 1;
        }

        panel.drawLabels(flags.Function_1, flags.Function_2, flags.Function_3, flags.Function_4); // Рисуем подписи осей
        panel.drawGraph(currentMass, 1, flags.Function_1, flags.Function_2, flags.Function_3, flags.Function_4); // Отображение самого графика
    });

}

// 📌 Кнопка для перерисовки графиков
    var chartBuilderButton = document.getElementById('chart-builder');

    // 📌 Новая функция для перерисовки графиков
     // 🖍️ Функция для перерисовки графиков
        function renderGraphs() {
            // Массив ID для наших графиков
            const graphIds = ['graph1', 'graph2', 'graph3', 'graph4', 'graph5', 'graph6'];

            // Формируем данные для трёх масс и двух видов колебаний
            const masses = [1000, 2000, 3000]; // Приведённые массы
            const oscillationTypes = [
                {type: 'vertical'},
                {type: 'horizontal'}
            ];

            // Повторно создаём панели для каждого графика
            graphIds.forEach((id, idx) => {
                const massIndex = Math.floor(idx / 2); // Индекс массы
                const typeIndex = idx % 2; // Тип колебаний (вертикальный или горизонтальный)

                const currentMass = masses[massIndex];
                const currentType = oscillationTypes[typeIndex].type;

                const panel = new GraficsPanel(id);

                // Настройка флагов в зависимости от типа колебаний
                const flags = {};
                if (currentType === 'vertical') {
                    flags.Function_3 = 0; // Включено вертикальное колебание
                    flags.Function_4 = 1;
                } else {
                    flags.Function_1 = 0; // Включено горизонтальное колебание
                    flags.Function_2 = 1;
                }


                // 👈👆🤝 ЭТО КЛЮЧЕВЫЙ МОМЕНТ! ОЧИСТКА ХОЛСТА ДО НАРИСОВКИ!
                panel.clearCanvas(); // Очистка холста перед прорисовкой
                panel.clearAndDrawGrid(); // Создание новой сетки
                panel.drawLabels(flags.Function_1, flags.Function_2, flags.Function_3, flags.Function_4); // Рисуем подписи осей
                panel.drawGraph(currentMass, 1, flags.Function_1, flags.Function_2, flags.Function_3, flags.Function_4); // Отображение самого графика
            });
        }

    // 🎯 Присоединяем обработчик события к кнопке
    if (chartBuilderButton) {
        chartBuilderButton.addEventListener('click', renderGraphs);
    } else {
        console.error('Кнопка с id="chart-builder" не найдена.');
    }

});