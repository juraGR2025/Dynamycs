var btnFIO = document.getElementById("fio-write");

function buttonFIOclicked(){
    var FIOtext = document.getElementById('cadetName');
    var resultName = document.getElementById('groupNumber');

    var lblName = document.getElementById("Name");
    lblName.innerHTML = FIOtext.value;

    var lblGroup = document.getElementById("groupN");
    lblGroup.innerHTML = resultName.value;

FIOtext.value = '';//Обнуляю значение переменной в элементе input.
FIOtext.hidden = true;//Прячу input.
resultName.value = '';//Обнуляю значение переменной в элементе input.
resultName.hidden = true;//Прячу input.

btnFIO.disabled = true;//Делаю кнопку не активной.
}

btnFIO.addEventListener("click", buttonFIOclicked);