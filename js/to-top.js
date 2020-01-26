let bubble = document.querySelector(".to-top");

bubble.addEventListener('click', () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
	console.log("clicked");
});

window.addEventListener('scroll', (e) => {
	if (window.scrollY >= 50) {
		bubble.style.visibility = 'visible';
	}
	if (window.scrollY < 50) {
		bubble.style.visibility = 'hidden';
	}
	console.log("scrolled");
});

// // ===== Scroll to Top ==== 
// $(window).scroll(function() {
// 	if ($(this).scrollTop() >= 50) {		// If page is scrolled more than 50px
// 		$('#return-to-top').fadeIn(200);	// Fade in the arrow
// 	} else {
// 		$('#return-to-top').fadeOut(200);   // Else fade out the arrow
// 	}
// });

// $('#return-to-top').click(function() {	  // When arrow is clicked
// 	$('body,html').animate({
// 		scrollTop : 0					   // Scroll to top of body
// 	}, 500);
// });
