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

class BirlPortal {
  constructor() {
    this.initialized = false;
    this.cartObserver = null;
    this.storeData = null;
    this.buttonConfig = null;
    this.modalConfig = null;
  }
  async init() {
    if (this.initialized) return;

    try {
      console.log("Initializing Birl...");

      // Load store data
      const storeId = this.getStoreId();
      if (!storeId) {
        throw new Error("No store ID found");
      }

      this.storeData = await this.fetchStoreData(storeId);
      if (!this.storeData) {
        throw new Error("Failed to fetch store data");
      }

      // Initialize components
      await this.loadStyles();
      this.setupButtonConfig();
      this.setupModalConfig();
      this.renderModal();
      this.getURLParameter("openDropdown") === "true" && showBirlWelcome();
      if (this.isButtonEnabled()) {
        this.insertButtons();
      }
      // this.setupCartObserver();

      this.initialized = true;
      console.log("Birl initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Birl:", error);
    }
  }

  getStoreId() {
    const birlMeta = document.querySelector('meta[name="birl-id"]');
    const birlButton = document.querySelector(".birl-button");
    return (
      birlMeta?.getAttribute("content")?.split(" ")[0] ||
      birlButton?.getAttribute("data-storeId")
    );
  }
  async fetchStoreData(storeId) {
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

  async loadStyles() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = CONFIG.ASSETS.CSS_URL;
    document.head.appendChild(link);
  }

  isButtonEnabled() {
    const birlMeta = document.querySelector('meta[name="birl-id"]');
    const birlButton = document.querySelector(".birl-button");

    return (
      birlMeta?.getAttribute("content")?.split(" ")[1] === "enabled" ||
      birlButton?.getAttribute("data-storeId")
    );
  }

  setupButtonConfig() {
    this.buttonConfig = {
      storeName: this.storeData.name,
      shortName: this.storeData.short_name,
      storeTheme: this.storeData.theme,
      style:
        this.storeData?.button_styles?.style || this.storeData.button_style,
      isHidden: this.storeData.status !== "active" || !this.isButtonEnabled(),
      width: "full",
      variant: "product",
      stickyEnabled: this.storeData?.button_styles?.sticky_enabled,
    };
  }

  setupModalConfig() {
    this.modalConfig = {
      heading: this.storeData.modal_heading,
      bodyText: this.storeData.modal_body,
      img1: this.storeData.cover_image,
      img2: this.storeData.cover_image_2,
      style: this.storeData.modal_style,
      instore_enabled: this.storeData.instore_enabled,
      portal_url:
        this.storeData.portal_url ||
        `${CONFIG.DEFAULTS.PORTAL_URL}/${this.storeData.name}/trade-in`,
    };
  }

  getURLParameter(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  getButtonText(buttonStyle) {
    const { storeName, shortName, storeTheme } = this.buttonConfig;
    const name = shortName || storeName;
    if (buttonStyle === "minimal") {
      return `Trade-in garments you no longer use`;
    }

    if (storeTheme === "football") {
      return `Trade-in ${name} shirts you no longer wear`;
    }

    if (storeTheme === "jacket") {
      return `Trade-in ${name} jackets you no longer use`;
    }

    return `Trade-in ${name} garments you ${
      name.length >= 15 ? "don't" : "no longer"
    } use`;
  }

  getDropdownText() {
    const { storeName, shortName, storeTheme } = this.buttonConfig;
    const name = shortName || storeName;
    if (storeTheme === "football") {
      return `Trade-in your old ${name} shirts for immediate credit.`;
    }

    if (storeTheme === "jacket") {
      return `Trade-in your old ${name} jackets for immediate credit.`;
    }

    return `Trade-in your old ${name} items for immediate credit.`;
  }

  addButton(config, hideForDesktop = false) {
    return `
      <div class="${BUTTON_STYLES[config.style].container} ${
      isHidden && "birl-hidden"
    } ${hideForDesktop && "birl-hide-for-desktop"}" style="${
      config.width === " full"
        ? "width: 100%;"
        : `max-width: ${config.width}px;`
    }" onClick="showBirlWelcome()" }">
          <div class="${BUTTON_STYLES[config.style].tooltipContainer}">
              <span class="tooltip-text">
                  <b>1.</b> ${this.getDropdownText()}
                  <br><br>
                  <b>2.</b> Spend your credit as soon as you receive your unique code.
                  <br><br>
                  <b>3.</b> Send your trade-in back with the free digital label provided.
              </span>
          </div>
          <div class="${BUTTON_STYLES[config.style].logoContainer}"> ${
      BUTTON_STYLES[config.style].logo
    }
            </div>
          <div class=${BUTTON_STYLES[config.style].ctaText}>
              <p>
              ${
                config.style === "basic"
                  ? `Get money off this item today with `
                  : config.style === "sticky"
                  ? `<p>
                    <span>
                      <b>Get money your next purchase</b>
                      <br />
                    </span>
                    <span style={{ color: "#808080" }}>
                      ${this.getButtonText(config.style)}
                      )}
                    </span>
                  </p>`
                  : `<span><b>
                          ${
                            config.variant === "product"
                              ? "Get money off this item today"
                              : ""
                          }${
                      config.variant.includes("account")
                        ? "Get money off your next purchase"
                        : ""
                    } </b><br>
                  </span>
                  <span style="color: #808080;">${this.getButtonText(
                    config.style
                  )}</span>`
              }
                  
              </p>
          </div>
      </div>
    `;
  }

  renderModal() {
    const {
      heading,
      bodyText,
      img1,
      img2,
      style,
      portal_url,
      instore_enabled,
    } = this.modalConfig;
    const modalHTML = `
      <div id="birlWelcome" class="${
        MODAL_STYLES[style].container
      }" style="display: none;">
        <div class="${MODAL_STYLES[style].content}">
          <div class="${MODAL_STYLES[style].header}">
            <img class="${MODAL_STYLES[style].logo}" src="${
      CONFIG.ASSETS.IMAGES.LOGO_BLACK
    }" />
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

  findBirlElementsIncludingTemplates() {
    const selector = this.storeData.location || ".birl-button";
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

  async insertButtons() {
    const buttonElements = this.findBirlElementsIncludingTemplates();
    const buttonHTML = this.addButton(
      this.buttonConfig,
      this.buttonConfig.stickyEnabled
    );
    buttonElements.forEach((e) => {
      if (e._parentTemplate) {
        const buttonElement = document.createElement("div");
        buttonElement.innerHTML = buttonHTML;
        const template = e._parentTemplate;
        const clonedContent = document.importNode(template.content, true);
        const correspondingElement = clonedContent.querySelector(
          this.storeData.location || ".birl-button"
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
        buttonElement.innerHTML = buttonHTML;
        e.insertAdjacentElement("afterend", buttonElement.firstElementChild);
      }
    });

    //Add sticky button if enabled
    if (this.buttonConfig.stickyEnabled) {
      const stickyButtonHTML = this.addButton(
        { ...this.buttonConfig, variant: "product", style: "sticky" },
        false
      );
      document.body.insertAdjacentHTML("afterbegin", stickyButtonHTML);
    }
  }
}

const birlPortal = new BirlPortal();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => birlPortal.init());
} else {
  birlPortal.init();
}

window.showBirlWelcome = function () {
  var birlModal = document.getElementById("birlWelcome");
  birlModal.style.display = "grid";
};

window.hideBirlWelcome = function () {
  var birlModal = document.getElementById("birlWelcome");
  birlModal.style.display = "none";
};

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
