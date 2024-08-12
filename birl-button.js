document.addEventListener("DOMContentLoaded", function () {
    console.log("Page has been loaded");
  
    const customHTML = `
      <div class="custom-button">
        <button>Click Me!</button>
      </div>
    `;
  
    const birlButtons = document.querySelectorAll(".birlbutton"); // Select by class
  
    birlButtons.forEach(function (birlButton) {
      const newElement = document.createElement("div");
      newElement.innerHTML = customHTML;
      birlButton.replaceWith(newElement); // Replace directly with newElement
    });
  });
  