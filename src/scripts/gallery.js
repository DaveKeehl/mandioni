// GALLERY

let galleryScreen = document.querySelector(".gallery .screen img");
let galleryImages = document.querySelectorAll(".gallery .photos img");
let galleryBack = document.querySelector(".gallery .previous");
let galleryNext = document.querySelector(".gallery .next");

let galleryId = 0;

galleryBack.addEventListener("click", () => {
	(galleryId === 0) ? (galleryId = galleryImages.length - 1) : (galleryId = galleryId - 1);
	removeSelectedClass();
	galleryImages[galleryId].classList.add("selected");
	galleryScreen.src = galleryImages[galleryId].src;
});

galleryNext.addEventListener("click", () => {
	(galleryId === galleryImages.length - 1) ? (galleryId = 0) : (galleryId = galleryId + 1);
	removeSelectedClass();
	galleryImages[galleryId].classList.add("selected");
	galleryScreen.src = galleryImages[galleryId].src;
});

for (let i = 0; i < galleryImages.length; i++) {
	galleryImages[i].addEventListener('click', (e) => {
		galleryId = i;
		removeSelectedClass();
		e.target.classList.add("selected");
		galleryScreen.src = e.target.src;
	});
}

function removeSelectedClass() {
	let selected = document.querySelector(".selected");
	selected.classList.remove("selected");
}
