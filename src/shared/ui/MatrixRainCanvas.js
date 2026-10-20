import React, { useEffect, useRef } from "react";

const GLYPHS = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜλ⚡∑C#GOLANGKAFKAAIRAGNETDDD";

export function MatrixRainCanvas({
  theme = "green",
  speed = 1,
  burst = false,
  opacity = 0.55
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    };

    window.addEventListener("resize", handleResize);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = [];

    const initColumns = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          y: Math.random() * -100,
          speed: (0.8 + Math.random() * 1.5) * speed,
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          length: 12 + Math.floor(Math.random() * 20),
        };
      }
    };

    initColumns();

    // Mouse ripple tracking
    let mouse = { x: -1000, y: -1000, radius: 120 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const getColors = () => {
      if (theme === "cyan") {
        return {
          bg: "rgba(3, 8, 16, 0.12)",
          head: "#ffffff",
          main: "#00f0ff",
          trail: "#006699",
          glow: "rgba(0, 240, 255, 0.4)"
        };
      }
      if (theme === "red") {
        return {
          bg: "rgba(12, 3, 6, 0.12)",
          head: "#ffffff",
          main: "#ff2a6d",
          trail: "#880028",
          glow: "rgba(255, 42, 109, 0.4)"
        };
      }
      // default green
      return {
        bg: "rgba(3, 10, 6, 0.12)",
        head: "#ffffff",
        main: "#00ff66",
        trail: "#006622",
        glow: "rgba(0, 255, 102, 0.4)"
      };
    };

    const draw = () => {
      const colors = getColors();

      // Semi-transparent fade layer
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const x = i * fontSize;
        const y = drop.y * fontSize;

        // Check mouse proximity
        const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);
        const isNearMouse = distToMouse < mouse.radius;

        // Random character flicker
        if (Math.random() < 0.05) {
          drop.char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }

        if (isNearMouse) {
          ctx.fillStyle = colors.head;
          ctx.shadowBlur = 12;
          ctx.shadowColor = colors.glow;
          ctx.fillText(drop.char, x, y);
          ctx.shadowBlur = 0;
        } else {
          // Head character
          ctx.fillStyle = colors.head;
          ctx.fillText(drop.char, x, y);

          // Trail character
          ctx.fillStyle = colors.main;
          ctx.fillText(
            GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
            x,
            y - fontSize
          );
        }

        // Advance drop
        const currentSpeed = (burst ? 4.5 : 1) * drop.speed;
        drop.y += currentSpeed;

        if (drop.y * fontSize > height && Math.random() > 0.975) {
          drop.y = 0;
          drop.speed = (0.8 + Math.random() * 1.5) * speed;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, speed, burst]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: opacity,
        filter: "contrast(115%)",
      }}
    />
  );
}
export default MatrixRainCanvas;
