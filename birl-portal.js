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

  function addButton(
    storeName,
    variant,
    width,
    storeTheme,
    isHidden
  ) {
    return `
      <div class="birl-cta-container tooltip-btn" style="${
        width == "full" ? "width: 100%;" : `max-width: ${width}px;`
      } ${isHidden && "display: none;"}" onClick="showBirlWelcome()"}">
        <div class="tooltip-container">
          <span class="tooltip-text">
            <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> Trade-in your old ${storeName} ${storeTheme == "default" ? "items" : "shirts"} for immediate credit.
            <br><br>
            <b style="color: black; width: 12px; text-align:left; display: inline-block;">2.</b> Spend your credit as soon as you receive your unique code.
            <br><br>
            <b style="color: black; width: 12px; text-align:left; display: inline-block;">3.</b> Send your trade-in back with the free digital label provided. 
          </span>
        </div>
        <div class="birl-logo-container">
          <img class="birl-logo-2" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg" width="56" height="19" alt="Birl Logo">
         </div>
        <div class="birl-product-cta-text">
          <p>
            <span><b>
                ${
                  variant == "product" ? "Get money off this item today" : ""
                }${variant.includes("account") ? "Get money off your next purchase" : ""} </b
              ><br>
              </span>
              <span style="color: #808080;">
              Trade-in ${storeName} ${storeTheme == "default" ? `garments you ${storeName.length >=15 ? "don't" : "no longer"} use` : "shirts you no longer wear"}
            </span>
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
    const variant = birlButton.getAttribute("data-variant");
    const width = birlButton.getAttribute("data-width");
    const img1 =
      birlButton.getAttribute("data-img1") ||
      "https://wearebirl.github.io/wearebirl/assets/home-1.png";
    const img2 =
      birlButton.getAttribute("data-img2") ||
      "https://wearebirl.github.io/wearebirl/assets/home-2.png";
    const customerId = birlButton.getAttribute("data-customerId") || "";
    let storeTheme = "default";
    const storeId = birlButton.getAttribute("data-storeId");
    let heading =
      birlButton.getAttribute("data-heading") || "Get Instant Credit with Birl";
    let bodyText =
      birlButton.getAttribute("data-bodyText") ||
      `It's <b>super easy</b> to trade-in your Peregrine pieces that you no longer need. <b>Earn instant</b> credit to upgrade your wardrobe with fresh items you'll love to wear.`;

    const isHidden = birlButton.getAttribute("data-isHidden") === "true";

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
          heading = data[0].heading || heading;
          bodyText = data[0].bodyText || bodyText;
          storeName = data[0].name || storeName;
          storeTheme = data[0].theme || storeTheme;
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
      isHidden
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

      let hideElements = true; // A flag to know when we reached our element
    
      // Loop through all elements in the DOM
      document.querySelectorAll('*').forEach(element => {
        // Check if we reached our element; stop hiding further elements
        if (element === birlModal) {
          hideElements = false;
        }
    
        // Only hide elements above our element in the DOM and with `position: fixed`
        if (hideElements && window.getComputedStyle(element).position === 'fixed') {
          element.style.display = 'none';
        }
      });
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

  document.getElementById("primaryGetStarted-button").innerHTML =
    '<div class="loader"></div>';
  const url = `https://portal.wearebirl.com/api/external/createSession`;
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
      console.log(response);

      if (!response.ok) {
        alert("Failed to initiate session. Please try again.");
        return;
      }

      document.getElementById("primaryGetStarted-button").innerHTML =
        "Get started";
      const body = await response.json();
      setTimeout(() => {
        window.open(
          `https://portal.wearebirl.com/${body.store_id}/trade-in?session_id=${body.session_id}`,
          "_blank"
        );
      });
    } catch (error) {
      console.error("Error initiating session:", error);
      alert("An error occurred. Please try again.");
    }
  }
  initiateSession(url, reqBody);
}
