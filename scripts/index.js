// Elementos del DOM
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const popupPlace = document.querySelector("#popup-place");
const popupProfile = document.querySelector("#popup-profile");
const popupContent = document.querySelector("#popup__content");
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

const spanMessageName = document.querySelector(".popup__error__name");
const spanMessageAbout = document.querySelector(".popup__error__about");
const saveButton = document.querySelector(".popup__save-button");
const spanMessageTitle = document.querySelector(".popup__error__title");
const spanMessageUrl = document.querySelector(".popup__error__url");

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
    document.addEventListener("keydown", closeOnEscape);
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
  document.addEventListener("keydown", closeOnEscape);
});
// Abrir popupPlace y rellenar inputs
addButton.addEventListener("click", () => {
  popupPlace.classList.add("popup_show");
  document.addEventListener("keydown", closeOnEscape);
});

// Cerrar popup
closeButton.addEventListener("click", () => {
  popup.classList.remove("popup_show");
});
popup.addEventListener("click", closePopupOnClickOutside);
popupPlace.addEventListener("click", closePopupOnClickOutside);
popupCard.addEventListener("click", closePopupOnClickOutside);
// Función para cerrar popup
function closePopup() {
  popup.classList.remove("popup_show");
  document.removeEventListener("keydown", closeOnEscape);
  popupPlace.classList.remove("popup_show");
  popupCard.classList.remove("popup_show");
}
function closePopupOnClickOutside(evt) {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close-button")
  ) {
    popup.classList.remove("popup_show");
    document.removeEventListener("keydown", closeOnEscape);
    popupPlace.classList.remove("popup_show");
    popupCard.classList.remove("popup_show");
  }
}
function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}
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

function validateInput(input) {
  const span = document.querySelector(`#${input.id}-error`);
  if (!input.validity.valid) {
    span.textContent = input.validationMessage;
  } else {
    span.textContent = "";
  }
}

function validateAllInputs(inputList) {
  const areAllInputsValid = inputList.some(function (input) {
    return !input.validity.valid;
  });
  return areAllInputsValid;
}

function toggleButton(inputList, submitButton) {
  if (!validateAllInputs(inputList)) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function setValidation() {
  const formList = Array.from(document.querySelectorAll("form"));
  formList.forEach(function (form) {
    const inputList = Array.from(form.querySelectorAll("input"));
    const submitButton = form.querySelector(".popup__save-button");
    inputList.forEach(function (input) {
      input.addEventListener("input", function () {
        validateInput(input);
        toggleButton(inputList, submitButton);
      });
      toggleButton(inputList, submitButton);
    });
  });
}
setValidation();
/*
// event listener para cuando el usuario ecribe nombre
nameInput.addEventListener("input", function () {
  validateInput(nameInput);
  toggleButton();
  if (!nameInput.validity.valid) {
    spanMessageName.textContent = nameInput.validationMessage;
    saveButton.disabled = true;
  } else {
    spanMessageName.textContent = "";
    saveButton.disabled = false;
  }
});

// event listener para cuando el usuario ecribe descripcion
aboutInput.addEventListener("input", function () {
  validateInput(aboutInput);
  toggleButton();
  if (!aboutInput.validity.valid) {
    spanMessageAbout.textContent = aboutInput.validationMessage;
    saveButton.disabled = true;
  } else {
    spanMessageAbout.textContent = "";
    saveButton.disabled = false;
  }
});*/

// event listener para cuando el usuario ecribe titulo
/*placeInput.addEventListener("input", function () {
  validateInput(placeInput);
  toggleButton();
   if (!placeInput.validity.valid) {
    spanMessageTitle.textContent = placeInput.validationMessage;
    saveButton.disabled = true;
  } else {
    spanMessageTitle.textContent = "";
    saveButton.disabled = false;
  }
});*/

// event listener para cuando el usuario ecribe URL
/*imageInput.addEventListener("input", function () {
  validateInput(imageInput);
  toggleButton();
  /*if (!imageInput.validity.valid) {
    spanMessageUrl.textContent = imageInput.validationMessage;
    saveButton.disabled = true;
  } else {
    spanMessageUrl.textContent = "";
    saveButton.disabled = false;
  }
});*/
