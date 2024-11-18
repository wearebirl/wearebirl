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
    const right = document.querySelector('.right-view');

    function checkContainerWidth() {
        const containerWidth = container.offsetWidth;
        console.log("Container width: ", containerWidth);

        if (containerWidth < 1000) {
            container.classList.add('column');
            left.classList.add('column');
            right.classList.add('column');
        } else {
            container.classList.remove('column');
            left.classList.remove('column');
            right.classList.remove('column');
        }
    }

    checkContainerWidth();

    window.addEventListener('resize', checkContainerWidth);
});