import { useEffect } from "react";
import "./App.css";

function App() {
    useEffect(() => {
        // === Typewriter ===
        const text = "Happy Birthday!";
        const target = document.getElementById("typewriter");
        let i = 0,
            typing = true;

        function type() {
            if (!target) return;
            if (typing) {
                if (i < text.length) {
                    target.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 60);
                } else {
                    typing = false;
                    setTimeout(type, 5000);
                }
            } else {
                if (i > 1) {
                    target.textContent = text.substring(0, i - 1);
                    i--;
                    setTimeout(type, 60);
                } else {
                    target.textContent = "";
                    i = 0;
                    typing = true;
                    setTimeout(type, 500);
                }
            }
        }
        type();

        // === Fireworks ===
        const canvas = document.getElementById("fireworks");
        const ctx = canvas.getContext("2d");
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        const fireworks = [];

        class Particle {
            constructor(x, y, color, angle, speed) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.angle = angle;
                this.speed = speed;
                this.alpha = 1;
            }
            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed; // gravity
                this.alpha -= 0;
            }
            draw() {
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function createFirework() {
            const x = Math.random() * w;
            const y = Math.random() * (h / 2);
            const color = `hsl(${Math.random() * 360},100%,50%)`;
            for (let i = 0; i < 100; i++) {
                const angle = (Math.PI * 2 * i) / 60;
                const speed = Math.random() * 2;
                fireworks.push(new Particle(x, y, color, angle, speed));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";
            fireworks.forEach((p, i) => {
                p.update();
                p.draw();
                if (p.alpha <= 0) fireworks.splice(i, 1);
            });
        }

        setInterval(createFirework, 800);
        animate();

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });
    }, []);

    return (
        <div className="app">
            <canvas id="fireworks"></canvas>
            <h1 id="typewriter"></h1>
        </div>
    );
}

export default App;
