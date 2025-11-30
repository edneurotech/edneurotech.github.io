window.attachSponsors = function() {
    $('.sponsor').each(function() {
        const $sponsor = $(this);
        const url = $sponsor.attr('data-src');

        if (url) {
            $sponsor.css('cursor', 'pointer');
            $sponsor.attr('tabindex', '0');

            $sponsor.off('click keypress');

            $sponsor.on('click', function() {
                window.open(url, '_blank');
            });

            $sponsor.on('keypress', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.open(url, '_blank');
                }
            });
        }
    });
};

$(document).ready(function() {
    window.attachSponsors();
});
