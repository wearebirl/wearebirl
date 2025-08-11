document.addEventListener("DOMContentLoaded", () => {
    const overlayElement = document.querySelector("birl-overlay");
    if (!overlayElement) {
        return;
    }

    const customerId = overlayElement.dataset.customerId;
    if(!customerId) {
        return;
    }

    (async () => {
        const response = await fetch(`https://2d5795b16aa8.ngrok-free.app/public/v1/880015a6-9949-45d4-a941-240d3639c604/customers/${customerId}`, {headers: {'ngrok-skip-browser-warning': '12345'}});
        const customerOrders = await response.json();

        const itemHtml = customerOrders.map((item) => {
            return `<div>
                        <img style="width: 80px; height: auto;" src="${item.image_url}" />
                        <p>${item.max_credit}</p>
                    </div>`
        })

        overlayElement.innerHTML = `
            <div class="birl-overlay-container">
              Save up to £100 
              <div style="display: flex; flex-direction: row;">
                   ${itemHtml.join("\n")}
</div>
        
            </div>
          `;
    })()
});
