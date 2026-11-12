// Theme toggle and current-section highlighting.
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  function paintToggle() {
    if (!toggle) return;
    const dark = root.dataset.theme === "dark";
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.querySelector("span").textContent = dark ? "Light mode" : "Dark mode";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      paintToggle();
    });
    paintToggle();
  }

  // highlight the sidebar link for the section in view
  const links = new Map(
    [...document.querySelectorAll('.side-nav a[href^="#"]')].map((a) => [a.hash.slice(1), a])
  );
  const sections = [...links.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const visible = new Set();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
      const current = sections.find((s) => visible.has(s.id));
      links.forEach((a, id) => {
        if (current && id === current.id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-20% 0px -60% 0px" }
  );
  sections.forEach((s) => io.observe(s));
})();
