(function () {
    const targetId = 'particles-bg';
    const gold = '#d4af37';
    const staticClass = 'particles-static';
    let fallbackStarted = false;

    function shouldUseStaticBackdrop() {
        const nav = window.navigator || {};
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
        const userAgent = nav.userAgent || '';
        const prefersReducedMotion = window.matchMedia
            ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
            : false;
        const isHuaweiFamily = /huawei|honor|harmonyos|hmscore/i.test(userAgent);

        return Boolean(
            prefersReducedMotion ||
            (connection && connection.saveData) ||
            isHuaweiFamily
        );
    }

    function useStaticBackdrop(target) {
        if (!target) return;
        fallbackStarted = true;
        target.classList.add(staticClass);
    }

    function startFallbackNetwork(target) {
        if (!target || fallbackStarted) return;
        if (shouldUseStaticBackdrop()) {
            useStaticBackdrop(target);
            return;
        }
        fallbackStarted = true;

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { alpha: true });
        const enablePointerEffects = true;
        const pointer = {
            active: false,
            x: 0,
            y: 0
        };
        let particles = [];
        let width = 0;
        let height = 0;
        let animationFrame = 0;
        let resizeTimer = 0;
        let lastFrameTime = 0;
        let isVisible = true;

        canvas.className = 'particles-fallback-canvas';
        target.appendChild(canvas);

        function getParticleCount() {
            if (width <= 420) return 38;
            if (width <= 768) return 48;
            return 64;
        }

        function getBaseSpeed() {
            return width <= 768 ? 1.55 : 0.72;
        }

        function getFrameInterval() {
            return 0;
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

            width = Math.max(bounds.width, 1);
            height = Math.max(bounds.height, 1);
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
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

        function scheduleDraw() {
            if (!animationFrame && isVisible && !document.hidden) {
                animationFrame = window.requestAnimationFrame(draw);
            }
        }

        function stopDraw() {
            if (!animationFrame) return;
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
        }

        function draw(timestamp) {
            animationFrame = 0;
            if (!isVisible || document.hidden) return;
            if (timestamp - lastFrameTime < getFrameInterval()) {
                scheduleDraw();
                return;
            }
            lastFrameTime = timestamp;
            context.clearRect(0, 0, width, height);

            for (const particle of particles) {
                if (pointer.active) {
                    const dx = pointer.x - particle.x;
                    const dy = pointer.y - particle.y;
                    const distanceSq = (dx * dx) + (dy * dy);

                    if (distanceSq > 1 && distanceSq < 22500) {
                        const distance = Math.sqrt(distanceSq);
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

            const linkDistance = 170;
            const linkDistanceSq = linkDistance * linkDistance;
            for (let i = 0; i < particles.length; i += 1) {
                for (let j = i + 1; j < particles.length; j += 1) {
                    const first = particles[i];
                    const second = particles[j];
                    const dx = first.x - second.x;
                    const dy = first.y - second.y;
                    const distanceSq = (dx * dx) + (dy * dy);

                    if (distanceSq < linkDistanceSq) {
                        const distance = Math.sqrt(distanceSq);
                        context.beginPath();
                        context.moveTo(first.x, first.y);
                        context.lineTo(second.x, second.y);
                        context.strokeStyle = `rgba(212, 175, 55, ${0.32 * (1 - distance / linkDistance)})`;
                        context.lineWidth = 0.9;
                        context.stroke();
                    }
                }
            }

            if (pointer.active) {
                for (const particle of particles) {
                    const dx = pointer.x - particle.x;
                    const dy = pointer.y - particle.y;
                    const distanceSq = (dx * dx) + (dy * dy);

                    if (distanceSq < 36100) {
                        const distance = Math.sqrt(distanceSq);
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

            scheduleDraw();
        }

        resize();
        scheduleDraw();

        window.addEventListener('resize', function () {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () {
                resize();
                scheduleDraw();
            }, 120);
        }, { passive: true });
        if (enablePointerEffects) {
            window.addEventListener('pointerdown', updatePointer, { passive: true });
            window.addEventListener('pointermove', updatePointer, { passive: true });
            window.addEventListener('pointerup', clearPointer);
            window.addEventListener('pointerleave', clearPointer);
            window.addEventListener('touchstart', updatePointer, { passive: true });
            window.addEventListener('touchmove', updatePointer, { passive: true });
            window.addEventListener('touchend', clearPointer);
            window.addEventListener('touchcancel', clearPointer);
        }

        const visibilityObserver = 'IntersectionObserver' in window
            ? new IntersectionObserver(function (entries) {
                isVisible = entries[0] ? entries[0].isIntersecting : true;
                if (isVisible) {
                    scheduleDraw();
                } else {
                    stopDraw();
                }
            }, { rootMargin: '120px' })
            : null;
        if (visibilityObserver) visibilityObserver.observe(target);

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                stopDraw();
            } else {
                scheduleDraw();
            }
        });
        window.addEventListener('pagehide', function () {
            stopDraw();
            if (visibilityObserver) visibilityObserver.disconnect();
        });
    }

    function initParticles() {
        const target = document.getElementById(targetId);

        if (!target) return;
        if (shouldUseStaticBackdrop()) {
            useStaticBackdrop(target);
            return;
        }

        function startAnimatedBackdrop() {
            if (fallbackStarted || target.querySelector('canvas')) return;
            const engine = window.tsParticles;

            window.setTimeout(function () {
                if (!target.querySelector('.particles-fallback-canvas') && !target.classList.contains(staticClass)) {
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
                        value: 64
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
                                    value: 48
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
                                    value: 38
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

        startAnimatedBackdrop();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
})();
