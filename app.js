(() => {
  class Carousel {
    constructor() {
      this.carousel = document.querySelector(".carousel");
      this.carouselContainer = document.querySelector(".carousel__container");
      this.carousels = document.querySelectorAll(".carousel__slider");
      this.testimonials = document.getElementById("section-testimonials");
      this.buttonContainer = document.querySelector(
        ".carousel__button-container"
      );

      this.renderCarouselButtons(
        this.getCarouselPositions(this.carousels, this.carousel.offsetWidth)
      );

      this.interval = this.automaticCarousel.bind(this, this.buttonContainer)();
    }

    handleClick(event, index) {
      const carouselPositions = this.getCarouselPositions(
        this.carousels,
        this.carousel.offsetWidth
      );

      this.changeActive(event);
      clearInterval(this.interval);
      this.interval = this.automaticCarousel.bind(this, this.buttonContainer)();
      this.carouselContainer.scrollLeft = carouselPositions[index];
    }

    changeActive(event) {
      event.target.parentElement
        .querySelector(".active")
        .classList.remove("active");
      event.target.classList.add("active");
    }

    getCarouselPositions(amount, width) {
      const arr = [];
      amount.forEach((item, index) => arr.push(width * index));
      return arr;
    }

    automaticCarousel(buttonContainer) {
      return setInterval(() => {
        const carouselPositions = this.getCarouselPositions(
          this.carousels,
          this.carousel.offsetWidth
        );
        let index = 0;
        buttonContainer.childNodes.forEach((item, i) => {
          if (item.classList.contains("active")) {
            item.classList.remove("active");
            i === this.carousels.length - 1 ? (index = 0) : (index = i + 1);
          }
        });
        buttonContainer.childNodes[index].classList.add("active");
        this.carouselContainer.scrollLeft = carouselPositions[index];
      }, 4000);
    }

    renderCarouselButtons(carouselPositions) {
      carouselPositions.forEach((position, index) => {
        const button = document.createElement("button");
        button.className = "carousel__button";
        position === 0 && button.classList.add("active");
        button.addEventListener("click", (event) => {
          this.handleClick(event, index);
        });
        this.buttonContainer.appendChild(button);
      });
      return this.testimonials.appendChild(this.buttonContainer);
    }
  }

  new Carousel();
})();
