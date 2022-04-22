const form = document.getElementById('formValid');
const offcanvasBackdrop = document.querySelector('.offcanvas-backdrop');

const userLogin = [
    {
        id: 1001,
        username: 'tawansilva',
        senha: 'cebola123',
        email: 'tawan.tlsvem@gmail.com'
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
        senha: 'televisao555',
        email: 'televisao@gmail.com'
    }
]

form.addEventListener('submit', e => {
    e.preventDefault()
    const inputEmail = document.getElementById('inputEmail').value;
    const inputPwd = document.getElementById('inputPwd').value;
    checkEmail(inputEmail, inputPwd);
});

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


function take(inputEmail, inputPwd) {
    const indexEmail = arrayEmail.indexOf(inputEmail);
    console.log(`A index do email é ${indexEmail}`);
    checkPwd(inputPwd, indexEmail);
}

function checkEmail(inputEmail, inputPwd) {
    if (/.com$/.test(inputEmail) === false || inputEmail == '' || !arrayEmail.includes(inputEmail)) {
        return sweetAlertEmailIncorrect()
    } else {
        console.log(`O email digitado tem no array ? ${arrayEmail.includes(inputEmail)}`);
        take(inputEmail, inputPwd);
    }
}

function checkPwd(inputPwd, indexEmail) {
    if (inputPwd == '' || !arraySenha.includes(inputPwd)) {
        return sweetAlertPwdIncorrect()
    }
    else if (arraySenha.indexOf(inputPwd) !== indexEmail) {
        console.log(`index do inputPwd ${arraySenha.indexOf(inputPwd)}`);
        return sweetAlertPwdIncorrect()
    } else {
        storageLocal(arrayId[indexEmail], arrayNames[indexEmail], arrayEmail[indexEmail], arraySenha[indexEmail]);
        window.location = '../index.html'
    }
}

function storageLocal(arrayId, arrayNames, arrayEmail, arraySenha) {
    localStorage.setItem('user', JSON.stringify({ id: arrayId, name: arrayNames, email: arrayEmail, password: arraySenha }));
}

function getStorageLocal() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    localStorage.getItem('user') !== null ? sweetAlertAllowed() : blockUser();
}

window.onload = function requireLogin() {
    getStorageLocal();
}


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

function sweetAlertAllowed() {
    let timerInterval
Swal.fire({
  title: 'Acesso permitido!',
  html: 'Fechando em <b></b> milissegundos.',
  timer: 1500,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}

function sweetAlertDenied() {
    Swal.fire({
        icon: 'error',
        title: 'Usuário não logado',
        text: 'Para continuar entre com sua conta, ou se cadastre!',
        footer: `<a href="../pages/registro.html">Cadastrar</a>`
      }) 
}
