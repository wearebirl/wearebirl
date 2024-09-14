document.addEventListener("DOMContentLoaded", function () {
  console.log("Page has been loaded");

  function addButton(
    styleId,
    storeName,
    width,
    variant,
    customerId,
    style = "1"
  ) {
    if (style == "1") {
      return `
      <div class="birl-product-cta-container-${styleId} tooltip-btn" style="${
        width == "full" ? "width: 100%;" : `max-width: ${width}px;`
      }" onClick="${
        variant == "account"
          ? `initiateBirl(${customerId}, true)`
          : "openDropdown()"
      }">
  <div class="tooltip-container"><span class="tooltip-text">
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> Trade-in your old ${storeName} items for immediate credit.
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
        Trade-in your ${storeName} garments you longer use
      </span>
    </p>
  </div>
</div>
    `;
    }
    if (style == "2") {
      return `
      <div class="birl-cta-container-2 birl-cta-container-2-${styleId} tooltip-btn" style="${
        width == "full" ? "width: 100%;" : `max-width: ${width}px;`
      }" onClick="initiateBirl(${customerId}, false)">
  <div class="tooltip-container tooltip-container-2"><span class="tooltip-text">
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> Trade-in your old ${storeName} items for immediate credit.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">2.</b> Spend your credit as soon as you receive your unique code.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">3.</b> Send your trade-in back with the free digital label provided. 
  </span></div>
   <p>
    Trade in with
    </p>
 <img
    class="birl-logo-2"
    loading="eager"
    src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/birl-logo-Qw4mPCm8DxNvkAMLodpbDRii2loIOW.svg"
    width="56"
    height="19"
    alt="Birl Logo"
    style="display:inline;"
  >
   
</div>
    `;
    }
    if (style == "3") {
      return `
      <div class="birl-product-cta-container-${styleId}  tooltip-btn" style="${
        width == "full" ? "width: 100%;" : `max-width: ${width}px;`
      }" onClick="${
        variant == "account"
          ? `initiateBirl(${customerId}, true)`
          : "openDropdown()"
      }">
  <div class="tooltip-container"><span class="tooltip-text">
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> Trade-in your old ${storeName} items for immediate credit.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">2.</b> Spend your credit as soon as you receive your unique code.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">3.</b> Send your trade-in back with the free digital label provided. 
  </span></div>
  <img
    class="birl-logo-2"
    loading="eager"
    src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/birl-logo-Qw4mPCm8DxNvkAMLodpbDRii2loIOW.svg"
    width="56"
    height="19"
    alt="Birl Logo"
  >
  <div class="birl-product-cta-text">
    <p>
      <span><b>
          ${variant == "product" ? "Get money off this item today" : ""}${
        variant.includes("account") ? "Get money off your next purchase" : ""
      } </b
        ><br>
        </span>
        <span style="color: gray;">
        Trade-in your ${storeName} garments for instant credit
      </span>
    </p>
  </div>
</div>
    `;
    }
  }

  function addHeader(offset, customerId, styleId) {
    return `
  <div class="birl-announcement-dropdown font-gilroy" style="height: calc(100svh - ${offset}px);">
<div class="Trade-In-Banner-Container">
  <button class="Trade-In" onclick=openDropdown()>
    <div class="Trade-In-Back-Container">
      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.646446 4.16728C0.451184 4.36254 0.451184 4.67913 0.646446 4.87439L3.82843 8.05637C4.02369 8.25163 4.34027 8.25163 4.53553 8.05637C4.7308 7.86111 4.7308 7.54453 4.53553 7.34926L1.70711 4.52084L4.53553 1.69241C4.7308 1.49715 4.7308 1.18056 4.53553 0.985302C4.34027 0.79004 4.02369 0.79004 3.82843 0.985302L0.646446 4.16728ZM11 4.02084L1 4.02084V5.02084L11 5.02084V4.02084Z" fill="black"/>
      </svg>
      <p>Back</p>
    </div>
  </button>

  <div>
            <p style="font-size: 14px; font-weight: 500">Powered by</p>
            <div class="birl-logo-container">
      <img class="birl-logo-2" src="https://wearebirl.github.io/wearebirl/assets/birl-logo-purple.svg" width="56" height="19" alt="Birl Logo">
    </div>
          </div>
</div>

  <div>
    <h1 class="drop_title font-${styleId}">Get Instant Credit with Birl</h1>

    <div class="drop_content_imgs">
      <div>
      <img src="https://wearebirl.github.io/wearebirl/assets/card.svg" width="170" height="170">
      <p class="dropdown-img-lbl" >Instant Credit</p>
      </div>
      <div >
      <img src="https://wearebirl.github.io/wearebirl/assets/wallet.svg" width="170" height="170">
      <p class="dropdown-img-lbl">Spend Immediately</p>
      </div>
      <div >
      <img src="https://wearebirl.github.io/wearebirl/assets/truck.svg" width="170" height="170">
      <p class="dropdown-img-lbl">Free Returns</p>
      </div>
    </div>

    <div class="drop_content_buttons">
      ${
        customerId != (null || "")
          ? `<button class="start-trade-in" id="trade-in-button" onclick="initiateBirl(${customerId}, false)">
          <span class="button-text">Begin Trade-in</span>
          <span class="button-text-loading" style="display: none;">Loading...</span>
        </button>`
          : `<button class="start-trade-in" onclick="window.location.href = '/account/login'">Begin Trade-in</button>`
      }
      <button class="start-trade-in-later" onclick="openDropdown()">Maybe Later</button>
    </div>
  </div>

  <div class="drop_content_flex">
    <div class="drop_content_item left">
      <h2>How it Works</h2>

      <div class="birl-carousel">
        <div class="birl-carousel-item active">
          <h3>1. Trade</h3>
          <p>Choose to trade an item from your brand account or the Birl trade-in portal</p>
        </div>

        <div class="birl-carousel-item">
          
          <h3>2. Instant Credit</h3>
          <p>Accept your credit and receive the voucher code instantly in your email inbox</p>
        </div>

        <div class="birl-carousel-item">
         
          <h3>3. Spend Immediately</h3>
          <p>Your credit can be used as soon as you receive it or you can save it for your next purchase</p>
        </div>

        <div class="birl-carousel-item">
         
          <h3>4. Free Shipping</h3>
          <p>Select your preferred courier and receive a free digital postage label to your email inbox</p>
        </div>

        <div class="birl-carousel-item">
       
          <h3>5. Easy to Return</h3>
          <p>Pack your item and take it to a local drop off location that suits you</p>
        </div>
      </div>

      <div class="birl-carousel-controls">
        <button class="birl-carousel-control birl-carousel-control-prev" aria-label="Previous slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M0.146935 3.4454C-0.0483274 3.64066 -0.0483274 3.95724 0.146935 4.1525L3.32892 7.33448C3.52418 7.52975 3.84076 7.52975 4.03602 7.33448C4.23128 7.13922 4.23128 6.82264 4.03602 6.62738L1.20759 3.79895L4.03602 0.970523C4.23128 0.775261 4.23128 0.458678 4.03602 0.263416C3.84076 0.0681541 3.52418 0.0681541 3.32892 0.263416L0.146935 3.4454ZM10.5005 3.29895L0.500488 3.29895V4.29895L10.5005 4.29895V3.29895Z" fill="black"/>
          </svg>
        </button>
        <button class="birl-carousel-control birl-carousel-control-next" aria-label="Next slide">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M10.3536 4.15238C10.5488 3.95712 10.5488 3.64054 10.3536 3.44527L7.17157 0.263294C6.97631 0.068032 6.65973 0.068032 6.46447 0.263294C6.2692 0.458556 6.2692 0.775139 6.46447 0.970401L9.29289 3.79883L6.46447 6.62726C6.2692 6.82252 6.2692 7.1391 6.46447 7.33436C6.65973 7.52962 6.97631 7.52962 7.17157 7.33436L10.3536 4.15238ZM0 4.29883H10V3.29883H0L0 4.29883Z" fill="black"/>
          </svg>
        </button>
      </div>

      <div class="dropdown-page-dots">
        <div class="dropdown-page-dot active"></div>
        <div class="dropdown-page-dot"></div>
        <div class="dropdown-page-dot"></div>
        <div class="dropdown-page-dot"></div>
        <div class="dropdown-page-dot"></div>
      </div>
    </div>

    <div class="drop_content_item" id="HowItWorksSection"></div>
  </div>
</div>
`;
  }

  const birlButtons = document.querySelectorAll(".birl-button"); // Select by class
  const birlHeader = document.querySelectorAll(".birl-header"); // Select by class
  let styleId = "";
  birlButtons.forEach(function (birlButton) {
    styleId = birlButton.getAttribute("data-css-id");
    const width = birlButton.getAttribute("data-width");
    const storeName = birlButton.getAttribute("data-store-name");
    const customerId = birlButton.getAttribute("data-customerId");
    const newElement = document.createElement("div");
    const variant = birlButton.getAttribute("data-variant");
    const style = birlButton.getAttribute("data-style") || "1";
    newElement.innerHTML = addButton(
      styleId,
      storeName,
      width,
      variant,
      customerId,
      style
    );
    birlButton.insertAdjacentElement("afterend", newElement); // Replace directly with newElement
  });

  birlHeader.forEach(function (birlHeader) {
    const offset = birlHeader.getAttribute("data-offset");
    const customerId = birlHeader.getAttribute("data-customerId");
    const newElement = document.createElement("div");
    newElement.innerHTML = addHeader(offset, customerId, styleId);
    birlHeader.insertAdjacentElement("afterend", newElement); // Replace directly with newElement
    //birlHeader.replaceWith(newElement); // Replace directly with newElement
  });
  var element = document.createElement("link");
  element.setAttribute("rel", "stylesheet");
  element.setAttribute("type", "text/css");
  element.setAttribute(
    "href",
    "https://wearebirl.github.io/wearebirl/birl-button.css"
  );
  document.getElementsByTagName("head")[0].appendChild(element);

  const root = document.documentElement;

  (function () {
    // Start of IIFE to create a local scope
    // Use 'window' to create a global reference and avoid re-declarations
    window.isDropdownFunction =
      window.isDropdownFunction || typeof openDropdown === "function";

    if (!window.isDropdownFunction) {
      const dropdown = document.querySelector(".birl-announcement-dropdown");
      const dropRight = document.getElementById("HowItWorksSection");
      const dropLeft = document.querySelector(".drop_content_item.left");

      // Helper function to get URL parameters
      const getURLParameter = (name) => {
        return new URLSearchParams(window.location.search).get(name);
      };

      // Attach 'openDropdown' to 'window' to make it globally accessible
      window.openDropdown = (forceOpen = false) => {
        let toDisplay =
          dropdown.style.display === "" || dropdown.style.display === "none" || forceOpen
            ? "flex"
            : "none";
        dropdown.style.display = toDisplay;

        if (window.innerWidth > 768) {
          const setGridHeight = () => {
            dropLeft.style.setProperty("height", `${dropRight.offsetHeight}px`);
          };

          setGridHeight();

          window.addEventListener("resize", setGridHeight);
        }

        // Use 'window' to store 'ScrollPos' globally
        if (!window.ScrollPos) {
          window.ScrollPos = window.scrollY;
        }

        // Scroll to 0 smoothly
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        if (toDisplay == "flex") {
          document.body.style.overflow = "hidden";
        } else {
          console.log("scrolling back to " + window.ScrollPos);
          document.body.style.overflow = "auto";

          // Scroll back to the original position
          window.scrollTo({
            top: window.ScrollPos,
            left: 0,
            behavior: "smooth",
          });

          window.ScrollPos = null;
        }
      };

      // Check if the URL contains a parameter to open the dropdown

      // birl-carousel-control-next and birl-carousel-control-prev event listeners

      const carousel = document.querySelector(".birl-carousel");
      const carouselItems = document.querySelectorAll(".birl-carousel-item");
      const carouselControls = document.querySelectorAll(
        ".birl-carousel-control"
      );
      const carouselDots = document.querySelectorAll(".dropdown-page-dot");

      let currentSlide = 0;
      let carouselInterval = null;

      const resetCarousel = () => {
        carouselItems.forEach((item, index) => {
          if (index === currentSlide) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });

        carouselDots.forEach((dot, index) => {
          if (index === currentSlide) {
            dot.classList.add("active");
          } else {
            dot.classList.remove("active");
          }
        });
      };

      const startCarousel = () => {
        carouselInterval = setInterval(() => {
          currentSlide++;
          if (currentSlide > carouselItems.length - 1) {
            currentSlide = 0;
          }
          resetCarousel();
        }, 5000);
      };

      const stopCarousel = () => {
        clearInterval(carouselInterval);
      };

      let leftControl = document.querySelector(".birl-carousel-control-prev");
      let rightControl = document.querySelector(".birl-carousel-control-next");

      leftControl.addEventListener("click", () => {
        currentSlide--;
        if (currentSlide < 0) {
          currentSlide = carouselItems.length - 1;
        }
        resetCarousel();
      });

      rightControl.addEventListener("click", () => {
        currentSlide++;

        if (currentSlide > carouselItems.length - 1) {
          currentSlide = 0;
        }

        resetCarousel();
      });

      // Optional: Uncomment if you want to start the carousel automatically
      //carousel.addEventListener('mouseover', stopCarousel);
      //carousel.addEventListener('mouseout', startCarousel);
      //startCarousel();
    }
    const openDropdownParam = getURLParameter('openDropdown');
    if (openDropdownParam === 'true') {
      window.openDropdown(true); // Force the dropdown open on page load
    }

  })(); // End of IIFE

  !(function () {
    "use strict";
    function e() {}
    function t(e) {
      return e();
    }
    function n() {
      return Object.create(null);
    }
    function o(e) {
      e.forEach(t);
    }
    function r(e) {
      return "function" == typeof e;
    }
    function i(e, t) {
      return e != e
        ? t == t
        : e !== t || (e && "object" == typeof e) || "function" == typeof e;
    }
    function s(e, t) {
      e.appendChild(t);
    }
    function l(e, t, n) {
      const o = (function (e) {
        if (!e) return document;
        const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
        if (t && t.host) return t;
        return e.ownerDocument;
      })(e);
      if (!o.getElementById(t)) {
        const e = f("style");
        (e.id = t),
          (e.textContent = n),
          (function (e, t) {
            s(e.head || e, t), t.sheet;
          })(o, e);
      }
    }
    function a(e, t, n) {
      e.insertBefore(t, n || null);
    }
    function c(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    function u(e, t) {
      for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
    }
    function f(e) {
      return document.createElement(e);
    }
    function d(e) {
      return document.createElementNS("http://www.w3.org/2000/svg", e);
    }
    function h(e) {
      return document.createTextNode(e);
    }
    function p() {
      return h(" ");
    }
    function m(e, t, n, o) {
      return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);
    }
    function g(e, t, n) {
      null == n
        ? e.removeAttribute(t)
        : e.getAttribute(t) !== n && e.setAttribute(t, n);
    }
    function b(e, t, n) {
      e.classList[n ? "add" : "remove"](t);
    }
    let v;
    function y(e) {
      v = e;
    }
    function w(e, t) {
      const n = e.$$.callbacks[t.type];
      n && n.slice().forEach((e) => e.call(this, t));
    }
    const x = [],
      $ = [];
    let k = [];
    const I = [],
      q = Promise.resolve();
    let _ = !1;
    function E(e) {
      k.push(e);
    }
    const S = new Set();
    let A = 0;
    function z() {
      if (0 !== A) return;
      const e = v;
      do {
        try {
          for (; A < x.length; ) {
            const e = x[A];
            A++, y(e), N(e.$$);
          }
        } catch (e) {
          throw ((x.length = 0), (A = 0), e);
        }
        for (y(null), x.length = 0, A = 0; $.length; ) $.pop()();
        for (let e = 0; e < k.length; e += 1) {
          const t = k[e];
          S.has(t) || (S.add(t), t());
        }
        k.length = 0;
      } while (x.length);
      for (; I.length; ) I.pop()();
      (_ = !1), S.clear(), y(e);
    }
    function N(e) {
      if (null !== e.fragment) {
        e.update(), o(e.before_update);
        const t = e.dirty;
        (e.dirty = [-1]),
          e.fragment && e.fragment.p(e.ctx, t),
          e.after_update.forEach(E);
      }
    }
    const O = new Set();
    let R;
    function C() {
      R = { r: 0, c: [], p: R };
    }
    function W() {
      R.r || o(R.c), (R = R.p);
    }
    function H(e, t) {
      e && e.i && (O.delete(e), e.i(t));
    }
    function P(e, t, n, o) {
      if (e && e.o) {
        if (O.has(e)) return;
        O.add(e),
          R.c.push(() => {
            O.delete(e), o && (n && e.d(1), o());
          }),
          e.o(t);
      } else o && o();
    }
    function j(e) {
      e && e.c();
    }
    function B(e, n, i, s) {
      const { fragment: l, after_update: a } = e.$$;
      l && l.m(n, i),
        s ||
          E(() => {
            const n = e.$$.on_mount.map(t).filter(r);
            e.$$.on_destroy ? e.$$.on_destroy.push(...n) : o(n),
              (e.$$.on_mount = []);
          }),
        a.forEach(E);
    }
    function D(e, t) {
      const n = e.$$;
      null !== n.fragment &&
        (!(function (e) {
          const t = [],
            n = [];
          k.forEach((o) => (-1 === e.indexOf(o) ? t.push(o) : n.push(o))),
            n.forEach((e) => e()),
            (k = t);
        })(n.after_update),
        o(n.on_destroy),
        n.fragment && n.fragment.d(t),
        (n.on_destroy = n.fragment = null),
        (n.ctx = []));
    }
    function L(e, t) {
      -1 === e.$$.dirty[0] &&
        (x.push(e), _ || ((_ = !0), q.then(z)), e.$$.dirty.fill(0)),
        (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
    }
    function T(t, r, i, s, l, a, u, f = [-1]) {
      const d = v;
      y(t);
      const h = (t.$$ = {
        fragment: null,
        ctx: [],
        props: a,
        update: e,
        not_equal: l,
        bound: n(),
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(r.context || (d ? d.$$.context : [])),
        callbacks: n(),
        dirty: f,
        skip_bound: !1,
        root: r.target || d.$$.root,
      });
      u && u(h.root);
      let p = !1;
      if (
        ((h.ctx = i
          ? i(t, r.props || {}, (e, n, ...o) => {
              const r = o.length ? o[0] : n;
              return (
                h.ctx &&
                  l(h.ctx[e], (h.ctx[e] = r)) &&
                  (!h.skip_bound && h.bound[e] && h.bound[e](r), p && L(t, e)),
                n
              );
            })
          : []),
        h.update(),
        (p = !0),
        o(h.before_update),
        (h.fragment = !!s && s(h.ctx)),
        r.target)
      ) {
        if (r.hydrate) {
          const e = (function (e) {
            return Array.from(e.childNodes);
          })(r.target);
          h.fragment && h.fragment.l(e), e.forEach(c);
        } else h.fragment && h.fragment.c();
        r.intro && H(t.$$.fragment),
          B(t, r.target, r.anchor, r.customElement),
          z();
      }
      y(d);
    }
    class Y {
      $destroy() {
        D(this, 1), (this.$destroy = e);
      }
      $on(t, n) {
        if (!r(n)) return e;
        const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return (
          o.push(n),
          () => {
            const e = o.indexOf(n);
            -1 !== e && o.splice(e, 1);
          }
        );
      }
      $set(e) {
        var t;
        this.$$set &&
          ((t = e), 0 !== Object.keys(t).length) &&
          ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
      }
    }
    const K = [
      {
        title: "Credit",
        children: [
          {
            title:
              "Can I receive credit for items that are from another brand?",
            text: "At the moment you are only able to receive credit for items that are from the brand site that you are on. However, if you want to clean out your wardrobe whilst supporting charities, check out Birl's One Step Further campaign for items from other brands you want to recycle.",
          },
          {
            title:
              "Does the condition of my item affect how much credit I receive?",
            text: "This is up to the discretion of brands using Birl, but is clearly shown on the Your Item Condition page of the trade-in process.",
          },
          {
            title: "Do I receive my credit to use straight away?",
            text: "Yes! You are able to use your credit as soon as it arrives in your inbox. You can even use it before you send your item back to us. If you do not receive your credit please contact us at hello@wearebirl.com",
          },
          {
            title: "How do you calculate the amount of credit that I receive?",
            text: "Brands individually calculate how much credit is available per item based on a selection of criteria.",
          },
          {
            title: "Can I trade in multiple items at the same time?",
            text: "No, you are currently only able to trade-in one item at a time. You can submit as many trade-ins as you like, but can only use one credit against each future purchase.",
          },
          {
            title: "Can I use multiple credit vouchers for the same purchase?",
            text: "No, you can only use one credit voucher for each purchase.",
          },
          {
            title: "When does my voucher code expire?",
            text: "This is at the brands discretion, but will be highlighted within your Birl trade-in journey.",
          },
        ],
      },
      {
        title: "Postage",
        children: [
          {
            title: "Do I have to pay to send my trade-in back?",
            text: "No, shipping is totally free using the labels we provide. You can select whether to send your item with Royal Mail or InPost.",
          },
          {
            title: "How do I get my postage label?",
            text: "Your postage label will arrive in your email inbox after you accept your credit. Please check your junk if it doesn't arrive. If you don't receive your label within 5 minutes, please contact support at hello@wearebirl.com",
          },
          {
            title: "Do I need a printer?",
            text: "No, all of our carriers have a printerless option available. Make sure to download your QR code and you will be able to print off a label for your trade-in at your nearest drop-off point.",
          },
          {
            title: "How long do I have to send my trade-in back?",
            text: "You have 7 working days to send back your trade-in. If you choose not to send your trade-in then we reserve the right to charge your payment method for the credit that you have received.",
          },
          {
            title: "Can I trade in my items from outside the UK?",
            text: "Currently Birl trade-in is only available to UK customers, but we are looking to open internationally in the coming months.",
          },
        ],
      },
      {
        title: "Recycling",
        children: [
          {
            title: "What types of items can I recycle?",
            text: "We are able to accept all item categories with the exception of underwear.",
          },
          {
            title: "What happens to my items once I send them back?",
            text: "We endeavour to re-sell your item so that it can stay in use as long as possible. If we are unable to resell your item, then it will be recycled. We commit to a zero to landfill policy for all of the brands that we work with.",
          },
        ],
      },
    ];
    function M(e) {
      l(e, "svelte-14yvshi", "svg.svelte-14yvshi{transition:transform .2s}");
    }
    function Q(t) {
      let n, o, r;
      return {
        c() {
          (n = d("svg")),
            (o = d("path")),
            g(
              o,
              "d",
              "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z"
            ),
            g(n, "style", (r = t[0] ? "transform: rotate(0.25turn)" : null)),
            g(n, "xmlns", "http://www.w3.org/2000/svg"),
            g(n, "viewBox", "0 0 40 40"),
            g(n, "width", "10"),
            g(n, "height", "10"),
            g(n, "focusable", "false"),
            g(n, "class", "svelte-28v0dh svelte-14yvshi");
        },
        m(e, t) {
          a(e, n, t), s(n, o);
        },
        p(e, [t]) {
          1 & t &&
            r !== (r = e[0] ? "transform: rotate(0.25turn)" : null) &&
            g(n, "style", r);
        },
        i: e,
        o: e,
        d(e) {
          e && c(n);
        },
      };
    }
    function U(e, t, n) {
      let { open: o = !1 } = t;
      return (
        (e.$$set = (e) => {
          "open" in e && n(0, (o = e.open));
        }),
        [o]
      );
    }
    class F extends Y {
      constructor(e) {
        super(), T(this, e, U, Q, i, { open: 0 }, M);
      }
    }
    function G(e) {
      l(
        e,
        "svelte-t480mb",
        "@keyframes svelte-t480mb-fadeIn{from{opacity:0}to{opacity:1}}#HowItWorksSection{width:100%}.faq-widget.svelte-t480mb.svelte-t480mb{box-sizing:border-box}.faq-widget.svelte-t480mb *{box-sizing:border-box !important;}.title.svelte-t480mb.svelte-t480mb{font-size:28px;font-weight:600;margin:40px auto 20px;text-align:center}.faq-panel.svelte-t480mb.svelte-t480mb{justify-content:space-between;background:none;display:flex;cursor:pointer;width:100%;border:none;margin:0 auto;font-weight:normal;font-size:14px;color:#54585a;padding:15px 0;align-items:center;border-bottom:1px solid #d8d8d8}.faq-panel.svelte-t480mb.svelte-t480mb:first-child{border-top:1px solid #d8d8d8}.faq-panel-bold.svelte-t480mb.svelte-t480mb{font-size:16px;font-weight:700}.faq-sub-list.svelte-t480mb.svelte-t480mb{animation:svelte-t480mb-fadeIn 1s}.faq-sub-list.svelte-t480mb .faq-panel.svelte-t480mb:first-child{border-top:none}.faq-sub-list.svelte-t480mb .faq-panel.svelte-t480mb:last-child{border-bottom:none}.text.svelte-t480mb.svelte-t480mb{font-size:13px;line-height:23px;color:#54585a;padding:15px 10px;border-bottom:1px solid #d8d8d8;animation:svelte-t480mb-fadeIn 1s}.hide.svelte-t480mb.svelte-t480mb{display:none !important}"
      );
    }
    function J(e, t, n) {
      const o = e.slice();
      return (o[7] = t[n]), (o[9] = n), o;
    }
    function V(e, t, n) {
      const o = e.slice();
      return (o[10] = t[n]), (o[12] = n), o;
    }
    function X(e) {
      let t,
        n,
        r,
        i,
        l,
        u,
        d,
        v,
        y,
        w,
        x = e[10].title + "",
        $ = e[10].text + "";
      function k() {
        return e[6](e[12]);
      }
      return (
        (i = new F({ props: { open: e[1] === e[12] } })),
        {
          c() {
            (t = f("div")),
              (n = h(x)),
              (r = p()),
              j(i.$$.fragment),
              (l = p()),
              (u = f("p")),
              (d = h($)),
              g(t, "class", "faq-panel svelte-t480mb"),
              g(u, "class", "text svelte-t480mb"),
              b(u, "hide", e[1] !== e[12]);
          },
          m(o, c) {
            var f;
            a(o, t, c),
              s(t, n),
              s(t, r),
              B(i, t, null),
              a(o, l, c),
              a(o, u, c),
              s(u, d),
              (v = !0),
              y ||
                ((w = [
                  m(t, "click", k),
                  m(
                    u,
                    "click",
                    ((f = e[4]),
                    function (e) {
                      return e.stopPropagation(), f.call(this, e);
                    })
                  ),
                ]),
                (y = !0));
          },
          p(t, n) {
            e = t;
            const o = {};
            2 & n && (o.open = e[1] === e[12]),
              i.$set(o),
              (!v || 2 & n) && b(u, "hide", e[1] !== e[12]);
          },
          i(e) {
            v || (H(i.$$.fragment, e), (v = !0));
          },
          o(e) {
            P(i.$$.fragment, e), (v = !1);
          },
          d(e) {
            e && c(t), D(i), e && c(l), e && c(u), (y = !1), o(w);
          },
        }
      );
    }
    function Z(e) {
      let t,
        n,
        o,
        r,
        i,
        l,
        d,
        v,
        y,
        w,
        x = e[7].title + "";
      function $() {
        return e[5](e[9]);
      }
      r = new F({ props: { open: e[0] === e[9] } });
      let k = e[7].children,
        I = [];
      for (let t = 0; t < k.length; t += 1) I[t] = X(V(e, k, t));
      const q = (e) =>
        P(I[e], 1, 1, () => {
          I[e] = null;
        });
      return {
        c() {
          (t = f("div")),
            (n = h(x)),
            (o = p()),
            j(r.$$.fragment),
            (i = p()),
            (l = f("div"));
          for (let e = 0; e < I.length; e += 1) I[e].c();
          (d = p()),
            g(t, "class", "faq-panel faq-panel-bold svelte-t480mb"),
            g(l, "class", "faq-sub-list svelte-t480mb"),
            b(l, "hide", e[0] !== e[9]);
        },
        m(e, c) {
          a(e, t, c), s(t, n), s(t, o), B(r, t, null), a(e, i, c), a(e, l, c);
          for (let e = 0; e < I.length; e += 1) I[e] && I[e].m(l, null);
          s(l, d), (v = !0), y || ((w = m(t, "click", $)), (y = !0));
        },
        p(t, n) {
          e = t;
          const o = {};
          if ((1 & n && (o.open = e[0] === e[9]), r.$set(o), 10 & n)) {
            let t;
            for (k = e[7].children, t = 0; t < k.length; t += 1) {
              const o = V(e, k, t);
              I[t]
                ? (I[t].p(o, n), H(I[t], 1))
                : ((I[t] = X(o)), I[t].c(), H(I[t], 1), I[t].m(l, d));
            }
            for (C(), t = k.length; t < I.length; t += 1) q(t);
            W();
          }
          (!v || 1 & n) && b(l, "hide", e[0] !== e[9]);
        },
        i(e) {
          if (!v) {
            H(r.$$.fragment, e);
            for (let e = 0; e < k.length; e += 1) H(I[e]);
            v = !0;
          }
        },
        o(e) {
          P(r.$$.fragment, e), (I = I.filter(Boolean));
          for (let e = 0; e < I.length; e += 1) P(I[e]);
          v = !1;
        },
        d(e) {
          e && c(t), D(r), e && c(i), e && c(l), u(I, e), (y = !1), w();
        },
      };
    }
    function ee(e) {
      let t,
        n,
        o,
        r,
        i,
        l = K,
        d = [];
      for (let t = 0; t < l.length; t += 1) d[t] = Z(J(e, l, t));
      const h = (e) =>
        P(d[e], 1, 1, () => {
          d[e] = null;
        });
      return {
        c() {
          (t = f("div")),
            (n = f("h2")),
            (n.textContent = "FAQ's"),
            (o = p()),
            (r = f("div"));
          for (let e = 0; e < d.length; e += 1) d[e].c();
          g(n, "class", "title svelte-t480mb"),
            g(r, "class", "faq-list"),
            g(t, "class", "faq-widget svelte-t480mb");
        },
        m(e, l) {
          a(e, t, l), s(t, n), s(t, o), s(t, r);
          for (let e = 0; e < d.length; e += 1) d[e] && d[e].m(r, null);
          i = !0;
        },
        p(e, [t]) {
          if (15 & t) {
            let n;
            for (l = K, n = 0; n < l.length; n += 1) {
              const o = J(e, l, n);
              d[n]
                ? (d[n].p(o, t), H(d[n], 1))
                : ((d[n] = Z(o)), d[n].c(), H(d[n], 1), d[n].m(r, null));
            }
            for (C(), n = l.length; n < d.length; n += 1) h(n);
            W();
          }
        },
        i(e) {
          if (!i) {
            for (let e = 0; e < l.length; e += 1) H(d[e]);
            i = !0;
          }
        },
        o(e) {
          d = d.filter(Boolean);
          for (let e = 0; e < d.length; e += 1) P(d[e]);
          i = !1;
        },
        d(e) {
          e && c(t), u(d, e);
        },
      };
    }
    function te(e, t, n) {
      let o = null,
        r = null;
      function i(e) {
        n(1, (r = null)), n(0, (o = o === e ? null : e));
      }
      function s(e) {
        n(1, (r = r === e ? null : e));
      }
      return [
        o,
        r,
        i,
        s,
        function (t) {
          w.call(this, e, t);
        },
        (e) => i(e),
        (e) => s(e),
      ];
    }
    class ne extends Y {
      constructor(e) {
        super(), T(this, e, te, ee, i, {}, G);
      }
    }
    (async () => {
      const e = document.querySelector("#HowItWorksSection");
      e && new ne({ target: e });
    })();
  })();
});

function initiateBirl(customerId, skipToOrders) {
  console.log("Initiating Birl trade-in session...");
  let API_KEY = "";
  let store_id = "";
  let first_name = "";
  let last_name = "";
  let email = "";
  const birlButtons = document.querySelectorAll(".birl-button"); // Select by class
  const birlHeader = document.querySelectorAll(".birl-header"); // Select by class

  birlButtons.forEach(function (birlButton) {
    API_KEY = birlButton.getAttribute("data-api-key");
    store_id = birlButton.getAttribute("data-store-id");
  });

  birlHeader.forEach(function (birlHeader) {
    first_name = birlHeader.getAttribute("data-first-name");
    last_name = birlHeader.getAttribute("data-last-name");
    email = birlHeader.getAttribute("data-email");
  });

  console.log(customerId);
  // Get button and spinner elements
  const button = document.getElementById("trade-in-button");
  const buttonText = button.querySelector(".button-text");
  const loadingText = button.querySelector(".button-text-loading");

  // Disable the button and show the loading spinner
  button.classList.add("loading-trade-in");
  button.setAttribute("disabled", true);
  buttonText.style.display = "none";
  loadingText.style.display = "inline";

  const url = `http://dashboard.wearebirl.com/api/portal/startSession`;

  // API Request to Management App to create session
  const customerData = {
    id: customerId,
    first_name: first_name,
    last_name: last_name,
    email: email,
  };

  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      customer_data: customerData,
      store_id: store_id,
      store_provider: "shopify",
      redirect_to_orders: skipToOrders,
      callback: window.location.href,
    }),
  })
    .then(async (response) => {
      const body = await response.json();

      // Re-enable the button and hide the loading spinner
      button.classList.remove("loading-trade-in");
      button.removeAttribute("disabled");
      buttonText.style.display = "inline";
      loadingText.style.display = "none";

      if (response.status == 200) {
        window.location.replace(
          `http://portal.wearebirl.com/?sessionId=${body.session_id}`
        );
      } else {
        // Handle error here (optional)
        alert("Failed to initiate session. Please try again.");
      }
    })
    .catch((error) => {
      // Re-enable the button and hide the loading spinner in case of error
      button.classList.remove("disabled");
      button.removeAttribute("disabled");
      buttonText.style.display = "inline";
      loadingText.style.display = "none";

      // Handle error here
      console.error("Error initiating session:", error);
      alert("An error occurred. Please try again.");
    });
}
