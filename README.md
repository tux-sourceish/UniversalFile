# 🌌 UniversalFile (.UD) Format

**Revolutionary Binary-Text Hybrid Document Format with Bagua-Based Metadata**

[![Version](https://img.shields.io/badge/version-2.7.0--kira-blue.svg)](https://github.com/tux-sourceish/UniversalFile)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## 🚀 Overview

The UniversalFile (.UD) format is a revolutionary approach to document storage that combines Eastern philosophy with modern computing power. Built for spatial computing and AI integration, it offers:

- **🧭 Bagua Metadata**: Ancient Chinese I Ching philosophy encoded in 9-bit descriptors
- **🗃️ Binary Serialization**: Hardware-optimized binary sections for ultra-fast access
- **📜 Transformation History**: Complete provenance tracking for every change
- **🌐 3D Positioning**: Native support for spatial computing and 3D layouts
- **🤖 AI-Ready**: Hyperdimensional vector support for semantic search
- **⚡ Performance**: Optimized for spatial computing and large datasets

## 📦 Installation

```bash
npm install @tux-sourceish/universalfile
```

## 🔧 Quick Start

```typescript
import { UniversalDocument } from '@tux-sourceish/universalfile';

// Create a new document
const doc = new UniversalDocument();

// Add a note with origin tracking
const note = doc.createItem({
  type: UniversalDocument.ItemType.NOTIZZETTEL,
  title: "My First Note",
  position: { x: 100, y: 200, z: 0 },
  dimensions: { width: 300, height: 200 },
  content: "Hello UniversalFile! 🌌",
  is_contextual: false
}, {
  host: "workspace.local",
  path: "/project/notes",
  tool: "UniversalDesktop"
});

// Transform the item (with history tracking)
doc.transformItem(note.id, {
  verb: "refined",
  agent: "user:developer",
  description: "Enhanced with emoji and formatting"
}, {
  content: "Hello UniversalFile! 🌌✨ This is refined content."
});

// Serialize to binary
const binary = doc.toBinary();
console.log(`Document serialized to ${binary.byteLength} bytes`);

// Load from binary
const doc2 = UniversalDocument.fromBinary(binary);
console.log(`Loaded ${doc2.allItems.length} items`);
```

## 🧭 Bagua Metadata System

The heart of UniversalFile is the Bagua-based metadata system, encoding 9 fundamental properties from I Ching philosophy:

```
      🌌 Bagua Matrix (3x3)
    ┌─────┬─────┬─────┐
    │ ☴   │ ☲   │ ☷   │
    │ Xun │ Li  │ Kun │  
    ├─────┼─────┼─────┤
    │ ☳   │ ☯   │ ☱   │
    │ Zhen│Taiji│ Dui │
    ├─────┼─────┼─────┤
    │ ☶   │ ☵   │ ☰   │
    │ Gen │ Kan │Qian │
    └─────┴─────┴─────┘
```

### Trigram Properties

- **☰ Qian** (Heaven): Template/Master - Element can be cloned
- **☱ Dui** (Lake): Interactive - Accepts user input
- **☷ Kun** (Earth): Data Container - Holds primary content
- **☲ Li** (Fire): Searchable - Indexed for semantic search
- **☴ Xun** (Wind): Dynamic - Adaptive formatting
- **☳ Zhen** (Thunder): Actionable - Has associated scripts
- **☶ Gen** (Mountain): Fixed - Immutable position/size
- **☵ Kan** (Water): Linked - Connected to other elements
- **☯ Taiji** (Center): Active - Currently in focus

### Using Bagua in Code

```typescript
// Create item with specific Bagua properties
const item = doc.createItem({
  type: UniversalDocument.ItemType.NOTIZZETTEL,
  title: "Interactive Note",
  position: { x: 0, y: 0, z: 0 },
  dimensions: { width: 400, height: 300 },
  content: "This note accepts user input and is searchable",
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.DUI |    // Interactive
                   UniversalDocument.BAGUA.LI |     // Searchable
                   UniversalDocument.BAGUA.KUN      // Data Container
}, origin);

// Query by Bagua properties
const interactiveItems = doc.queryByBagua({ DUI: true });
const searchableItems = doc.queryByBagua({ LI: true });
const activeItems = doc.queryByBagua({ TAIJI: true });
```

## 🗂️ Item Types

UniversalFile supports various content types optimized for spatial computing:

```typescript
enum ItemType {
  NOTIZZETTEL = 0,    // Text notes
  TABELLE = 1,        // Tables/spreadsheets
  CODE = 2,           // Source code
  TUI = 3,            // Terminal interfaces
  BROWSER = 4,        // Web content
  MEDIA = 5,          // Images/videos
  CHART = 6,          // Data visualizations
  CALENDAR = 7,       // Time-based data
  AI_GENERATED = 8,   // AI-created content
  DATABASE = 9        // Hyperdimensional vector databases
}
```

### Creating Different Item Types

```typescript
// Text Note
const note = doc.createItem({
  type: UniversalDocument.ItemType.NOTIZZETTEL,
  title: "Project Notes",
  position: { x: 100, y: 100, z: 0 },
  dimensions: { width: 300, height: 200 },
  content: "Meeting notes from today's standup",
  is_contextual: false
}, origin);

// Code Block
const code = doc.createItem({
  type: UniversalDocument.ItemType.CODE,
  title: "API Implementation",
  position: { x: 500, y: 100, z: 0 },
  dimensions: { width: 600, height: 400 },
  content: {
    language: "typescript",
    code: "export class UniversalDocument { ... }"
  },
  is_contextual: false
}, origin);

// Hyperdimensional Vector Database
const vectorDB = doc.createItem({
  type: UniversalDocument.ItemType.DATABASE,
  title: "Semantic Search Index",
  position: { x: 100, y: 600, z: 0 },
  dimensions: { width: 800, height: 300 },
  content: {
    vectors: [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]],
    embeddings: "text-embedding-3-large",
    dimensions: 1536
  },
  is_contextual: false
}, origin);
```

## 📜 Transformation History

Every change to an item is tracked with complete provenance:

```typescript
// Transform an item with history tracking
const updatedItem = doc.transformItem(item.id, {
  verb: "crystallized",           // Action taken
  agent: "user:developer",        // Who performed it
  description: "Structured data extracted from free text",
  previous_state_ref: "backup_123" // Reference to previous state
}, {
  content: structuredData,
  title: "Structured Data"
});

// Access transformation history
item.transformation_history.forEach(transform => {
  console.log(`${transform.timestamp}: ${transform.verb} by ${transform.agent}`);
  console.log(`  ${transform.description}`);
});

// Common transformation verbs
const verbs = [
  "erschaffen",      // created
  "iteriert",        // iterated
  "kristallisiert",  // crystallized
  "sublimiert",      // sublimated
  "destilliert",     // distilled
  "verfeinert",      // refined
  "fusioniert"       // merged
];
```

## 🌐 3D Positioning & Spatial Computing

UniversalFile natively supports 3D positioning for spatial computing applications:

```typescript
// Create items at different Z-levels
const backgroundNote = doc.createItem({
  type: UniversalDocument.ItemType.NOTIZZETTEL,
  title: "Background Context",
  position: { x: 0, y: 0, z: -1 },    // Behind other items
  dimensions: { width: 1000, height: 800 },
  content: "Background information",
  is_contextual: true
}, origin);

const mainContent = doc.createItem({
  type: UniversalDocument.ItemType.TABELLE,
  title: "Main Data",
  position: { x: 100, y: 100, z: 0 }, // Main layer
  dimensions: { width: 600, height: 400 },
  content: { data: "main content" },
  is_contextual: false
}, origin);

const overlay = doc.createItem({
  type: UniversalDocument.ItemType.CHART,
  title: "Analytics Overlay",
  position: { x: 200, y: 200, z: 1 }, // Overlay layer
  dimensions: { width: 400, height: 300 },
  content: { chartType: "line", data: [1, 2, 3] },
  is_contextual: false
}, origin);

// Spatial queries
const itemsInArea = doc.findByPosition({
  x: 0, y: 0, width: 500, height: 500
});

const layerItems = doc.allItems.filter(item => item.position.z === 0);
```

## 🗺️ Minimap Integration

Generate minimap data for spatial visualization:

```typescript
// Generate minimap data
const minimapData = doc.generateMinimapData();

// Minimap structure
interface MinimapData {
  items: Array<{
    id: string;
    position: { x: number; y: number; z: number };
    dimensions: { width: number; height: number };
    color: string;        // Bagua-based color coding
    type: number;
    title: string;
    active: boolean;      // Has TAIJI property
  }>;
  bounds: {
    minX: number; minY: number;
    maxX: number; maxY: number;
  };
  layers: Record<number, MinimapItem[]>; // Organized by Z-level
}

// Use in React component
function DocumentMinimap({ document }) {
  const minimapData = document.generateMinimapData();
  
  return (
    <div className="minimap">
      {minimapData.layers[0]?.map(item => (
        <div
          key={item.id}
          className="minimap-item"
          style={{
            left: item.position.x / 10,
            top: item.position.y / 10,
            width: item.dimensions.width / 10,
            height: item.dimensions.height / 10,
            backgroundColor: item.color,
            border: item.active ? '2px solid gold' : '1px solid #ccc'
          }}
          title={item.title}
        />
      ))}
    </div>
  );
}
```

## 🤖 AI Integration

UniversalFile is designed for AI-enhanced workflows:

```typescript
// AI-generated content tracking
const aiNote = doc.createItem({
  type: UniversalDocument.ItemType.AI_GENERATED,
  title: "AI Summary",
  position: { x: 400, y: 300, z: 0 },
  dimensions: { width: 500, height: 300 },
  content: {
    prompt: "Summarize the key points from the meeting",
    model: "gpt-4",
    response: "Key points: 1. Project timeline...",
    confidence: 0.95
  },
  is_contextual: false
}, {
  host: "ai-server.local",
  path: "/models/gpt-4",
  tool: "OpenAI API"
});

// Vector database for semantic search
const vectorStore = doc.createItem({
  type: UniversalDocument.ItemType.DATABASE,
  title: "Document Embeddings",
  position: { x: 0, y: 500, z: 0 },
  dimensions: { width: 800, height: 200 },
  content: {
    vectors: embeddings,
    model: "text-embedding-3-large",
    dimensions: 3072,
    indexed_items: ["item_1", "item_2", "item_3"]
  },
  is_contextual: false
}, origin);

// Semantic search functionality
function semanticSearch(query: string, threshold: number = 0.8) {
  const databases = doc.allItems.filter(
    item => item.type === UniversalDocument.ItemType.DATABASE
  );
  
  // Implementation would use vector similarity search
  return databases.flatMap(db => {
    // Return semantically similar items
    return db.content.indexed_items.filter(/* similarity > threshold */);
  });
}
```

## ⚡ Performance Features

UniversalFile is optimized for high performance:

```typescript
// Binary serialization for fast I/O
const binary = doc.toBinary();
console.log(`${doc.allItems.length} items → ${binary.byteLength} bytes`);

// Efficient queries with Bagua indexing
const start = performance.now();
const interactiveItems = doc.queryByBagua({ DUI: true });
const duration = performance.now() - start;
console.log(`Query completed in ${duration}ms`);

// Spatial indexing for fast position queries
const spatialResults = doc.findByPosition({
  x: 0, y: 0, width: 1000, height: 1000
});

// Memory-efficient storage
const stats = {
  totalItems: doc.allItems.length,
  memoryUsage: process.memoryUsage().heapUsed,
  itemsPerMB: doc.allItems.length / (process.memoryUsage().heapUsed / 1024 / 1024)
};
```

## 🛠️ Advanced Features

### TUI Format Presets

Support for terminal/TUI applications with authentic format presets:

```typescript
// Document comes with TUI presets
const presets = doc.metadata.presets?.tui_formats;
console.log(presets);
// {
//   "Standard": { width: 80, height: 25, codepage: 437 },
//   "Commodore64": { width: 40, height: 25 },
//   "ZXSpectrum": { width: 32, height: 24 },
//   "VT100": { width: 80, height: 24 }
// }

// Create TUI-compatible item
const tuiItem = doc.createItem({
  type: UniversalDocument.ItemType.TUI,
  title: "Terminal Interface",
  position: { x: 0, y: 0, z: 0 },
  dimensions: { width: 640, height: 400 }, // 80x25 * 8px
  content: {
    format: "Standard",
    buffer: terminalBuffer,
    cursor: { x: 10, y: 5 }
  },
  is_contextual: false
}, origin);
```

### Relationship Analysis

Analyze connections between items:

```typescript
// Analyze relationships (future feature)
const connections = doc.analyzeAndVisualizeRelationships();
connections.forEach(connection => {
  console.log(`${connection.from} → ${connection.to}`);
  console.log(`  Type: ${connection.type}`);
  console.log(`  Strength: ${connection.strength}`);
});

// Relationship types
enum RelationshipType {
  TRANSFORMED_FROM = "transformed_from",
  REFERENCES = "references",
  CONTAINS = "contains",
  SIMILAR_TO = "similar_to",
  DEPENDS_ON = "depends_on"
}
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run specific test file
npx ts-node test-universalfile.ts

# Expected output:
# 🧪 UniversalFile Test Suite
# 
# 📋 Test 1: Binary Round-Trip...
# ✅ Round-Trip Test PASSED!
# 
# 🔍 Test 2: Bagua Queries...
# ✅ Bagua Query Test PASSED!
# 
# ⚡ Test 3: Performance...
# ✅ Performance Test PASSED!
# 
# 🎉 All tests passed! UniversalFile is production ready!
```

## 📚 API Reference

### Core Classes

- **`UniversalDocument`**: Main document class
- **`UDItem`**: Individual document items
- **`UDOrigin`**: Origin tracking information
- **`UDTransformation`**: Transformation history entries
- **`UDMetadata`**: Document metadata

### Key Methods

- **`createItem(options, origin)`**: Create new item with origin tracking
- **`transformItem(id, transformation, updates)`**: Transform item with history
- **`queryByBagua(properties)`**: Query items by Bagua properties
- **`toBinary()`**: Serialize to binary format
- **`fromBinary(buffer)`**: Deserialize from binary format
- **`allItems`**: Get all items in document

### Bagua Constants

```typescript
UniversalDocument.BAGUA = {
  QIAN:  0b000000001,  // ☰ Heaven/Template
  DUI:   0b000000010,  // ☱ Lake/Interactive
  KUN:   0b000000100,  // ☷ Earth/Container
  LI:    0b000001000,  // ☲ Fire/Searchable
  XUN:   0b000010000,  // ☴ Wind/Dynamic
  ZHEN:  0b000100000,  // ☳ Thunder/Actionable
  GEN:   0b001000000,  // ☶ Mountain/Fixed
  KAN:   0b010000000,  // ☵ Water/Linked
  TAIJI: 0b100000000   // ☯ Center/Active
};
```

## 🚀 Use Cases

### Spatial Computing Applications
- 3D document layouts
- VR/AR content management
- Spatial note-taking apps
- Interactive whiteboards

### AI-Enhanced Workflows
- Semantic document search
- AI-generated content tracking
- Vector database integration
- Provenance tracking for AI outputs

### Development Tools
- IDE workspace persistence
- Code annotation systems
- Documentation generation
- Project knowledge bases

### Creative Applications
- Digital art portfolios
- Interactive storytelling
- Game development assets
- Multimedia presentations

## 🔮 Roadmap

### Phase 1: Core Implementation ✅
- Bagua metadata system
- Basic document operations
- Transformation history
- 3D positioning

### Phase 2: Advanced Features 🔄
- Binary serialization optimization
- Compression algorithms
- Encryption layer
- Real-time collaboration

### Phase 3: Ecosystem 📋
- IDE plugins
- Web viewers
- Mobile apps
- Cloud services

### Phase 4: Standards 🎯
- Open specification
- Industry adoption
- OS integration
- Hardware acceleration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🌟 Vision

**"Make .UD the universal spatial document format of the future!"**

The UniversalFile format combines:
- **Ancient wisdom** (Bagua philosophy from I Ching)
- **Modern performance** (binary optimization and spatial indexing)
- **Future readiness** (AI integration and hyperdimensional vectors)
- **Spatial computing** (3D positioning and minimap integration)

Join us in building the future of spatial document formats! 🌌

---

*Created with ❤️ by [tux-sourceish](https://github.com/tux-sourceish)*  
*Version 2.7.0 "Kira" - In recognition of creative artifacts*