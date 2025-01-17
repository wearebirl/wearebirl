// Add this before the DOMContentLoaded event listener
let birlConfig = {
  storeId: null
};

window.initBirl = function(config) {
  birlConfig.storeId = config.storeId;
};

document.addEventListener("DOMContentLoaded", async function () {

  let example = `
  <birl-button class='birl-button'
  data-storeId='birl-garments'
  data-variant='product'
  data-width='full'
  data-customerId='123456'
 data-isHidden='false'
  />`;

  const getURLParameter = (name) => {
    return new URLSearchParams(window.location.search).get(name);
  };

  function getButtonText(storeName, storeTheme, isMinimal){
    if(isMinimal){
      return `Trade-in garments you no longer use`
    }

    if(storeTheme === 'football'){
      return `Trade-in ${storeName} shirts you no longer wear`
    }

    if(storeTheme === 'jacket'){
      return `Trade-in ${storeName} jackets you no longer use`
    }

    return `Trade-in ${storeName} garments you ${storeName.length >=15 ? "don't" : "no longer"} use`
  }

  function getDropdown1Text(storeName, storeTheme){
    if(storeTheme === 'football'){
      return `Trade-in your old ${storeName} shirts for immediate credit.`
    }

    if(storeTheme === 'jacket'){
      return `Trade-in your old ${storeName} jackets for immediate credit.`
    }

    return `Trade-in your old ${storeName} items for immediate credit.`
  }

  function addButton(
    storeName,
    variant,
    width,
    storeTheme,
    isHidden,
    isMinimal,
  ) {
    return `
      <div class="birl-cta-container tooltip-btn" style="${width === " full" ? "width: 100%;" : `max-width: ${width}px;` }  ${isHidden ? "display: none;" : "" } ${isMinimal ? "border-radius: 0px; border-color: black;" : "border-radius: 5px;"}" onClick="showBirlWelcome()" }">
          <div class="tooltip-container">
              <span class="tooltip-text">
                  <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> ${getDropdown1Text(storeName, storeTheme)}
                  <br><br>
                  <b style="color: black; width: 12px; text-align:left; display: inline-block;">2.</b> Spend your credit as soon as you receive your unique code.
                  <br><br>
                  <b style="color: black; width: 12px; text-align:left; display: inline-block;">3.</b> Send your trade-in back with the free digital label provided.
              </span>
          </div>
          <div class="birl-logo-container" style="${isMinimal && "background-color: transparent;"}">
    
            ${isMinimal ?
        (`<img class="birl-logo-2" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" width="56" height="19" alt="Birl Logo"></img>`) :
        (`<img class="birl-logo-2" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg" width="56" height="19" alt="Birl Logo"></img>`)
              }
            </div>
          <div class="birl-product-cta-text">
              <p>
                  <span><b>
                          ${
              variant === "product" ? "Get money off this item today" : ""
          }${variant.includes("account") ? "Get money off your next purchase" : ""} </b><br>
                  </span>
                  <span style="color: #808080;">${getButtonText(storeName, storeTheme, isMinimal)}</span>
              </p>
          </div>
      </div>
    `;
  }

  function addModal(heading, bodyText, img1, img2, customerId) {
    const modalHTML = `
      <div id="birlWelcome" class="birlWelcome">
        <div class="birlWelcome-content">
          <div class="birlWelcome-header">
            <img class="birlWelcome-logo" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" />
            <span onclick="hideBirlWelcome()" class="birlWelcome-close">&times;</span>
          </div>
          <div class="birlWelcome-left">
            <h1 class="birl-heading">
              ${heading}
            </h1>
            <div class="birlWelcome-bodyText"> 
              <p class="birlWelcome-bodyTextContent">
                ${bodyText}              
              </p>
            </div>
            <button id="primaryGetStarted-button" class="birlWelcome-button" onClick="event.preventDefault(); initiateBirl(${customerId});">
              Get started
            </button>
          </div>
          <div class="birlWelcome-right">
            <img class="birlWelcome-img1" src="${img1}" alt="img-1" />
            <img class="birlWelcome-img2" src="${img2}" alt="img-2" />
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML("afterbegin", modalHTML);
  }


  const SUPABASE_URL = "https://rclxweaaffupqiqdklhg.supabase.co";
  const SUPABASE_API_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbHh3ZWFhZmZ1cHFpcWRrbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwOTU5OTgsImV4cCI6MjAyNjY3MTk5OH0.h-KRME-ajXT2J_YNAEavTm77A3MjUj-j8otnj0VzTfI";

  const birlButtons = document.querySelectorAll(".birl-button"); // Select by class
  await birlButtons.forEach(async function (birlButton) {
    let storeName = "";
    const variant = birlButton.getAttribute("data-variant") || "product";
    const width = birlButton.getAttribute("data-width") || "full";
    let img1 =
      birlButton.getAttribute("data-img1") ||
      "https://wearebirl.github.io/wearebirl/assets/home-1.png";
    let img2 =
      birlButton.getAttribute("data-img2") ||
      "https://wearebirl.github.io/wearebirl/assets/home-2.png";
    const customerId = birlButton.getAttribute("data-customerId") || "";
    let storeTheme = "default";
    // Replace storeId retrieval with configured value
    const storeId = birlConfig.storeId || birlButton.getAttribute("data-storeId");
    let heading =
      birlButton.getAttribute("data-heading") || "Get Instant Credit with Birl";
    let bodyText =
      birlButton.getAttribute("data-bodyText") ||
      `It's <b>super easy</b> to trade-in your old pieces that you no longer need. <b>Earn instant</b> credit to upgrade your wardrobe with fresh items you'll love to wear.`;

    let isHidden = birlButton.getAttribute("data-isHidden") === "true";
    let isMinimal = birlButton.getAttribute("data-isMinimal") === "true";

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/stores?store_name=eq.${storeId}`,
        {
          method: "GET",
          headers: {
            apikey: SUPABASE_API_KEY,
            Authorization: `Bearer ${SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          heading = data[0].modal_heading || heading;
          bodyText = data[0].modal_body || bodyText;
          storeName = data[0].name || storeName;
          storeTheme = data[0].theme || storeTheme;
          const storeStatus = data[0].status;
          if (storeStatus && storeStatus != "active" && storeStatus != "demo") {
            isHidden = true;
          }
          if (data[0].use_modal_images === true) {
            img1 = data[0].cover_image || img1;
            img2 = data[0].cover_image_2 || img2;
          }
        }
      } else {
        console.error("Error fetching store data:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    const newElement = document.createElement("div");

    newElement.innerHTML = addButton(
      storeName,
      variant,
      width,
      storeTheme,
      isHidden,
        isMinimal
    );
    birlButton.insertAdjacentElement("afterend", newElement); // Replace directly with newElement
    
    addModal(heading, bodyText, img1, img2, customerId);
    getURLParameter("openDropdown") === "true" && showBirlWelcome();
    console.log("Birl added to page");
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
    console.log("URL parameters:", window.location.search);
    // Helper function to get URL parameters

    window.showBirlWelcome = () => {
      
      var birlModal = document.getElementById("birlWelcome");
      
      birlModal.style.display = "grid";

      
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
  const birlButtons = document.querySelectorAll(".birl-button");

  birlButtons.forEach(function (birlButton) {
    storeId = birlButton.getAttribute("data-storeId");
    variant = birlButton.getAttribute("data-variant");
  });

  document.getElementById("primaryGetStarted-button").innerHTML = '<div class="loader"></div>';

  const userData = {
    customer_id: customerId || "",
    store_id: storeId,
    callback: window.location.href,
  };

  const encodedUserData = btoa(JSON.stringify(userData));

  try {
    document.getElementById("primaryGetStarted-button").innerHTML = "Get started";
    const openedWindow = window.open(`https://portal.wearebirl.com/${storeId}/trade-in?u=${encodeURIComponent(encodedUserData)}`, "_blank");

    if (!openedWindow || openedWindow.closed === undefined) {
      alert('Failed to open popup window, please try again.');
    }
  } catch (error) {
    console.error("Error initiating session:", error);
    alert("An error occurred. Please try again.");
  }
}
