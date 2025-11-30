function formatContent(selector, ...args) {
    const element = $(selector);
    let html = element.html();

    args.forEach((arg, index) => {
        html = html.replace(`{${index + 1}}`, arg);
    });

    element.html(html);
}

$(document).ready(() => {
    const ROMAN_NUMERALS_TABLE = [
        ["M", 1000],
        ["CM", 900],
        ["D", 500],
        ["CD", 400],
        ["C", 100],
        ["XC", 90],
        ["L", 50],
        ["XL", 40],
        ["X", 10],
        ["IX", 9],
        ["V", 5],
        ["IV", 4],
        ["I", 1]
    ];
    
    const numberToNumerals = (n) => {
        let numerals = "";
        for(const [glyph, _n] of ROMAN_NUMERALS_TABLE) {
            while(n >= _n) {
                numerals += glyph;
                n -= _n;
            }
        }
        return numerals
    }

    const year = new Date().getFullYear();
    formatContent('.copyright-container', numberToNumerals(year));
});
