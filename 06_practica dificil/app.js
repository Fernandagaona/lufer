import { app } from "./firebase.js ";

import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

let user = null;

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  const container = document.querySelector("#container");
  checarEstado(user);
  if (user) {
    container.innerHTML = `<h1>Bienvenido ${user.email}</h1>`;
    const uid = user.uid;
  } else {
    container.innerHTML = `<h1>No Hay Usuario</h1>`;
  }
});

const provier = new GoogleAuthProvider();
const btnCrear = document.querySelector("#btnCrear");
const btnGoogle = document.querySelector("#btnGoogle");
const btnIniciar = document.querySelector("#btnIniciar");
const btnCerrar = document.querySelector("#btnCerrar");

btnIniciar.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#iniciarEmail");
  const password = document.querySelector("#iniciarPassword");
  console.log(email.value, password.value);
});

btnGoogle.addEventListener("click", async (e) => {
  e.preventDefault();
  const provier = new GoogleAuthProvider();
  try {
    const credentials = await signInWithPopup(auth, provier);
    user = credentials.user;
    const modalInstance = bootstrap.Modal.getInstance(
      btnGoogle.closest(".modal")
    );
    modalInstance.hide();
    checarEstado(user);
  } catch (error) {
    console.log(error);
  }
});

const checarEstado = (user = null) => {
  console.log(user);
  if ((user == null)) {
    document.querySelector("#iniciar").style.display = "block";
    document.querySelector("#crear").style.display = "block";
    document.querySelector("#btnCerrar").style.display =
      "none";
  } else {
    document.querySelector("#iniciar").style.display = "none";
    document.querySelector("#crear").style.display = "none";
    document.querySelector("#btnCerrar").style.display =
      "block";
  }
};

btnCerrar.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await signOut(auth);
    checarEstado();
  } catch (error) {
    console.log(error);
  }
});

btnIniciar.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#iniciarEmail");
  const password = document.querySelector("#iniciarPassword");
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    user = res.user;
    Swal.fire("Bienvenido!!");
    var myModalEl = document.getElementById("iniciarModal");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    Swal.fire("Usuario y/o Contraseña Incorrecta!");
  }
});

btnCrear.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#crearEmail");
  const password = document.querySelector("#crearPassword");
  //console.log(email.value, password.value);
  var myModalEl = document.getElementById("crearModal");
  var modal = bootstrap.Modal.getInstance(myModalEl);
  try {
    const respuesta = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log(respuesta.user);
    Swal.fire({
      icon: "success",
      title: "exito",
      text: "Se Registro Correctamente!!",
    });
    email.value = "";
    password.value = "";
    modal.hide();
  } catch (error) {
    console.log(error.code);
    const code = error.code;
    if (code == "auth/invalid-email") {
      Swal.fire({
        icon: "error",
        text: "Email Invalido!",
      });
    }
    if (code == "auth/weak-password") {
      Swal.fire({
        icon: "error",
        text: "Password Invalida!",
      });
    }
    if (code == "auth/email-already-in-user") {
      Swal.fire({
        icon: "error",
        text: "Email Ya Esta Registrado!",
      });
    }
  }
});

checarEstado();