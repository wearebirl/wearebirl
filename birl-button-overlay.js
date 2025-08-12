document.addEventListener("DOMContentLoaded", () => {
    const buttonElement = document.querySelector("birl-button-overlay");
    if (!buttonElement) {
        return;
    }

    const storeId = buttonElement.dataset.storeId;
    if (!storeId) {
        return;
    }

    buttonElement.innerHTML = `
        <div class="birl-button-overlay-container">
            <div class="birl-button-overlay-content">
                <div class="birl-button-overlay-logo">
                    <img class="birl-button-overlay-icon" src='https://storage.googleapis.com/birl-public/logos/birl-purple-icon.svg' />
                </div>
                <div>
                    <h1 class="birl-button-overlay-title">Get money off this item today</h1>
                    <h2 class="birl-button-overlay-subtitle">Trade-in FRAHM jackets you no longer use</h2>
                </div>
            </div>
        </div>
        `;
});