// Elementos del DOM
let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");

let nameInput = document.querySelector(".popup__name");
let aboutInput = document.querySelector(".popup__about");

let profileName = document.querySelector(".profile__name");
let profileRole = document.querySelector(".profile__role");

let profileForm = document.querySelector(".popup__form");

// Abrir popup y rellenar inputs
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileRole.textContent;
  popup.classList.add("popup_show");
});

// Cerrar el popup
closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_show");
});
// Cambio de datos
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileRole.textContent = aboutInput.value;
  popup.classList.remove("popup_show");
});
// Like
let hearts = document.querySelectorAll(".heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked");
    heart.textContent = heart.classList.contains("liked") ? "♥" : "♡";
  });
});
