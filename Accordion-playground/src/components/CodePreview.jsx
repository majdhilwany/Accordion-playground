import { useState } from "react";
import { toPlainText } from "../utils/generateCode.js";

export default function CodePreview({ lines }) {
  const [status, setStatus] = useState("");

  async function copy() {
    const text = toPlainText(lines);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied!");
    } catch {
      // Fallback for browsers without the Clipboard API.
      const ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      setStatus(document.execCommand("copy") ? "Copied!" : "Copy failed, select the text manually");
      document.body.removeChild(ta);
    }
    setTimeout(() => setStatus(""), 2000);
  }

  return (
    <section className="code" aria-label="Generated JSX">
      <div className="code-head">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="file">Generated JSX</span>
        <button type="button" className="btn copy" onClick={copy}>Copy code</button>
      </div>
      <pre><code>
        {lines.map((l, i) => (<div key={i} className="line">{l.length ? l.map((s, j) => <span key={j} className={`tk-${s.type}`}>{s.value}</span>) : "\u00A0"}</div>))}
      </code></pre>
      <span className="sr-only" role="status" aria-live="polite">{status}</span>
      {status && <span className="toast" aria-hidden="true">{status}</span>}
    </section>
  );
}
