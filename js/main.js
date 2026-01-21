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
            // Очищаем контейнер с вопросами
            document.getElementById('quiz-container').innerHTML = '';
            displayResults(); // Завершение теста
            return;
        }

        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = ''; // очищаем контент предыдущего вопроса

        const questionData = limitedQuestions[currentQuestionIndex];
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        // Картинка вопроса
        const imgElem = document.createElement('img');
        imgElem.src = questionData.image;
        imgElem.alt = 'Вопрос';
        cardDiv.appendChild(imgElem);

        // Заголовок вопроса
        const labelText = document.createElement('p');
        labelText.textContent = questionData.question;
        cardDiv.appendChild(labelText);

        // Варианты ответов
        const options = [];
        for (let i = 0; i < questionData.responseOptions; i++) {
            const optionLetter = String.fromCharCode(65 + i); // Генерация букв A, B, C ...
            options.push(optionLetter);
        }

        options.forEach((option) => {
            const optionLabel = document.createElement('label');
            const radioInput = document.createElement('input');
            radioInput.type = 'checkbox'; // Используем чекбокс, чтобы можно было выбирать несколько вариантов
            radioInput.name = 'answer';
            radioInput.value = option;

            optionLabel.textContent = `${option}`;
            optionLabel.prepend(radioInput);
            cardDiv.appendChild(optionLabel);
        });

        // Кнопка для проверки ответа
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Проверить ответ';
        submitButton.onclick = checkAnswer;
        cardDiv.appendChild(submitButton);

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
            question: limitedQuestions[currentQuestionIndex].question,
            answerGiven: checkedOptions,
            isCorrect: isCorrect
        });

        // Показываем мгновенную реакцию
        const parentCard = document.querySelector('.card');
        const resultIndicator = document.createElement('span');
        resultIndicator.className = isCorrect ? 'result-correct' : 'result-incorrect';
        resultIndicator.textContent = isCorrect ? '✅' : '❌';
        parentCard.appendChild(resultIndicator);

        // Ждем 1,5 секунды и переходим к следующему вопросу
        setTimeout(() => {
            currentQuestionIndex++;
            showNextQuestion();
        }, 1100);
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
            questionSpan.textContent = result.question;

            const indicatorSpan = document.createElement('span');
            indicatorSpan.className = result.isCorrect ? 'result-correct' : 'result-incorrect';
            indicatorSpan.textContent = result.isCorrect ? '✅' : '❌';

            resultItem.appendChild(questionSpan);
            resultItem.appendChild(indicatorSpan);

            resultsContainer.appendChild(resultItem);
        });

        document.getElementById('quiz-container').appendChild(resultsContainer);
    }
});