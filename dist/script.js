(function () {
  const root = document.documentElement;
  const storedTheme = (() => {
    try {
      const value = localStorage.getItem("theme");
      return value === "light" || value === "dark" ? value : null;
    } catch (_) {
      return null;
    }
  })();

  const initialTheme = storedTheme || root.getAttribute("data-theme") || "dark";
  root.setAttribute("data-theme", initialTheme);

  const themeToggle = document.getElementById("theme-toggle");
  const syncThemeToggle = (theme) => {
    if (!themeToggle) return;
    const isLight = theme === "light";
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.setAttribute("title", isLight ? "Light theme" : "Dark theme");
    themeToggle.setAttribute("aria-pressed", String(isLight));
  };

  syncThemeToggle(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (_) {
        // Theme still applies for this page even if storage is unavailable.
      }
      syncThemeToggle(next);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }
})();