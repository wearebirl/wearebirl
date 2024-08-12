document.addEventListener("DOMContentLoaded", function () {
  console.log("Page has been loaded");

  function customHTML(storeId, storeName){
    return `
      <div class="birl-product-cta-container2-${storeId} tooltip-btn" onClick="openDropdown()">
  <div class="tooltip-container"><span class="tooltip-text">
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">1.</b> Trade-in your old {{ shop.name | capitalize }} items for immediate credit.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">2.</b> Spend your credit as soon as your code is emailed to you.
    <br><br>
    <b style="color: black; width: 12px; text-align:left; display: inline-block;">3.</b> Send your item back with the free digital label provided. 
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
          Get money off this item today </b
        ><br>
        </span>
        <span style="color: gray;">
        Trade-in your ${storeName} garments for instant credit
      </span>
    </p>
  </div>
</div>
    `
  };

  var birlDropdown = `
  <div class="birl-announcement-dropdown">
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
            <img loading="eager" src="//blankexpression.co/cdn/shop/t/24/assets/birl-logo.svg?v=100289040393269961151718269488" width="72" height="27">
          </div>
</div>

  <div>
    <h1 class="drop_title">Get Instant Credit with Birl</h1>

    <div class="drop_content_imgs">
      <div>
      <img src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/2-FOmpbWyfH0jWdeqSAMIWQE9ZYA6OJY.png" width="170" height="170">
      <p class="dropdown-img-lbl" >Instant Credit</p>
      </div>
      <div >
      <img src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/3-71ldYwvpgs53T3aUj3z51ZtYjyoLTx.png" width="170" height="170">
      <p class="dropdown-img-lbl">Easy to Prepare</p>
      </div>
      <div >
      <img src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/1-2Jv54xxFhiwEainhG0CvFYlH6UkWHf.png" width="170" height="170">
      <p class="dropdown-img-lbl">Free to Return</p>
      </div>
    </div>

    <div class="drop_content_buttons">
      <a class="start-trade-in" id="trade-in-button" onClick="initiateBirl()">  
        <span class="button-text">Begin Trade-in</span>
        <span class="button-text-loading" style="display: none;">Loading...</span>
      </a>
      <a class="start-trade-in-later" onclick="openDropdown()">Maybe Later</a>
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
          <img src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/Ok-8fGqGk5s5nUyr91F8xzq7uM6jVgpiu.png" width="16" height="16">
          <h3>2. Instant Credit</h3>
          <p>Accept your credit and receive the voucher code instantly in your email inbox</p>
        </div>

        <div class="birl-carousel-item">
          <img src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/Ok-8fGqGk5s5nUyr91F8xzq7uM6jVgpiu.png" width="16" height="16">
          <h3>3. Spend Immediately</h3>
          <p>Your credit can be used as soon as you receive it or you can save it for your next purchase</p>
        </div>

        <div class="birl-carousel-item">
          <img src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/Ok-8fGqGk5s5nUyr91F8xzq7uM6jVgpiu.png" width="16" height="16">
          <h3>4. Free Shipping</h3>
          <p>Select your preferred courier and receive a free digital postage label to your email inbox</p>
        </div>

        <div class="birl-carousel-item">
          <img src="https://ztp7egf458qdy422.public.blob.vercel-storage.com/Ok-8fGqGk5s5nUyr91F8xzq7uM6jVgpiu.png" width="16" height="16">
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
const birlButtons = document.querySelectorAll(".birlbutton"); // Select by class
const birlHeader = document.getElementsByClassName("top")[0];
birlHeader.appendChild(element)
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

      // Attach 'openDropdown' to 'window' to make it globally accessible
      window.openDropdown = () => {
        let toDisplay =
          dropdown.style.display === "" || dropdown.style.display === "none"
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
          console.log(window.ScrollPos + " scroll pos");
          window.scrollTo({
            top: window.ScrollPos,
            left: 0,
            behavior: "smooth",
          });

          window.ScrollPos = null;
        }
      };

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

      //carousel.addEventListener('mouseover', stopCarousel);
      //carousel.addEventListener('mouseout', startCarousel);

      //startCarousel();
    }
  })(); // End of IIFE


  


  birlButtons.forEach(function (birlButton) {
    const storeId = birlButton.getAttribute("data-store-id");
    const storeName = birlButton.getAttribute("data-store-name");
    const newElement = document.createElement("div");
    newElement.innerHTML = customHTML(storeId, storeName);
    birlButton.replaceWith(newElement); // Replace directly with newElement
  });
});
