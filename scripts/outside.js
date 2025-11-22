$(document).ready(function() {
    const $canvas = $('.outside');
    const canvas = $canvas[0];
    const ctx = canvas.getContext('2d');

    const gradientColors = [
        { r: 215, g: 45, b: 135 },
        { r: 28, g: 112, b: 184 },
        { r: 98, g: 174, b: 152 }
    ];

    function interpolateColor(t) {
        const scaledT = t * 2;
        let color1, color2, localT;

        if (scaledT <= 1) {
            color1 = gradientColors[0];
            color2 = gradientColors[1];
            localT = scaledT;
        } else {
            color1 = gradientColors[1];
            color2 = gradientColors[2];
            localT = scaledT - 1;
        }

        const r = Math.round(color1.r + (color2.r - color1.r) * localT);
        const g = Math.round(color1.g + (color2.g - color1.g) * localT);
        const b = Math.round(color1.b + (color2.b - color1.b) * localT);

        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    }

    const waves = [
        { name: 'delta', freq: 2, amp: 30, color: interpolateColor(0) },
        { name: 'theta', freq: 6, amp: 25, color: interpolateColor(0.33) },
        { name: 'alpha', freq: 10, amp: 20, color: interpolateColor(0.67) },
        { name: 'beta', freq: 20, amp: 15, color: interpolateColor(1) }
    ];

    let width, height, waveYPositions, bodyLeft, bodyRight, shouldDisplay;
    let xOffset = 0;
    const speed = 2;
    const bodyMaxWidth = 1200;
    const bodyPadding = 20;

    function updateDimensions() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        const bodyWidth = Math.min(width, bodyMaxWidth + bodyPadding);
        bodyLeft = (width - bodyWidth) / 2;
        bodyRight = bodyLeft + bodyWidth;

        shouldDisplay = bodyLeft > 50;

        const spacing = height / 5;
        waveYPositions = [
            spacing,
            spacing * 2,
            spacing * 3,
            spacing * 4
        ];
    }

    updateDimensions();

    $(window).on('resize', function() {
        updateDimensions();
    });

    function drawWaves() {
        if (!shouldDisplay) {
            requestAnimationFrame(drawWaves);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        waves.forEach((wave, index) => {
            const waveY = waveYPositions[index];

            ctx.beginPath();
            ctx.strokeStyle = wave.color;
            ctx.lineWidth = 2;

            let pathStarted = false;

            for (let x = 0; x < width; x++) {
                if (x >= bodyLeft && x <= bodyRight) {
                    if (pathStarted) {
                        ctx.stroke();
                        ctx.beginPath();
                        pathStarted = false;
                    }
                    continue;
                }

                const sampleX = x + xOffset;
                const baseY = Math.sin((sampleX * wave.freq * Math.PI * 2) / width) * wave.amp;
                const noise = (Math.random() - 0.5) * wave.amp * 0.8;
                const y = waveY + baseY + noise;

                if (!pathStarted) {
                    ctx.moveTo(x, y);
                    pathStarted = true;
                } else {
                    ctx.lineTo(x, y);
                }
            }

            if (pathStarted) {
                ctx.stroke();
            }
        });

        xOffset += speed;

        requestAnimationFrame(drawWaves);
    }

    drawWaves();
});
