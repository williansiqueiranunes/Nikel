const myModal = new bootstrap.Modal('#registerModal');
const alertDangerLogin = document.querySelector('.alert-danger-login');
const alertDangerRegister = document.querySelector('.alert-danger-register');
const alertSuccessRegister = document.querySelector('.alert-success-register');
const btnRegister = document.querySelector('.btn-register');
const loadRegister = document.querySelector('.load-register');
const session = localStorage.getItem('session');

let logged = sessionStorage.getItem('logged');

checkLogged();

// Login no sistema
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('email-input').value;
    let password = document.getElementById('password-input').value;
    let session = document.getElementById('session-check').checked;

    console.log(email, password, session);

    const account = getAccount(email);

    if (!account || (account && account.password !== password)) {
        alertDangerLogin.classList.remove('d-none');
        alertDangerLogin.innerHTML = 'Ops! Verifique o usuário ou a senha.';
        return;
    }

    saveSession(email, session);
    window.location.href = 'home.html';
});

// Criar conta
document.querySelector('#register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.getElementById('email-create-input');
    let password = document.getElementById('password-create-input');

    if (email.value.length < 5) {
        alertDangerRegister.classList.remove('d-none');
        alertDangerRegister.innerHTML = 'Preecha o campo com um e-mail válido.';
        return;
    }
    if (password.value.length < 4) {
        alertDangerRegister.classList.remove('d-none');
        alertDangerRegister.innerHTML = 'Preecha a senha com no mínimo 4 dígitos.';
        return;
    }

    saveAccount({
        login: email.value,
        password: password.value,
        transactions: []
    });

    alertDangerRegister.classList.add('d-none');
    btnRegister.classList.add('d-none');
    loadRegister.classList.remove('d-none');
    setTimeout(() => {
        loadRegister.classList.add('d-none');
        alertSuccessRegister.classList.remove('d-none');
        alertSuccessRegister.innerHTML = 'Conta criada com sucesso.';
    }, 2000);
    setTimeout(() => {
        myModal.hide();
        alertSuccessRegister.classList.add('d-none');
        btnRegister.classList.remove('d-none');
        email.value = '';
        password.value = '';
    }, 4000);
});

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }
    if (logged) {
        saveSession(logged, session);
        window.location.href = 'home.html';
    }
}

function saveAccount(data) {
    console.log(data);
    localStorage.setItem(data.login, JSON.stringify(data));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem('session', data);
    }
    sessionStorage.setItem('logged', data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);
    if (account) {
        return JSON.parse(account);
    }
    return '';
}
