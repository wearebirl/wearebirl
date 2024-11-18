document.addEventListener("DOMContentLoaded", function() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            accordionItems.forEach(innerItem => {
                if (innerItem !== item) {
                    innerItem.classList.remove('active');
                    innerItem.querySelector('.accordion-content').style.height = '0';
                }
            });

            const isActive = item.classList.contains('active');
            if (!isActive) {
                content.style.height = content.scrollHeight + 'px';
                content.style.padding = '15px'
            } else {
                content.style.height = '0';
                content.style.padding = '0';
            }

            item.classList.toggle('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector('.split-view');
    const left = document.querySelector('.left-view');
    const right = document.querySelector('.right-view');// Target the element with class 'birl-page-body'

    function checkContainerWidth() {
        const containerWidth = container.offsetWidth;
        console.log("Container width: ", containerWidth);

        // If the container's width is smaller than 600px, switch to column layout
        if (containerWidth < 1000) {
            // container.classList.add('flex')
            container.classList.add('column');
            left.classList.add('column');
            right.classList.add('column');  // Add 'column' class to make it flex-column
        } else {
            container.classList.remove('column');
            left.classList.remove('column');
            right.classList.remove('column'); // Remove the 'column' class to revert to flex-row
        }
    }

    // Initial check for container width on page load
    checkContainerWidth();

    // Optional: Listen for window resizing and re-check the container's width
    window.addEventListener('resize', checkContainerWidth);
});