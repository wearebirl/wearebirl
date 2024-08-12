<script>
    (function() {
        document.addEventListener("DOMContentLoaded", function() {
            console.log('Birl Button is ready!');
            const customHTML = `
                <div class="custom-button">
                    <button>Click Me!</button>
                </div>
            `;
            const birlButtons = document.querySelectorAll('birlbutton');
            birlButtons.forEach(function(birlButton) {
                const newElement = document.createElement('div');
                newElement.innerHTML = customHTML;
                birlButton.replaceWith(newElement.firstChild);
            });
        })
    })();
</script>