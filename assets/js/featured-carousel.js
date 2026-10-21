(function () {
  "use strict";

  function initCarousels() {
    document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
      if (carousel.dataset.carouselReady === "true") {
        return;
      }

      var slides = Array.prototype.slice.call(carousel.querySelectorAll("[data-carousel-slide]"));
      var dots = Array.prototype.slice.call(carousel.querySelectorAll("[data-carousel-dot]"));
      var previousButton = carousel.querySelector("[data-carousel-prev]");
      var nextButton = carousel.querySelector("[data-carousel-next]");
      var status = carousel.querySelector("[data-carousel-status]");
      var statusLabel = carousel.getAttribute("data-carousel-label") || "Slide";
      var autoplayEnabled = carousel.getAttribute("data-carousel-autoplay") === "true";
      var multiCard = carousel.getAttribute("data-carousel-multi") === "true";
      var autoplayTimer = null;
      var activeIndex = 0;

      if (!slides.length) {
        return;
      }

      carousel.dataset.carouselReady = "true";

      function visibleCount() {
        if (!multiCard) return 1;
        if (window.matchMedia("(max-width: 760px)").matches) return 1;
        if (window.matchMedia("(max-width: 1400px)").matches) return 2;
        return 3;
      }

      function showSlide(index, announce) {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach(function (slide, slideIndex) {
          if (multiCard) {
            slide.style.order = (slideIndex - activeIndex + slides.length) % slides.length;
          }
          var isActive = multiCard
            ? (slideIndex - activeIndex + slides.length) % slides.length < Math.min(visibleCount(), slides.length)
            : slideIndex === activeIndex;
          slide.classList.toggle("is-active", isActive);
          slide.setAttribute("aria-hidden", String(!isActive));
        });

        dots.forEach(function (dot, dotIndex) {
          var isActive = dotIndex === activeIndex;
          dot.classList.toggle("is-active", isActive);
          dot.setAttribute("aria-current", String(isActive));
        });

        if (status) {
          status.setAttribute("aria-live", announce ? "polite" : "off");
          status.textContent = multiCard
            ? statusLabel + "s starting at " + (activeIndex + 1) + " of " + slides.length
            : statusLabel + " " + (activeIndex + 1) + " of " + slides.length;
        }
      }

      function stopAutoplay() {
        if (autoplayTimer) {
          window.clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      }

      function startAutoplay() {
        stopAutoplay();
        if (autoplayEnabled && slides.length > 1 && !carousel.matches(":hover") && !carousel.contains(document.activeElement)) {
          autoplayTimer = window.setInterval(function () {
            showSlide(activeIndex + 1, false);
          }, 6500);
        }
      }

      function selectSlide(index) {
        showSlide(index, true);
        startAutoplay();
      }

      if (slides.length < 2) {
        carousel.classList.add("has-single-slide");
        showSlide(0, false);
        return;
      }

      if (previousButton) {
        previousButton.addEventListener("click", function () {
          selectSlide(activeIndex - 1);
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", function () {
          selectSlide(activeIndex + 1);
        });
      }

      dots.forEach(function (dot) {
        dot.addEventListener("click", function () {
          selectSlide(Number(dot.getAttribute("data-carousel-index")));
        });
      });

      carousel.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          selectSlide(activeIndex - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          selectSlide(activeIndex + 1);
        }
      });

      carousel.addEventListener("mouseenter", stopAutoplay);
      carousel.addEventListener("mouseleave", startAutoplay);
      carousel.addEventListener("focusin", stopAutoplay);
      carousel.addEventListener("focusout", startAutoplay);

      if (multiCard) {
        window.addEventListener("resize", function () { showSlide(activeIndex, false); });
      }

      showSlide(0, false);
      startAutoplay();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCarousels, { once: true });
  } else {
    initCarousels();
  }
})();
