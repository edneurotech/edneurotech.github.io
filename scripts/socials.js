$(document).ready(function() {
    $.getJSON('/configs/socials.json', function(socials) {
        const $socialsContainer = $('.socials-container');

        $.each(socials, function(key, value) {
            const $social = $socialsContainer.find(`.social.${key}`);
            
            if ($social.length && value.icon) {
                const $img = $('<img>').attr('src', value.icon);
                $social.append($img);

                if (value.url) {
                    $social.css('cursor', 'pointer');
                    $social.on('click', function() {
                        window.open(value.url, '_blank');
                    });
                }
            }
        });
    });
});
