// MODAL

let modal = document.querySelector(".modal");
let modalScreen = document.querySelector(".modal .content .preview .screen");
let modalDescription = document.querySelector(".modal .description");
let modalBack = document.querySelector(".modal .previous");
let modalNext = document.querySelector(".modal .next");
let modalImages = document.querySelectorAll(".gallery img");
let closeModal = document.querySelector(".modal .close");

let modalId = 0;

for (let i = 0; i < modalImages.length; i++) {
	modalImages[i].addEventListener('click', (e) => {
		modalId = i;
		body.style.overflow = 'hidden';
		modal.style.display = 'flex';
		setTimeout( () => {
			modal.classList.remove('is-hidden');
		}, 0);
		modalScreen.src = e.target.src;
		if (e.target.alt !== "") {
			modalDescription.classList.remove('is-hidden');
			modalDescription.innerHTML = e.target.alt;
			modalScreen.alt = e.target.alt;
		} else {
			modalDescription.classList.add('is-hidden');
		}
	});
}

modalBack.addEventListener("click", () => {
	(modalId === 0) ? (modalId = modalImages.length - 1) : (modalId = modalId - 1);
	modalScreen.src = modalImages[modalId].src;
	if (modalImages[modalId].alt !== "") {
		modalDescription.classList.remove('is-hidden');
		modalDescription.innerHTML = modalImages[modalId].alt;
		modalScreen.alt = modalImages[modalId].alt;
	} else {
		modalDescription.classList.add('is-hidden');
	}
});

modalNext.addEventListener("click", () => {
	(modalId === modalImages.length - 1) ? (modalId = 0) : (modalId = modalId + 1);
	modalScreen.src = modalImages[modalId].src;
	if (modalImages[modalId].alt !== "") {
		modalDescription.classList.remove('is-hidden');
		modalDescription.innerHTML = modalImages[modalId].alt;
		modalScreen.alt = modalImages[modalId].alt;
	} else {
		modalDescription.classList.add('is-hidden');
	}
});

closeModal.addEventListener("click", () => {
	body.style.overflow = 'auto';
	modal.classList.add('is-hidden');
	setTimeout( () => {
		modal.style.display = 'none';
	}, 500);
});
