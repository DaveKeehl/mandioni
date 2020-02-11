let screen = document.querySelector(".screen img");
let images = document.querySelectorAll(".gallery .photos img");
let previousButton = document.querySelector(".gallery .previous");
let nextButton = document.querySelector(".gallery .next");

let currentId = 0;

previousButton.addEventListener("click", () => {
	(currentId === 0) ? (currentId = images.length - 1) : (currentId = currentId - 1);
	removeSelectedClass();
	images[currentId].classList.add("selected");
	screen.src = images[currentId].src;
});

nextButton.addEventListener("click", () => {
	(currentId === images.length - 1) ? (currentId = 0) : (currentId = currentId + 1);
	removeSelectedClass();
	images[currentId].classList.add("selected");
	screen.src = images[currentId].src;
});

for (let i = 0; i < images.length; i++) {
	images[i].addEventListener('click', (e) => {
		currentId = i;
		removeSelectedClass();
		e.target.classList.add("selected");
		screen.src = e.target.src;
	});
}

function removeSelectedClass() {
	let selected = document.querySelector(".selected");
	selected.classList.remove("selected");
}