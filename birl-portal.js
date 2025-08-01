//<meta name="birl-id" content="wearebirl">
//<script src="https://wearebirl.github.io/wearebirl/birl-portal.js" defer="defer"/>
console.log("Birl Portal script loaded");
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

  function getButtonTitle(storeName, variant){
    if(storeName === "West Ham United FC" || storeName === "Oxford United"){
      return "Get up to £15 off this item today"
    }
    if(variant === "product") {
      return "Get money off this item today"
    }
    if(variant.includes("account")){
      return "Get money off your next purchase"
    }
  }

  function getButtonText(storeName, storeTheme, style) {
    if(storeName === "West Ham United FC"){
      return 'Trade-in your old West Ham United Shirt '
    }

    if(storeName === "Oxford United"){
      return 'Trade-in your old Oxford United Shirt '
    }

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
      return `Trade-in your old ${storeName} shirt for immediate credit.`;
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
    sticky: {
      container: "birl-cta-container-fixed tooltip-btn",
      tooltipContainer: "tooltip-container tooltip-container-basic",
      logoContainer: "",
      logo: `<img src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" width="56" height="19" alt="Birl Logo"></img>`,
      ctaText: "birl-product-cta-text-basic",
    },
    cart_1: {
      container: "birl-cta-container tooltip-btn birl-Gilroy cart-1-container",
      logoContainer: "birl-logo-container",
      tooltipContainer: "tooltip-container tooltip-container-basic",
      logo: `<img src="https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg" width="56" height="19" alt="Birl Logo"></img>`,
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
                style === "cart_1"
                  ? "Trade in styles you've outgrown & get credit for something new"
                  : style === "basic"
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
                        ${getButtonTitle(storeName, variant)}
                        </b><br>
                  </span>
                  <u><span style="color: #808080;">
                    ${getButtonText(
                    shortName || storeName,
                    storeTheme,
                    style
                  )}
                    </span></u>`
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
    customerId,
    style,
    instore,
    portalUrl
  ) {
    const modalHTML = `
      <div id="birlWelcome" class="${
        modalStyles[style].container
      }" style="display: none;">
        <div class="${modalStyles[style].content}">
          <div class="${modalStyles[style].header}">
            <img class="${
              modalStyles[style].logo
            }" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-black.svg" />
            <span onclick="hideBirlWelcome()" class="${
              modalStyles[style].close
            }">&times;</span>
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
            <button id="primaryGetStarted-button" class="${
              modalStyles[style].button
            }" onClick="event.preventDefault(); initiateBirl('${portalUrl}');">
              Get Started
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
        `https://api.wearebirl.com/public/v1/${storeId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();

          return {
            heading: data?.modal_heading,
            bodyText: data?.modal_body,
            storeName: data?.name,
            shortName: data?.short_name,
            storeTheme: data?.theme,
            storeStatus: data?.status,
            img1: data?.cover_image,
            img2: data?.cover_image_2,
            location: data?.button_location,
            style: data?.button_style,
            cartLocation: data?.cart_location,
            modalStyle: data?.modal_style,
            instore_enabled: data?.instore_enabled,
            portalUrl: data?.portal_url,
          };

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
  const instore = storeData.instore_enabled || false;
  const portalUrl =
    storeData.portalUrl ||
    `https://portal.wearebirl.com/${birlId || buttonId}/trade-in`;

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
    customerId,
    modalStyle,
    instore,
    portalUrl
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
          // Check for existing buttons in the parent container
          const parentContainer = cartElement.parentElement;
          if (
            parentContainer &&
            parentContainer.querySelector(".birl-cta-container")
          ) {
            return; // Skip if button already exists in parent container
          }

          if (cartElement._parentTemplate) {
            const template = cartElement._parentTemplate;
            const clonedContent = document.importNode(template.content, true);
            const correspondingElement = clonedContent.querySelector(
              storeData.cartLocation
            );
            if (correspondingElement) {
              // Check for existing button in the template
              const existingButton = template.content.querySelector(
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
                  "cart_1"
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
            const newCartElement = document.createElement("div");
            newCartElement.innerHTML = addButton(
              buttonConfig.storeName,
              "account",
              buttonConfig.width,
              buttonConfig.storeTheme,
              buttonConfig.isHidden,
              "cart_1"
            );
            cartElement.insertAdjacentElement(
              "afterend",
              newCartElement.firstElementChild
            );
          }
        });
      }
    }
  }

  const buttonConfig = {
    storeName,
    variant,
    width,
    storeTheme,
    isHidden,
    style,
  };

  if(isHidden){
    return;
  }

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

        // Only insert if container exists and doesn't already have a button
        if (
          cartContainer &&
          !cartContainer.querySelector(".birl-cta-container")
        ) {
          await insertCartButton(storeData, buttonConfig);
        }
      }, 250); // Increased debounce time for better performance
    } catch (error) {
      console.error("Cart observer error:", error);
    }
  });

  function startCartObserver() {
    const cartContainer = document.querySelector(".cart-drawer");
    if (cartContainer) {
      // Check if observer is already attached
      if (cartObserver._target) {
        cartObserver.disconnect();
      }
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
        storeName,
        variant,
        width,
        storeTheme,
        isHidden,
        style,
        shortName
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
        storeName,
        variant,
        width,
        storeTheme,
        isHidden,
        style,
        shortName
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

function initiateBirl(portalUrl) {
  console.log("Initiating Birl trade-in session...");

  document.getElementById("primaryGetStarted-button").innerHTML =
    '<div class="loader"></div>';

  const userData = {
    callback: window.location.href,
  };

  const encodedUserData = btoa(JSON.stringify(userData));

  try {
    document.getElementById("primaryGetStarted-button").innerHTML =
      "Get started";
    const openedWindow = window.open(
      `${portalUrl}?u=${encodeURIComponent(encodedUserData)}`,
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

//.cart-item-list__body
