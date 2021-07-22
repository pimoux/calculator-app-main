const radios = document.getElementsByName('theme');
const result = document.querySelector('#result');
const operators = ['/', '*', '+', '-'];
let calcul = '0';
let display = '0';

result.textContent = display;

const addOperators = (op) => {
    let nbOperators = calcul.split('').filter(elt => operators.includes(elt)).length;
    if (nbOperators >= 1) {
        if (operators.includes(calcul[calcul.length - 1])) {
            calcul.slice(0, -1);
            calcul[calcul.length - 1] = op;
        } else {
            calculate();
        }
    }

    if (!operators.includes(calcul[calcul.length - 1]) && calcul[calcul.length - 1] !== '.') {
        calcul += op;
    } else {
        calcul = calcul.slice(0, -1) + op;
    }

    result.textContent = display;
}

const addNumber = (num) => {
    let indexOperator = [
        calcul.indexOf('+'),
        calcul.indexOf('-'),
        calcul.indexOf('*'),
        calcul.indexOf('/')
    ].filter(i => i !== -1);
    let lastNumber = indexOperator.length === 0 ? calcul : calcul.slice(indexOperator[0] + 1);

    if (calcul.length === 1 && calcul === '0') {
        calcul = num;
        display = num;
    } else if (!(lastNumber.split('').includes(num) && num === '.')) {
        calcul += num;
        display += num;
    }

    if (operators.includes(calcul[calcul.length - 2])) {
        display = calcul.slice(calcul.length - 1);
    }

    result.textContent = display;
}

const calculate = () => {
    calcul = eval(calcul).toString();
    display = calcul;
    result.textContent = display;
}

const reset = () => {
    calcul = '0';
    display = '0';
    result.textContent = display;
}

const deleteNumber = () => {
    if (display.length !== 1 && calcul.length !== 1) {
        calcul = calcul.slice(0, -1);
        display = calcul;
    } else {
        calcul = '0';
        display = '0';
    }

    result.textContent = display;
}

radios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        document.body.className = e.target.value;
    })
})

document.querySelector('#del').addEventListener('click', deleteNumber);
document.querySelector('#reset').addEventListener('click', reset);
document.querySelector('#eval').addEventListener('click', calculate);

document.querySelectorAll('.number').forEach(btn => {
    btn.addEventListener('click', (e) => addNumber(e.target.value))
})

document.querySelectorAll('.operator').forEach(op => {
    op.addEventListener('click', (e) => addOperators(e.target.value))
})