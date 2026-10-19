// Pure open/close rules, no React inside, so they are easy to test.
export function nextOpenIds(openIds, id, { multiple, collapsible }) {
  const isOpen = openIds.includes(id);
  if (isOpen) {
    const lastOne = multiple ? openIds.length === 1 : true;
    if (!collapsible && lastOne) return openIds; // must keep one open
    return openIds.filter((x) => x !== id);
  }
  return multiple ? [...openIds, id] : [id];
}
