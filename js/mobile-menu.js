let body = document.querySelector("body");
let pageContent = document.querySelector(".page-content");
let mobileMenu = document.querySelector(".mobile-menu");
let mobileMenuList = document.querySelector(".mobile-menu ul");
let menuButton = document.querySelector("header button");
let closeButton = document.querySelector(".mobile-menu .close");

let isOpen = false;

menuButton.addEventListener("click", (e) => {
	(isOpen === false) ? openMenu() : closeMenu();
	toggleState();
	console.log(isOpen);
});

closeButton.addEventListener("click", () => {
	closeMenu();
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