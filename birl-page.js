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