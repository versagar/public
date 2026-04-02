/*
   TWC Layout + Menu Loader (FINAL)
   - Builds correct absolute routes using ONLY "link" and JSON hierarchy
   - Works for unlimited nested submenus
   - First click opens submenu, second click navigates
   - Prepends /twc/ automatically
*/


//   let muted = false;
// const muteBtn = document.getElementById('muteBtn');
// muteBtn.addEventListener('click', () => {
//     muted ? unmutePage() : mutePage();
//     muteBtn.textContent = muted ? 'Mute': 'Unmute';
//     muted = !muted;
    
// });

const TWC_BASE = "/";
const LAYOUT_BASE = "/p8a6nna86/layouts";

// ---------------------------
// Load HEADER + FOOTER
// ---------------------------
async function twcLoadLayout() {
  try {
    const [h, f] = await Promise.all([
      fetch(`${LAYOUT_BASE}/physerheader.html`),
      fetch(`${LAYOUT_BASE}/physerfooter.html`)
    ]);

    if (h.ok) {
      document.body.insertAdjacentHTML("afterbegin", await h.text());
    }

    if (f.ok) {
      document.body.insertAdjacentHTML("beforeend", await f.text());
    }
  } catch (err) {
    console.error("Layout load failed:", err);
  }
}

// ---------------------------
// Build ROUTE PATH recursively
// ---------------------------
function buildRoutePath(ancestors, link) {
  // If link is empty or a hash
  if (!link || link === "#") return "#";

  // If link starts with http:// or https://, return as-is
  if (/^https?:\/\//i.test(link)) return link;

  // If link starts with "/", treat as absolute internal path
  if (link.startsWith("/")) return link;

  // Otherwise, build nested internal path
  return `${TWC_BASE}${[...ancestors, link].join("/")}`;
}

// ---------------------------
// MENU LOADER
// ---------------------------
async function twcLoadMenu() {
  try {
    const res = await fetch(`${LAYOUT_BASE}/physermenu.json`);
    if (!res.ok) {
      console.error("Menu missing");
      return;
    }

    const menu = await res.json();
    const target = document.getElementById("dynamic-menu");
    if (!target) return;

    target.innerHTML = "";

    function build(items, parentUL, ancestors) {
      items.forEach(item => {
        const li = document.createElement("li");

        const a = document.createElement("a");
        a.textContent = item.name;

        if (item.link && item.link.trim() !== "") {
          a.href = buildRoutePath(ancestors, item.link);
        } else {
          a.href = "#";
        }

        li.appendChild(a);

        if (item.submenu && item.submenu.length) {
          li.classList.add("has-submenu");
          const subUL = document.createElement("ul");
          subUL.classList.add("submenu");

          const nextAncestors = item.link
  ? (item.link.startsWith("/") 
      ? [item.link.replace(/^\//, '')] // absolute link becomes new base
      : [...ancestors, item.link])    // relative link appended
  : [...ancestors];

          build(item.submenu, subUL, nextAncestors);
          li.appendChild(subUL);
        }

        parentUL.appendChild(li);
      });
    }

    build(menu, target, []);

  } catch (err) {
    console.error("Menu load failed:", err);
  }
}

// ---------------------------
// Interaction: mobile + scroll
// ---------------------------
function twcEnableInteractions() {
  const toggle = document.getElementById("twc-menu-toggle");
  const nav = document.querySelector(".twc-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      //nav.classList.toggle("active");
const isOpen = nav.classList.toggle("active");
       toggle.textContent = isOpen ? "✕" : "☰";
    });
  }

  const header = document.querySelector(".twc-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 10);
    });
  }
}

// ---------------------------
// Submenu click behavior
// ---------------------------
function twcEnableSubmenuClicks() {
  document.querySelectorAll(".has-submenu > a").forEach(link => {
    link.addEventListener("click", e => {
      const li = link.parentElement;

      // First click opens submenu
      if (!li.classList.contains("open")) {
        e.preventDefault();
        li.classList.add("open");

        // Close sibling submenus
        const siblings = li.parentElement.querySelectorAll(".has-submenu.open");
        siblings.forEach(sib => {
          if (sib !== li) sib.classList.remove("open");
        });
      }
      // Second click follows the link naturally
    });
  });

  // Close all submenus when clicking outside
  document.addEventListener("click", e => {
    document.querySelectorAll(".has-submenu.open").forEach(li => {
      if (!li.contains(e.target)) {
        li.classList.remove("open");
      }
    });
  });
}

function loadTitle(show, id, excess = "") {
  const el = document.getElementById(id);
  if (!el) return;

  if (show === 1) {
    el.style.display = "block";
    el.textContent = document.title.replace(excess, "");
  } else {
    el.style.display = "none";
  }
}

// ---------------------------
// MAIN EXECUTION
// ---------------------------
document.addEventListener("DOMContentLoaded", async () => {
  await twcLoadLayout();

  // Ensure header.html loads before menu logic
  setTimeout(async () => {
    await twcLoadMenu();
    twcEnableInteractions();
    twcEnableSubmenuClicks();
    loadTitle(1, 'pageHeading', " - Physer: The Wise Craze");
  }, 100);
});
