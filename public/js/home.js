const myModal = new bootstrap.Modal('#transactionModal');
const session = localStorage.getItem('session');
const alertSuccessAdd = document.querySelector('.alert-success-add');
const btnAdd = document.querySelector('.btn-add');
const loadAdd = document.querySelector('.load-add');

let logged = sessionStorage.getItem('logged');
let data = {
    transactions: []
};

checkLogged();

document.getElementById('btn-logout').addEventListener('click', () => logout());

// Adicionar lançamento
document.getElementById('trasactioinForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let value = parseFloat(document.getElementById('value-input').value);
    let description = document.getElementById('description-input').value;
    let date = document.getElementById('date-input').value;
    let type = document.querySelector('input[name=type-input]:checked').value;

    data.transactions.unshift({
        value: value,
        description: description,
        date: date,
        type: type
    });
    saveData(data);
    btnAdd.classList.add('d-none');
    loadAdd.classList.remove('d-none');
    setTimeout(() => {
        loadAdd.classList.add('d-none');
        alertSuccessAdd.classList.remove('d-none');
        alertSuccessAdd.innerHTML = 'Lançamento adicionado com sucesso.';
    }, 1000);
    setTimeout(() => {
        e.target.reset();
        myModal.hide();

        getCashIn();
        getCashOut();
        getTotal();

        alertSuccessAdd.classList.add('d-none');
        btnAdd.classList.remove('d-none');
    }, 3000);
});

document.getElementById('btnTransactions').addEventListener('click', () => document.location.href = 'transactions.html');

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
}

function getCashIn() {
    const transactions = data.transactions;
    const cashIn = transactions.filter((item) => item.type === '1');
    if (cashIn.length) {
        let cashInHtml = ``;
        let limit = 0;

        if (cashIn.length > 5) {
            limit = 5;
        } else {
            limit = cashIn.length;
        }

        for (let index = 0; index < limit; index++) {
            cashInHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashIn[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashIn[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashIn[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.getElementById('cashInList').innerHTML = cashInHtml;
        }
    }

}

function getCashOut() {
    const transactions = data.transactions;
    const cashOut = transactions.filter((item) => item.type === '2');
    if (cashOut.length) {
        let cashOutHtml = ``;
        let limit = 0;

        if (cashOut.length > 5) {
            limit = 5;
        } else {
            limit = cashOut.length;
        }

        for (let index = 0; index < limit; index++) {
            cashOutHtml += `
            <div class="row mb-4">
                <div class="col-12">
                    <h3 class="fs-2">R$ ${cashOut[index].value.toFixed(2)}</h3>
                    <div class="container p-0">
                        <div class="row">
                            <div class="col-12 col-md-8">
                                <p>${cashOut[index].description}</p>
                            </div>
                            <div class="col-12 col-md-3 d-flex justify-content-end">
                                ${cashOut[index].date}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            document.getElementById('cashOutList').innerHTML = cashOutHtml;
        }
    }

}

function getTotal() {
    let total = 0;
    data.transactions.forEach(item => {
        if (item.type === '1') {
            total += item.value;
        } else {
            total -= item.value;
        }
    });
    document.getElementById('total').innerHTML = `R$ ${total.toFixed(2)}`;
}

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }
    if (!logged) {
        window.location.href = 'index.html';
    }
    const dataUser = localStorage.getItem(logged);
    if (dataUser) {
        data = JSON.parse(dataUser);
    }
    getCashIn();
    getCashOut();
    getTotal();
}

function logout() {
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');
    window.location.href = 'index.html';
}
