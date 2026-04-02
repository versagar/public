
// CSV parser for a single line (handles quotes)

async function createForm(containerId, txtFile) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let text;
  try {
    const response = await fetch(txtFile);
    text = await response.text();
  } catch (err) {
    console.error("Failed to fetch file:", err);
    return;
  }

  const lines = text.split("\n").map(l => l.trim()).filter(l => l);
  lines.shift();

  lines.forEach(line => {
    const [name, label, placeholder, required] = parseCSVLine(line);

    // Label
    const lbl = document.createElement("label");
    lbl.setAttribute("for", name);
    lbl.textContent = label + (required == 'nr' ? " (optional)" : "");
    container.appendChild(lbl);

    // Input
    const input = document.createElement("input");
    input.type = "text";
    input.id = name;
    input.name = name;
    input.placeholder = placeholder
    if (required!=='nr') input.required = true;
    container.appendChild(input);
  });
}

async function createAdvancedForm(containerId, txtFile, cl_classes, ci_classes) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let text;
  try {
    const response = await fetch(txtFile);
    text = await response.text();
  } catch (err) {
    console.error("Failed to fetch file:", err);
    return;
  }

  const lines = text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(Boolean);

  // remove header
  lines.shift();

  lines.forEach(line => {
    const [
      name,
      label,
      type = "text",
      placeholder = "",
      required,
      options,
      lclasses,
      iclasses,
      min,
      max,
      pattern
    ] = parseCSVLine(line);

    // const field = document.createElement("div");
    // field.className = "form-field";

    // Label (except checkbox handled later)
    
      const lbl = document.createElement("label");
      lbl.htmlFor = name;
      lbl.className = lclasses ? lclasses : cl_classes;
      lbl.innerHTML = label + (required === "nr" ? " (optional)" : "");
      container.appendChild(lbl);
    

    let input;

    switch (type) {
      case "textarea":
        input = document.createElement("textarea");
        input.placeholder = placeholder;
        break;

      case "select":
        input = document.createElement("select");
        if (options) {
          options.split("|").forEach(opt => {
            const o = document.createElement("option");
            o.value = opt;
            o.textContent = opt;
            input.appendChild(o);
          });
        }
        break;

      case "checkbox":
        input = document.createElement("input");
        input.type = "checkbox";
        break;

      default:
        input = document.createElement("input");
        input.type = type;
        input.placeholder = placeholder;
    }

    // Common attributes
    input.id = containerId+name;
    input.name = name;
    input.className = iclasses ? iclasses : ci_classes;

    if (required !== "nr") input.required = true;
    if (min) input.min = min;
    if (max) input.max = max;
    if (pattern) input.pattern = pattern;

    container.appendChild(input);
  });
}
