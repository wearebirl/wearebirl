//     <meta name="birl-id" content="wearebirl">
//<script src="https://wearebirl.github.io/wearebirl/birl-portal-dev.js" defer="defer"/>

const SUPABASE_URL = "https://rclxweaaffupqiqdklhg.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbHh3ZWFhZmZ1cHFpcWRrbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwOTU5OTgsImV4cCI6MjAyNjY3MTk5OH0.h-KRME-ajXT2J_YNAEavTm77A3MjUj-j8otnj0VzTfI";

document.addEventListener("DOMContentLoaded", async function () {
  const getURLParameter = (name) => {
    return new URLSearchParams(window.location.search).get(name);
  };

  function getButtonText(storeName, storeTheme, style) {
    if (style === "minimal") {
      return `Trade-in garments you no longer use`;
    }

    if (storeTheme === "football") {
      return `Trade-in ${storeName} shirts you no longer wear`;
    }

    if (storeTheme === "jacket") {
      return `Trade-in ${storeName} jackets you no longer use`;
    }

    return `Trade-in ${storeName} garments you ${storeName.length >= 15 ? "don't" : "no longer"} use`;
  }

  function getDropdown1Text(storeName, storeTheme) {
    if (storeTheme === "football") {
      return `Trade-in your old ${storeName} shirts for immediate credit.`;
    }

    if (storeTheme === "jacket") {
      return `Trade-in your old ${storeName} jackets for immediate credit.`;
    }

    return `Trade-in your old ${storeName} items for immediate credit.`;
  }

  function addButton(storeName, variant, width, storeTheme, isHidden, style) {
    return `
      <div class="birl-cta-container tooltip-btn" style="${
        width === " full" ? "width: 100%;" : `max-width: ${width}px;`
      }  ${isHidden ? "display: none;" : ""} ${style === "minimal" ? "border-radius: 0px; border-color: black;" : "border-radius: 5px;"}" onClick="showBirlWelcome()" }">
          <div class="tooltip-container">
              <span class="tooltip-text">
                  <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> ${getDropdown1Text(
                    storeName,
                    storeTheme
                  )}
                  <br><br>
                  <b style="color: black; width: 12px; text-align:left; display: inline-block;">2.</b> Spend your credit as soon as you receive your unique code.
                  <br><br>
                  <b style="color: black; width: 12px; text-align:left; display: inline-block;">3.</b> Send your trade-in back with the free digital label provided.
              </span>
          </div>
          <div class="birl-logo-container" style="${
            style === "minimal" && "background-color: transparent;"
          }">
    
            ${
              style === "minimal"
                ? `<img class="birl-logo-2" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" width="56" height="19" alt="Birl Logo"></img>`
                : `<img class="birl-logo-2" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg" width="56" height="19" alt="Birl Logo"></img>`
            }
            </div>
          <div class="birl-product-cta-text">
              <p>
                  <span><b>
                          ${
                            variant === "product"
                              ? "Get money off this item today"
                              : ""
                          }${variant.includes("account") ? "Get money off your next purchase" : ""} </b><br>
                  </span>
                  <span style="color: #808080;">${getButtonText(
                    storeName,
                    storeTheme,
                    style
                  )}</span>
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

  async function fetchData(storeId) {
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
        if (data.length) {
          return {
            heading: data[0]?.modal_heading,
            bodyText: data[0]?.modal_body,
            storeName: data[0]?.name,
            storeTheme: data[0]?.theme,
            storeStatus: data[0]?.status,
            img1: data[0]?.cover_image,
            img2: data[0]?.cover_image_2,
            location: data[0]?.button_location,
            style: data[0]?.button_style,
          };
        }
      } else {
        console.error("Error fetching store data:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  const birlFlags = document
    ?.querySelector('meta[name="birl-id"]')
    ?.getAttribute("content");

  const flags = birlFlags.split(" ");
  const birlId = flags[0];
  const buttonEnabled = flags[1] === "enabled";

  const button = document?.querySelector(".birl-button");
  const buttonId = button?.getAttribute("data-storeId");

  const storeData = await fetchData(birlId || buttonId);

  const storeName = storeData.storeName;
  const width = button?.getAttribute("data-width") || "full";
  const variant = button?.getAttribute("data-variant") || "product";
  const storeTheme = storeData.storeTheme || "default";
  const isHidden = storeData.storeStatus !== "active";
  const customerId = button?.getAttribute("data-customerId");
  const style = storeData.style || "default";
  const newElement = document.createElement("div");

  newElement.innerHTML = addButton(
    storeName,
    variant,
    width,
    storeTheme,
    isHidden,
    style
  );

  const positionElement = document?.querySelector(
    storeData.location || ".birl-button"
  );

  if (!flags && !button) {
    return;
  }

  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute(
    "href",
    "https://wearebirl.github.io/wearebirl/birl-button.css"
  );
  document.getElementsByTagName("head")[0].appendChild(element);

  addModal(
    storeData.heading,
    storeData.bodyText,
    storeData.img1,
    storeData.img2,
    customerId
  );

  getURLParameter("openDropdown") === "true" && showBirlWelcome();
  console.log("Birl added to page");

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

  if (!buttonEnabled || !button) {
    return;
  }

  positionElement.insertAdjacentElement("afterend", newElement); // Replace directly with newElement
});

function initiateBirl(customerId) {
  console.log("Initiating Birl trade-in session...");
  let storeId = "";
  const birlId = document
    ?.querySelector('meta[name="birl-id"]')
    ?.getAttribute("content");
  const birlButton = document?.querySelector(".birl-button");
  storeId = birlId || birlButton?.getAttribute("data-storeId");
  variant = birlButton?.getAttribute("data-variant");

  document.getElementById("primaryGetStarted-button").innerHTML =
    '<div class="loader"></div>';

  const userData = {
    customer_id: customerId || "",
    store_id: storeId,
    callback: window.location.href,
  };

  const encodedUserData = btoa(JSON.stringify(userData));

  try {
    document.getElementById("primaryGetStarted-button").innerHTML =
      "Get started";
    const openedWindow = window.open(
      `https://portal.wearebirl.com/${storeId}/trade-in?u=${encodeURIComponent(
        encodedUserData
      )}`,
      "_blank"
    );

    if (!openedWindow || openedWindow.closed === undefined) {
      alert("Failed to open popup window, please try again.");
    }
  } catch (error) {
    console.error("Error initiating session:", error);
    alert("An error occurred. Please try again.");
  }
}
