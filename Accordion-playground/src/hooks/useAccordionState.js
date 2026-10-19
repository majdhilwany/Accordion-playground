import { useState, useEffect, useCallback } from "react";
import { nextOpenIds } from "../utils/accordionLogic.js";

const initial = (d) => (d === "none" ? [] : [Number(d)]);

export default function useAccordionState({ multiple, collapsible, defaultOpen }) {
  const [openIds, setOpenIds] = useState(() => initial(defaultOpen));

  // Changing "default open" opens that item without resetting the others.
  useEffect(() => {
    if (defaultOpen === "none") return;
    const id = Number(defaultOpen);
    setOpenIds((p) => (multiple ? Array.from(new Set([...p, id])) : [id]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpen]);

  // Switching to single mode keeps only the first open item.
  useEffect(() => {
    if (!multiple) setOpenIds((p) => p.slice(0, 1));
  }, [multiple]);

  const toggle = useCallback(
    (id) => setOpenIds((p) => nextOpenIds(p, id, { multiple, collapsible })),
    [multiple, collapsible]
  );
  const reset = useCallback((d) => setOpenIds(initial(d)), []);
  return { openIds, toggle, setOpenIds, reset };
}
