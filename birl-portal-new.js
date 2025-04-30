//<meta name="birl-id" content="wearebirl">
//<script src="https://wearebirl.github.io/wearebirl/birl-portal.js" defer="defer"/>
console.log("Birl Portal script loaded");
const SUPABASE_URL = "https://rclxweaaffupqiqdklhg.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjbHh3ZWFhZmZ1cHFpcWRrbGhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEwOTU5OTgsImV4cCI6MjAyNjY3MTk5OH0.h-KRME-ajXT2J_YNAEavTm77A3MjUj-j8otnj0VzTfI";

const BUTTON_STYLES = {
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
  sticky: {
    container: "birl-cta-container-fixed tooltip-btn",
    tooltipContainer: "tooltip-container tooltip-container-basic",
    logoContainer: "",
    logo: `<img src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" width="56" height="19" alt="Birl Logo"></img>`,
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
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/stores?select=*,button_styles(*)&store_name=eq.${storeId}`,
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
            store_name: data[0]?.name,
            short_store_name: data[0]?.short_name,
            storeTheme: data[0]?.theme,
            storeStatus: data[0]?.status,
            img1: data[0]?.cover_image,
            img2: data[0]?.cover_image_2,
            location: data[0]?.button_location,
            button_style: data[0]?.button_style,
            cartLocation: data[0]?.cart_location,
            modalStyle: data[0]?.modal_style,
            instore_enabled: data[0]?.instore_enabled,
            button_styles: data[0]?.button_styles,
            portal_url: data[0]?.portal_url,
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

  const { button_styles } = storeData;

  const store_name = storeData.store_name;
  const short_store_name = storeData.short_store_name;
  const width = button?.getAttribute("data-width") || "full";
  const variant = button?.getAttribute("data-variant") || "product";
  const storeTheme = storeData.storeTheme || "default";
  const isHidden =
    storeData.storeStatus !== "active" ||
    button?.getAttribute("data-isHidden") === "true";
  const modalStyle = storeData.modalStyle || "default";
  const cartLocation = storeData.cartLocation || "";
  const instore_enabled = storeData.instore_enabled || false;
  const portal_url =
    storeData?.portal_url ||
    `https://portal.wearebirl.com/${store_name}/trade-in`;

  console.log(portal_url);

  const button_style =
    button_styles?.style || storeData.button_style || "default";

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
    modalStyle,
    instore_enabled,
    portal_url
  );

  getURLParameter("openDropdown") === "true" && showBirlWelcome();
  console.log("Birl added to page");

  async function insertCartButton(storeData, buttonConfig) {
    if (storeData.cartLocation && storeData.cartLocation !== "") {
      console.log(`Inserting cart button after: ${cartLocation}`);
      const cartElements = findElementsIncludingTemplates(
        storeData.cartLocation
      );
      if (cartElements.length) {
        cartElements.forEach((cartElement) => {
          if (cartElement._parentTemplate) {
            const template = cartElement._parentTemplate;
            const clonedContent = document.importNode(template.content, true);
            const correspondingElement = clonedContent.querySelector(
              storeData.cartLocation
            );
            if (correspondingElement) {
              const existingButton =
                correspondingElement.nextElementSibling?.querySelector(
                  ".birl-cta-container"
                );
              if (!existingButton) {
                const newCartElement = document.createElement("div");
                newCartElement.innerHTML = addButton(
                  buttonConfig.store_name,
                  "account",
                  buttonConfig.width,
                  buttonConfig.storeTheme,
                  buttonConfig.isHidden,
                  buttonConfig.button_style,
                  buttonConfig.short_store_name
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
                buttonConfig.store_name,
                "account",
                buttonConfig.width,
                buttonConfig.storeTheme,
                buttonConfig.isHidden,
                buttonConfig.button_style,
                buttonConfig.short_store_name
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

  const buttonConfig = {
    store_name,
    variant,
    width,
    storeTheme,
    isHidden,
    button_style,
    short_store_name,
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

  if (button_styles?.sticky_enabled) {
    const stickyButton = document.createElement("div");

    stickyButton.innerHTML = addButton(
      store_name,
      variant,
      width,
      storeTheme,
      isHidden,
      "sticky",
      short_store_name
    );
    document.body.insertAdjacentHTML("afterbegin", stickyButton.innerHTML);
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
        store_name,
        variant,
        width,
        storeTheme,
        isHidden,
        button_style,
        short_store_name,
        button_styles?.sticky_enabled
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
        store_name,
        variant,
        width,
        storeTheme,
        isHidden,
        button_style,
        short_store_name,
        button_styles?.sticky_enabled
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
