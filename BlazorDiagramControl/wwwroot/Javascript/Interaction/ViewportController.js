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
    function getScale() {

        const scaleX = viewBox.w / svg.clientWidth;
        const scaleY = viewBox.h / svg.clientHeight;

        return {
            scaleX,
            scaleY
        };

    }
    
    svg.addEventListener("pointerdown", (e) => {
        const isMiddleMouse = e.button === 1;
        const isAltDrag = e.button === 0 && e.altKey;

        if (!isMiddleMouse && !isAltDrag) return;
        
        dragging = true;
        lastX = e.clientX;
        lastY = e.clientY;
        
        e.preventDefault();
    });

    window.addEventListener("pointerup", () => {
        dragging = false;
    });
    
    let raf = null;
    
    window.addEventListener("pointermove", (e) => {

        if (!dragging) return;

        if (!raf) {
            raf = requestAnimationFrame(() => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;

        lastX = e.clientX;
        lastY = e.clientY;

                const scaleX = viewBox.w / svg.clientWidth;
                const scaleY = viewBox.h / svg.clientHeight;

                viewBox.x -= dx * scaleX;
                viewBox.y -= dy * scaleY;
            
                setViewBox(viewBox);

                raf = null;
            });
        }
    });
    window.addEventListener("wheel", (e) => {

        e.preventDefault();
        if (!raf) {
            let rect = svg.getBoundingClientRect();

            raf = requestAnimationFrame(() => {
                const zoomFactor = 1.1;

                const mouseX = e.clientX;
                const mouseY = e.clientY;

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
                raf = null;
            });
        }  
    }, { passive: false });

    return {
        setViewBox,
        getScale
    };

}

