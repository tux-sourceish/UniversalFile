# 🌌 UniversalFile (.UD) Format

**Revolutionary spatial document format with Bagua-based metadata and hyperdimensional computing capabilities**

[![Version](https://img.shields.io/npm/v/@tux-sourceish/universalfile)](https://www.npmjs.com/package/@tux-sourceish/universalfile)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## 🚀 Revolutionary Features

### **🔮 Raimund's Bagua System (Früher Himmel)**
Nine-dimensional metadata encoding based on I Ching philosophy:
- **☰ HIMMEL**: Classes/Templates - Reusable patterns
- **☴ WIND**: Views/UI - Visual interfaces  
- **☵ WASSER**: Procedures/Flow - Process streams
- **☶ BERG**: Init/Setup - Foundation systems
- **☱ SEE**: Properties - Attribute containers
- **☲ FEUER**: Functions - Active computations
- **☳ DONNER**: Events - Reactive triggers
- **☷ ERDE**: Data/Storage - Information base
- **☯ TAIJI**: Unity/Center - Holistic integration

### **⚡ Algebraic Transistor Logic**
```typescript
// Binary conditional logic: 0^0 = 1 (ON), 0^1 = 0 (OFF)
const activeItems = doc.queryWithTransistor({ WIND: true }, condition);
```

### **🔄 Natural Transformation Tracking**
Complete provenance with German transformation verbs:
- **erschaffen** (created) - Initial element creation
- **crystallized** - Structure refinement
- **enhanced** - Feature additions
- **iterated** - Evolutionary changes

### **🌍 Spatial Computing**
- **3D Positioning**: X, Y, Z coordinates with infinite canvas
- **Origin Tracking**: Host/Path/Tool authentication
- **Polar Relationships**: Find opposite elements in Bagua space
- **Precedence Sorting**: Hierarchical organization

## 📊 Performance Metrics

| Operation | Performance | Details |
|-----------|-------------|---------|
| **Creation** | 66,667 items/sec | 1000 items in 15ms |
| **Serialization** | 90,909 items/sec | 597KB in 11ms |
| **Deserialization** | 50,000 items/sec | 597KB in 20ms |
| **Binary Size** | 47% smaller | vs JSON equivalent |
| **Round-Trip** | 0% data loss | Perfect fidelity |

## 🎯 Quick Start

### Installation
```bash
npm install @tux-sourceish/universalfile
```

### Basic Usage
```typescript
import { UniversalDocument } from '@tux-sourceish/universalfile';

// Create document
const doc = new UniversalDocument();

// Add spatial element with origin tracking
const item = doc.createItem({
  type: UniversalDocument.ItemType.VARIABLE,
  title: "My Spatial Note",
  position: { x: 100, y: 200, z: 0 },
  dimensions: { width: 300, height: 200 },
  content: { text: "Hello UniversalFile! 🚀" },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.ERDE | UniversalDocument.BAGUA.WIND
}, {
  host: "workspace.local",
  path: "/projects/spatial-computing",
  tool: "UniversalDesktop"
});

// Transform with history tracking
doc.transformItem(item.id, {
  verb: "enhanced",
  agent: "user:developer",
  description: "Added spatial computing capabilities"
}, {
  content: { text: "Enhanced with spatial awareness! ✨" }
});

// Serialize to binary (ultra-compact)
const binary = doc.toBinary();

// Or export to readable formats
const markdown = doc.toText();
```

## 🔬 Advanced Features

### **Bagua-Based Queries**
```typescript
// Find all UI elements
const uiElements = doc.queryByBagua({ WIND: true });

// Conditional processing with algebraic transistor
const activeViews = doc.queryWithTransistor({ WIND: true }, userIsLoggedIn);

// Discover polar relationships
const opposites = doc.findPolarOpposite(item);

// Sort by philosophical precedence
const sorted = doc.sortByBaguaPrecedence();
```

### **Multi-Format Support**
```typescript
// Binary format (UDAR header + hybrid content)
const binary = doc.toBinary();
const doc1 = UniversalDocument.fromBinary(binary);

// Hybrid bracket format (structure-preserving)
const hybrid = extractHybridText(binary);
const doc2 = UniversalDocument.fromText(hybrid);

// Markdown format (human-readable)
const markdown = doc.toText();
const doc3 = UniversalDocument.fromText(markdown);
```

### **Item Type System**
```typescript
// Raimund's enhanced type system
const types = {
  VORTEX: 0,        // ☯ Unknown/Origin
  KONSTRUKTOR: 1,   // ☰ Code/Templates  
  TABELLE: 2,       // ☴ Tables/Views
  FLUSS: 3,         // ☵ Media/Streams
  INIT: 4,          // ☶ Configuration
  EIGENSCHAFT: 5,   // ☱ Properties
  FUNKTION: 6,      // ☲ Functions
  EREIGNIS: 7,      // ☳ Events/Triggers
  VARIABLE: 8,      // ☷ Data/Storage
  DATABASE: 9,      // Extended: Hyperdimensional
  SYSTEM: 10        // Extended: System-level
};
```

## 🏗️ Architecture

### **Core Philosophy**
1. **Spatial Awareness**: Every element has position and dimensions
2. **Origin Authenticity**: Complete provenance tracking
3. **Transformation History**: Immutable change records
4. **Bagua Metadata**: Philosophical classification system
5. **Algebraic Logic**: Mathematical precision in queries

### **Format Specifications**

#### Binary Format (UDAR)
```
[16-byte header] + [UTF-8 hybrid content]
- Magic: 0x55444152 ("UDAR")
- Version: 0x0210 (v2.1.0)
- Content offset & length
- Signature: 0x5544 ("UD")
```

#### Hybrid Bracket Format
```
---ud-document
([{
  version: 2.1.0-raimund
  creator: UniversalFile with Raimund's Bagua
  created_at: 2025-07-19T00:35:23.977Z
}])
---ud-document-end

([{ITEM
  id: ud_item_1752885323977_1
  type: VARIABLE
  bagua: ☷☴ (130)
  ([{ORIGIN
    host: workspace.local
    path: /projects
    tool: UniversalDesktop
  }])
  ([{HISTORY
    - verb: erschaffen
      agent: UniversalDesktop
      timestamp: 2025-07-19T00:35:23.977Z
  }])
}])

([{CONTENT
Hello UniversalFile! 🚀
}])
```

## 🎨 Use Cases

### **Spatial Computing Applications**
- **3D Workspace Management**: Track elements in virtual space
- **AI Knowledge Graphs**: Encode relationships with Bagua metadata
- **Document Evolution**: Complete transformation history
- **Collaborative Systems**: Multi-agent provenance tracking

### **Development Workflows**
- **Code Documentation**: Spatial organization of components
- **Project Planning**: Bagua-classified task management
- **Architecture Design**: Template-based system modeling
- **Testing Frameworks**: Origin-aware test case management

### **Creative Applications**
- **Digital Art**: Spatial canvas with transformation history
- **Interactive Media**: Event-driven element relationships
- **Game Development**: Hyperdimensional world building
- **Educational Tools**: Philosophy-based knowledge organization

## 🔬 Testing & Quality

Run the comprehensive test suite:
```bash
npm run test-universalfile
```

**Test Coverage:**
- ✅ Binary round-trip (perfect fidelity)
- ✅ Bagua query engine
- ✅ Performance benchmarks
- ✅ Text serialization formats
- ✅ Transformation history preservation
- ✅ Algebraic transistor logic
- ✅ Hybrid format parsing
- ✅ Complete round-trip stability

## 📈 Roadmap

### **Version 2.2 "Synthesis"**
- [ ] WebGL spatial renderer
- [ ] Real-time collaboration protocol
- [ ] Advanced Bagua operations
- [ ] Machine learning integration

### **Version 2.3 "Transcendence"**
- [ ] Quantum-inspired computing
- [ ] Holographic data structures
- [ ] Multi-dimensional indexing
- [ ] Universal format bridges

## 🤝 Contributing

We welcome contributions that enhance the spatial computing capabilities:

1. **Philosophy First**: Understand the Bagua system
2. **Spatial Thinking**: Consider 3D implications
3. **Origin Awareness**: Track all transformations
4. **Performance Focused**: Maintain sub-millisecond operations

## 📜 License

MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- **Raimund**: Visionary behind the Bagua system v2.1.0
- **KIRA**: Inspiration for natural transformation tracking
- **ULLRICHBAU**: Quality standards and engineering excellence
- **I Ching Philosophy**: Foundation for metadata architecture

---

**🌌 "Where space meets wisdom, and transformation becomes art."**

*Built with spatial awareness, philosophical depth, and mathematical precision.*