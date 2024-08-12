document.addEventListener("DOMContentLoaded", function () {
    console.log("Page has been loaded");
  
    const customHTML = `
      <div class="birl-product-cta-container2-peregrine tooltip-btn" onClick="openDropdown()">
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
        Trade-in your {{ shop.name | capitalize }} garments for instant credit
      </span>
    </p>
  </div>
</div>
    `;
  
    const birlButtons = document.querySelectorAll(".birlbutton"); // Select by class
  
    birlButtons.forEach(function (birlButton) {
      const newElement = document.createElement("div");
      newElement.innerHTML = customHTML;
      birlButton.replaceWith(newElement); // Replace directly with newElement
    });
  });
  