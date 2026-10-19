import Icon from "./Icons.jsx";

function Highlight({ text, query }) {
  if (!query) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.split(new RegExp(`(${safe})`, "gi")).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p));
}

function Item({ item, open, disabled, icon, iconPosition, query, onToggle }) {
  // Arrow keys / Home / End move focus between enabled triggers.
  function onKeyDown(e) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const all = [...e.currentTarget.closest(".acc").querySelectorAll(".acc-trigger:not(:disabled)")];
    const i = all.indexOf(e.currentTarget);
    const n = { ArrowDown: (i + 1) % all.length, ArrowUp: (i - 1 + all.length) % all.length, Home: 0, End: all.length - 1 }[e.key];
    all[n].focus();
  }
  return (
    <div className={`acc-item${open ? " open" : ""}${disabled ? " is-disabled" : ""}`}>
      <h3>
        <button
          id={`trigger-${item.id}`} type="button" className={`acc-trigger icon-${iconPosition}`}
          aria-expanded={open} aria-controls={`panel-${item.id}`} disabled={disabled}
          onClick={onToggle} onKeyDown={onKeyDown}
        >
          <span className="acc-icon"><Icon name={icon} /></span>
          <span className="acc-q"><Highlight text={item.question} query={query} /></span>
          {disabled && <span className="badge">Disabled</span>}
        </button>
      </h3>
      <div id={`panel-${item.id}`} role="region" aria-labelledby={`trigger-${item.id}`} className="acc-panel">
        <div className="acc-panel-inner"><p><Highlight text={item.answer} query={query} /></p></div>
      </div>
    </div>
  );
}

export default function Accordion({ items, variant = "bordered", icon = "chevron", iconPosition = "end", openIds, disabledIds = [], onToggle, query = "", loading = false }) {
  if (loading)
    return (
      <div className={`acc acc-${variant}`} aria-busy="true" aria-label="Loading questions">
        {[0, 1, 2, 3, 4].map((i) => (<div key={i} className="acc-item skeleton"><span /></div>))}
      </div>
    );
  const q = query.trim().toLowerCase();
  const list = q ? items.filter((i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)) : items;
  if (list.length === 0)
    return (<div className="empty" role="status"><strong>No results for “{query}”</strong><p>Try a different word.</p></div>);
  return (
    <div className={`acc acc-${variant}`}>
      {list.map((item) => (
        <Item key={item.id} item={item} open={openIds.includes(item.id)} disabled={disabledIds.includes(item.id)}
          icon={icon} iconPosition={iconPosition} query={q ? query.trim() : ""} onToggle={() => onToggle(item.id)} />
      ))}
    </div>
  );
}
