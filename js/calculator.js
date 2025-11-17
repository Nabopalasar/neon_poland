document.addEventListener('DOMContentLoaded', function () {

const tabTogglers = document.querySelectorAll('.calculator__palitra-list-item');
const tabs = document.querySelectorAll('.calculator__palitra-block');
const lightBtn = document.querySelector('.calculator__palitra-lightBtn');
const lightOverlay = document.querySelector('.calculator__palitra-overlay');
const textInput = document.querySelector('.calculator__palitra-block-input');
const mainText = document.querySelector(".calculator__previev-text-inner");
const fontButtons = document.querySelectorAll('.font-btn');
const colorButtons = document.querySelectorAll('.color-picer-btn');
const colorOverlay = document.querySelector('.calculator__bg-color');
const bgFirst = document.querySelector('#calculator__previev-bg-1');
const bgSecond = document.querySelector('#calculator__previev-bg-2');
const bgBtn = document.querySelectorAll('.background-btn');
const substrateBtn = document.querySelectorAll('.substrate-btn');

    
// TABS
tabTogglers.forEach(tabToggler => 
    tabToggler.addEventListener('click', () => {
        const tabId = tabToggler.getAttribute("data-tab");

        tabTogglers.forEach(t => t.classList.remove('active'));
        tabToggler.classList.add('active');

        tabs.forEach(content => {
            content.classList.remove('active');
        });

        document.getElementById(`tab-${tabId}`).classList.add('active');
    })
);
// TABS END


//LIGHT TOGLE
lightBtn.addEventListener('click', (e) => {
    if ( e.target.classList.contains("on")) {
        e.target.classList.remove('on')
        lightOverlay.style.opacity = '0.5';
    }else {
        e.target.classList.add('on')
        lightOverlay.style.opacity = "0";
    }
});
//LIGHT TOGLE END


//TEXT CHANGE 
textInput.addEventListener('input', (e) => {
    if (e.target.value == "") {
        mainText.textContent = "Twój tekst";
    }else {
        mainText.textContent = e.target.value;
    }
});
//TEXT CHANGE  END


//FONT CHANGE 
fontButtons.forEach(item => item.addEventListener('click', function() {
    mainText.classList.remove('bad-script', 'marske', 'katherine', 'avenir-next', 'sensa-pen', 'realize');

    mainText.classList.add(this.dataset.font)
}));
//FONT CHANGE 


//COLOR CHANGE
colorButtons.forEach(item => item.addEventListener('click', function() {
    mainText.classList.remove('type-1', 'type-2', 'type-3', 'type-4', 'type-5', 'type-6', 'type-7', 'type-8', 'type-9', 'type-10', 'type-11');
    colorOverlay.id = item.id
    mainText.classList.add(this.dataset.color);
}));
//COLOR CHANGE END


//BACKGROUND CHANGE
bgBtn.forEach(item => item.addEventListener('click', function() {
    if ( item.id == 'background-btn-1' ) {
        bgFirst.classList.add('show');
        bgSecond.classList.remove('show');
    }else if ( item.id == 'background-btn-2' ) {
        bgFirst.classList.remove('show');
        bgSecond.classList.add('show');
    }
}));
//BACKGROUND CHANGE END

//SUBSTRATE ADD 
substrateBtn.forEach(item => item.addEventListener('click', function() {
    if ( item.id == 'substrate-btn-1') {
        mainText.classList.add('substrate');
        mainText.classList.remove('substrate-darck');

    }else if (item.id == 'substrate-btn-2') {
        mainText.classList.remove('substrate');
        mainText.classList.add('substrate-darck');
    }
}));
//SUBSTRATE ADD END
    

    let currWidth = 90; // Начальная ширина
    let currHeight = 20; // Начальная высота
    let currFontSize = 32; // Начальный размер шрифта

    let fontsData = new Object();
    fontsData['fontBadScript'] = {
        'letterWidth': 10,
        'stringHeight': 20,
    };
    fontsData['fontMarske'] = {
        'letterWidth': 12,
        'stringHeight': 18,
    };
    fontsData['fontKatherine'] = {
        'letterWidth': 12,
        'stringHeight': 19,
    };
    fontsData['fontAvenirNextCyr'] = {
        'letterWidth': 12,
        'stringHeight': 18,
    };
    fontsData['fontSensaPen'] = {
        'letterWidth': 8,
        'stringHeight': 16,
    };
    fontsData['fontRealize'] = {
        'letterWidth': 10,
        'stringHeight': 21,
    };

    const fontNames = {
        'fontBadScript': 'Bad Script',
        'fontMarske': 'Marske',
        'fontKatherine': 'Katherine',
        'fontAvenirNext': 'Avenir Next',
        'fontSensaPen': 'Sensa Pen',
        'fontRealize': 'Realize'
    };

    let currFont = 'fontBadScript'; // Текущий 
    
    function updateResultTextInfo(inputText) {
        inputText = String(inputText);
        let stringHeight = fontsData[currFont]['stringHeight']; // высота строки
        let letterWidth = fontsData[currFont]['letterWidth']; // ширина буквы

        let lineBreaks = (inputText.match(/\n/g) || []).length;
        let newHeight = (lineBreaks + 1) * stringHeight; // высота текста
        let longestLine = inputText.split("\n").sort((a, b) => b.length - a.length)[0];
        let newWidth = longestLine.length * letterWidth;

        if (newWidth === 0) newWidth = 9 * letterWidth; // если строка пустая, ставим дефолтную ширину

        if (newWidth !== currWidth) {
            let scale = currWidth / newWidth;
            let newFontSize = Math.round(32 * scale);
            mainText.style.fontSize = newFontSize + 'px';
        }

        // Обновляем отображение результатов
        document.getElementById('resultTextWidth').textContent = newWidth;
        document.getElementById('resultTextHeight').textContent = newHeight;
        document.getElementById('inputWidth').value = newWidth;
        document.getElementById('inputHeight').value = newHeight;
    }

    // Обработчик для ввода текста
    textInput.addEventListener('keyup', function (e) {
        let inputText = e.target.value;
        let formattedText = inputText.replace(/\n/g, "<br>"); // замена переносов строк
        if (formattedText === '') formattedText = 'Your text'; // если текст пустой
        mainText.innerHTML = formattedText;
        updateResultTextInfo(inputText);
    });

    // Обработчик для изменения ширины
    document.getElementById('inputWidth').addEventListener('keyup', function (e) {
        let newWidth = parseInt(e.target.value, 10);
        if (isNaN(newWidth)) newWidth = 0;

        let scale = newWidth / currWidth;
        let newHeight = Math.round(currHeight * scale);
        let newFontSize = currFontSize * scale;

        document.getElementById('inputHeight').value = newHeight;
        document.getElementById('resultTextWidth').textContent = newWidth;
        document.getElementById('resultTextHeight').textContent = newHeight;
        mainText.style.fontSize = newFontSize + "px";
    });

    // Обработчик для изменения высоты
    document.getElementById('inputHeight').addEventListener('keyup', function (e) {
        let newHeight = parseInt(e.target.value, 10);
        if (isNaN(newHeight)) newHeight = 0;

        let scale = newHeight / currHeight;
        let newWidth = Math.round(currWidth * scale);
        let newFontSize = currFontSize * scale;

        document.getElementById('inputWidth').value = newWidth;
        document.getElementById('resultTextWidth').textContent = newWidth;
        document.getElementById('resultTextHeight').textContent = newHeight;
        mainText.style.fontSize = newFontSize + "px";
    });


    // Обработчики для кнопок изменения размера
    const sizeButtons = document.querySelectorAll('[data-size]');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {

            let currSizePreset = this.dataset.size;
            if (currSizePreset == 'small') {
                //currTextWidth
                currWidth = currWidth * 0.75;
            }
            if (currSizePreset == 'medium') {
                //currTextWidth
                currWidth = currWidth;
            }
            if (currSizePreset == 'large') {
                //currTextWidth
                currWidth = currWidth * 1.25;
            }
            let currText = $(".calculator__palitra-block-input").val(); //текущий текст
            updateResultTextInfo(currText); //установка высоты вывески в меню
            // setFormValues();
        });
    });


    
});