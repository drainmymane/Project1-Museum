let basic_amount = document.querySelector('.basic-amount .number input');
let senior_amount = document.querySelector('.senior-amount .number input');
let booking_basic_amount = document.querySelector('.booking-tickets-entry .basic-amount .number input');
let booking_senior_amount = document.querySelector('.booking-tickets-entry .senior-amount .number input');
const container = document.querySelector('.booking-tickets');
const pop_up = document.querySelector('.booking-tickets-container');
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
    document.querySelectorAll('.full-price').forEach( item => {
        item.innerHTML = fullPrice;
    })
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
    document.querySelector('.full-price').innerHTML = fullPrice;
});

function handleClick(){
    booking_basic_amount.value = +basic_amount.value;
    booking_senior_amount.value = +senior_amount.value;
    container.classList.toggle('hidden');
    pop_up.classList.toggle('show-booking-tickets');
    handleTypeChange();
}

function HandleSelectOnChange(){
    radioMode = document.querySelector('.tickets-type-select').selectedIndex;
    document.querySelectorAll('.booking-tickets-wrapper .basic-amount p span').forEach(item => {
                                                                                item.innerHTML = arrMode[radioMode];
                                                                            });
    document.querySelectorAll('.booking-tickets-wrapper .senior-amount p span').forEach(item => {
                                                                                item.innerHTML = (arrMode[radioMode]/2);
                                                                            });
}

function handleTypeChange(){
    document.querySelector('.tickets-type-select').value=arrMode[radioMode];
    HandleSelectOnChange();
}

function HandlePopUpOnChange(){
    basic_amount.value = booking_basic_amount.value;
    senior_amount.value = booking_senior_amount.value;
    arrType[radioMode].checked=true;
    handlePriceChange();
}

document.querySelector('.buy-now').addEventListener('click', handleClick);
container.addEventListener('click', (event)=>{
    if(event.target.classList.contains('booking-tickets') || event.target.classList.contains('crest')){
        container.classList.toggle('hidden');
        pop_up.classList.toggle('show-booking-tickets');
    }
});

container.addEventListener('click', HandlePopUpOnChange);

document.querySelector('.tickets-type-select').addEventListener('change', HandleSelectOnChange);
document.querySelector('.tickets-type').addEventListener('change', getSelectedValue);
document.querySelectorAll('.basic-amount,.senior-amount').forEach(item => {item.addEventListener('click', handlePriceChange)});