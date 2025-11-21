$(document).ready(function() {
    const $menuIcon = $('.menu-container .icon');
    const $menuText = $('.menu-container .icon p1');

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if ($menuIcon.hasClass('visible')) {
                    $menuText.addClass('hidden');
                } else {
                    $menuText.removeClass('hidden');
                }
            }
        });
    });

    observer.observe($menuIcon[0], {
        attributes: true
    });
});
