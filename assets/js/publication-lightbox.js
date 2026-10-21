(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var dialog = document.getElementById("publication-lightbox");
    if (!dialog) return;

    var frame = dialog.querySelector(".publication-lightbox__frame");
    var image = dialog.querySelector(".publication-lightbox__image");
    var caption = dialog.querySelector(".publication-lightbox__caption");
    var closeButton = dialog.querySelector(".publication-lightbox__close");
    var activeTrigger = null;

    document.querySelectorAll("[data-publication-image]").forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        if (typeof dialog.showModal !== "function") return;

        event.preventDefault();
        activeTrigger = trigger;
        image.src = trigger.href;
        image.alt = trigger.querySelector("img").alt;
        caption.textContent = image.alt;
        dialog.showModal();
      });
    });

    closeButton.addEventListener("click", function () {
      dialog.close();
    });

    dialog.addEventListener("click", function (event) {
      var bounds = frame.getBoundingClientRect();
      var outsideFrame = event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom;

      if (outsideFrame) dialog.close();
    });

    dialog.addEventListener("close", function () {
      image.removeAttribute("src");
      if (activeTrigger) activeTrigger.focus();
      activeTrigger = null;
    });
  });
})();
