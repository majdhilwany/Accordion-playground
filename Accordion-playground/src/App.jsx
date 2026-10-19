import { useState, useEffect, useMemo } from "react";
import { faqItems } from "./data/faqData.js";
import useAccordionState from "./hooks/useAccordionState.js";
import { generateLines } from "./utils/generateCode.js";
import Accordion from "./components/Accordion.jsx";
import PropsPanel from "./components/PropsPanel.jsx";
import CodePreview from "./components/CodePreview.jsx";

const DEFAULTS = { variant: "bordered", icon: "chevron", iconPosition: "end", multiple: false, collapsible: true, defaultOpen: "1", disabledItem: true, loading: false };

export default function App() {
  const [config, setConfig] = useState(DEFAULTS);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem("theme") || "light"; } catch { return "light"; } });
  const acc = useAccordionState(config);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);

  const set = (key, value) => setConfig((c) => ({ ...c, [key]: value }));
  const lines = useMemo(() => generateLines(config), [config]);
  const disabledIds = config.disabledItem ? [5] : [];
  const reset = () => { setConfig(DEFAULTS); setQuery(""); acc.reset(DEFAULTS.defaultOpen); };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">React · Vite</p>
          <h1>Accordion Playground</h1>
          <p className="lead">Tune the props on the right and watch the accordion and its JSX update live.</p>
        </div>
        <button type="button" className="btn theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
          {theme === "light" ? "☾ Dark" : "☀ Light"}
        </button>
      </header>

      <div className="workspace">
        <section className="card preview" aria-label="Live preview">
          <div className="preview-head">
            <h2>Live preview</h2>
            {config.multiple && !config.loading && (
              <span className="actions">
                <button type="button" className="btn ghost" onClick={() => acc.setOpenIds(faqItems.filter((i) => !disabledIds.includes(i.id)).map((i) => i.id))}>Expand all</button>
                <button type="button" className="btn ghost" onClick={() => acc.setOpenIds([])}>Collapse all</button>
              </span>
            )}
          </div>
          <input className="search" type="search" placeholder="Search questions…" aria-label="Search questions" value={query} disabled={config.loading} onChange={(e) => setQuery(e.target.value)} />
          <Accordion items={faqItems} {...config} openIds={acc.openIds} disabledIds={disabledIds} onToggle={acc.toggle} query={query} />
        </section>
        <PropsPanel config={config} set={set} onReset={reset} />
      </div>

      <CodePreview lines={lines} />
      <footer className="footer">Built with React and Vite</footer>
    </div>
  );
}
