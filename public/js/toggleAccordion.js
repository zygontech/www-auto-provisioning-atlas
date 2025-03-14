function toggleAccordion(event) {
  window.toggleAccordion = function (event) {
    const button = event.currentTarget;
    const content = button
      .closest(".feature-cell")
      .querySelector(".accordion-content");

    if (content) {
      content.classList.toggle("open");
    }
  };
}
