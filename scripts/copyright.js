let copyrightYear = document.querySelector("footer .copyright span");
let currentYear = new Date().getFullYear();

copyrightYear.innerHTML = currentYear;