// let body = document.querySelector("body");
let modal = document.querySelector(".modal");
let screen = document.querySelector(".modal .content .preview .screen");
let description = document.querySelector(".modal .description");
let previousButton = document.querySelector(".modal .previous");
let nextButton = document.querySelector(".modal .next");
let images = document.querySelectorAll(".gallery img");
let closeModal = document.querySelector(".modal .close");

let currentId = 0;

for (let i = 0; i < images.length; i++) {
	images[i].addEventListener('click', (e) => {
		currentId = i;
		body.style.overflow = 'hidden';
		modal.style.display = 'flex';
		setTimeout( () => {
			modal.classList.remove('is-hidden');
		}, 0);
		screen.src = e.target.src;
		if (e.target.alt !== "") {
			description.classList.remove('is-hidden');
			description.innerHTML = e.target.alt;
			screen.alt = e.target.alt;
		} else {
			description.classList.add('is-hidden');
		}
	});
}

previousButton.addEventListener("click", () => {
	(currentId === 0) ? (currentId = images.length - 1) : (currentId = currentId - 1);
	screen.src = images[currentId].src;
	if (images[currentId].alt !== "") {
		description.classList.remove('is-hidden');
		description.innerHTML = images[currentId].alt;
		screen.alt = images[currentId].alt;
	} else {
		description.classList.add('is-hidden');
	}
});

nextButton.addEventListener("click", () => {
	(currentId === images.length - 1) ? (currentId = 0) : (currentId = currentId + 1);
	screen.src = images[currentId].src;
	if (images[currentId].alt !== "") {
		description.classList.remove('is-hidden');
		description.innerHTML = images[currentId].alt;
		screen.alt = images[currentId].alt;
	} else {
		description.classList.add('is-hidden');
	}
});

closeModal.addEventListener("click", () => {
	body.style.overflow = 'auto';
	modal.classList.add('is-hidden');
	setTimeout( () => {
		modal.style.display = 'none';
	}, 500);
});