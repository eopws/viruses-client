export default function createGrid(width, height) {
    var data = `<svg width="${width}px" height="${height}px" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse"> \
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" stroke-width="1" /> \
            </pattern> \
            <pattern id="grid" width="90" height="90" patternUnits="userSpaceOnUse"> \
                <rect width="80" height="80" fill="url(#smallGrid)" /> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>`;

    var DOMURL = window.URL || window.webkitURL || window;

    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);

    img.src = url;

    return img;
}
