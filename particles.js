(function () {
    const targetId = 'particles-bg';
    const gold = '#d4af37';

    function initParticles() {
        const target = document.getElementById(targetId);
        const engine = window.tsParticles;

        if (!target || !engine || typeof engine.load !== 'function') return;

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
                            mode: ['grab', 'attract']
                        },
                        onClick: {
                            enable: false
                        },
                        resize: {
                            enable: true
                        }
                    },
                    modes: {
                        attract: {
                            distance: 210,
                            duration: 0.35,
                            factor: 1.35,
                            maxSpeed: 3,
                            speed: 1.1
                        },
                        grab: {
                            distance: 180,
                            links: {
                                opacity: 0.82,
                                color: gold
                            }
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
                        distance: 150,
                        opacity: 0.46,
                        width: 1.15
                    },
                    move: {
                        enable: true,
                        speed: 0.52,
                        direction: 'none',
                        random: true,
                        straight: false,
                        outModes: {
                            default: 'bounce'
                        }
                    },
                    number: {
                        value: 58
                    },
                    opacity: {
                        value: {
                            min: 0.28,
                            max: 0.78
                        },
                        animation: {
                            enable: true,
                            speed: 0.42,
                            sync: false
                        }
                    },
                    shape: {
                        type: 'circle'
                    },
                    size: {
                        value: {
                            min: 1.3,
                            max: 3.2
                        },
                        animation: {
                            enable: true,
                            speed: 1.1,
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
                                    value: 34
                                },
                                links: {
                                    distance: 122,
                                    opacity: 0.38
                                },
                                move: {
                                    speed: 0.42
                                }
                            }
                        }
                    },
                    {
                        maxWidth: 420,
                        options: {
                            particles: {
                                number: {
                                    value: 24
                                },
                                links: {
                                    distance: 100,
                                    opacity: 0.32
                                }
                            }
                        }
                    }
                ]
            }
        }).catch(function () {});
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initParticles);
    } else {
        initParticles();
    }
})();
