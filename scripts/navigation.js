$(document).ready(function() {
    const $headingIcon = $('.heading-container .icon');
    const $menuContainer = $('.menu-container');
    const $menuIcon = $('.menu-container .icon');
    const $mainContainer = $('.body-container');
    const $headingContainer = $('.heading-container');

    function setMainContainerHeight() {
        const headingHeight = $headingContainer.outerHeight();
        $mainContainer.css('--heading-height', `${headingHeight}px`);
    }

    setMainContainerHeight();
    $(window).on('resize', setMainContainerHeight);

    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        const headingIconBottom = $headingIcon.offset().top + $headingIcon.outerHeight();
        const menuOffsetFromViewport = $menuContainer.offset().top - scrollTop;

        if (scrollTop > headingIconBottom) {
            $menuIcon.addClass('visible');
        } else {
            $menuIcon.removeClass('visible');
        }

        if (menuOffsetFromViewport <= 0) {
            $menuContainer.addClass('stuck');
        } else {
            $menuContainer.removeClass('stuck');
        }
    });
});
