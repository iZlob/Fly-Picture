let image = document.getElementById("image");//элемент картинка
let counterX = 0;//счетчик шагов по оси Х
let counterY = 0;//счетчик шагов по оси У
let step = 5//шаг перемещения. Переменная введена для изменения шага перемещения, тем самым увеличивая скорость движения при достижении 
            //speed = 0, а также для удобства изменения стартового значения шага в одном месте, то есть на этой строчке
let stepX = step;//шаг, изменение положения объекта на экране по оси Х 
let stepY = step;//шаг, изменение положения объекта на экране по оси У
let degree = 0;//стартовый угол поворота объекта
let stepDeg = 1;//стартовый шаг изменения угла поворота
let intervalID = undefined;//идентификатор таймера
let wScreen;//ширина экрана
let hScreen;//высота экрана
let topImage;//текущая верхняя точка картинки
let bottomImage;//текущаяя нижняя точка картинки
let leftImage;//текущая левая точка картинки
let rightImage;//текущая правая точка картинки
let speed = 100;//стартовая скорость, частота повторения таймера
const spd = 10;//шаг изменения частоты повторения таймера, то есть скорости перемещения картинки
let stopBitX = false;//флаги достижения границ экрана
let stopBitY = false;
let stepRNDX;//случайные шаги. Устанавливаются при достижении картинки границ экрана
let stepRNDY;//тем самым случайным образом меняя направление движения картинки

function Update(){
    counterX += stepX;
    counterY += stepY;
    degree += stepDeg;

    image.setAttribute("Style", "transform: translate(" + counterX + "px, " + counterY + "px) rotate(" + degree + "deg);");

    if (stepX != step)
        if (stepX <= 0) stepX = -1 * step; else stepX = step;
    if (stepY != step)
        if (stepY <= 0) stepY = -1 * step; else stepY = step;
    if (degree >= 360)
        degree -= 360;

    wScreen = document.documentElement.clientWidth;//определяем ширину и высоту экрана тут потому, что если его определить выше
    hScreen = document.documentElement.clientHeight;//то при уменьшении окна браузера картинка будет "улетать"
    topImage = image.getBoundingClientRect().top;
    bottomImage = image.getBoundingClientRect().bottom;
    leftImage = image.getBoundingClientRect().left;
    rightImage = image.getBoundingClientRect().right;        
    
    if ((leftImage <= 0 || rightImage >= wScreen) && !stopBitX){
        stopBitX = true;
        stepX *= -1;
        stepRNDY = getRandom(-1 * step, step);
        if (stepRNDY < 0) stepY += -1 * stepRNDY; else stepY += stepRNDY;
    } else
        if (leftImage > step && rightImage < wScreen - step - 1) stopBitX = false;

    if ((topImage <= 0 || bottomImage >= hScreen) && !stopBitY){
        stopBitY = true;
        stepY *= -1;
        stepRNDX = getRandom(-1 * step, step);
        if (stepRNDX < 0) stepX += -1 * stepRNDX; else stepX += stepRNDX;
    } else
        if(topImage > step && bottomImage < hScreen - step - 1) stopBitY = false;  
}

function Start(){
       if (intervalID == undefined)
           intervalID = setInterval(Update, speed);      
   }
function Stop(){
    clearInterval(intervalID);
    intervalID = undefined;
}

function MoreTran(){//следущие 2 функции - функции изменения скорости движения картики
    Stop();
    if (speed > 0)
        speed -= spd;
    else{
        step++;
    }
    Start();
}

function LessTran(){
    Stop();
    if (step >= 5) 
        step--;
    else
        speed += spd;
    Start();
}

function MoreRot(){//следующие 2 функции - функции изменения скорости вращения картинки
    stepDeg++;
}

function LessRot(){
    stepDeg--;
}

function getRandom(min, max) {// функция генерирующая случайное число в заданном диапазоне чисел
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
   
   
   