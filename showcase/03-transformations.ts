/**
 * Transformation History
 * Track how your documents evolve over time
 */

const item = doc.addItem({...});

// Record a transformation
item.transformation_history.push({
  id: crypto.randomUUID(),
  timestamp: Date.now(),
  verb: "refined",
  agent: "editor:vscode",
  description: "Clarified main concept"
});

// Query transformation history
const recentChanges = doc.allItems
  .flatMap(i => i.transformation_history)
  .filter(t => t.timestamp > Date.now() - 3600000)
  .sort((a, b) => b.timestamp - a.timestamp);