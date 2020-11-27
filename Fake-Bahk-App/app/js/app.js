'use strict';

// Data
const account1 = {
    owner: 'Dmytro Arkhypov',
    movements: [500, 450, -300, 6000, -550, -130, 60, 1300, 320],
    interestRate: 1.2, // %
    password: 1111,
};

const account2 = {
    owner: 'Alexander Brin',
    movements: [3000, 7400, -150, -790, -4210, -1200, 8500, -30],
    interestRate: 1.5,
    password: 2222,
};

const account3 = {
    owner: 'Barack Hussein Obama',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    password: 3333,
};

const account4 = {
    owner: 'Peter Mulinie',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    password: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
            <div class="movements__value">${mov} €</div>
        </div>
    `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}


const calcDisplayBalance = function (mov) {
    const balance = mov.reduce((accum, cur) => accum + cur, 0);
    labelBalance.textContent = `${balance} €`
};


const calcDisplaySummary = function (acc) {
    const incomes = acc.movements.filter(mov => mov > 0).reduce((accum, mov) => accum + mov, 0);
    const out = acc.movements.filter(mov => mov < 0).reduce((accum, mov) => accum + mov, 0);
    const interest = acc.movements.filter(mov => mov > 0).map(dep => dep * 0.15).reduce((accum, interest) => accum + interest, 0);

    labelSumIn.textContent = `${incomes} €`;
    labelSumOut.textContent = `${Math.abs(out)} €`;
    labelSumInterest.textContent = `${interest} €`
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

// Event handler

let currentAccount;

btnLogin.addEventListener('click', function (e) {
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    if (currentAccount && currentAccount.password === Number(inputLoginPassword.value)) {
        //Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;
        //Clear inputs
        inputLoginUsername.value = inputLoginPassword.value = '';
        //Remove focuses from inputs
        inputLoginPassword.blur();
        inputLoginUsername.blur();
        //Display movements
        displayMovements(currentAccount.movements);
        //Display Balance
        calcDisplayBalance(currentAccount.movements);
        //Display Summary
        calcDisplaySummary(currentAccount);
    }
})
