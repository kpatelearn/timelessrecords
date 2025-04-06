document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const heroSection = document.getElementById("home");
    const heroImage = heroSection ? heroSection.querySelector(".hero-content img") : null;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const footerHoverZone = document.getElementById('footer-hover-zone');
    const heroLogo = document.getElementById("heroLogo");
    const greenRoomLink = document.getElementById("greenRoomLink");
    const modal = document.getElementById("greenRoomModal");
    const closeBtn = modal ? modal.querySelector(".close-btn") : null;


    let lastScrollTop = 0;
    let isHoveringFooterZone = false;
    let isHoveringFooter = false;
    let ticking = false;
  
    // Make sure all scroll containers are properly configured on page load
    function ensureNoNestedScrolling() {
      // Force the body to be the only scroll container
      document.body.style.overflowY = 'auto';
      document.body.style.height = 'auto';
      
      // Make sure no other elements become scroll containers
      const potentialScrollContainers = [
        document.documentElement,
        document.getElementById('page-content'),
        ...document.querySelectorAll('.page-section')
      ];
      
      potentialScrollContainers.forEach(el => {
        if (el) {
          el.style.overflow = 'visible';
          el.style.overflowX = 'visible';
          el.style.overflowY = 'visible';
        }
      });
    }
  
    // Call immediately and on window resize
    ensureNoNestedScrolling();
    window.addEventListener('resize', ensureNoNestedScrolling);
  
    // Smooth scroll navigation with improved behavior
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
       // e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          // Use scrollIntoView with behavior: 'smooth' for a standard smooth scroll
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    const presaveMolly = document.getElementById("presaveMolly");

if (presaveMolly) {
  presaveMolly.addEventListener("click", () => {
    window.open("https://labelmachine.lnk.to/GoodVibesOnly", "_blank");
  });
}


    const signupButton = document.getElementById("signupButton");
if (signupButton) {
  signupButton.addEventListener("click", () => {
    openModal();
  });
}

  
    // Green Room Modal functionality
    const openModal = () => {
      if (modal) {
        modal.classList.add("active");
      }
    };
  
    if (greenRoomLink) {
      greenRoomLink.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    }
  
    if (heroLogo) {
      heroLogo.addEventListener("click", () => {
        openModal();
      });
    }
  
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
      });
    }
  
    if (modal) {
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.classList.remove("active");
        }
      });
    }
  
    // Hero image interactions
    if (heroSection) {
      heroSection.addEventListener("mouseenter", () => {
        if (heroImage) heroImage.style.opacity = 1;
        heroSection.classList.remove('bright');
      });
  
      heroSection.addEventListener("mouseleave", () => {
        if (heroImage) heroImage.style.opacity = 0;
        heroSection.classList.add('bright');
      });
  
      // For mobile devices
      heroSection.addEventListener('click', (e) => {
        if (e.target !== heroLogo) {
          heroSection.classList.add('bright');
        }
      });
    }
  
    // Improved intersection observer with lower threshold for smoother transitions
    const sections = document.querySelectorAll('.page-section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Make the threshold lower for smoother transitions
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          entry.target.classList.add('visible');
        } else if (!entry.isIntersecting && entry.intersectionRatio < 0.12) {
          // Only remove visible class when it's clearly out of view
          entry.target.classList.remove('visible');
        }
      });
    }, { 
      threshold: [0.05, 0.1, 0.5], 
      rootMargin: '0px'
    }); 
    
    sections.forEach(section => observer.observe(section));  

  
    // More efficient header/footer visibility management using requestAnimationFrame
    function updateHeaderFooterVisibility() {
      const currentScroll = window.scrollY;
      const scrollingDown = currentScroll > lastScrollTop;
  
      // Header logic - simplified
      if (scrollingDown && currentScroll > 50) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
  
      // Footer logic - simplified
      const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
      if (nearBottom || isHoveringFooter || isHoveringFooterZone) {
        footer.classList.remove('hidden');
      } else {
        footer.classList.add('hidden');
      }
  
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    }
  
    // Footer hover events
    if (footerHoverZone) {
      footerHoverZone.addEventListener('mouseenter', () => {
        isHoveringFooterZone = true;
        updateHeaderFooterVisibility();
      });
  
      footerHoverZone.addEventListener('mouseleave', () => {
        isHoveringFooterZone = false;
        updateHeaderFooterVisibility();
      });
    }
  
    if (footer) {
      footer.addEventListener('mouseenter', () => {
        isHoveringFooter = true;
        updateHeaderFooterVisibility();
      });
  
      footer.addEventListener('mouseleave', () => {
        isHoveringFooter = false;
        updateHeaderFooterVisibility();
      });
    }

    const artistMolly = document.getElementById("artistMolly");
    artistMolly.style.cursor = 'pointer';
    artistMolly.addEventListener('click', openMolly);
    function openMolly() {
      window.location.href = "http://timelessrecords.nz/molly.html"
    }
  
    // Mobile-specific adjustments
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (heroSection && heroLogo) {
        heroSection.addEventListener('click', (e) => {
          if (e.target !== heroLogo) {
            heroSection.classList.add('bright');
          }
        });
  
        window.addEventListener('scroll', () => {
          if (window.scrollY > 10) {
            heroSection.classList.remove('bright');
          }
        });
      }
    }
  
    // RequestAnimationFrame for scroll events to improve performance
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateHeaderFooterVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });
  
    // Event listeners
    window.addEventListener('resize', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateHeaderFooterVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

    const shopTitle = document.getElementById('shop-title');

    shopTitle.addEventListener('click', function () {
      if (shopTitle.textContent === 'Shop') {
        shopTitle.textContent = 'Coming Soon';
        shopTitle.classList.add('clicked');
      } else {
        shopTitle.textContent = 'Shop';
        shopTitle.classList.remove('clicked');
      }
    });
    
    const aboutBtn = document.getElementById("aboutMoreBtn");
const aboutModal = document.getElementById("aboutModal");
const aboutClose = aboutModal ? aboutModal.querySelector(".close-btn") : null;

if (aboutBtn) {
  aboutBtn.addEventListener("click", () => {
    aboutModal.classList.add("active");
  });
}

if (aboutClose) {
  aboutClose.addEventListener("click", () => {
    aboutModal.classList.remove("active");
  });
}

if (aboutModal) {
  window.addEventListener("click", (e) => {
    if (e.target === aboutModal) {
      aboutModal.classList.remove("active");
    }
  });
}

  
    // Initial check
    updateHeaderFooterVisibility();
  });