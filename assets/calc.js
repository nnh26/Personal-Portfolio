// Small calculator. Any element with [data-calc] becomes one.
(function () {
  const MAX_DIGITS = 12;
  const SYMBOLS = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  function format(n) {
    if (!Number.isFinite(n)) return "Error";
    const rounded = parseFloat(n.toPrecision(12));
    let s = String(rounded);
    if (s.replace(/[-.]/g, "").length > MAX_DIGITS) s = rounded.toExponential(6);
    return s;
  }

  function compute(a, op, b) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? null : a / b;
    }
    return b;
  }

  function create(root) {
    const valueEl = root.querySelector(".calc-value");
    const pendingEl = root.querySelector(".calc-pending");
    let display = "0";
    let acc = null;      // stored left-hand value
    let op = null;       // pending operator
    let fresh = true;    // next digit starts a new number

    function render() {
      valueEl.textContent = display;
      pendingEl.textContent = op && acc !== null ? `${format(acc)} ${SYMBOLS[op]}` : "";
      root.querySelectorAll(".op").forEach((b) =>
        b.classList.toggle("is-active", fresh && b.dataset.key === op)
      );
    }

    function reset() { display = "0"; acc = null; op = null; fresh = true; }

    function press(key) {
      if (/^\d$/.test(key)) {
        if (fresh || display === "0") display = key;
        else if (display.replace(/[-.]/g, "").length < MAX_DIGITS) display += key;
        fresh = false;
      } else if (key === ".") {
        if (fresh) { display = "0."; fresh = false; }
        else if (!display.includes(".")) display += ".";
      } else if (key in SYMBOLS) {
        const current = parseFloat(display);
        if (acc !== null && op && !fresh) {
          const result = compute(acc, op, current);
          if (result === null) { reset(); display = "Can't divide by 0"; render(); return; }
          acc = result;
          display = format(result);
        } else if (acc === null) {
          acc = current;
        }
        op = key;
        fresh = true;
      } else if (key === "=") {
        if (op === null || acc === null) return;
        const result = compute(acc, op, parseFloat(display));
        reset();
        display = result === null ? "Can't divide by 0" : format(result);
      } else if (key === "back") {
        if (fresh) return;
        display = display.length > 1 ? display.slice(0, -1) : "0";
        if (display === "-") display = "0";
      } else if (key === "clear") {
        reset();
      } else if (key === "sign") {
        if (display !== "0" && !isNaN(parseFloat(display))) {
          display = display.startsWith("-") ? display.slice(1) : "-" + display;
        }
      }
      render();
    }

    root.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-key]");
      if (btn) press(btn.dataset.key);
    });

    const keyTarget = root.hasAttribute("data-calc-global") ? document : root;
    keyTarget.addEventListener("keydown", (e) => {
      const map = { Enter: "=", "=": "=", Backspace: "back", Escape: "clear", Delete: "clear", x: "*", X: "*" };
      const key = map[e.key] || e.key;
      if (/^[\d.+\-*/=]$/.test(key) || ["back", "clear"].includes(key)) {
        // let Enter/Space activate a focused button normally
        if ((e.key === "Enter" || e.key === " ") && e.target.matches("button")) return;
        e.preventDefault();
        press(key);
      }
    });

    render();
  }

  document.querySelectorAll("[data-calc]").forEach(create);
})();
