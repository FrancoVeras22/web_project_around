// Elementos del DOM
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupPlace = document.querySelector("#popup-place");
const closeButton = document.querySelector(".popup__close-button");
const closeButtonPopupPlace = popupPlace.querySelector(".popup__close-button");
const addButton = document.querySelector(".profile__add-button");

const nameInput = document.querySelector(".popup__name");
const aboutInput = document.querySelector(".popup__about");
const placeInput = document.querySelector(".popup__place");
const imageInput = document.querySelector(".popup__image");

const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");
const profileAddImage = document.querySelector(".profile__add-image");
const profileForm = document.querySelector(".popup__form");
const placeForm = popupPlace.querySelector(".popup__form");

const popupCard = document.querySelector("#popup__card");
const popupImage = popupCard.querySelector(".popup__image");
const popupTitle = popupCard.querySelector(".popup__content-title");
const closeButtonPopupImage = popupCard.querySelector(".popup__close-button");

const templateCard = document.querySelector(".template-card");
const gallery = document.querySelector(".gallery");
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

initialCards.forEach(function (item) {
  createCard(item.name, item.link);
});

function createCard(name, link) {
  const clonedCard = templateCard.content
    .querySelector(".gallery__frame")
    .cloneNode(true);
  const galleryText = clonedCard.querySelector(".gallery__text");
  const galleryImage = clonedCard.querySelector(".gallery__image");
  const heart = clonedCard.querySelector(".heart");
  const trashButton = clonedCard.querySelector(".card__delete-button");
  galleryText.textContent = name;
  galleryImage.src = link;
  heart.addEventListener("click", () => {
    heart.classList.toggle("liked");
    heart.textContent = heart.classList.contains("liked") ? "♥" : "♡";
  });
  trashButton.addEventListener("click", () => {
    clonedCard.remove();
  });
  galleryImage.addEventListener("click", () => {
    popupImage.src = link; // 1. src
    popupImage.alt = name; // 2. alt
    popupTitle.textContent = name; // 3. caption
    popupCard.classList.add("popup_show");
    closeButtonPopupImage.addEventListener("click", () => {
      popupCard.classList.remove("popup_show");
    });
  });
  gallery.append(clonedCard);
}

// Abrir popup y rellenar inputs
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileRole.textContent;
  popup.classList.add("popup_show");
});
// Abrir popupPlace y rellenar inputs
addButton.addEventListener("click", () => {
  popupPlace.classList.add("popup_show");
});

// Cerrar el popup
closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_show");
  popupPlace.classList.remove("popup_show");
});

// Editar datos
profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileRole.textContent = aboutInput.value;
  popup.classList.remove("popup_show");
});
// Agregar datos
placeForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createCard(placeInput.value, imageInput.value);
  popupPlace.classList.remove("popup_show");
});
closeButtonPopupPlace.addEventListener("click", () => {
  popupPlace.classList.remove("popup_show");
});
