'use strict';

// Data
const account1 = {
    owner: 'Dmytro Arkhypov',
    movements: [500, 450, -300, 6000, -550, -130, 60, 1300, 320],
    interestRate: 1.2, // %
    password: 1111,
    movementsDates: [
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-07-26T17:01:17.194Z',
        '2020-07-28T23:36:17.929Z',
        '2020-08-01T10:51:36.790Z',
        '2020-08-01T10:53:36.790Z',
    ],
    local: 'en-US',
    currency: 'USD'
};

const account2 = {
    owner: 'Alexander Brin',
    movements: [3000, 7400, -150, -790, -4210, -1200, 8500, -30],
    interestRate: 1.5,
    password: 2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2020-07-26T12:01:20.894Z',
    ],
    local: 'ru-RU',
    currency: 'EUR'
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPassword = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Functions

const formatCurrency = function (value, local, currency) {
    return new Intl.NumberFormat(local, {
        style: 'currency',
        currency: currency,
    }).format(value);
}

const formatMovementDate = function (date, locale) {
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);
    if (daysPassed === 0) return 'today';
    if (daysPassed === 1) return 'yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
        // const day = `${date.getDate()}`.padStart(2, 0);
        // const month = `${date.getMonth() + 1}`.padStart(2, 0);
        // const year = date.getFullYear();
        // return `${day}/${month}/${year}`;
        return new Intl.DateTimeFormat(locale).format(date);
    }
}

const displayMovements = function (acc, sort = false) {
    containerMovements.innerHTML = '';

    const movs = sort
        ? acc.movements.slice().sort((a, b) => a - b)
        : acc.movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date, acc.local);

        const formattedMov = formatCurrency(mov, acc.local, acc.currency)

        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${formattedMov}</div>
        </div>
    `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}


const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((accum, cur) => accum + cur, 0);
    labelBalance.textContent = formatCurrency(acc.balance, acc.local, acc.currency);
};


const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((accum, mov) => accum + mov, 0);
    labelSumIn.textContent = formatCurrency(incomes, acc.local, acc.currency);

    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((accum, mov) => accum + mov, 0);
    labelSumOut.textContent = formatCurrency(out, acc.local, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0).map(dep => dep * 0.15)
        .reduce((accum, interest) => accum + interest, 0);
    labelSumInterest.textContent = formatCurrency(interest, acc.local, acc.currency);
}


const createUserNames = function (accs) {
    accs.forEach(acc => {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    })
};
createUserNames(accounts);

const updateUI = function (acc) {
    //Display movements
    displayMovements(acc);
    //Display Balance
    calcDisplayBalance(acc);
    //Display Summary
    calcDisplaySummary(acc);
}

const startLogOutTimer = function () {
    const tick = function () {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);
        //Print time to UI
        labelTimer.textContent = `${min}:${sec}`;
        //Check for 0 sec
        if (time === 0) {
            clearInterval(timer);
            //Hide UI and show message
            labelWelcome.textContent = `Log in to get started`;
            containerApp.style.opacity = 0;
            alert('We stop session, cause it\'s longer than 5 min.')
        }
        //Decrease 1s
        time--;

    }
    //Set timer
    let time = 300;

    //Call timer every second
    tick();
    const timer = setInterval(tick, 1000);
    return timer;
}

// Event handler

let currentAccount,
    timer;

//FAKE LOGIN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    if (currentAccount && currentAccount.password === Number(inputLoginPassword.value)) {

        //Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        //Create Current Date
        const now = new Date();

        //Using internalization API
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        // const day = `${now.getDate()}`.padStart(2, 0);
        // const month = `${now.getMonth() + 1}`.padStart(2, 0);
        // const year = now.getFullYear();
        // const hour = `${now.getHours()}`.padStart(2, 0);
        // const min = `${now.getMinutes()}`.padStart(2, 0);

        //Display date
        labelDate.textContent = new Intl.DateTimeFormat(currentAccount.local, options).format(now);
        // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

        //Clear inputs
        inputLoginUsername.value = inputLoginPassword.value = '';

        //Remove focuses from inputs
        inputLoginPassword.blur();
        inputLoginUsername.blur();

        //Start timer
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

        //Update UI
        updateUI(currentAccount);
    } else {
        alert('User name or password is wrong!');
    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);
    inputTransferTo.value = inputTransferAmount.value = '';

    if (
        amount > 0 &&
        receiverAccount
        && currentAccount.balance >= amount
        && receiverAccount.username !== currentAccount.username
    ) {
        //Transfer
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        //Add transfer Date
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAccount.movementsDates.push(new Date().toISOString());

        //UpdateUI
        updateUI(currentAccount);
        alert(`You just transfer ${amount} to ${receiverAccount.owner}'s account`);

        //Reset timer
        clearInterval(timer);
        startLogOutTimer();
    }
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Math.floor(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        //Add movement
        currentAccount.movements.push(amount);

        //Add Loan Date
        currentAccount.movementsDates.push(new Date().toISOString());

        //UpdateUI
        updateUI(currentAccount);

        //Clear input
        inputLoanAmount.value = '';

        //Reset timer
        clearInterval(timer);
        startLogOutTimer();
    } else {
        alert("Amount is too big");
    }
});

btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    //Delete Account
    if (currentAccount.username === inputCloseUsername.value && currentAccount.password === Number(inputClosePin.value)) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        accounts.splice(index, 1);
    }
    //Clear Inputs
    inputCloseUsername.value = inputClosePin.value = '';

    //Hide UI
    containerApp.style.opacity = 0;

    //Welcome label
    labelWelcome.textContent = "Log in to start:";

    //Alert
    alert(`User account ${currentAccount.username} was deleted`);
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount, !sorted);
    sorted = !sorted;
});