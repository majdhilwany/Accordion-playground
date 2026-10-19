function Segmented({ label, value, options, onChange }) {
  return (
    <div className="field">
      <span className="label">{label}</span>
      <div className="segmented" role="group" aria-label={label}>
        {options.map(([v, text]) => (
          <button key={v} type="button" className={value === v ? "seg active" : "seg"} aria-pressed={value === v} onClick={() => onChange(v)}>{text}</button>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, hint, checked, onChange }) {
  return (
    <label className="toggle">
      <span><span className="label">{label}</span><small>{hint}</small></span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="track" aria-hidden="true"><span className="thumb" /></span>
    </label>
  );
}

export default function PropsPanel({ config, set, onReset }) {
  return (
    <aside className="panel card" aria-label="Props control panel">
      <div className="panel-head"><h2>Props</h2><button type="button" className="btn ghost" onClick={onReset}>Reset to defaults</button></div>
      <Segmented label="variant" value={config.variant} onChange={(v) => set("variant", v)} options={[["bordered", "Bordered"], ["separated", "Separated"], ["minimal", "Minimal"]]} />
      <Segmented label="icon" value={config.icon} onChange={(v) => set("icon", v)} options={[["chevron", "Chevron"], ["plus", "Plus"], ["arrow", "Arrow"]]} />
      <Segmented label="iconPosition" value={config.iconPosition} onChange={(v) => set("iconPosition", v)} options={[["start", "Start"], ["end", "End"]]} />
      <div className="field">
        <label className="label" htmlFor="defaultOpen">defaultOpen</label>
        <select id="defaultOpen" value={config.defaultOpen} onChange={(e) => set("defaultOpen", e.target.value)}>
          <option value="none">None</option>
          <option value="1">Item 1</option><option value="2">Item 2</option><option value="3">Item 3</option><option value="4">Item 4</option>
        </select>
      </div>
      <Toggle label="multiple" hint="Allow several items open" checked={config.multiple} onChange={(v) => set("multiple", v)} />
      <Toggle label="collapsible" hint="Allow closing the open item" checked={config.collapsible} onChange={(v) => set("collapsible", v)} />
      <Toggle label="disabled item" hint="Disable item 5" checked={config.disabledItem} onChange={(v) => set("disabledItem", v)} />
      <Toggle label="loading" hint="Show skeleton rows" checked={config.loading} onChange={(v) => set("loading", v)} />
    </aside>
  );
}
