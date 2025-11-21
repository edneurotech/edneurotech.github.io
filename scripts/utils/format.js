function formatContent(selector, ...args) {
    const element = $(selector);
    let html = element.html();

    args.forEach((arg, index) => {
        html = html.replace(`{${index + 1}}`, arg);
    });

    element.html(html);
}

$(document).ready(() => {
    const year = new Date().getFullYear();
    formatContent('.copyright-container', year);
});
