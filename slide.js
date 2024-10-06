// 무한반복 구조 완성하기 > 완성
// 상 하 반복 구조

const slideContainer = document.querySelector(".slide-container");
const slideTrack = document.querySelector(".slide-track");
const images = slideTrack.querySelectorAll("img");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const topBtn = document.querySelector("#topBtn");
const bottomBtn = document.querySelector("#bottomBtn");

let currentIndex = 0;
let topIndex = 0;
let falseIsToRight = false;
let falseIsToTop = false;
// false : L > R
// true : R > L
let intervalId = null;
const btns = [prevBtn, nextBtn, topBtn, bottomBtn];

function leftAndRightSlide() {
  stopSlideShow();
  slideTrack.style.transition = "none";
  setTimeout(() => {
    slideTrack.style.flexDirection = "row";
    slideTrack.offsetHeight; // 리플로우 강제
    slideTrack.style.transition = "all 0.5s ease-in-out";
    autoStartSlide();
  }, 50);
  if (falseIsToRight) {
    currentIndex++;
    if (currentIndex === images.length) {
      currentIndex = 0;
      slideTrack.style.transition = "none";
      slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      setTimeout(() => {
        slideTrack.offsetHeight;
        slideTrack.style.transition = "all 0.5s ease-in-out";
        slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      }, 50);
    } else {
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  } else {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
      slideTrack.style.transition = "none";
      slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      setTimeout(() => {
        slideTrack.offsetHeight;
        slideTrack.style.transition = "all 0.5s ease-in-out";
        slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      }, 50);
    } else {
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }
}

function topAndBottomSlide() {
  stopSlideShow();
  slideTrack.style.transition = "none";
  setTimeout(() => {
    slideTrack.style.flexDirection = "column";
    slideTrack.offsetHeight; // 리플로우 강제
    slideTrack.style.transition = "all 0.5s ease-in-out";
    autoTopSlide();
  }, 50);
  if (falseIsToTop) {
    // 하향 슬라이드
    topIndex++;
    if (topIndex >= images.length) {
      topIndex = 0;
      slideTrack.style.transition = "none";
      slideTrack.style.transform = `translateY(0)`;
      setTimeout(() => {
        slideTrack.offsetHeight; // 리플로우 강제
        slideTrack.style.transition = "all 0.5s ease-in-out";
        slideTrack.style.transform = `translateY(-${topIndex * 100}%)`;
      }, 50);
    } else {
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `translateY(-${topIndex * 100}%)`;
    }
  } else {
    // 상향 슬라이드
    topIndex--;
    if (topIndex < 0) {
      topIndex = images.length - 1;
      slideTrack.style.transition = "none";
      slideTrack.style.transform = `translateY(-${(images.length - 1) * 100}%)`;
      setTimeout(() => {
        slideTrack.offsetHeight; // 리플로우 강제
        slideTrack.style.transition = "all 0.5s ease-in-out";
        slideTrack.style.transform = `translateY(-${topIndex * 100}%)`;
      }, 50);
    } else {
      slideTrack.style.transition = "all 0.5s ease-in-out";
      slideTrack.style.transform = `translateY(-${topIndex * 100}%)`;
    }
  }
}

function autoStartSlide() {
  stopSlideShow();
  // 인터벌 지우고 다시 재생하는것 때문에 슬라이드가 망가지네?!
  intervalId = setInterval(leftAndRightSlide, 2500);
}

function autoTopSlide() {
  stopSlideShow();
  intervalId = setInterval(topAndBottomSlide, 2500);
}

function stopSlideShow() {
  clearInterval(intervalId);
}

function mouseDectected() {
  slideContainer.addEventListener("mouseenter", () => {
    stopSlideShow();
    btns.forEach((i) => {
      i.style.opacity = 1;
      i.style.transition = "all 0.5s ease-in-out";
    });
  });
  slideContainer.addEventListener("mouseleave", () => {
    autoStartSlide();
    setTimeout(() => {
      btns.forEach((i) => {
        i.style.opacity = 0;
        i.style.transition = "all 0.5s ease-in-out";
      });
    }, 1000);
  });
}

function reverseSlides() {
  falseIsToRight = !falseIsToRight;
  stopSlideShow();
  leftAndRightSlide();
  autoStartSlide();
}

function reverseTopSlides() {
  falseIsToTop = !falseIsToTop;
  stopSlideShow();
  topAndBottomSlide();
  autoTopSlide();
}

function clickDetected() {
  prevBtn.addEventListener("click", () => {
    stopSlideShow();
    reverseSlides();
  });
  nextBtn.addEventListener("click", () => {
    stopSlideShow();
    reverseSlides();
  });
  topBtn.addEventListener("click", () => {
    stopSlideShow();
    reverseTopSlides();
  });
  bottomBtn.addEventListener("click", () => {
    stopSlideShow();
    reverseTopSlides();
  });
}

autoStartSlide();
mouseDectected();
clickDetected();
