#!/usr/bin/env ts-node

/**
 * Basic Usage Example for UniversalFile
 * 
 * This example demonstrates the fundamental operations:
 * - Creating a document
 * - Adding items with different types
 * - Using Bagua metadata
 * - Transformation history
 * - Binary serialization
 */

import { UniversalDocument } from '../universalDocument';
import * as fs from 'fs';

console.log('🌌 UniversalFile Basic Usage Example\n');

// Create a new document
const doc = new UniversalDocument();
console.log('📄 Created new UniversalDocument');

// Define origin for tracking
const origin = {
  host: 'localhost',
  path: '/examples/basic-usage',
  tool: 'Basic Usage Example'
};

// 1. Create a simple text note
console.log('\n1️⃣ Creating a text note...');
const note = doc.createItem({
  type: UniversalDocument.ItemType.NOTIZZETTEL,
  title: 'Welcome Note',
  position: { x: 100, y: 100, z: 0 },
  dimensions: { width: 300, height: 200 },
  content: 'Welcome to UniversalFile! This is your first note. 🌟',
  is_contextual: false
}, origin);

console.log(`   ✅ Created note with ID: ${note.id}`);

// 2. Create a code snippet
console.log('\n2️⃣ Creating a code snippet...');
const code = doc.createItem({
  type: UniversalDocument.ItemType.CODE,
  title: 'Hello World Function',
  position: { x: 500, y: 100, z: 0 },
  dimensions: { width: 400, height: 300 },
  content: {
    language: 'typescript',
    code: `function helloWorld(): string {
  return "Hello, UniversalFile! 🌌";
}

// Usage
console.log(helloWorld());`
  },
  is_contextual: false
}, origin);

console.log(`   ✅ Created code snippet with ID: ${code.id}`);

// 3. Create a table with data
console.log('\n3️⃣ Creating a data table...');
const table = doc.createItem({
  type: UniversalDocument.ItemType.TABELLE,
  title: 'Project Status',
  position: { x: 100, y: 400, z: 0 },
  dimensions: { width: 500, height: 250 },
  content: {
    headers: ['Task', 'Status', 'Progress', 'Assignee'],
    rows: [
      ['Documentation', '✅ Complete', '100%', 'tux-sourceish'],
      ['Examples', '🔄 In Progress', '75%', 'tux-sourceish'],
      ['Testing', '📋 Planned', '0%', 'Community'],
      ['Deployment', '📅 Future', '0%', 'Maintainers']
    ]
  },
  is_contextual: false
}, origin);

console.log(`   ✅ Created table with ID: ${table.id}`);

// 4. Create an AI-generated summary
console.log('\n4️⃣ Creating AI-generated content...');
const aiSummary = doc.createItem({
  type: UniversalDocument.ItemType.AI_GENERATED,
  title: 'Project Summary',
  position: { x: 600, y: 400, z: 0 },
  dimensions: { width: 350, height: 200 },
  content: {
    prompt: 'Summarize the UniversalFile project in 3 key points',
    model: 'gpt-4',
    response: `1. Revolutionary spatial document format combining Eastern philosophy (Bagua) with modern computing
2. Advanced features including 3D positioning, binary serialization, and transformation history
3. AI-ready architecture with vector database support and semantic search capabilities`,
    confidence: 0.92,
    tokens_used: 45
  },
  is_contextual: false
}, {
  host: 'ai-server.local',
  path: '/models/gpt-4',
  tool: 'OpenAI API'
});

console.log(`   ✅ Created AI summary with ID: ${aiSummary.id}`);

// 5. Transform the note to add more content
console.log('\n5️⃣ Transforming the note...');
const transformedNote = doc.transformItem(note.id, {
  verb: 'enhanced',
  agent: 'example:basic-usage',
  description: 'Added features overview and emojis'
}, {
  content: `Welcome to UniversalFile! This is your first note. 🌟

UniversalFile Features:
🧭 Bagua metadata system
📜 Transformation history
🌐 3D positioning
🤖 AI integration
⚡ High performance

Ready to explore spatial computing? Let's go! 🚀`
});

console.log(`   ✅ Transformed note with new content`);

// 6. Query items by Bagua properties
console.log('\n6️⃣ Querying with Bagua system...');

// Set Bagua properties on some items
doc.transformItem(note.id, {
  verb: 'tagged',
  agent: 'example:basic-usage',
  description: 'Added Bagua metadata'
}, {
  bagua_descriptor: UniversalDocument.BAGUA.DUI |    // Interactive
                   UniversalDocument.BAGUA.LI |     // Searchable
                   UniversalDocument.BAGUA.KUN      // Data Container
});

doc.transformItem(code.id, {
  verb: 'tagged',
  agent: 'example:basic-usage',
  description: 'Added Bagua metadata'
}, {
  bagua_descriptor: UniversalDocument.BAGUA.ZHEN |   // Actionable
                   UniversalDocument.BAGUA.GEN |     // Fixed
                   UniversalDocument.BAGUA.LI       // Searchable
});

// Query by different properties
const interactiveItems = doc.queryByBagua({ DUI: true });
const searchableItems = doc.queryByBagua({ LI: true });
const actionableItems = doc.queryByBagua({ ZHEN: true });

console.log(`   📊 Query results:`);
console.log(`      Interactive items: ${interactiveItems.length}`);
console.log(`      Searchable items: ${searchableItems.length}`);
console.log(`      Actionable items: ${actionableItems.length}`);

// 7. Display document statistics
console.log('\n7️⃣ Document statistics...');
const allItems = doc.allItems;
console.log(`   📦 Total items: ${allItems.length}`);
console.log(`   🏷️  Format version: ${doc.metadata.format_version}`);
console.log(`   👤 Creator: ${doc.metadata.creator}`);
console.log(`   📅 Created: ${doc.metadata.created_at}`);

// Show transformation history
console.log('\n   📜 Transformation History:');
allItems.forEach(item => {
  if (item.transformation_history.length > 1) {
    console.log(`      ${item.title}:`);
    item.transformation_history.forEach((transform, index) => {
      console.log(`        ${index + 1}. ${transform.verb} by ${transform.agent}`);
      console.log(`           ${transform.description}`);
    });
  }
});

// 8. Binary serialization
console.log('\n8️⃣ Binary serialization...');
const binary = doc.toBinary();
console.log(`   💾 Serialized to ${binary.byteLength} bytes`);
console.log(`   📊 Average bytes per item: ${(binary.byteLength / allItems.length).toFixed(2)}`);

// Save to file
fs.writeFileSync('examples/basic-example.ud', Buffer.from(binary));
console.log('   💾 Saved to examples/basic-example.ud');

// 9. Load from binary
console.log('\n9️⃣ Loading from binary...');
const doc2 = UniversalDocument.fromBinary(binary);
console.log(`   ✅ Loaded ${doc2.allItems.length} items`);
console.log(`   🔄 Round-trip successful!`);

// 10. Spatial queries
console.log('\n🔟 Spatial queries...');
const itemsInTopLeft = doc.allItems.filter(item => 
  item.position.x < 400 && item.position.y < 300
);
console.log(`   📍 Items in top-left quadrant: ${itemsInTopLeft.length}`);

const itemsByLayer = doc.allItems.reduce((acc, item) => {
  const layer = item.position.z;
  if (!acc[layer]) acc[layer] = [];
  acc[layer].push(item);
  return acc;
}, {} as Record<number, typeof allItems>);

console.log(`   📚 Items by layer:`);
Object.keys(itemsByLayer).forEach(layer => {
  console.log(`      Layer ${layer}: ${itemsByLayer[layer].length} items`);
});

console.log('\n🎉 Basic usage example completed successfully!');
console.log('🌟 You now know the fundamentals of UniversalFile!');