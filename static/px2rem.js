const win = window;
win.flex = (baseFontSize, fontscale) => {
    const _baseFontSize = baseFontSize || 100;
    const _fontscale = fontscale || 1;

    const doc = win.document;
    const ua = navigator.userAgent;
    const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    let dpr = win.devicePixelRatio || 1;
    if (!isIos) {
        dpr = 1;
    }
    const scale = 1 / dpr;
    let metaEl = doc.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        doc.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`);
    doc.documentElement.style.fontSize = `${_baseFontSize / 2 * dpr * _fontscale}px`;
    doc.documentElement.setAttribute('data-dpr',dpr);
};
win.flex(100, 1);




