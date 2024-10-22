document.addEventListener("DOMContentLoaded", function () {
  console.log("Page has been loaded");

  let example=`
  <birl-button class='birl-button'
  data-storeName='Birl Garments'
  data-storeId='birl-garments'
  data-variant='product'
  data-width='full'
  data-img1='https://wearebirl.github.io/wearebirl/assets/home-1.png'
  data-img2='https://wearebirl.github.io/wearebirl/assets/home-2.png'
  data-customerId='123456'
  data-storeType='standard'
  data-heading='Get Instant Credit with Birl!'
  data-bodyText='It’s <b>super easy</b> to trade in the pieces you no'/>`


  function addButton(
    storeName,
    variant,
    width,
    img1,
    img2,
    customerId,
    style,
    storeType,
    heading,
    bodyText
  ) {
    if (style == "1") {
      return `
      <div class="birl-cta-container tooltip-btn" style="${
        width == "full" ? "width: 100%;" : `max-width: ${width}px;`
      }" onClick="showBirlWelcome()"
      }">
  <div class="tooltip-container"><span class="tooltip-text">
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> Trade-in your old ${storeName} ${
        storeType == "standard" ? "items" : "shirts"
      } for immediate credit.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">2.</b> Spend your credit as soon as you receive your unique code.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">3.</b> Send your trade-in back with the free digital label provided. 
  </span></div>
  <div class="birl-logo-container">
      <img class="birl-logo-2" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg" width="56" height="19" alt="Birl Logo">
    </div>
  <div class="birl-product-cta-text">
    <p>
      <span><b>
          ${variant == "product" ? "Get money off this item today" : ""}${
        variant.includes("account") ? "Get money off your next purchase" : ""
      } </b
        ><br>
        </span>
        <span style="color: #808080;">
        Trade-in ${storeName} ${
        storeType == "standard"
          ? "garments you no longer use"
          : "shirts you no longer wear"
      }
      </span>
    </p>
  </div>
</div>
                <div id="birlWelcome" class="birlWelcome">
                  <div class="birlWelcome-content">
                    <div class="birlWelcome-header">
                      <img
                        class="birlWelcome-logo"
                        src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg"
                      />
                      <span onclick="hideBirlWelcome()" class="birlWelcome-close">&times;</span>
                    </div>
                    <div class="birlWelcome-left">
                      <h1>
                        ${heading}
                      </h1>
                      <p>
                      ${bodyText}     
                      </p>
                      <button
                        class="birlWelcome-button"
                        ${`onClick="initiateBirl(${customerId})"`}
                      >
                        Get started
                      </button>
                    </div>
                    <div class="birlWelcome-right">
                      <img
                        class="birlWelcome-img1"
                        src="${img1}"
                        alt="img-1"
                      />
                      <img
                        class="birlWelcome-img2"
                        src="${img2}"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
    `;
    }
  }


  const birlButtons = document.querySelectorAll(".birl-button"); // Select by class
  birlButtons.forEach(function (birlButton) {
    const storeName = birlButton.getAttribute("data-storeName");
    const variant = birlButton.getAttribute("data-variant");
    const width = birlButton.getAttribute("data-width");
    const img1 = birlButton.getAttribute("data-img1") || "https://wearebirl.github.io/wearebirl/assets/home-1.png";
    const img2 = birlButton.getAttribute("data-img2") || "https://wearebirl.github.io/wearebirl/assets/home-2.png";
    const customerId = birlButton.getAttribute("data-customerId") || "";
    const style = birlButton.getAttribute("data-style") || "1";
    const storeType = birlButton.getAttribute("data-storeType") || "standard";
    const heading =
    birlButton.getAttribute("data-heading") ||
    "Get Instant Credit with Birl!";
    const bodyText =
    birlButton.getAttribute("data-bodyText") ||
    `It’s <b>super easy</b> to trade in the pieces you no
                      longer need, earn credit, and
                      <b>upgrade your wardrobe</b> with sustainable, stylish
                      picks that you’ll love.`;

    const newElement = document.createElement("div");
    
    newElement.innerHTML = addButton(
      storeName,
      variant,
      width,
      img1,
      img2,
      customerId,
      style,
      storeType,
      heading,
      bodyText
    );
    birlButton.insertAdjacentElement("afterend", newElement); // Replace directly with newElement
  });

  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute(
    "href",
    "https://wearebirl.github.io/wearebirl/birl-button.css"
  );
  document.getElementsByTagName("head")[0].appendChild(element);


  (function () {
    window.showBirlWelcome = () => {
      var birlModal = document.getElementById("birlWelcome");
      birlModal.style.display = "flex";
    };

    window.hideBirlWelcome = () => {
      var birlModal = document.getElementById("birlWelcome");
      birlModal.style.display = "none";
    };

  })();
});

function initiateBirl(customerId) {
  console.log("Initiating Birl trade-in session...");
  let storeId = "";
  let variant = "";
  const birlButtons = document.querySelectorAll(".birl-button"); // Select by class

  birlButtons.forEach(function (birlButton) {

    storeId = birlButton.getAttribute("data-storeId");
    variant = birlButton.getAttribute("data-variant");
  });

  const url = `https://portal-dev.wearebirl.com/api/external/createSession`;
  const reqBody = {
    customer_id: customerId || "",
    store_id: storeId,
    callback: window.location.href,
  };
  console.log(reqBody);
  async function initiateSession(url, reqBody) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });

      if (!response.ok) {
        alert("Failed to initiate session. Please try again.");
        return;
      }

      const body = await response.json();
      window.location.replace(
        `https://portal-dev.wearebirl.com/${body.store_id}/trade-in?session_id=${body.session_id}`
      );
    } catch (error) {
      console.error("Error initiating session:", error);
      alert("An error occurred. Please try again.");
    }
  }
  initiateSession(url, reqBody);
}
