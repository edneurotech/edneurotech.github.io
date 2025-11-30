const getHtml = () => window.litHtml;

const routes = {
    '/': {
        id: 'home',
        render: () => {
            const html = getHtml();
            return html`
                <!-- <div class="soon-container body-item">
                    <div class="soon-item">
                        <h2>Under Construction</h2>
                        <p1>(opening 1st December)</p1>
                    </div>
                </div> -->
                <div class="schedule body-item">
                    <h2 class="title">Our Schedule</h2>
                    <div class="content-container">
                        <!-- <div class="schedule-card">TBA</div>
                        <div class="schedule-card">TBA</div>
                        <div class="schedule-card">TBA</div>
                        <div class="schedule-card">TBA</div>
                        <div class="schedule-card">TBA</div> -->
                    </div>
                </div>
                <div class="about-us body-item">
                    <h2 class="title">About Us</h2>
                    <div class="content-container"></div>
                </div>
                <div class="what-we-cover body-item">
                    <h2 class="title">What We Cover</h2>
                    <div class="content-container"></div>
                </div>
                <div class="activities body-item">
                    <h2 class="title">Activities</h2>
                    <div class="content-container"></div>
                </div>
                <div class="sponsors-container body-item">
                    <h2 class="title sponsors-item">Our Sponsors</h2>
                    <div class="horizontal-line sponsors-item"></div>
                    <div class="sponsor sponsors-item" data-src="https://comp-soc.com/">
                        <img src="images/sponsors/compsoc-long.png">
                    </div>
                </div>
            `;
        }
    },
    '/news': {
        id: 'news',
        render: () => {
            const html = getHtml();
            return html`
                <!-- <div class="soon-container body-item">
                    <div class="soon-item">
                        <h2>Under Construction</h2>
                        <p1>(opening 1st December)</p1>
                    </div>
                </div> -->
            `;
        }
    },
    '/contact': {
        id: 'contact',
        render: () => {
            const html = getHtml();
            return html`
                <!-- <div class="soon-container body-item">
                    <div class="soon-item">
                        <h2>Under Construction</h2>
                        <p1>(opening 1st December)</p1>
                    </div>
                </div> -->
            `;
        }
    },
    '/join': {
        id: 'join',
        render: () => {
            const html = getHtml();
            return html`
                <!-- <div class="soon-container body-item">
                    <div class="soon-item">
                        <h2>Under Construction</h2>
                        <p1>(opening 1st December)</p1>
                    </div>
                </div> -->
            `;
        }
    }
};

const router = {
    init: function() {
        this.setupListeners();
        this.navigate(window.location.pathname, false);
    },

    setupListeners: function() {
        window.addEventListener('popstate', () => {
            this.navigate(window.location.pathname, false);
        });

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link && link.getAttribute('href') !== '#') {
                const href = link.getAttribute('href');
                if (routes[href]) {
                    e.preventDefault();
                    this.navigate(href);
                }
            }
        });
    },

    navigate: function(path, pushState = true) {
        const route = routes[path] || routes['/'];

        if (pushState) {
            window.history.pushState({}, '', path);
        }

        this.render(route);
        this.updateMenu(route.id);
    },

    render: function(route) {
        const content = document.getElementById('app-content');
        if (content && window.litRender) {
            const template = route.render();
            window.litRender(template, content);

            if (window.attachSponsors) {
                window.attachSponsors();
            }
            if (window.startTypingAnimation) {
                window.startTypingAnimation();
            }
        }
    },

    updateMenu: function(pageId) {
        $('.menu-options-item').removeClass('blurred').css('pointer-events', '');

        const menuItem = $('.menu-options-container').find(`#${pageId}`);
        if (menuItem.length > 0) {
            menuItem.addClass('blurred');
            menuItem.css('pointer-events', 'none');
        }
    }
};

$(document).ready(function() {
    router.init();
});
