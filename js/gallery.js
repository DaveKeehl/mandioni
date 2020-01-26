let screen = document.querySelector(".screen");
let images = document.querySelectorAll(".gallery div img");

for (let i = 0; i < images.length; i++) {
	images[i].addEventListener('click', (e) => {
		let selected = document.querySelector(".selected");
		selected.classList.remove("selected");
		e.target.classList.add("selected");
		screen.src = e.target.src;
	});
}