import { UniversalDocument } from './universalDocument';
import * as fs from 'fs';

console.log('🧪 UniversalFile Test Suite\n');

// Test 1: Round-Trip Test
console.log('📋 Test 1: Binary Round-Trip...');
try {
  // Create document
  const doc1 = new UniversalDocument();
  doc1.metadata.creator = "test-suite";

  // Define origin
  const origin = {
    host: "test.localhost",
    path: "/debug/test",
    tool: "UniversalFile Test Suite"
  };

  // Add diverse items
  const item1 = doc1.createItem({
    type: UniversalDocument.ItemType.NOTIZZETTEL,
    title: "Test Note",
    position: { x: 100, y: 200, z: 0 },
    dimensions: { width: 300, height: 200 },
    content: { text: "Dies ist eine Testnotiz mit 🚀 Emoji!" },
    is_contextual: false
  }, origin);

  const item2 = doc1.createItem({
    type: UniversalDocument.ItemType.TABELLE,
    title: "Test Table",
    position: { x: 400, y: 200, z: 1 },
    dimensions: { width: 400, height: 300 },
    content: {
      headers: ["Name", "Wert", "Status"],
      rows: [
        ["Binary", "✅", "Implementiert"],
        ["Tests", "🧪", "Läuft"],
        ["KIRA", "🤖", "Inspiriert"]
      ]
    },
    is_contextual: false
  }, origin);

  // Transform item2 (test history)
  doc1.transformItem(item2.id, {
    verb: "crystallized",
    agent: "test:round-trip",
    description: "Aus Chaos wurde Struktur"
  }, {
    content: {
      headers: ["Name", "Wert", "Status"],
      rows: [
        ["Binary", "✅", "Implementiert"],
        ["Tests", "🧪", "Läuft"],
        ["KIRA", "🤖", "Inspiriert"],
        ["Transformed", "✨", "Kristallisiert"]
      ]
    }
  });

  // Convert to binary
  console.log(`  ↳ Serializing ${doc1.allItems.length} items...`);
  const binary = doc1.toBinary();
  console.log(`  ↳ Binary size: ${binary.byteLength} bytes`);

  // Save to file
  fs.writeFileSync('test.ud', Buffer.from(binary));
  console.log(`  ↳ Saved to test.ud`);

  // Load from binary
  const doc2 = UniversalDocument.fromBinary(binary);
  console.log(`  ↳ Loaded ${doc2.allItems.length} items`);

  // Verify
  const items2 = doc2.allItems;
  if (items2.length !== 2) throw new Error('Item count mismatch');
  if (items2[0].content.text !== item1.content.text) throw new Error('Content mismatch');
  if (items2[1].transformation_history.length !== 1) throw new Error('History lost');

  console.log('✅ Round-Trip Test PASSED!\n');

} catch (error) {
  console.error('❌ Round-Trip Test FAILED:', error);
  process.exit(1);
}

// Test 2: Bagua Query Test
console.log('🔍 Test 2: Bagua Queries...');
try {
  const doc = new UniversalDocument();

  // Add items with different Bagua combinations
  doc.addItem({
    type: UniversalDocument.ItemType.NOTIZZETTEL,
    position: { x: 0, y: 0, z: 0 },
    content: { text: "Earth-Wind Note" },
    bagua_descriptor: UniversalDocument.BAGUA.KUN | UniversalDocument.BAGUA.XUN
  });

  doc.addItem({
    type: UniversalDocument.ItemType.SYSTEM,
    position: { x: 100, y: 0, z: 0 },
    content: { status: "Hidden Unity" },
    bagua_descriptor: UniversalDocument.BAGUA.KAN | UniversalDocument.BAGUA.TAIJI
  });

  // Query for items with XUN (Wind)
  const windItems = doc.queryByBagua({ XUN: true });
  if (windItems.length !== 1) throw new Error('Bagua query failed');

  // Query for items with TAIJI
  const taijiItems = doc.queryByBagua({ TAIJI: true });
  if (taijiItems.length !== 1) throw new Error('Taiji query failed');

  console.log('✅ Bagua Query Test PASSED!\n');

} catch (error) {
  console.error('❌ Bagua Query Test FAILED:', error);
  process.exit(1);
}

// Test 3: Performance Test
console.log('⚡ Test 3: Performance...');
try {
  const doc = new UniversalDocument();
  const startTime = Date.now();

  // Add 1000 items
  for (let i = 0; i < 1000; i++) {
    doc.addItem({
      type: UniversalDocument.ItemType.NOTIZZETTEL,
      position: { x: Math.random() * 4096, y: Math.random() * 4096, z: 0 },
      content: { index: i, data: `Item ${i}` }
    });
  }

  const addTime = Date.now() - startTime;
  console.log(`  ↳ Added 1000 items in ${addTime}ms`);

  // Serialize
  const serializeStart = Date.now();
  const binary = doc.toBinary();
  const serializeTime = Date.now() - serializeStart;
  console.log(`  ↳ Serialized in ${serializeTime}ms (${(binary.byteLength / 1024).toFixed(2)} KB)`);

  // Deserialize
  const deserializeStart = Date.now();
  const doc2 = UniversalDocument.fromBinary(binary);
  const deserializeTime = Date.now() - deserializeStart;
  console.log(`  ↳ Deserialized in ${deserializeTime}ms`);

  console.log('✅ Performance Test PASSED!\n');

} catch (error) {
  console.error('❌ Performance Test FAILED:', error);
  process.exit(1);
}

console.log('🎉 All tests passed! UniversalFile is production ready!\n');
