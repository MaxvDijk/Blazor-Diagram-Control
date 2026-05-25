export function createViewportController(svg) {

    let viewBox = { x: 0, y: 0, w: 1000, h: 600 };

    let dragging = false;
    let lastX, lastY;

    function setViewBox(vb) {
        viewBox = vb;
        svg.setAttribute(
            "viewBox",
            `${vb.x} ${vb.y} ${vb.w} ${vb.h}`
        );
    }
    
    svg.addEventListener("mousedown", (e) => {
        const isMiddleMouse = e.button === 1;
        const isAltDrag = e.button === 0 && e.altKey;

        if (!isMiddleMouse && !isAltDrag) return;
        
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        
        e.preventDefault();
    });

    window.addEventListener("mouseup", () => {
        dragging = false;
    });
    
    let raf = null;
    
    window.addEventListener("mousemove", (e) => {

        if (!dragging) return;

        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

        const scaleX = viewBox.w / svg.clientWidth;
        const scaleY = viewBox.h / svg.clientHeight;

        viewBox.x -= dx * scaleX;
        viewBox.y -= dy * scaleY;

        if (!raf) {
            raf = requestAnimationFrame(() => {
                svg.setAttribute(
                    "viewBox",
                    `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
                );
                raf = null;
            });
        }
    });
    window.addEventListener("wheel", (e) => {
        e.preventDefault();

        const zoomFactor = 1.1;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const rect = svg.getBoundingClientRect();

        // mouse position in SVG screen space
        const mx = (mouseX - rect.left) / rect.width;
        const my = (mouseY - rect.top) / rect.height;

        // world coordinates before zoom
        const worldX = viewBox.x + mx * viewBox.w;
        const worldY = viewBox.y + my * viewBox.h;

        // zoom direction
        const direction = e.deltaY > 0 ? 1 : -1;
        const scale = direction > 0 ? zoomFactor : 1 / zoomFactor;

        const newW = viewBox.w * scale;
        const newH = viewBox.h * scale;

        // adjust x/y so zoom is centered on cursor
        viewBox.x = worldX - mx * newW;
        viewBox.y = worldY - my * newH;

        viewBox.w = newW;
        viewBox.h = newH;

        setViewBox(viewBox);
    }, { passive: false });

    return {
        setViewBox
    };
}