document.addEventListener('DOMContentLoaded', function () {
  
  // Collapsible Elements
  var collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(function (collapsible) {
    collapsible.addEventListener('click', function () {
      this.classList.toggle('active');
      var content = this.nextElementSibling;
      if (content.style.display === 'block') {
        content.style.display = 'none';
      } else {
        content.style.display = 'block';
      }
    });
  });

  // Floating Button Menu
  var floatingButton = document.getElementById('floatingButton');
  var menu = document.getElementById('mennu');

  function toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation(); 
    console.log("Button clicked, current menu class list:", menu.classList);
    menu.classList.toggle('show');
    console.log("Menu class list after toggle:", menu.classList);
  }

  floatingButton.addEventListener('click', toggleMenu);

  // Slider
  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  const slider = document.querySelector('.slider');
  const progressBar = document.querySelector('.slider-progress');
  
  document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  slider.addEventListener('mousedown', dragStart);
  slider.addEventListener('mouseup', dragEnd);
  slider.addEventListener('mouseleave', dragEnd);
  slider.addEventListener('mousemove', dragMove);

  function dragStart(e) {
    isDragging = true;
    startPos = e.clientX;
    slider.classList.add('grabbing');
  }

  function dragEnd() {
    isDragging = false;
    slider.classList.remove('grabbing');
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < totalSlides - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
    updateSlider();
  }

  function dragMove(e) {
    if (isDragging) {
      const currentPosition = e.clientX;
      currentTranslate = prevTranslate + currentPosition - startPos;
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }
  }

  function updateSlider() {
    currentTranslate = -currentIndex * slider.offsetWidth / totalSlides;
    prevTranslate = currentTranslate;
    slider.style.transform = `translateX(${currentTranslate}px)`;
    updateProgressBar();
  }

  function updateProgressBar() {
    const progress = ((currentIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progress}%`;
  }

  updateSlider();

  slider.addEventListener('touchstart', touchStart);
  slider.addEventListener('touchend', touchEnd);
  slider.addEventListener('touchmove', touchMove);

  let startTouchPos = 0;

  function touchStart(e) {
    startTouchPos = e.touches[0].clientX;
    slider.classList.add('grabbing');
  }

  function touchEnd() {
    slider.classList.remove('grabbing');
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < totalSlides - 1) currentIndex += 1;
    if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
    updateSlider();
  }

  function touchMove(e) {
    if (slider.classList.contains('grabbing')) {
      const currentTouchPos = e.touches[0].clientX;
      currentTranslate = prevTranslate + currentTouchPos - startTouchPos;
      slider.style.transform = `translateX(${currentTranslate}px)`;
    }
  }

  // Initial Update for Slider
  updateSlider();
  
});