$(document).ready(function() {
    const $h2 = $('.soon-item h2');
    const $p1 = $('.soon-item p1');
    const fullText = $h2.text();
    const typingSpeed = 100;

    $h2.text('');

    let index = 0;
    function typeText() {
        if (index < fullText.length) {
            $h2.text($h2.text() + fullText.charAt(index));
            index++;
            setTimeout(typeText, typingSpeed);
        } else {
            $p1.addClass('visible');
        }
    }

    typeText();
});
