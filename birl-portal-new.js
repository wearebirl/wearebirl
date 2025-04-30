//<meta name="birl-id" content="wearebirl">
//<script src="https://wearebirl.github.io/wearebirl/birl-portal.js" defer="defer"/>
console.log("Birl Portal script loaded");

const CONFIG = {
  API: {
    SUPABASE_URL: "https://rclxweaaffupqiqdklhg.supabase.co",
    SUPABASE_API_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbHh3ZWFhZmZ1cHFpcWRrbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwOTU5OTgsImV4cCI6MjAyNjY3MTk5OH0.h-KRME-ajXT2J_YNAEavTm77A3MjUj-j8otnj0VzTfI",
    ENDPOINTS: {
      STORES: "/rest/v1/stores",
    },
  },
  ASSETS: {
    CSS_URL: "https://wearebirl.github.io/wearebirl/birl-button.css",
    IMAGES: {
      LOGO_PURPLE:
        "https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg",
      LOGO_BLACK:
        "https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg",
    },
  },
  DEFAULTS: {
    BUTTON_STYLE: "default",
    MODAL_STYLE: "default",
    PORTAL_URL: "https://portal.wearebirl.com",
    RETRY_ATTEMPTS: 3,
    DEBOUNCE_DELAY: 100,
  },
};

const BUTTON_STYLES = {
  default: {
    container: "birl-cta-container tooltip-btn birl-Gilroy",
    logoContainer: "birl-logo-container",
    tooltipContainer: "tooltip-container",
    logo: `<img src="${CONFIG.ASSETS.IMAGES.LOGO_PURPLE}" width="56" height="19" alt="Birl Logo"></img>`,
    ctaText: "birl-product-cta-text",
  },
  basic: {
    container: "birl-cta-container tooltip-btn birl-cta-container-basic",
    tooltipContainer: "tooltip-container tooltip-container-basic",
    logoContainer: "",
    logo: `<img src="${CONFIG.ASSETS.IMAGES.LOGO_BLACK}" width="56" height="19" alt="Birl Logo"></img>`,
    ctaText: "birl-product-cta-text-basic",
  },
  minimal: {
    container:
      "birl-cta-container tooltip-btn birl-cta-container-minimal birl-Gilroy",
    logoContainer: "birl-logo-container birl-logo-container-minimal",
    tooltipContainer: "tooltip-container",
    logo: `<img src="${CONFIG.ASSETS.IMAGES.LOGO_BLACK}" width="56" height="19" alt="Birl Logo"></img>`,
    ctaText: "birl-product-cta-text",
  },
  sticky: {
    container: "birl-cta-container-fixed tooltip-btn",
    tooltipContainer: "tooltip-container tooltip-container-basic",
    logoContainer: "",
    logo: `<img src="${CONFIG.ASSETS.IMAGES.LOGO_BLACK}" width="56" height="19" alt="Birl Logo"></img>`,
    ctaText: "birl-product-cta-text-basic",
  },
};

const MODAL_STYLES = {
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
    bodyTextNote: "birlWelcome-bodyTextNote birl-Gilroy",
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
    bodyTextNote: "birlWelcome-bodyTextNote",
    right: "birlWelcome-right birlWelcome-leftRight-basic",
    img1: "birlWelcome-img1 birlWelcome-img-basic",
    img2: "birlWelcome-img2 birl-hidden",
    button: "birlWelcome-button birlWelcome-button-basic",
  },
  basic_khanums: {
    container: "birlWelcome",
    content: "birlWelcome-content birlWelcome-content-basic",
    header: "birlWelcome-header birlWelcome-header-basic",
    logo: "birlWelcome-logo",
    close: "birlWelcome-close birlWelcome-close-basic",
    left: "birlWelcome-left birlWelcome-leftRight-basic",
    heading: "birl-heading-basic",
    bodyText: "birlWelcome-bodyText",
    bodyTextContent: "birlWelcome-bodyTextContent-basic",
    bodyTextNote: "birlWelcome-bodyTextNote",
    right: "birlWelcome-right birlWelcome-leftRight-basic",
    img1: "birlWelcome-img1 birlWelcome-img-basic",
    img2: "birlWelcome-img2 birl-hidden",
    button: "birlWelcome-button birlWelcome-button-basic birl-uppercase",
  },
};

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

  function loadStyles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = CONFIG.ASSETS.CSS_URL;
    document.head.appendChild(link);
  }

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

  function addButton(
    storeName,
    variant,
    width,
    storeTheme,
    isHidden,
    style,
    shortName,
    hideForDesktop = false
  ) {
    return `
      <div class="${BUTTON_STYLES[style].container} ${
      isHidden && "birl-hidden"
    } ${hideForDesktop && "birl-hide-for-desktop"}" style="${
      width === " full" ? "width: 100%;" : `max-width: ${width}px;`
    }" onClick="showBirlWelcome()" }">
          <div class="${BUTTON_STYLES[style].tooltipContainer}">
              <span class="tooltip-text">
                  <b>1.</b> ${getDropdown1Text(storeName, storeTheme)}
                  <br><br>
                  <b>2.</b> Spend your credit as soon as you receive your unique code.
                  <br><br>
                  <b>3.</b> Send your trade-in back with the free digital label provided.
              </span>
          </div>
          <div class="${BUTTON_STYLES[style].logoContainer}"> ${
      BUTTON_STYLES[style].logo
    }
            </div>
          <div class=${BUTTON_STYLES[style].ctaText}>
              <p>
              ${
                style === "basic"
                  ? `Get money off this item today with `
                  : style === "sticky"
                  ? `<p>
                    <span>
                      <b>Get money your next purchase</b>
                      <br />
                    </span>
                    <span style={{ color: "#808080" }}>
                      ${getButtonText(
                        shortName || storeName,
                        storeTheme,
                        style
                      )}
                    </span>
                  </p>`
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

  function addModal(
    heading,
    bodyText,
    img1,
    img2,
    style,
    instore_enabled,
    portal_url
  ) {
    const modalHTML = `
      <div id="birlWelcome" class="${
        MODAL_STYLES[style].container
      }" style="display: none;">
        <div class="${MODAL_STYLES[style].content}">
          <div class="${MODAL_STYLES[style].header}">
            <img class="${
              MODAL_STYLES[style].logo
            }" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" />
            <span onclick="hideBirlWelcome()" class="${
              MODAL_STYLES[style].close
            }">&times;</span>
          </div>
          <div class="${MODAL_STYLES[style].left}">
            <h1 class="${MODAL_STYLES[style].heading}">
              ${heading}
            </h1>
            <div class="${MODAL_STYLES[style].bodyText}"> 
              <p class="${MODAL_STYLES[style].bodyTextContent}">
                ${bodyText}              
              </p>
              ${
                !instore_enabled
                  ? `<p class="${MODAL_STYLES[style].bodyTextNote}">Currently only available online.</p>`
                  : ""
              }
            </div>
            <button id="primaryGetStarted-button" class="${
              MODAL_STYLES[style].button
            }" onClick="event.preventDefault(); initiateBirl(${portal_url});">
              Get Started
            </button>
          </div>
          <div class="${MODAL_STYLES[style].right}">
            <img class="${
              MODAL_STYLES[style].img1
            }" src="${img1}" alt="img-1" />
            <img class="${
              MODAL_STYLES[style].img2
            }" src="${img2}" alt="img-2" />
          </div>
        </div>
      </div>`;

    document.body.insertAdjacentHTML("afterbegin", modalHTML);
  }

  async function fetchData(storeId) {
    const response = await fetch(
      `${CONFIG.API.SUPABASE_URL}${CONFIG.API.ENDPOINTS.STORES}?select=*,button_styles(*)&store_name=eq.${storeId}`,
      {
        method: "GET",
        headers: {
          apikey: CONFIG.API.SUPABASE_API_KEY,
          Authorization: `Bearer ${CONFIG.API.SUPABASE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Error fetching store data! status: ${response.status}`);
    }

    const data = await response.json();

    return data[0] || null;
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
  let storeData = null;
  try {
    storeData = await fetchData(birlFlags ? birlId : buttonId);
  } catch (error) {
    console.error("Failed to initialize Birl Portal:", error);
    return;
  }

  const isHidden =
    storeData.status !== "active" ||
    button?.getAttribute("data-isHidden") === "true";
  const portal_url =
    storeData?.portal_url ||
    `${CONFIG.DEFAULTS.PORTAL_URL}/${storeId}/trade-in`;

  function findElementsIncludingTemplates(selector) {
    const mainElements = Array.from(document.querySelectorAll(selector));
    const templates = document.querySelectorAll("template");
    let templateElements = [];
    templates.forEach((template) => {
      const elementsInTemplate = Array.from(
        template.content.querySelectorAll(selector)
      );
      if (elementsInTemplate.length) {
        elementsInTemplate.forEach((el) => {
          el._parentTemplate = template;
        });
        templateElements = [...templateElements, ...elementsInTemplate];
      }
    });
    return mainElements.concat(templateElements);
  }

  const positionElement = findElementsIncludingTemplates(
    storeData.location || ".birl-button"
  );

  if (!flags && !button) {
    return;
  }

  loadStyles();

  addModal(
    storeData.modal_heading,
    storeData.modal_body,
    storeData.cover_image,
    storeData.cover_image_2,
    storeData.modalStyle,
    storeData.instore_enabled,
    portal_url
  );

  getURLParameter("openDropdown") === "true" && showBirlWelcome();
  console.log("Birl added to page");

  async function insertCartButton() {
    if (storeData.cart_location && storeData.cart_location !== "") {
      console.log(`Inserting cart button after: ${storeData.cart_location}`);
      const cartElements = findElementsIncludingTemplates(
        storeData.cart_location
      );
      if (cartElements.length) {
        cartElements.forEach((cartElement) => {
          if (cartElement._parentTemplate) {
            const template = cartElement._parentTemplate;
            const clonedContent = document.importNode(template.content, true);
            const correspondingElement = clonedContent.querySelector(
              storeData.cart_location
            );
            if (correspondingElement) {
              const existingButton =
                correspondingElement.nextElementSibling?.querySelector(
                  ".birl-cta-container"
                );
              if (!existingButton) {
                const newCartElement = document.createElement("div");
                newCartElement.innerHTML = addButton(
                  storeData.name,
                  "account",
                  "full",
                  storeData.theme,
                  isHidden,
                  storeData?.button_styles?.style || storeData.button_style,
                  storeData.short_name
                );
                correspondingElement.insertAdjacentElement(
                  "afterend",
                  newCartElement.firstElementChild
                );
                template.content.replaceChildren();
                template.content.append(...clonedContent.childNodes);
              }
            }
          } else {
            const existingButton =
              cartElement.nextElementSibling?.querySelector(
                ".birl-cta-container"
              );
            if (!existingButton) {
              const newCartElement = document.createElement("div");
              newCartElement.innerHTML = addButton(
                storeData.name,
                "account",
                "full",
                storeData.theme,
                isHidden,
                storeData?.button_styles?.style || storeData.button_style,
                storeData.short_name
              );
              cartElement.insertAdjacentElement(
                "afterend",
                newCartElement.firstElementChild
              );
            }
          }
        });
      }
    }
  }

  await insertCartButton(storeData);

  const cartObserverConfig = {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
  };

  const cartObserver = new MutationObserver(async (mutations) => {
    try {
      if (cartObserver.timeout) {
        clearTimeout(cartObserver.timeout);
      }

      cartObserver.timeout = setTimeout(async () => {
        const cartContainer = document.querySelector(
          storeData.cart_location
        )?.parentElement;
        if (cartContainer) {
          await insertCartButton();
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

  if (storeData.cart_location) {
    startCartObserver();
  }

  if (!buttonEnabled && !button) {
    return;
  }
  function insertStickyButton() {
    const stickyButton = document.createElement("div");
    stickyButton.innerHTML = addButton(
      storeData.name,
      "product",
      "full",
      storeData.theme,
      isHidden,
      "sticky",
      storeData.short_name
    );
    document.body.insertAdjacentHTML("afterbegin", stickyButton.innerHTML);
  }

  if (storeData?.button_styles?.sticky_enabled) {
    insertStickyButton();
  }

  if (!positionElement.length) {
    console.log("Button PDP position element not found");
  }
  console.log(
    `Inserting Birl PDP button after: ${storeData.location || ".birl-button"}`
  );
  positionElement.forEach((e) => {
    if (e._parentTemplate) {
      const buttonElement = document.createElement("div");
      buttonElement.innerHTML = addButton(
        storeData.name,
        "product",
        "full",
        storeData.theme,
        isHidden,
        storeData?.button_styles?.style || storeData.button_style,
        storeData.short_name,
        storeData?.button_styles?.sticky_enabled
      );
      const template = e._parentTemplate;
      const clonedContent = document.importNode(template.content, true);
      const correspondingElement = clonedContent.querySelector(
        storeData.location || ".birl-button"
      );
      if (correspondingElement) {
        correspondingElement.insertAdjacentElement(
          "afterend",
          buttonElement.firstElementChild
        );
        template.content.replaceChildren();
        template.content.append(...clonedContent.childNodes);
      }
    } else {
      const buttonElement = document.createElement("div");
      buttonElement.innerHTML = addButton(
        storeData.name,
        "product",
        "full",
        storeData.theme,
        isHidden,
        storeData?.button_styles?.style || storeData.button_style,
        storeData.short_name,
        storeData?.button_styles?.sticky_enabled
      );
      e.insertAdjacentElement("afterend", buttonElement.firstElementChild);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeBirl);
} else {
  initializeBirl();
}

function initiateBirl(portal_url) {
  console.log("Initiating Birl trade-in session...");

  document.getElementById("primaryGetStarted-button").innerHTML =
    '<div class="loader"></div>';

  const callback = {
    callback: window.location.href,
  };

  const encodedUserData = btoa(JSON.stringify(callback));

  try {
    document.getElementById("primaryGetStarted-button").innerHTML =
      "Get started";
    const openedWindow = window.open(
      `${portal_url}?u=${encodeURIComponent(encodedUserData)}`,
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
