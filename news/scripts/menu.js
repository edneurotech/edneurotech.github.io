$(document).ready(function() {
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(segment => segment.length > 0);
    const pageId = pathSegments[0] || 'home';
    const menuItem = $('.menu-options-container').find(`#${pageId}`);

    if (menuItem.length > 0) {
        menuItem.addClass('blurred');
        menuItem.find('a').on('click', function(e) {
            e.preventDefault();
            return false;
        });
        menuItem.css('pointer-events', 'none');
    }
});
