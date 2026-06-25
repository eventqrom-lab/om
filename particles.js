(function () {
    const targetId = 'particles-bg';
    const gold = '#d4af37';
    let fallbackStarted = false;

    function startFallbackNetwork(target) {
        if (!target || fallbackStarted) return;
        fallbackStarted = true;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const pointer = {
            active: false,
            x: 0,
            y: 0
        };
        let particles = [];
        let width = 0;
        let height = 0;
        let animationFrame = 0;

        canvas.className = 'particles-fallback-canvas';
        target.appendChild(canvas);

        function getParticleCount() {
            if (width <= 420) return 68;
            if (width <= 768) return 76;
            return 96;
        }

        function getBaseSpeed() {
            return width <= 768 ? 1.55 : 0.72;
        }

        function createParticle(isInitial) {
            const margin = 44;
            const speed = getBaseSpeed() * (0.72 + Math.random() * 0.78);
            let x = Math.random() * width;
            let y = Math.random() * height;
            let angle = Math.random() * Math.PI * 2;

            if (!isInitial) {
                const edge = Math.floor(Math.random() * 4);
                if (edge === 0) {
                    x = -margin;
                    y = Math.random() * height;
                    angle = (Math.random() - 0.5) * 1.35;
                } else if (edge === 1) {
                    x = width + margin;
                    y = Math.random() * height;
                    angle = Math.PI + (Math.random() - 0.5) * 1.35;
                } else if (edge === 2) {
                    x = Math.random() * width;
                    y = -margin;
                    angle = Math.PI / 2 + (Math.random() - 0.5) * 1.35;
                } else {
                    x = Math.random() * width;
                    y = height + margin;
                    angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.35;
                }
            }

            return {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: 1.8 + Math.random() * 1.4
            };
        }

        function resize() {
            const bounds = target.getBoundingClientRect();
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            width = Math.max(bounds.width, 1);
            height = Math.max(bounds.height, 1);
            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            const needed = getParticleCount();
            if (particles.length !== needed) {
                particles = Array.from({ length: needed }, () => createParticle(true));
            }
        }

        function updatePointer(event) {
            const point = event.touches ? event.touches[0] : event;
            if (!point) return;

            const bounds = target.getBoundingClientRect();
            pointer.active = true;
            pointer.x = point.clientX - bounds.left;
            pointer.y = point.clientY - bounds.top;
        }

        function clearPointer() {
            pointer.active = false;
        }

        function draw() {
            context.clearRect(0, 0, width, height);

            for (const particle of particles) {
                if (pointer.active) {
                    const dx = pointer.x - particle.x;
                    const dy = pointer.y - particle.y;
                    const distance = Math.hypot(dx, dy);

                    if (distance > 1 && distance < 150) {
                        const force = (1 - distance / 150) * 0.006;
                        particle.vx -= dx * force / distance;
                        particle.vy -= dy * force / distance;
                    }
                }

                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx += (Math.random() - 0.5) * 0.018;
                particle.vy += (Math.random() - 0.5) * 0.018;
                particle.vx *= 0.996;
                particle.vy *= 0.996;

                if (Math.abs(particle.vx) < 0.26) particle.vx += (Math.random() - 0.5) * 0.1;
                if (Math.abs(particle.vy) < 0.26) particle.vy += (Math.random() - 0.5) * 0.1;
                particle.vx = Math.max(-1.9, Math.min(1.9, particle.vx));
                particle.vy = Math.max(-1.9, Math.min(1.9, particle.vy));

                if (
                    particle.x < -70 ||
                    particle.x > width + 70 ||
                    particle.y < -70 ||
                    particle.y > height + 70
                ) {
                    Object.assign(particle, createParticle(false));
                }
            }

            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const first = particles[i];
                    const second = particles[j];
                    const distance = Math.hypot(first.x - second.x, first.y - second.y);

                    if (distance < 170) {
                        context.beginPath();
                        context.moveTo(first.x, first.y);
                        context.lineTo(second.x, second.y);
                        context.strokeStyle = `rgba(212, 175, 55, ${0.32 * (1 - distance / 170)})`;
                        context.lineWidth = 0.9;
                        context.stroke();
                    }
                }
            }

            if (pointer.active) {
                for (const particle of particles) {
                    const distance = Math.hypot(pointer.x - particle.x, pointer.y - particle.y);

                    if (distance < 190) {
                        context.beginPath();
                        context.moveTo(pointer.x, pointer.y);
                        context.lineTo(particle.x, particle.y);
                        context.strokeStyle = `rgba(212, 175, 55, ${0.42 * (1 - distance / 190)})`;
                        context.lineWidth = 1;
                        context.stroke();
                    }
                }
            }

            for (const particle of particles) {
                context.beginPath();
                context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                context.fillStyle = 'rgba(212, 175, 55, 0.82)';
                context.fill();
            }

            animationFrame = window.requestAnimationFrame(draw);
        }

        resize();
        draw();

        window.addEventListener('resize', resize);
        window.addEventListener('pointerdown', updatePointer, { passive: true });
        window.addEventListener('pointermove', updatePointer, { passive: true });
        window.addEventListener('pointerup', clearPointer);
        window.addEventListener('pointerleave', clearPointer);
        window.addEventListener('touchstart', updatePointer, { passive: true });
        window.addEventListener('touchmove', updatePointer, { passive: true });
        window.addEventListener('touchend', clearPointer);
        window.addEventListener('touchcancel', clearPointer);
        window.addEventListener('pagehide', function () {
            window.cancelAnimationFrame(animationFrame);
        });
    }

    function initParticles() {
        const target = document.getElementById(targetId);
        const engine = window.tsParticles;

        if (!target) return;

        window.setTimeout(function () {
            if (!target.querySelector('.particles-fallback-canvas')) {
                startFallbackNetwork(target);
            }
        }, 650);

        if (!engine || typeof engine.load !== 'function') {
            startFallbackNetwork(target);
            return;
        }

        engine.load({
            id: targetId,
            options: {
                fullScreen: {
                    enable: false
                },
                background: {
                    color: {
                        value: 'transparent'
                    }
                },
                detectRetina: true,
                fpsLimit: 60,
                interactivity: {
                    detectsOn: 'window',
                    events: {
                        onHover: {
                            enable: true,
                            mode: ['grab', 'repulse']
                        },
                        onClick: {
                            enable: false
                        },
                        resize: {
                            enable: true
                        }
                    },
                    modes: {
                        grab: {
                            distance: 190,
                            links: {
                                opacity: 0.78,
                                color: gold
                            }
                        },
                        repulse: {
                            distance: 110,
                            duration: 0.2,
                            factor: 18,
                            speed: 0.55
                        }
                    }
                },
                particles: {
                    color: {
                        value: gold
                    },
                    links: {
                        enable: true,
                        color: gold,
                        distance: 170,
                        opacity: 0.34,
                        width: 0.95
                    },
                    move: {
                        enable: true,
                        speed: 0.62,
                        direction: 'none',
                        random: true,
                        straight: false,
                        outModes: {
                            default: 'out'
                        }
                    },
                    number: {
                        value: 96
                    },
                    opacity: {
                        value: {
                            min: 0.32,
                            max: 0.78
                        },
                        animation: {
                            enable: true,
                            speed: 0.32,
                            sync: false
                        }
                    },
                    shape: {
                        type: 'circle'
                    },
                    size: {
                        value: {
                            min: 1.8,
                            max: 3.2
                        },
                        animation: {
                            enable: true,
                            speed: 0.75,
                            sync: false
                        }
                    }
                },
                pauseOnBlur: true,
                pauseOnOutsideViewport: true,
                responsive: [
                    {
                        maxWidth: 768,
                        options: {
                            particles: {
                                number: {
                                    value: 76
                                },
                                links: {
                                    distance: 158,
                                    opacity: 0.32
                                },
                                move: {
                                    speed: 1.2
                                }
                            }
                        }
                    },
                    {
                        maxWidth: 420,
                        options: {
                            particles: {
                                number: {
                                    value: 68
                                },
                                links: {
                                    distance: 148,
                                    opacity: 0.3
                                },
                                move: {
                                    speed: 1.35
                                }
                            }
                        }
                    }
                ]
            }
        }).then(function () {
            window.setTimeout(function () {
                if (!target.querySelector('canvas')) {
                    startFallbackNetwork(target);
                }
            }, 500);
        }).catch(function () {
            startFallbackNetwork(target);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
})();
