document.addEventListener("DOMContentLoaded", () => {
    const overlayElement = document.querySelector("birl-overlay");
    if (!overlayElement) {
        return;
    }

    const customerId = overlayElement.dataset.customerId;
    if (!customerId) {
        return;
    }

    (async () => {
        const response = await fetch(`https://2d5795b16aa8.ngrok-free.app/public/v1/880015a6-9949-45d4-a941-240d3639c604/customers/${customerId}`, {
            headers: {
                'ngrok-skip-browser-warning': '12345'
            }
        });
        const customerOrders = await response.json();

        const maxCredit = customerOrders.reduce((acc, cur) => {
            return acc > cur.max_credit ? acc : cur.max_credit
        }, 0);

        const itemHtml = customerOrders.map((item) => {
            return `
                <div class="birl-overlay-card">
                    <div class="birl-overlay-card-header">
                        ${item.title}
                    </div>
                    <div style="height: fit-content">
                        <img style="max-width: 120px;" src="${item.image_url}" />
                    </div>
                
                    <div class="birl-overlay-card-footer">
                        Credit up to: £${item.max_credit}
                    </div>
                </div>
                `
        })

        overlayElement.innerHTML = `
            <div class="birl-overlay-container">
                <div>
                    <h1 class="birl-overlay-title">Save up to £${maxCredit}</h1>
                    <h2 class="birl-overlay-subtitle">Save when you trade-in an old item with birl.</h2>
                </div>
                <div class="birl-overlay-card-container">
                    ${itemHtml.join("\n")}
                </div>
            </div>
          `;
    })()
});