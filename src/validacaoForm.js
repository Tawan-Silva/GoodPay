const form = document.getElementById('formValid');
const offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');
const inputNumber = document.getElementById('inputNumber');
const recaptureCalc = document.querySelector('.recapture');

const userLogin = [
    {
        id: 1001,
        username: 'tawansilva',
        senha: 'cebola',
        email: 'tawantls@gmail.com'
    },
    {
        id: 1002,
        username: 'victoricoma',
        senha: '12345678',
        email: 'vitoricoma@gmail.com'
    },
    {
        id: 1003,
        username: 'catiacamara',
        senha: 'televisao',
        email: 'televisao@gmail.com'
    }
]
let numRandomOne = Math.floor(Math.random() * 99) + 1;
let numRandomTwo = Math.floor(Math.floor(Math.random() * 9) + 1)

recaptureCalc.innerHTML += `${numRandomOne} + `;
recaptureCalc.innerHTML += `${numRandomTwo}`;

let result = numRandomOne + numRandomTwo;
console.log(result);

// Genjutsu ArrayFormat
let arrayNames = [];
let arrayId = [];
let arrayEmail = [];
let arraySenha = [];

userLogin.forEach(prop => {
    arrayEmail.push(prop.email)
    arraySenha.push(prop.senha)
    arrayId.push(prop.id)
});

console.log(arrayEmail);
console.log(arraySenha);
console.log(arrayId);
console.log(arrayNames);



// Captura o evento de enviar formulário e (chama a função checkEmail)
form.addEventListener('submit', e => {
    e.preventDefault()
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPwd = document.getElementById('inputPwd').value;
    checkEmail(inputEmail, inputPwd);
});

// Verifica email do usuário é válido e existe na base de dados, e chama função que (coleta a indexEmail)
function checkEmail(inputEmail, inputPwd) {
    if (/.com$/.test(inputEmail) === false || inputEmail == '' || !arrayEmail.includes(inputEmail)) {
        return sweetAlertEmailIncorrect();
    } else {
        console.log(`O email digitado tem no array ? ${arrayEmail.includes(inputEmail)}`);
        take(inputEmail, inputPwd);
    }
}

// Função que coleta a index do email, e (chama a função checkPwd com a indexEmail e o value da senha do usuário)
function take(inputEmail, inputPwd) {
    const indexEmail = arrayEmail.indexOf(inputEmail);
    console.log(`A index do email é ${indexEmail}`);
    checkPwd(inputPwd, indexEmail);
}

// Verifica se a senha do usuário e recebe (index do email válidado)
function checkPwd(inputPwd, indexEmail) {
    if (inputPwd == '' || !arraySenha.includes(inputPwd)) {
        return sweetAlertPwdIncorrect();
    }
    else if (arraySenha.indexOf(inputPwd) !== indexEmail) {
        console.log(`index do inputPwd ${arraySenha.indexOf(inputPwd)}`);
        return sweetAlertPwdIncorrect();
    } 
    else if(inputNumber.value == '' || inputNumber.value != result) {
        console.log(inputNumber);
        return sweetAlertCalcIncorrect();
    }
    else {
        storageLocal(arrayId[indexEmail], arrayNames[indexEmail], arrayEmail[indexEmail], arraySenha[indexEmail]);
        window.location.reload();                          
    }
}

// Insere os dados do usuário no LocalStorage após validar o login
function storageLocal(arrayId, arrayNames, arrayEmail, arraySenha) {
    localStorage.setItem('user', JSON.stringify({ id: arrayId, name: arrayNames, email: arrayEmail, password: arraySenha }));
}

// Verifica que o usuário está no LocalStorage
function getStorageLocal() {
    // const userLocal = JSON.parse(localStorage.getItem('user'));
    localStorage.getItem('user') !== null ? sweetAlertAllowed() : blockUser();
}

// Função que abre o NavBar de login e chama função de acesso negado.
function blockUser() {
    sweetAlertDenied();

    const navbarLight = document.querySelector('.navbar-light');
    const offcanvasEnd = document.querySelector('.offcanvas-end');
    const btnClose = document.querySelector('.btn-close');
    const mainClear = document.querySelector('main');
    const accordionButton = document.querySelector('.accordion-button');
    const accordionCollaspsed = document.querySelector('.accordion-collapse');
    const flushCollapseOne = document.getElementById('flush-collapseOne')

    mainClear.innerHTML = '';

    offcanvasEnd.classList.add('show');
    offcanvasEnd.style.visibility = "visible";
    offcanvasEnd.setAttribute('aria-modal', 'true');
    offcanvasEnd.setAttribute('role', 'dialog');
    navbarLight.setAttribute('data-bs-padding-right', '17px');
    navbarLight.style.paddingRight = '17px';
    // btnClose.removeAttribute('data-bs-dismiss');

    setTimeout(() => {
        accordionButton.classList.remove('collapsed');
        accordionButton.classList.add('accordion-button');
        accordionButton.setAttribute('aria-expanded', 'true');
        accordionButton.style.border = '1px solid red';
        accordionButton.style.color = 'black';
        accordionCollaspsed.classList.add('show');
        flushCollapseOne.style.border = '1px solid #ff1b3e';
    }, 1000)
}

// Alert de acesso permitido.
function sweetAlertAllowed() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Acesso permitido'
      })
}

// Alert de email e senha incorretos ou inválidos
function sweetAlertEmailIncorrect() {
    Swal.fire({
        icon: 'error',
        title: 'Email incorreto',
        text: 'Verifique seus dados e tente novamente',
      });
}

function sweetAlertPwdInvalid() {
    Swal.fire({
        icon: 'error',
        title: 'Senha inválida',
        text: 'Verifique sua senha e tente novamente!',
      });
}

function sweetAlertPwdIncorrect() {
    Swal.fire({
        icon: 'error',
        title: 'Senha incorreta',
        text: 'Verifique sua senha e tente novamente!',
      });
}

function sweetAlertCalcIncorrect() {
    Swal.fire({
        icon: 'error',
        title: 'Cálculo incorreto ou vázio!',
        text: `${numRandomOne} + ${numRandomTwo} é igual a: ${result}! Verifique e tente novamente`,
      });
}

function sweetAlertDenied() {
    Swal.fire({
        icon: 'error',
        title: 'Usuário não logado',
        text: 'Para continuar entre com sua conta, ou se cadastre!',
        footer: `<a href="../pages/registro.html">Cadastrar</a>`
      }) 
}



// função que faz refresh na página
window.onload = function requireLogin() {
    getStorageLocal();
}