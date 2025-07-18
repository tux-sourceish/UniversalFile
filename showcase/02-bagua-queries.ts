/**
 * Bagua Metadata Queries
 * Harness the power of I Ching-based categorization
 */

// Create items with different essences
doc.addItem({
  type: UniversalDocument.ItemType.DIALOG,
  position: { x: 0, y: 0, z: 0 },
  content: { message: "User input" },
  bagua_descriptor: UniversalDocument.BAGUA.DUI | UniversalDocument.BAGUA.ZHEN
});

// Query interactive items (DUI = Lake/Interactive)
const interactive = doc.queryByBagua({ DUI: true });
console.log(`Found ${interactive.length} interactive items`);

// Query system items (TAIJI = Unity)
const system = doc.queryByBagua({ TAIJI: true });