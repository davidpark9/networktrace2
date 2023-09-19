const buttons = document.querySelectorAll('[data-carousel-button]');

// Define an array of background colors
const backgroundColors = ['#ffcccb', '#ffd700', '#87ceeb', '#98fb98'];
let backgroundColorIndex = 0; // Initialize the background color index

// Function to change the background color of the body with a fade transition
function changeBackgroundColor(color) {
  document.body.style.transition = 'background-color 1s ease-in-out';
  document.body.style.backgroundColor = color;
}

// Function to simulate typing effect
function typeMessage(message, element) {
  let i = 0;
  const speed = 3; // Typing speed in milliseconds

  function type() {
    if (i < message.length) {
      element.textContent += message.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  element.textContent = ''; // Clear the previous message
  type(); // Start the typing animation
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    const slides = button
      .closest("[data-carousel]")
      .querySelector('[data-slides]');

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    const activeImage = slides.children[newIndex].querySelector('img');
    const message = activeImage.dataset.message;

    const messageDiv = document.getElementById('message');
    typeMessage(message, messageDiv); // Apply the typing effect to the message

    //im defining the colors here 
    const backgroundColors = [
        '#CCC2B7',    // Color for the first image
        '#A17D58',    // Color for the second image
        '#CCD2D2',  // Color for the third image
        '#AFAFAF'   // Color for the fourth image, and so on
      ];
    
    
    // Change the background color with each image change
    const nextBackgroundColor = backgroundColors[backgroundColorIndex % backgroundColors.length];
    changeBackgroundColor(nextBackgroundColor);
    backgroundColorIndex++; // Move to the next background color
  });
});
