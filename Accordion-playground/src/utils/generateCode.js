// One source of truth: lines of colored segments. The plain text for the
// "Copy" button is built from the very same segments, so they never differ.
const t = (type, value) => ({ type, value });

export function generateLines(c) {
  const attr = (name, val) => [t("sp", "  "), t("attr", name), t("p", "="), t("str", `"${val}"`)];
  const lines = [
    [t("kw", "import"), t("p", " { "), t("cmp", "Accordion"), t("p", " } "), t("kw", "from"), t("str", ' "./components/Accordion"'), t("p", ";")],
    [],
    [t("p", "<"), t("tag", "Accordion")],
    [t("sp", "  "), t("attr", "items"), t("p", "={"), t("cmp", "faqItems"), t("p", "}")],
    attr("variant", c.variant),
    attr("icon", c.icon),
    attr("iconPosition", c.iconPosition),
  ];
  if (c.multiple) lines.push([t("sp", "  "), t("attr", "multiple")]);
  if (c.collapsible) lines.push([t("sp", "  "), t("attr", "collapsible")]);
  if (c.defaultOpen !== "none") lines.push(attr("defaultOpen", c.defaultOpen));
  if (c.disabledItem) lines.push([t("sp", "  "), t("attr", "disabledIds"), t("p", "={["), t("num", "5"), t("p", "]}")]);
  if (c.loading) lines.push([t("sp", "  "), t("attr", "loading")]);
  lines.push([t("p", "/>")]);
  return lines;
}

export const toPlainText = (lines) => lines.map((l) => l.map((s) => s.value).join("")).join("\n");
