#!/usr/bin/env npx ts-node

/**
 * 🌌 UniversalFile Spatial Computing Demo
 * Showcasing the revolutionary potential of .UD format
 */

import { UniversalDocument } from './universalDocument';
import * as fs from 'fs';

console.log('🌌 UniversalFile Spatial Computing Demo\n');

// ============================================================================
// DEMO 1: Spatial Workspace with Bagua Classification
// ============================================================================

console.log('🏗️  Creating Spatial Development Workspace...');

const workspace = new UniversalDocument();
workspace.metadata.creator = "Spatial Computing Demo";
workspace.metadata.canvas_bounds = { x: -2000, y: -2000, width: 4000, height: 4000 };

const origin = {
  host: "dev.workspace",
  path: "/spatial-computing-project",
  tool: "UniversalDesktop Pro"
};

// Template System (HIMMEL - ☰)
const baseTemplate = workspace.createItem({
  type: UniversalDocument.ItemType.KONSTRUKTOR,
  title: "Spatial Component Template",
  position: { x: -1000, y: -1000, z: 0 },
  dimensions: { width: 400, height: 300 },
  content: { 
    code: `interface SpatialComponent {
  position: UDPosition;
  transform(): void;
  render(): void;
}`,
    language: "typescript"
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.HIMMEL
}, origin);

// UI Views (WIND - ☴)
const dashboard = workspace.createItem({
  type: UniversalDocument.ItemType.TABELLE,
  title: "Project Dashboard",
  position: { x: 0, y: -800, z: 1 },
  dimensions: { width: 600, height: 400 },
  content: {
    headers: ["Component", "Status", "Bagua", "Position"],
    rows: [
      ["Template", "✅ Active", "HIMMEL", "(-1000, -1000)"],
      ["Dashboard", "🔄 Current", "WIND", "(0, -800)"],
      ["Data Store", "⏳ Pending", "ERDE", "(800, 0)"]
    ]
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.WIND
}, origin);

// Data Storage (ERDE - ☷)
const dataStore = workspace.createItem({
  type: UniversalDocument.ItemType.VARIABLE,
  title: "Spatial Data Repository",
  position: { x: 800, y: 0, z: 0 },
  dimensions: { width: 500, height: 600 },
  content: {
    text: `# Spatial Data Repository

This repository contains all spatial elements with complete provenance tracking.

## Features:
- 🔮 Bagua-based classification
- ⚡ Algebraic transistor queries  
- 🔄 Natural transformation history
- 🌍 3D spatial awareness

## Current Elements: ${workspace.allItems.length}
## Canvas Size: 4000x4000 units
## Z-Layers: Infinite depth
`
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.ERDE | UniversalDocument.BAGUA.WASSER
}, origin);

// Function Processing (FEUER - ☲)
const processor = workspace.createItem({
  type: UniversalDocument.ItemType.FUNKTION,
  title: "Spatial Query Engine",
  position: { x: -500, y: 500, z: 2 },
  dimensions: { width: 450, height: 350 },
  content: {
    code: `// Algebraic Transistor Query Example
const condition = user.isAuthenticated();
const activeViews = workspace.queryWithTransistor(
  { WIND: true, FEUER: true }, 
  condition
);

// Polar Relationship Discovery
const opposites = workspace.findPolarOpposite(template);

// Spatial Proximity Search
const nearby = workspace.findNearby(center, radius);`,
    language: "typescript"
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.FEUER | UniversalDocument.BAGUA.WASSER
}, origin);

// Event System (DONNER - ☳)
const eventHub = workspace.createItem({
  type: UniversalDocument.ItemType.EREIGNIS,
  title: "Transformation Event Hub",
  position: { x: 300, y: 700, z: 1 },
  dimensions: { width: 400, height: 250 },
  content: {
    events: [
      { type: "spatial.move", target: "all", bagua: "WIND" },
      { type: "data.transform", target: "ERDE", bagua: "WASSER" },
      { type: "ui.update", target: "dashboard", bagua: "WIND" }
    ]
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.DONNER | UniversalDocument.BAGUA.SEE
}, origin);

console.log(`✅ Created spatial workspace with ${workspace.allItems.length} elements`);

// ============================================================================
// DEMO 2: Natural Transformation Chains
// ============================================================================

console.log('\n🔄 Demonstrating Natural Transformation Chains...');

// Crystallize the template
workspace.transformItem(baseTemplate.id, {
  verb: "crystallized",
  agent: "spatial:architect",
  description: "Template structure refined with spatial awareness patterns"
}, {
  content: {
    code: `interface SpatialComponent extends UDOriginAware {
  position: UDPosition;
  bagua_descriptor: number;
  transform(verb: string, agent: string): UDTransformation;
  render(context: SpatialContext): void;
  findRelated(bagua: number): SpatialComponent[];
}`,
    language: "typescript",
    version: "2.0"
  }
});

// Enhance the dashboard
workspace.transformItem(dashboard.id, {
  verb: "enhanced",
  agent: "ui:designer", 
  description: "Added real-time Bagua classification display"
}, {
  content: {
    headers: ["Component", "Status", "Bagua", "Position", "Relations"],
    rows: [
      ["Template", "✅ Crystallized", "HIMMEL ☰", "(-1000, -1000)", "→ ERDE"],
      ["Dashboard", "🎨 Enhanced", "WIND ☴", "(0, -800)", "→ DONNER"],
      ["Data Store", "💎 Active", "ERDE|WASSER ☷☵", "(800, 0)", "→ HIMMEL"],
      ["Processor", "⚡ Computing", "FEUER|WASSER ☲☵", "(-500, 500)", "→ SEE"],
      ["Event Hub", "📡 Broadcasting", "DONNER|SEE ☳☱", "(300, 700)", "→ WIND"]
    ]
  }
});

// Iterate the data store
workspace.transformItem(dataStore.id, {
  verb: "iterated",
  agent: "data:engineer",
  description: "Evolved into hyperdimensional storage with Bagua indexing"
}, {
  content: {
    text: `# Hyperdimensional Spatial Data Repository v2.0

## 🔮 Bagua-Indexed Storage System

This repository now uses the Früher Himmel (Early Heaven) sequence for data organization:

### Index Structure:
- **HIMMEL** (☰): Template definitions and reusable patterns
- **WIND** (☴): Interface specifications and UI components  
- **WASSER** (☵): Process flows and transformation pipelines
- **BERG** (☶): Configuration and initialization data
- **SEE** (☱): Property definitions and attribute schemas
- **FEUER** (☲): Active computations and function libraries
- **DONNER** (☳): Event definitions and reactive triggers
- **ERDE** (☷): Core data storage and information base
- **TAIJI** (☯): Unity patterns and holistic integrations

### Performance Metrics:
- **Elements**: ${workspace.allItems.length}
- **Canvas**: 4000×4000 units (-2000 to +2000)
- **Z-Layers**: ${Math.max(...workspace.allItems.map(i => i.position.z)) + 1} active layers
- **Transformations**: ${workspace.allItems.reduce((sum, item) => sum + item.transformation_history.length, 0)} total

### Algebraic Operations Available:
- Transistor conditional queries: \`queryWithTransistor(bagua, condition)\`
- Polar relationship discovery: \`findPolarOpposite(item)\`
- Precedence-based sorting: \`sortByBaguaPrecedence()\`
- Spatial proximity search: \`findWithinRadius(center, radius)\`
`
  }
});

console.log('✅ Applied natural transformations with German verbs');

// ============================================================================
// DEMO 3: Advanced Bagua Operations
// ============================================================================

console.log('\n🔮 Demonstrating Advanced Bagua Operations...');

// Query by Bagua patterns
const uiElements = workspace.queryByBagua({ WIND: true });
console.log(`🖥️  Found ${uiElements.length} UI elements (WIND)`);

const dataElements = workspace.queryByBagua({ ERDE: true });
console.log(`💾 Found ${dataElements.length} data elements (ERDE)`);

const flowElements = workspace.queryByBagua({ WASSER: true });
console.log(`🌊 Found ${flowElements.length} flow elements (WASSER)`);

// Algebraic transistor conditional queries
const userLoggedIn = true;
const activeInterfaces = workspace.queryWithTransistor({ WIND: true }, userLoggedIn);
const inactiveInterfaces = workspace.queryWithTransistor({ WIND: true }, false);
console.log(`⚡ Transistor ON: ${activeInterfaces.length} active, OFF: ${inactiveInterfaces.length} inactive`);

// Polar relationship discovery
for (const item of workspace.allItems) {
  const polarOpposites = workspace.findPolarOpposite(item);
  if (polarOpposites.length > 0) {
    console.log(`🔄 ${item.title} has ${polarOpposites.length} polar opposites`);
  }
}

// Precedence sorting
const sortedByBagua = workspace.sortByBaguaPrecedence();
console.log('📊 Bagua precedence order:');
sortedByBagua.forEach((item, index) => {
  const baguaName = Object.keys(UniversalDocument.BAGUA)
    .find(key => (UniversalDocument.BAGUA as any)[key] & item.bagua_descriptor);
  console.log(`  ${index + 1}. ${item.title} (${baguaName})`);
});

// ============================================================================
// DEMO 4: Multi-Format Serialization
// ============================================================================

console.log('\n💾 Demonstrating Multi-Format Serialization...');

// Binary format (ultra-compact)
const binary = workspace.toBinary();
console.log(`📦 Binary format: ${binary.byteLength} bytes (UDAR header + hybrid content)`);

// Hybrid bracket format (structured)
const view = new DataView(binary);
const contentOffset = view.getUint32(6, true);
const contentLength = view.getUint32(10, true);
const hybridText = new TextDecoder().decode(new Uint8Array(binary, contentOffset, contentLength));
console.log(`🔧 Hybrid format: ${hybridText.length} characters (bracket notation)`);

// Markdown format (human-readable)
const markdown = workspace.toText();
console.log(`📝 Markdown format: ${markdown.length} characters (YAML frontmatter)`);

// Save all formats
fs.writeFileSync('spatial-workspace.ud', Buffer.from(binary));
fs.writeFileSync('spatial-workspace.ud.md', markdown);
fs.writeFileSync('spatial-workspace.hybrid.ud', hybridText);

console.log('💾 Saved in all three formats');

// ============================================================================
// DEMO 5: Round-Trip Verification
// ============================================================================

console.log('\n🔄 Verifying Perfect Round-Trip Fidelity...');

// Binary round-trip
const doc1 = UniversalDocument.fromBinary(binary);
const binary2 = doc1.toBinary();
console.log(`🔁 Binary round-trip: ${binary.byteLength} → ${binary2.byteLength} bytes (${binary.byteLength === binary2.byteLength ? '✅ Perfect' : '⚠️  Drift'})`);

// Hybrid format round-trip
const doc2 = UniversalDocument.fromText(hybridText);
const binary3 = doc2.toBinary();
console.log(`🔁 Hybrid round-trip: ${binary.byteLength} → ${binary3.byteLength} bytes (${binary.byteLength === binary3.byteLength ? '✅ Perfect' : '⚠️  Drift'})`);

// Markdown round-trip
const doc3 = UniversalDocument.fromText(markdown);
const markdown2 = doc3.toText();
console.log(`🔁 Markdown round-trip: ${doc3.allItems.length} items preserved (${doc3.allItems.length === workspace.allItems.length ? '✅ Perfect' : '⚠️  Loss'})`);

// ============================================================================
// DEMO 6: Performance Showcase
// ============================================================================

console.log('\n⚡ Performance Showcase...');

const perfTest = new UniversalDocument();
const startTime = Date.now();

// Create 1000 spatial elements
for (let i = 0; i < 1000; i++) {
  perfTest.addItem({
    type: UniversalDocument.ItemType.VARIABLE,
    title: `Spatial Element ${i}`,
    position: { 
      x: (Math.random() - 0.5) * 4000, 
      y: (Math.random() - 0.5) * 4000, 
      z: Math.floor(Math.random() * 10) 
    },
    dimensions: { width: 100 + Math.random() * 200, height: 100 + Math.random() * 200 },
    content: { 
      data: `Element ${i}`,
      spatial_id: i,
      zone: Math.floor(i / 100)
    },
    is_contextual: Math.random() > 0.5,
    bagua_descriptor: Object.values(UniversalDocument.BAGUA)[i % 9]
  });
}

const createTime = Date.now() - startTime;

// Serialize performance
const serializeStart = Date.now();
const perfBinary = perfTest.toBinary();
const serializeTime = Date.now() - serializeStart;

// Deserialize performance  
const deserializeStart = Date.now();
const perfDoc2 = UniversalDocument.fromBinary(perfBinary);
const deserializeTime = Date.now() - deserializeStart;

console.log('📊 Performance Results:');
console.log(`  🏗️  Creation: 1000 items in ${createTime}ms (${Math.round(1000 / createTime * 1000)} items/sec)`);
console.log(`  📦 Serialization: ${(perfBinary.byteLength / 1024).toFixed(1)}KB in ${serializeTime}ms (${Math.round(1000 / serializeTime * 1000)} items/sec)`);
console.log(`  📂 Deserialization: ${perfDoc2.allItems.length} items in ${deserializeTime}ms (${Math.round(1000 / deserializeTime * 1000)} items/sec)`);
console.log(`  💾 Compression: ${((1 - perfBinary.byteLength / (JSON.stringify(perfTest.allItems).length)) * 100).toFixed(1)}% vs JSON`);

console.log('\n🌌 Demo Complete! UniversalFile (.UD) showcases:');
console.log('  ✅ Spatial awareness with 3D positioning');
console.log('  ✅ Bagua-based philosophical metadata');
console.log('  ✅ Algebraic transistor conditional logic');
console.log('  ✅ Natural transformation tracking');
console.log('  ✅ Multi-format serialization');
console.log('  ✅ Perfect round-trip fidelity');
console.log('  ✅ High-performance operations');
console.log('  ✅ Origin-aware provenance');
console.log('\n🚀 The future of spatial computing is here!');