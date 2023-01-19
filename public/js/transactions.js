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
        getTransactions();

        alertSuccessAdd.classList.add('d-none');
        btnAdd.classList.remove('d-none');
    }, 3000);
});

function getTransactions() {
    document.getElementById('transactionsList').innerHTML = data.transactions.map(item => {
        return `
        <tr>
            <th scope="row">${item.date}</th>
            <td>R$ ${item.value.toFixed(2)}</td>
            <td>${item.type === '1' ? 'Entrada' : 'Saída'}</td>
            <td>${item.description}</td>
        </tr>
        `;
    }).join('');
}

function saveData(data) {
    localStorage.setItem(logged, JSON.stringify(data));
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
    getTransactions();
}

function logout() {
    sessionStorage.removeItem('logged');
    localStorage.removeItem('session');
    window.location.href = 'index.html';
}
