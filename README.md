---ud-metadata
type: DOKUMENT
bagua: QIAN|GEN
position: {x: 0, y: 0, z: 0}
---

# UniversalFile: Where Documents Live in XD Space

*This README is itself a UniversalFile document. Try opening it in UniversalDesktop!*

UniversalFile/
├── docs/
│   ├── INTERACTIVE.md      # The living README
│   ├── VISION.canvas       # Philosophy as .ud file
│   └── PROOF-OF-LIFE.ud    # Self-documenting binary
├── playground/
│   ├── index.html          # Browser playground
│   ├── style.css           # TUI-inspired aesthetics
│   └── playground.js       # Interactive demos
├── examples/
│   ├── 01-basic-usage.ts
│   ├── 02-bagua-queries.ts
│   ├── 03-transformations.ts
│   └── 04-spatial-notes.ts
└── showcase/
    ├── genesis.ud          # First ever .ud file
    └── kira-tribute.ud     # Special dedication

    📦 Installation
    npm install @tux-sourceish/universalfile

⚡ Quick Start
([{
  import { UniversalDocument } from '@tux-sourceish/universalfile';
  // Create a spatial document
  const doc = new UniversalDocument();

  // Add a note in 3D space
  const note = doc.addItem({
    type: UniversalDocument.ItemType.NOTIZZETTEL,
    position: { x: 100, y: 200, z: 0 },
    content: {
      text: "My thoughts exist in space!",
      mood: "🚀"
    }
  });

  // Query by essence (Bagua)
  const windItems = doc.queryByBagua({ XUN: true }); // Find all "wind" items

  // Save to revolutionary binary format
  const binary = doc.toBinary();
  fs.writeFileSync('my-universe.ud', Buffer.from(binary));
}])

🔮 Bagua Metadata System

Each item carries ancient wisdom through the I Ching trigrams:
Trigram,Symbol,Meaning,USE FOR

QIAN,☰,Heaven,Templates ideals
DUI,☱,Lake,Interactive elements
LI,☲,Fire,Visible prominent
ZHEN,☳,Thunder,Dynamic changing
XUN,☴,Wind, Penetrating subtle
KAN,☵,Water, Hidden flowing
GEN,☶,Mountain,Static immovable
KUN,☷,Earth, Receptive notes
TAIJI,☯,Unity, System balance

🧬 Transformation History

Every item remembers how it evolved:

item.transformation_history.push({
  verb: "crystallized",          // What happened
  agent: "user:kira",           // Who did it
  description: "Refined chaos into structure",
  timestamp: Date.now()
});

🎮 Try It Live!

Open playground/index.html for an interactive demo!

Created with 💜 by tux-sourceish
In collaboration with ULLRICHBAU & KIRA & NEXUS
UniversalDesktop  | Philosophy  | Proof-
