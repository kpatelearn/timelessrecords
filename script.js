document.addEventListener("DOMContentLoaded", function() {
  // Get elements
  let menuLeft = document.getElementById("side-menu-left");
  let menuRight = document.getElementById("side-menu-right");
  let menuBottom = document.getElementById("menu-bottom");

  let hamburgerLeft = document.querySelector(".hamburger.left");
  let hamburgerRight = document.querySelector(".hamburger.right");
  let hamburgerBottom = document.querySelector(".hero-hamburger");

  // Toggle function for side menus
  function toggleMenu(menu) {
      if (menu.style.width === "250px") {
          menu.style.width = "0";
      } else {
          menu.style.width = "250px";
      }
  }

  // Toggle function for bottom menu
  function toggleBottomMenu() {
      let currentHeight = window.getComputedStyle(menuBottom).height;
      if (currentHeight === "200px") {
          menuBottom.style.height = "0";
      } else {
          menuBottom.style.height = "200px";
      }
  }

  // Attach event listeners to hamburgers
  if (hamburgerLeft) {
      hamburgerLeft.addEventListener("click", function() {
          toggleMenu(menuLeft);
      });
  }

  if (hamburgerRight) {
      hamburgerRight.addEventListener("click", function() {
          toggleMenu(menuRight);
      });
  }


  // Close menus when clicking inside them
  menuLeft.addEventListener("click", function() {
      menuLeft.style.width = "0";
  });

  menuRight.addEventListener("click", function() {
      menuRight.style.width = "0";
  });


  console.log("script.js loaded and event listeners set up!");
});

// Green Room modal logic
document.addEventListener("DOMContentLoaded", function () {
    const greenRoomBtn = document.getElementById("greenRoomLink");
    const modal = document.getElementById("greenRoomModal");
    const closeBtn = document.querySelector(".close-btn");
  
    if (greenRoomBtn && modal && closeBtn) {
      greenRoomBtn.addEventListener("click", () => {
        modal.style.display = "block";
      });
  
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
  
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    }
  });
  