// For toggling between day & night mode
document.getElementById("toggle").addEventListener("click", () => {
    document.getElementsByTagName('body')[0].classList.toggle("dark-theme");
});

// Main code
let bInput = document.querySelector('#b-input');
let bInputErr = document.querySelector('#bill-err-msg');

const tipBtns = document.querySelectorAll(".btn");
const customTipBtn = document.querySelector(".custom-input")

let pInput = document.querySelector('#n-input');
let pInputErr = document.querySelector('#num-err-msg');

let tipAmt = document.querySelector(".tip-amt-output");
let totalAmt = document.querySelector(".total-amt-output");

let resetBtn = document.querySelector(".reset-btn");

function calculatePerPerson (bill, tip, numPpl) {
    finalTipPerPerson = ((bill * (tip/100) / numPpl)).toFixed(2);
    finalBillPerPerson = ((bill * (1 + (tip/100)) / numPpl)).toFixed(2);
    return {finalTipPerPerson, finalBillPerPerson}
}

function handler(tipInput) {
    // If user clicks on any of the button w/o bill input, throw error.
    if (bInput.value == "") {
        bInput.classList.add('border-orange');
        bInputErr.classList.add('bill-err-msg');
        bInputErr.textContent = "Please enter a bill amount";
    } else {
        bInput.classList.remove('border-orange');
        bInputErr.classList.remove('bill-err-msg');
    }

    // If user clicks on any of the button w/o numPpl input, throw error.
    if (pInput.value == "") {
        pInput.classList.add('border-orange');
        pInputErr.classList.add('num-err-msg');
        pInputErr.textContent = "Can't be zero";
    } else {
        pInput.classList.remove('border-orange');
        pInputErr.classList.remove('num-err-msg');
    }

    let cBill = parseFloat(bInput.value);
    let cTip = parseFloat(tipInput.value);
    let cNumPpl = Number(pInput.value);

    tipAmt.textContent = "$" + calculatePerPerson(cBill, cTip, cNumPpl).finalTipPerPerson;
    totalAmt.textContent = "$" + calculatePerPerson(cBill, cTip, cNumPpl).finalBillPerPerson;

    // These 2 types of errors get thrown by default if bInput and pInput is empty
    if (tipAmt.textContent == "$NaN" || tipAmt.textContent == "$Infinity") {
        tipAmt.textContent = "$0.00";
    }

    if (totalAmt.textContent == "$NaN" || totalAmt.textContent == "$Infinity") {
        totalAmt.textContent = "$0.00";
    }

    resetBtn.disabled = false;
}

function calculateTip() {
    // tipBtns.forEach(tipBtn => {
    //     tipBtn.addEventListener("click", () => {
    //         handler(tipBtn);
    //     })
    // })

    // customTipBtn.addEventListener("input", () => {
    //         handler(customTipBtn);
    // })

    // Shorter way of writing the above
    tipBtns.forEach(tipBtn => {
        tipBtn.addEventListener("click", handler.bind(null, tipBtn))
    });

    customTipBtn.addEventListener("input", handler.bind(null, customTipBtn));

    resetBtn.addEventListener('click',() => {
        bInput.value = "";
        pInput.value = "";
        customTipBtn.value = "";
        tipAmt.innerHTML = "$0.00";
        totalAmt.innerHTML = "$0.00";
        bInput.classList.remove('border-orange');
        bInputErr.classList.remove('bill-err-msg');
        bInputErr.textContent = "";
        pInput.classList.remove('border-orange');
        pInputErr.classList.remove('num-err-msg');
        pInputErr.textContent = "";
    });
}

calculateTip();


