// Formularios
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const recoverForm = document.getElementById("recover-form");

// Mensajes
const loginError = document.getElementById("login-error");
const registerError = document.getElementById("register-error");
const registerSuccess = document.getElementById("register-success");
const recoverError = document.getElementById("recover-error");
const recoverSuccess = document.getElementById("recover-success");

// Botones toggle dentro del login.html
const btnLogin = document.getElementById("btn-login");
const btnRegister = document.getElementById("btn-register");
const btnRecover = document.getElementById("btn-recover");

// Links dentro del formulario
const linkRecover = document.getElementById("link-recover");
const linkRegister = document.getElementById("link-register");

// Array simulado de usuarios
const usuarios = [];

// Función para mostrar un formulario y ocultar los demás
function toggleForm(form) {
  loginForm.classList.remove("active");
  registerForm.classList.remove("active");
  recoverForm.classList.remove("active");

  btnLogin.classList.remove("active");
  btnRegister.classList.remove("active");
  btnRecover.classList.remove("active");

  if(form === "login"){
    loginForm.classList.add("active");
    btnLogin.classList.add("active");
  } else if(form === "register"){
    registerForm.classList.add("active");
    btnRegister.classList.add("active");
  } else if(form === "recover"){
    recoverForm.classList.add("active");
    btnRecover.classList.add("active");
  }
}

// Toggle mediante los botones de arriba
btnLogin.addEventListener("click", () => toggleForm("login"));
btnRegister.addEventListener("click", () => toggleForm("register"));
btnRecover.addEventListener("click", () => toggleForm("recover"));

// Toggle mediante los links dentro de login
if(linkRecover) {
  linkRecover.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForm("recover");
  });
}
if(linkRegister) {
  linkRegister.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForm("register");
  });
}

// LOGIN
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  loginError.textContent = "";

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  const user = usuarios.find(u => u.email === email && u.password === password);
  if(user){
    loginError.style.color = "green";
    loginError.textContent = "¡Sesión iniciada!";
    loginForm.reset();
  } else {
    loginError.style.color = "red";
    loginError.textContent = "Correo o contraseña incorrectos";
  }
});

// REGISTRO
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registerError.textContent = "";
  registerSuccess.textContent = "";

  const nombre = document.getElementById("reg-nombre").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;

  if(usuarios.some(u => u.email === email)){
    registerError.textContent = "Este correo ya está registrado";
    return;
  }

  usuarios.push({ nombre, email, password });
  registerSuccess.textContent = "Registro exitoso, ya puedes iniciar sesión";
  registerForm.reset();
});

// RECUPERAR CONTRASEÑA
recoverForm.addEventListener("submit", (e) => {
  e.preventDefault();
  recoverError.textContent = "";
  recoverSuccess.textContent = "";

  const email = document.getElementById("recover-email").value.trim();
  const user = usuarios.find(u => u.email === email);
  if(user){
    recoverSuccess.textContent = `Contraseña: ${user.password} (simulado)`;
  } else {
    recoverError.textContent = "Correo no registrado";
  }
});

// Mostrar el formulario correcto al cargar según el hash de la URL
window.addEventListener("load", () => {
  const hash = window.location.hash;
  if(hash === "#register-form") {
    toggleForm("register");
  } else if(hash === "#recover-form") {
    toggleForm("recover");
  } else {
    toggleForm("login");
  }
});