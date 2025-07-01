let basic_amount = document.querySelector('.basic-amount .number input');
let senior_amount = document.querySelector('.senior-amount .number input');
const container = document.querySelector('.booking-tickets');
const pop_up = document.querySelector('.booking-tickets-wrapper');
let fullPrice = 30;
const permanentTicket = 20;
const temporaryTicket = 25;
const combinedTicket = 40;
const arrMode = [permanentTicket, temporaryTicket, combinedTicket];
let radioMode = 0;
const arrType = document.querySelectorAll('.tickets-radio input');

function getSelectedValue() {
    for (let i=0; i<arrType.length; i++){   
        if (arrType[i].checked) {
            radioMode = i;
        }
    }
    handlePriceChange();
}

function handlePriceChange(){
    fullPrice = arrMode[radioMode] * (+basic_amount.value + (+senior_amount.value/2.0));
    document.querySelector('#total-euro .full-price').innerHTML = fullPrice;
    localStorage.setItem('basic_amount', +basic_amount.value);
    localStorage.setItem('senior_amount', +senior_amount.value);
    localStorage.setItem('radio_mode', radioMode);
}

window.addEventListener("load", (event) => {
    if (localStorage.basic_amount) basic_amount.value = localStorage.getItem('basic_amount');
    if (localStorage.senior_amount) senior_amount.value = localStorage.getItem('senior_amount');
    if (localStorage.senior_amount) radioMode = localStorage.getItem('radio_mode');
    getSelectedValue();
    arrType[radioMode].checked=true;
    document.querySelector('#total-euro .full-price').innerHTML = fullPrice;
});

function handleClick(){
    container.classList.toggle('hidden');
    pop_up.classList.toggle('show-booking-tickets');
}

document.querySelector('.buy-now').addEventListener('click', handleClick);
container.addEventListener('click', (event)=>{
    if(event.target.classList.contains('booking-tickets')){
        container.classList.toggle('hidden');
        pop_up.classList.toggle('show-booking-tickets');
    }
});
document.querySelector('.tickets-type').addEventListener('change', getSelectedValue);
document.querySelector('.basic-amount').addEventListener('click', handlePriceChange);
document.querySelector('.senior-amount').addEventListener('click', handlePriceChange);