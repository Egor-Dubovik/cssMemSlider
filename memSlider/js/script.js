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

function init() {
	slideWidth = (track.clientWidth) / slidesToShow;
	position = 0
	index = 0

	slides.forEach((slide, index) => {
		slide.style.minWidth = `${slideWidth}px`;
	});
	displaySliderAction()
};
init();

// **displaySliderAction -----------------------------------------------------------------------------
function displaySliderAction() {
	setPosition();
	checkBtns();
	showCurrentDot();
	changeText();
}

function setPosition() {
	track.style.transform = `translateX(${position}px)`;
};

function checkBtns() {
	btnNext.disabled = position <= - (slidesAmount - slidesToShow) * slideWidth;
	btnPrev.disabled = position === 0;
}

function disableNavAbility(condition) {
	const sliderNavElements = document.querySelectorAll(".slider-nav");
	sliderNavElements.forEach(el => {
		condition ? el.style.pointerEvents = "none" : el.style.pointerEvents = "";
	});
}

function showCurrentDot() {
	const sliderAllDots = document.querySelectorAll('.slider-dot');
	sliderAllDots.forEach((dot, i) => {
		dot.classList.remove("active")
		if (index === i) dot.classList.add("active");
	})
}

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

// ** functions for display text -----------------------------------------------------------------------
function changeText(par) {
	let prase = arrPhrase[index];
	let count = 0;
	let out = "";
	disableNavAbility(true);

	let interval = setTimeout(function createLine() {
		sliderText.innerHTML = out + "<span class = 'slider-dot__flashing-input'>|</span>";
		out += prase[count];
		count++;

		if (count > prase.length) {
			clearTimeout(interval);
			disableNavAbility(false);
		} else {
			interval = setTimeout(createLine, getRandomNum(getRandomNum(200)))
		}
	}, 0);
}

function getRandomNum(max) {
	return Math.round(Math.random() * max);
}
