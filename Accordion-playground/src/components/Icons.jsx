// Three trigger icons. CSS rotates them when the item is open.
export default function Icon({ name }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", className: `icon icon-${name}` };
  if (name === "plus")
    return (<svg {...common}><line className="h" x1="5" y1="12" x2="19" y2="12" /><line className="v" x1="12" y1="5" x2="12" y2="19" /></svg>);
  if (name === "arrow")
    return (<svg {...common}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg>);
  return (<svg {...common}><polyline points="6 9 12 15 18 9" /></svg>);
}
