let body = document.querySelector("body");
let pageContent = document.querySelector(".page-content");
let mobileMenu = document.querySelector(".mobile-menu");
let menuButton = document.querySelector("header button");

let isOpen = false;

menuButton.addEventListener("click", (e) => {
	(isOpen === false) ? openMenu() : closeMenu();
	toggleState();
	console.log(isOpen);
});

function toggleState() {
	isOpen === true ? isOpen = false : isOpen = true;
}

function openMenu() {
	body.style.overflow = "hidden";
	pageContent.classList.remove("menu-closed");
	mobileMenu.classList.remove("menu-closed");
}

function closeMenu() {
	body.style.overflow = "auto";
	pageContent.classList.add("menu-closed");
	mobileMenu.classList.add("menu-closed");
}