document.addEventListener("DOMContentLoaded", () => {
    const overlayElement = document.querySelector("birl-overlay");
    if (!overlayElement) {
        return;
    }

    const customerId = overlayElement.dataset.customerId || "Guest";

    overlayElement.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #333;
      color: #fff;
      padding: 10px 15px;
      border-radius: 8px;
    ">
      Customer ID: ${customerId}
    </div>
  `;
});
