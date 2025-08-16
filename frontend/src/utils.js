// Utility functions for Author/Admin dashboard

export function getTagColor(tag) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const pastelColors = [
    '#FFD6E0', // pink
    '#D6F5FF', // blue
    '#FFF5D6', // yellow
    '#D6FFD6', // green
    '#F5D6FF', // purple
    '#FFEFD6', // orange
    '#D6FFF5', // teal
    '#F5FFD6', // lime
    '#FFD6F5', // magenta
    '#D6D6FF', // lavender
  ];
  const idx = Math.abs(hash) % pastelColors.length;
  return pastelColors[idx];
}
