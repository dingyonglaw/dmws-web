/*
 * DMIS license footer — adds a small "Free for families · License · Tip us" note to any page.
 * Include with: <script src="/license-footer.js" defer></script>
 *
 * Normal pages get a footer line at the bottom of the page.
 * Full-screen pages (games that don't scroll) get a small badge in the bottom-left corner
 * that opens into the same links on tap, so it never covers game controls for long.
 */
(function () {
    if (document.getElementById('dmis-license-footer')) return;

    var LICENSE_URL = '/license.html';
    var KOFI_URL = 'https://ko-fi.com/dmisbookclub';

    var css = '' +
        '#dmis-license-footer{font-family:"Nunito",-apple-system,"Segoe UI",Roboto,Arial,sans-serif;font-size:13px;line-height:1.5;box-sizing:border-box}' +
        '#dmis-license-footer *{box-sizing:border-box}' +
        '#dmis-license-footer a{color:inherit;text-decoration:underline;text-underline-offset:2px}' +
        '#dmis-license-footer a:focus-visible,#dmis-license-footer button:focus-visible{outline:2px solid #fb6415;outline-offset:2px}' +
        '#dmis-license-footer.dlf-bar{clear:both;width:100%;text-align:center;padding:14px 16px;background:#fdf5e1;color:#0C2340;border-top:2px solid #ead9b4}' +
        '#dmis-license-footer .dlf-sep{opacity:.5;margin:0 6px}' +
        '#dmis-license-footer.dlf-badge{position:fixed;left:calc(8px + env(safe-area-inset-left,0px));bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:2147483000}' +
        '#dmis-license-footer .dlf-toggle{font:inherit;font-weight:700;font-size:12px;cursor:pointer;border:2px solid #fdf5e1;background:rgba(12,35,64,.85);color:#fdf5e1;border-radius:999px;padding:4px 10px;opacity:.75;transition:opacity .2s}' +
        '#dmis-license-footer .dlf-toggle:hover,#dmis-license-footer .dlf-toggle[aria-expanded="true"]{opacity:1}' +
        '#dmis-license-footer .dlf-pop{margin-bottom:6px;background:#fdf5e1;color:#0C2340;border:2px solid #0C2340;border-radius:12px;padding:10px 12px;max-width:240px;box-shadow:0 6px 18px rgba(0,0,0,.3)}' +
        '#dmis-license-footer .dlf-pop a{display:block;padding:3px 0;font-weight:700}' +
        '#dmis-license-footer .dlf-pop p{margin:0 0 4px}' +
        '@media print{#dmis-license-footer.dlf-badge{display:none}}';

    function linksHTML() {
        return '&copy; DMIS<span class="dlf-sep">&middot;</span>' +
            'Free for families, not for commercial use<span class="dlf-sep">&middot;</span>' +
            '<a href="' + LICENSE_URL + '">License</a><span class="dlf-sep">&middot;</span>' +
            '<a href="' + KOFI_URL + '" target="_blank" rel="noopener">Tip us on Ko-fi</a>';
    }

    function useFooterBar() {
        var html = document.documentElement, body = document.body;
        var hs = getComputedStyle(html).overflowY, bs = getComputedStyle(body).overflowY;
        if (hs === 'hidden' || bs === 'hidden' || hs === 'clip' || bs === 'clip') return false;
        if (body.classList.contains('app')) return false;
        // Pages that lay out the body as flex/grid (centred game screens) get the corner badge
        var d = getComputedStyle(body).display;
        if (d.indexOf('flex') !== -1 || d.indexOf('grid') !== -1) return false;
        return true;
    }

    function build() {
        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);

        var el = document.createElement('div');
        el.id = 'dmis-license-footer';
        el.setAttribute('role', 'contentinfo');

        if (useFooterBar()) {
            el.className = 'dlf-bar';
            el.innerHTML = linksHTML();
        } else {
            el.className = 'dlf-badge';
            el.innerHTML =
                '<div class="dlf-pop" id="dlf-pop" hidden>' +
                '<p>Free for families, not for commercial use.</p>' +
                '<a href="' + LICENSE_URL + '">Read the license</a>' +
                '<a href="' + KOFI_URL + '" target="_blank" rel="noopener">Tip us on Ko-fi</a>' +
                '</div>' +
                '<button type="button" class="dlf-toggle" aria-expanded="false" aria-controls="dlf-pop">&copy; DMIS</button>';
            var btn = el.querySelector('.dlf-toggle');
            var pop = el.querySelector('.dlf-pop');
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var open = pop.hidden;
                pop.hidden = !open;
                btn.setAttribute('aria-expanded', String(open));
            });
            document.addEventListener('click', function (e) {
                if (!el.contains(e.target) && !pop.hidden) {
                    pop.hidden = true;
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        }
        document.body.appendChild(el);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }
})();
