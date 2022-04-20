const
	sliderText = document.querySelector('.slider-text'),
	slider = document.querySelector('.slider'),
	track = document.querySelector('.slider__track'),
	btnPrev = document.querySelector('.slider-btn-prev'),
	btnNext = document.querySelector('.slider-btn-next'),
	slides = document.querySelectorAll('.slider__slide'),
	sliderBoxDots = document.querySelector('.slider-dots'),
	slidesAmount = slides.length,
	slidesToShow = 1;
let position = 0;
let slideWidth = 0;
let movePosition = 0;
let index = 0;

const arrPhrase = [
	"When sent a project for review and decided don't waste time",
	"Mom: Don't touch your computer and mobile until your exams are over.<br>Me studying software engineering",
	"The war that will never end!",
	"When you write 500 lines of code<br>And exit without saving it",
	"Those who will not work shall sleep",
	"When you code code compiles without any errors the first time:<br>Something's wrong I can feel it",
	"When you finally cath the person that's been writing bad code all the time"
];

sliderBoxDots.addEventListener("click", switchByDots);
btnNext.addEventListener("click", switchRight);
btnPrev.addEventListener("click", switchLeft);


(function createDots() {
	sliderBoxDots.innerHTML = "";
	const amountDots = Math.round(slides.length / slidesToShow);

	for (let i = 0; i < amountDots; i++) {
		const dot = document.createElement("span");
		dot.className = "slider-dot slider-nav";
		dot.dataset.indexNum = i;
		sliderBoxDots.append(dot);
	}
})();

// **displaySliderAction -----------------------------------------------------------------------------

function showCurrentDot() {
	const sliderAllDots = document.querySelectorAll('.slider-dot');
	sliderAllDots.forEach((dot, i) => {
		dot.classList.remove("active")
		if (index === i) dot.classList.add("active");
	})
}
//------------------------------------------------------------------------------------------------------

// ** switching ----------------------------------------------------------------------------------------
function switchRight() {
	position = 0;
	position -= ++index * slideWidth;
	displaySliderAction();
}

function switchLeft() {
	position = 0
	position -= --index * slideWidth;
	displaySliderAction();
}

function switchByDots(e) {
	if (e.target.classList.contains("slider-dot")) {
		index = +e.target.dataset.indexNum;
		position = 0;
		position -= index * slideWidth;
		displaySliderAction();
	}
}
//------------------------------------------------------------------------------------------------------