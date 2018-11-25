const cellPhone = 800; //тапик
const operatorLaptop = 14990; //ноут оператора
const printer = 4810; // принтер
const printerMax = 10490;
const managerLaptop = 15840; // ноут координатора
const managerLaptopMax = 24000; // ноут координатора
const extentionCord = 310; // удлинитель
const router = 1390; // роутер
const headset = 400; // гарнитура

const operatorTable = 2000; // стол оператора
const operatorTableMax = 3200; // стол оператора максимальный
const chair = 1000; // стул оператора
const chairMax = 2300; // стул оператора
const rack = 2900; // стелаж
const rackMax = 5800; // стелаж
const managerTable = 3200; // стол координатора
const managerTableMax = 6000; // стол координатора максимальный
const managerChair = 2300; // стул координатора
const managerChairMax = 3900; // стул координатора
const hanger = 2000; // вешалка
const board = 2231; // доска
const litterBin = 110; // мусорка
const paper = 1250; // бумага
const boardSponge = 132; // губка для доски
const markers = 150; // маркеры
const boardSprey = 108; // спрей для доски
const paperHolder = 169; // лоток для бумаги
const folderRegister = 200; // папка для бумаг
const penHolster = 107; // подставка под ручки
const pens = 500; // ручки
const waterDispenser = 2599; // куллер или же диспенсер для воды
const paperCups = 150; // сткакнчики для воды

function hideSoftware() {
    if (document.getElementById('package').value === 'min') {
        document.querySelectorAll('.col-lg-12.text.center')[2].style = 'visibility: hidden'
    }
    if (document.getElementById('package').value === 'max') {
        document.querySelectorAll('.col-lg-12.text.center')[2].style = 'visibility: visible'
    }
}

function intervalOperator(number) {
    if (number <= 1 || number <= 5){
        return 40000;
    }
    if (number <= 6 || number <= 10){
        return 60000;
    }
    if (number <= 11 || number <= 15){
        return 80000;
    }
    if (number <= 16 || number <= 20){
        return 100000;
    }
    if (number <= 21 || number <= 25){
        return 120000;
    }
    if (number <= 26 || number <= 30){
        return 140000;
    }
    if (number <= 31 || number <= 35){
        return 160000;
    }
    if (number <= 36 || number <= 40){
        return 180000;
    }
    if (number <= 41 || number <= 45){
        return 200000;
    }
    if (number <= 46 || number <= 50){
        return 220000;
    }
    if (number <= 51 || number <= 55){
        return 240000;
    }
    if (number <= 56 || number <= 60){
        return 260000;
    }
}

function intervalSoftware(number) {
    if (number <= 1 || number <= 15) {
        return 1300;
    }
    if (number <= 16 || number <= 25) {
        return 1800;
    }
    if (number <= 26 || number <= 35) {
        return 2300;
    }
    if (number <= 36 || number <= 45) {
        return 2800;
    }
    if (number <= 46 || number <= 55) {
        return 3300;
    }
    if (number <= 56 || number <= 60) {
        return 3800;
    }
}

function cost() {
    const operators = document.getElementById('operators').valueAsNumber;
    // минимальный
    if (document.getElementById('package').value === 'min') {
       const total = intervalOperator(operators) + (cellPhone * operators) + printer + managerLaptop + extentionCord + (Math.ceil(operators / 6) * extentionCord) + router + (operatorTable * operators) + (chair * operators) + rack + managerTable + managerChair + board + hanger + litterBin + (penHolster * operators) + pens + paper + boardSponge + markers + boardSprey + paperHolder + folderRegister;
        document.getElementById('total').innerText = total;
        console.log(`переноски ${Math.ceil(operators / 6) * extentionCord}`);
    }
    // оптимальный
    if (document.getElementById('package').value === 'max') {
        // минимальынй
        if (document.getElementById('packageSoftware').value === 'min') {
            const total = intervalOperator(operators) + (operatorLaptop * operators) + printerMax + managerLaptopMax + extentionCord + (Math.ceil(operators / 6) * extentionCord) + router + ( operators * headset) + board + ( operatorTableMax * operators ) + ( chairMax * operators) + rackMax + managerTableMax + managerChairMax + hanger + waterDispenser + litterBin + ( penHolster * operators ) + pens + paper + boardSponge + markers + boardSprey + folderRegister + paperHolder + paperCups + intervalSoftware(operators);
            document.getElementById('total').innerText = total;
        }
        // оптимальный
        if (document.getElementById('packageSoftware').value === 'max') {
            const total = intervalOperator(operators) + (operatorLaptop * operators) + printerMax + managerLaptopMax + extentionCord + (Math.ceil(operators / 6) * extentionCord) + router + ( operators * headset) + board + ( operatorTableMax * operators ) + ( chairMax * operators) + rackMax + managerTableMax + managerChairMax + hanger + waterDispenser + litterBin + ( penHolster * operators ) + pens + paper + boardSponge + markers + boardSprey + folderRegister + paperHolder + paperCups + intervalSoftware(operators) + (3000 * operators);
            document.getElementById('total').innerText = total;
        }
    }
}

function clearResult() {
    document.getElementById('total').innerText = '';
}

// дорогой друг! ты нашел этот пиздец... Это и правда пиздец
// за такое положен отдельный котел в аду с персоональным черным сверлителем очка
// приношу глубочайшие извинения за сий говнокод, но сроки поджимали и мы делали как умели
// на реакт или вью или другие НОРМАЛЬНЫЕ ТЕХНОЛОГИИ не хватало времени
// ДА даже для джиквери было слишком поздно!
// unixson 11.11.2018
