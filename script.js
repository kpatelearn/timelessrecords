document.addEventListener('DOMContentLoaded', () => {

  const isMaddyPage = document.body.classList.contains('artist-maddy');
if (isMaddyPage) return;

    // ============================
    // ELEMENT REFERENCES
    // ============================
    const elements = {
        navLinks: document.querySelectorAll('.main-nav a'),
        heroSection: document.getElementById("home"),
        header: document.querySelector('header'),
        footer: document.querySelector('footer'),
        footerHoverZone: document.getElementById('footer-hover-zone'),
        heroLogo: document.getElementById("heroLogo"),
        menuOverlay: document.getElementById('menuOverlay'),
        menuToggleLeft: document.getElementById('menuToggleLeft'),
        menuToggleRight: document.getElementById('menuToggleRight'),
        presaveMolly: document.getElementById("presaveMolly"),
        signupButton: document.getElementById("signupButton"),
        aboutBtn: document.getElementById("aboutMoreBtn"),
        aboutModal: document.getElementById("aboutModal"),
        artistMolly: document.getElementById("artistMolly"),
        sections: document.querySelectorAll('.page-section')
    };

    // Get heroImage safely
    elements.heroImage = elements.heroSection?.querySelector(".hero-content img");
    
    // Get modal elements safely
    const modal = document.getElementById("greenRoomModal");
    elements.greenRoomLink = document.getElementById("greenRoomLink");
    elements.closeBtn = modal?.querySelector(".close-btn");
    elements.aboutClose = elements.aboutModal?.querySelector(".close-btn");

    // ============================
    // STATE VARIABLES
    // ============================
    let lastScrollTop = 0;
    let isHoveringFooterZone = false;
    let isHoveringFooter = false;
    let ticking = false;

    // ============================
    // UTILITY FUNCTIONS
    // ============================
    const ensureNoNestedScrolling = () => {
        // Force the body to be the only scroll container
        document.body.style.overflowY = 'auto';
        document.body.style.height = 'auto';
        
        // Make sure no other elements become scroll containers
        const potentialScrollContainers = [
            document.documentElement,
            document.getElementById('page-content'),
            ...elements.sections
        ];
        
        potentialScrollContainers.forEach(el => {
            if (el) {
                el.style.overflow = 'visible';
                el.style.overflowX = 'visible';
                el.style.overflowY = 'visible';
            }
        });
    };

    const updateHeaderFooterVisibility = () => {
        const currentScroll = window.scrollY;
        const scrollingDown = currentScroll > lastScrollTop;

        // Header logic
        if (scrollingDown && currentScroll > 50) {
            elements.header.classList.add('hidden');
        } else {
            elements.header.classList.remove('hidden');
        }

        // Footer logic
        const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
        if (nearBottom || isHoveringFooter || isHoveringFooterZone) {
            elements.footer.classList.remove('hidden');
        } else {
            elements.footer.classList.add('hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        ticking = false;
    };

    const requestAnimationFrameScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateHeaderFooterVisibility();
                ticking = false;
            });
            ticking = true;
        }
    };

    // ============================
    // MENU FUNCTIONALITY
    // ============================
  // HYBRID MENU FUNCTIONALITY

const menuToggleLeft = document.getElementById('menuToggleLeft');
const menuToggleRight = document.getElementById('menuToggleRight');
const menuOverlay = document.getElementById('menuOverlay');
const body = document.body;

function toggleMenu() {
  const isActive = menuOverlay.classList.contains('active');
  if (isActive) {
    menuOverlay.classList.remove('active');
    menuToggleLeft.classList.remove('active');
    menuToggleRight.classList.remove('active');
    body.classList.remove('menu-open');
  } else {
    menuOverlay.classList.add('active');
    menuToggleLeft.classList.add('active');
    menuToggleRight.classList.add('active');
    body.classList.add('menu-open');
  }
}

menuToggleLeft.addEventListener('click', toggleMenu);
menuToggleRight.addEventListener('click', toggleMenu);

// Allow clicking background of overlay to close menu
menuOverlay.addEventListener('click', (e) => {
  if (e.target === menuOverlay) {
    toggleMenu();
  }
});

// Close menu when clicking on any menu link
const menuLinks = menuOverlay.querySelectorAll('a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    toggleMenu();
  });
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
    toggleMenu();
  }
});

// Auto-close menu on window resize back to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && menuOverlay.classList.contains('active')) {
    toggleMenu();
  }
});


    // ============================
    // MODAL FUNCTIONALITY
    // ============================
    const openModal = () => {
        if (modal) {
            modal.classList.add("active");
        }
    };

    const closeModal = (modalElement) => {
        if (modalElement) {
            modalElement.classList.remove("active");
        }
    };

    const handleModalClick = (modalElement) => (e) => {
        if (e.target === modalElement) {
            closeModal(modalElement);
        }
    };

    // ============================
    // NAVIGATION FUNCTIONALITY
    // ============================
    const initNavigation = () => {
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    };

    // ============================
    // HERO SECTION FUNCTIONALITY
    // ============================
    const initHeroSection = () => {
        if (!elements.heroSection) return;

        elements.heroSection.addEventListener("mouseenter", () => {
            if (elements.heroImage) elements.heroImage.style.opacity = 1;
            elements.heroSection.classList.remove('bright');
        });

        elements.heroSection.addEventListener("mouseleave", () => {
            if (elements.heroImage) elements.heroImage.style.opacity = 0;
            elements.heroSection.classList.add('bright');
        });

        // For mobile devices
        elements.heroSection.addEventListener('click', (e) => {
            if (e.target !== elements.heroLogo) {
                elements.heroSection.classList.add('bright');
            }
        });
    };

    // ============================
    // INTERSECTION OBSERVER
    // ============================
    const initIntersectionObserver = () => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    entry.target.classList.add('visible');
                } else if (!entry.isIntersecting && entry.intersectionRatio < 0.12) {
                    entry.target.classList.remove('visible');
                }
            });
        }, { 
            threshold: [0.05, 0.1, 0.5], 
            rootMargin: '0px'
        }); 
        
        elements.sections.forEach(section => observer.observe(section));
    };

    // ============================
    // HOVER EVENT HANDLERS
    // ============================
    const initHoverEvents = () => {
        if (elements.footerHoverZone) {
            elements.footerHoverZone.addEventListener('mouseenter', () => {
                isHoveringFooterZone = true;
                updateHeaderFooterVisibility();
            });

            elements.footerHoverZone.addEventListener('mouseleave', () => {
                isHoveringFooterZone = false;
                updateHeaderFooterVisibility();
            });
        }

        if (elements.footer) {
            elements.footer.addEventListener('mouseenter', () => {
                isHoveringFooter = true;
                updateHeaderFooterVisibility();
            });

            elements.footer.addEventListener('mouseleave', () => {
                isHoveringFooter = false;
                updateHeaderFooterVisibility();
            });
        }
    };

    // ============================
    // CLICK EVENT HANDLERS
    // ============================
    const initClickEvents = () => {
        // Menu toggles
        if (elements.menuToggleLeft) {
            elements.menuToggleLeft.addEventListener('click', toggleMenu);
        }
        if (elements.menuToggleRight) {
            elements.menuToggleRight.addEventListener('click', toggleMenu);
        }
        if (elements.heroLogo) {
            elements.heroLogo.addEventListener('click', toggleMenu);
        }

        // Signup button to open modal
        if (elements.signupButton) {
            elements.signupButton.addEventListener("click", () => {
                openModal();
            });
        }

        // Shop button toggle
        const shopTitle = document.getElementById("shop-title");
        if (shopTitle) {
            shopTitle.addEventListener("click", () => {
                shopTitle.classList.toggle("clicked");
                shopTitle.textContent = shopTitle.classList.contains("clicked") ? "Coming Soon!" : "Shop";
            });
        }

        // External links
        if (elements.presaveMolly) {
            elements.presaveMolly.addEventListener("click", () => {
                window.open("https://labelmachine.lnk.to/GoodVibesOnly", "_blank");
            });
        }

        if (elements.artistMolly) {
            elements.artistMolly.style.cursor = 'pointer';
            elements.artistMolly.addEventListener('click', () => {
                window.location.href = "http://timelessrecords.nz/molly.html";
            });
        }

        // Modal triggers
        if (elements.signupButton) {
            elements.signupButton.addEventListener("click", openModal);
        }

        if (elements.greenRoomLink) {
            elements.greenRoomLink.addEventListener("click", (e) => {
                e.preventDefault();
                openModal();
            });
        }

        if (elements.aboutBtn) {
            elements.aboutBtn.addEventListener("click", () => {
                if (elements.aboutModal) {
                    elements.aboutModal.classList.add("active");
                }
            });
        }

        // Modal close buttons
        if (elements.closeBtn) {
            elements.closeBtn.addEventListener("click", () => closeModal(modal));
        }

        if (elements.aboutClose) {
            elements.aboutClose.addEventListener("click", () => closeModal(elements.aboutModal));
        }

        // Modal backdrop clicks
        if (modal) {
            window.addEventListener("click", handleModalClick(modal));
        }

        if (elements.aboutModal) {
            window.addEventListener("click", handleModalClick(elements.aboutModal));
        }
    };

    // ============================
    // MOBILE-SPECIFIC FUNCTIONALITY
    // ============================
    const initMobileSpecific = () => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            if (elements.heroSection && elements.heroLogo) {
                elements.heroSection.addEventListener('click', (e) => {
                    if (e.target !== elements.heroLogo) {
                        elements.heroSection.classList.add('bright');
                    }
                });

                window.addEventListener('scroll', () => {
                    if (window.scrollY > 10) {
                        elements.heroSection.classList.remove('bright');
                    }
                });
            }
        }
    };

    // ============================
    // EVENT LISTENERS
    // ============================
    const initEventListeners = () => {
        // Scroll events with requestAnimationFrame optimization
        window.addEventListener('scroll', requestAnimationFrameScroll);
        window.addEventListener('resize', requestAnimationFrameScroll);
    };

    // ============================
    // INITIALIZATION
    // ============================
    const init = () => {
        // Setup scroll containers
        ensureNoNestedScrolling();
        window.addEventListener('resize', ensureNoNestedScrolling);

        // Initialize all functionality
        initNavigation();
        initHeroSection();
        initIntersectionObserver();
        initHoverEvents();
        initClickEvents();
        initMobileSpecific();
        initEventListeners();

        // Initial visibility check
        updateHeaderFooterVisibility();
    };

    // Start the application
    init();
});