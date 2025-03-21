//<meta name="birl-id" content="wearebirl">
//<script src="https://wearebirl.github.io/wearebirl/birl-portal.js" defer="defer"/>
console.log("Birl Portal script loaded");
const SUPABASE_URL = "https://rclxweaaffupqiqdklhg.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbHh3ZWFhZmZ1cHFpcWRrbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwOTU5OTgsImV4cCI6MjAyNjY3MTk5OH0.h-KRME-ajXT2J_YNAEavTm77A3MjUj-j8otnj0VzTfI";

window.showBirlWelcome = function () {
  var birlModal = document.getElementById("birlWelcome");
  birlModal.style.display = "grid";
};

window.hideBirlWelcome = function () {
  var birlModal = document.getElementById("birlWelcome");
  birlModal.style.display = "none";
};

async function initializeBirl() {
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

    return `Trade-in ${storeName} garments you ${
      storeName.length >= 15 ? "don't" : "no longer"
    } use`;
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

  const buttonStyles = {
    default: {
      container: "birl-cta-container tooltip-btn birl-Gilroy",
      logoContainer: "birl-logo-container",
      tooltipContainer: "tooltip-container",
      logo: `<img src="https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg" width="56" height="19" alt="Birl Logo"></img>`,
      ctaText: "birl-product-cta-text",
    },
    basic: {
      container: "birl-cta-container tooltip-btn birl-cta-container-basic",
      tooltipContainer: "tooltip-container tooltip-container-basic",
      logoContainer: "",
      logo: `<img src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" width="56" height="19" alt="Birl Logo"></img>`,
      ctaText: "birl-product-cta-text-basic",
    },
    minimal: {
      container:
        "birl-cta-container tooltip-btn birl-cta-container-minimal birl-Gilroy",
      logoContainer: "birl-logo-container birl-logo-container-minimal",
      tooltipContainer: "tooltip-container",
      logo: `<img src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" width="56" height="19" alt="Birl Logo"></img>`,
      ctaText: "birl-product-cta-text",
    },
  };

  const modalStyles = {
    default: {
      container: "birlWelcome",
      content: "birlWelcome-content",
      header: "birlWelcome-header",
      logo: "birlWelcome-logo",
      close: "birlWelcome-close",
      left: "birlWelcome-left",
      heading: "birl-heading birl-Gilroy",
      bodyText: "birlWelcome-bodyText",
      bodyTextContent: "birlWelcome-bodyTextContent birl-Gilroy",
      right: "birlWelcome-right",
      img1: "birlWelcome-img1",
      img2: "birlWelcome-img2",
      button: "birlWelcome-button birl-Gilroy",
    },
    basic: {
      container: "birlWelcome",
      content: "birlWelcome-content birlWelcome-content-basic",
      header: "birlWelcome-header birlWelcome-header-basic",
      logo: "birlWelcome-logo",
      close: "birlWelcome-close birlWelcome-close-basic",
      left: "birlWelcome-left birlWelcome-leftRight-basic",
      heading: "birl-heading-basic",
      bodyText: "birlWelcome-bodyText",
      bodyTextContent: "birlWelcome-bodyTextContent-basic",
      right: "birlWelcome-right birlWelcome-leftRight-basic",
      img1: "birlWelcome-img1 birlWelcome-img-basic",
      img2: "birlWelcome-img2 birl-hidden",
      button: "birlWelcome-button birlWelcome-button-basic",
    },
  };

  function addButton(
    storeName,
    variant,
    width,
    storeTheme,
    isHidden,
    style,
    shortName
  ) {
    return `
      <div class="${buttonStyles[style].container} ${
      isHidden && "birl-hidden"
    }" style="${
      width === " full" ? "width: 100%;" : `max-width: ${width}px;`
    }" onClick="showBirlWelcome()" }">
          <div class="${buttonStyles[style].tooltipContainer}">
              <span class="tooltip-text">
                  <b>1.</b> ${getDropdown1Text(storeName, storeTheme)}
                  <br><br>
                  <b>2.</b> Spend your credit as soon as you receive your unique code.
                  <br><br>
                  <b>3.</b> Send your trade-in back with the free digital label provided.
              </span>
          </div>
          <div class="${buttonStyles[style].logoContainer}"> ${
      buttonStyles[style].logo
    }
            </div>
          <div class=${buttonStyles[style].ctaText}>
              <p>
              ${
                style === "basic"
                  ? `Get money off this item today with `
                  : `<span><b>
                          ${
                            variant === "product"
                              ? "Get money off this item today"
                              : ""
                          }${
                      variant.includes("account")
                        ? "Get money off your next purchase"
                        : ""
                    } </b><br>
                  </span>
                  <span style="color: #808080;">${getButtonText(
                    shortName || storeName,
                    storeTheme,
                    style
                  )}</span>`
              }
                  
              </p>
          </div>
      </div>
    `;
  }

  function addModal(heading, bodyText, img1, img2, customerId, style) {
    const modalHTML = `
      <div id="birlWelcome" class="${modalStyles[style].container}" style="display: none;">
        <div class="${modalStyles[style].content}">
          <div class="${modalStyles[style].header}">
            <img class="${modalStyles[style].logo}" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" />
            <span onclick="hideBirlWelcome()" class="${modalStyles[style].close}">&times;</span>
          </div>
          <div class="${modalStyles[style].left}">
            <h1 class="${modalStyles[style].heading}">
              ${heading}
            </h1>
            <div class="${modalStyles[style].bodyText}"> 
              <p class="${modalStyles[style].bodyTextContent}">
                ${bodyText}              
              </p>
            </div>
            <button id="primaryGetStarted-button" class="${modalStyles[style].button}" onClick="event.preventDefault(); initiateBirl(${customerId});">
              Get started
            </button>
          </div>
          <div class="${modalStyles[style].right}">
            <img class="${modalStyles[style].img1}" src="${img1}" alt="img-1" />
            <img class="${modalStyles[style].img2}" src="${img2}" alt="img-2" />
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML("afterbegin", modalHTML);
  }

  async function fetchData(storeId) {
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/stores?select=*,categories(*, pricings(*))&store_name=eq.${storeId}`,
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
          console.log("Store data fetched:", data[0]);
          return {
            heading: data[0]?.modal_heading,
            bodyText: data[0]?.modal_body,
            storeName: data[0]?.name,
            shortName: data[0]?.short_name,
            storeTheme: data[0]?.theme,
            storeStatus: data[0]?.status,
            img1: data[0]?.cover_image,
            img2: data[0]?.cover_image_2,
            location: data[0]?.button_location,
            style: data[0]?.button_style,
            cartLocation: data[0]?.cart_location,
            modalStyle: data[0]?.modal_style,
            categories: data[0]?.categories,
          };
        }
      } else {
        console.error("Error fetching store data:", response.statusText);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  console.log("Birl loading...");

  const birlFlags = document
    ?.querySelector('meta[name="birl-id"]')
    ?.getAttribute("content");

  const flags = birlFlags?.split(" ");
  const birlId = flags?.[0];
  const buttonEnabled = flags?.[1] === "enabled";

  const button = document?.querySelector(".birl-button");
  const buttonId = button?.getAttribute("data-storeId");

  const storeData = await fetchData(birlFlags ? birlId : buttonId);

  const categories = storeData.categories;

  let maxCredit = null;
  if (!categories || !window?.productType) {
    const category = productTypeToCategory(window.productType, categories);
    maxCredit = calculateMaxCreditValue(Number(window?.productPrice), category);
  }

  console.log("Max credit value:", maxCredit);
  const storeName = storeData.storeName;
  const shortName = storeData.shortName;
  const width = button?.getAttribute("data-width") || "full";
  const variant = button?.getAttribute("data-variant") || "product";
  const storeTheme = storeData.storeTheme || "default";
  const isHidden =
    storeData.storeStatus !== "active" ||
    button?.getAttribute("data-isHidden") === "true";
  const customerId = button?.getAttribute("data-customerId");
  const style = storeData.style || "default";
  const modalStyle = storeData.modalStyle || "default";
  const cartLocation = storeData.cartLocation || "";
  const newElement = document.createElement("div");

  newElement.innerHTML = addButton(
    storeName,
    variant,
    width,
    storeTheme,
    isHidden,
    style,
    shortName
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
    customerId,
    modalStyle
  );

  getURLParameter("openDropdown") === "true" && showBirlWelcome();
  console.log("Birl added to page");

  async function insertCartButton(storeData, buttonConfig) {
    if (storeData.cartLocation && storeData.cartLocation !== "") {
      console.log(`Inserting cart button after: ${cartLocation}`);
      const cartElement = document.querySelector(storeData.cartLocation);
      if (cartElement) {
        // Remove existing Birl cart button if present
        const existingButton = cartElement.nextElementSibling?.querySelector(
          ".birl-cta-container"
        );
        if (!existingButton) {
          const newCartElement = document.createElement("div");
          newCartElement.innerHTML = addButton(
            buttonConfig.storeName,
            "account",
            buttonConfig.width,
            buttonConfig.storeTheme,
            buttonConfig.isHidden,
            buttonConfig.style
          );
          cartElement.insertAdjacentElement("afterend", newCartElement);
        }
      }
    }
  }

  // Replace existing cart button insertion with new function
  const buttonConfig = {
    storeName,
    variant,
    width,
    storeTheme,
    isHidden,
    style,
  };

  await insertCartButton(storeData, buttonConfig);

  const cartObserverConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  };

  const cartObserver = new MutationObserver(async (mutations) => {
    try {
      // Debounce the callback to prevent multiple rapid executions
      if (cartObserver.timeout) {
        clearTimeout(cartObserver.timeout);
      }

      cartObserver.timeout = setTimeout(async () => {
        const cartContainer = document.querySelector(
          storeData.cartLocation
        )?.parentElement;
        if (cartContainer) {
          await insertCartButton(storeData, buttonConfig);
        }
      }, 100);
    } catch (error) {
      console.error("Cart observer error:", error);
    }
  });

  function startCartObserver() {
    const cartContainer = document.querySelector(".cart-drawer");
    if (cartContainer) {
      console.log("Cart observer started");
      cartObserver.observe(cartContainer, cartObserverConfig);
    } else {
      setTimeout(startCartObserver, 500);
    }
  }

  if (storeData.cartLocation) {
    startCartObserver();
  }

  if (!buttonEnabled && !button) {
    return;
  }

  if (!positionElement) {
    console.log("Button PDP position element not found");
  }
  console.log(
    `Inserting Birl PDP button after: ${storeData.location || ".birl-button"}`
  );
  positionElement.insertAdjacentElement("afterend", newElement); // Replace directly with newElement
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeBirl);
} else {
  // DOM is already loaded, run initialization directly
  initializeBirl();
}

function initiateBirl(customerId) {
  console.log("Initiating Birl trade-in session...");
  let storeId = "";
  const birlId = document
    ?.querySelector('meta[name="birl-id"]')
    ?.getAttribute("content")
    .split(" ")[0];
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

function productTypeToCategory(productType, categories, categoryName) {
  //Excluded
  const excludeCat = categories.find((cat) => cat.category_type === "exclude");
  if (excludeCat?.store_category_ids.includes(productType)) {
    //Excluded
    return excludeCat;
  }
  //Included
  const includeCat = categories.find(
    (cat) =>
      (cat.store_category_ids.includes(productType) ||
        cat.backup_categories.includes(categoryName || "")) &&
      cat.category_type === "include"
  );
  if (includeCat) {
    //Included
    return includeCat;
  }
  //Default
  const defaultCat = categories.find((cat) => cat.category_type === "default");
  return defaultCat;
}

const calculateMaxCreditValue = (price, category) => {
  const pricing = category?.pricing?.find(
    (pricing) => pricing.pricing_type.valueOf() == "internal"
  );
  if (!price || !pricing) {
    const missingParams = [];
    if (!price) missingParams.push("price");
    if (!pricing) missingParams.push("pricing");
    console.error(
      "Missing required parameters for calculateCreditValues:",
      missingParams.join(", ")
    );
    return;
  }

  const credit = Math.ceil((pricing.grade_a_amount / 100) * price);
  return Math.ceil((credit * (1 + pricing.grade_a_upsell / 100)) / 5) * 5;
};
