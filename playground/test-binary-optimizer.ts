#!/usr/bin/env npx ts-node
/**
 * 🧪 Binary Optimizer Test & Benchmark
 * ====================================
 * 
 * Tests all optimization techniques and measures actual compression gains.
 * Compares traditional vs optimized binary serialization.
 * 
 * Run with: npx ts-node playground/test-binary-optimizer.ts
 */

import { UniversalDocumentNexus } from '../src/core/μ6_UDNexus';
import NEXUSBinaryOptimizer, {
  VarIntEncoder,
  ContentAwareCompressor,
  QuantumEntanglementSerializer,
  DeltaCompressor,
  BloomFilter
} from '../src/core/μ8_BinaryOptimizer';
import { ItemType } from '../src/core/types';

console.log('🧪 NEXUS Binary Optimizer Test Suite\n');
console.log('=' .repeat(60));

// ============================================================================
// TEST 1: VARINT ENCODING
// ============================================================================

console.log('\n📊 TEST 1: Variable-Length Integer Encoding');
console.log('-'.repeat(40));

function testVarInt() {
  const testNumbers = [
    0, 1, 127,        // 1 byte each
    128, 255, 16383,  // 2 bytes each
    16384, 65535,     // 3 bytes each
    -1, -127, -128    // Negative numbers
  ];
  
  let totalOriginal = 0;
  let totalEncoded = 0;
  
  for (const num of testNumbers) {
    const encoded = VarIntEncoder.encode(num);
    const decoded = VarIntEncoder.decode(encoded);
    
    // Original: 4 bytes per int32
    totalOriginal += 4;
    totalEncoded += encoded.length;
    
    console.log(`  ${num.toString().padEnd(10)} → ${encoded.length} bytes (decoded: ${decoded.value})`);
  }
  
  const savings = ((totalOriginal - totalEncoded) / totalOriginal * 100).toFixed(1);
  console.log(`\n  ✅ Total: ${totalOriginal} → ${totalEncoded} bytes (${savings}% saved)`);
}

testVarInt();

// ============================================================================
// TEST 2: CONTENT-AWARE COMPRESSION
// ============================================================================

console.log('\n📊 TEST 2: Content-Aware Compression');
console.log('-'.repeat(40));

function testContentCompression() {
  // Test different content types
  const testCases = [
    {
      name: 'TypeScript Code',
      type: ItemType.KONSTRUKTOR,
      content: `
        export class UniversalComponent {
          constructor(private readonly config: Config) {
            this.initialize();
          }
          
          async initialize(): Promise<void> {
            const data = await this.fetchData();
            return this.process(data);
          }
          
          private async fetchData(): Promise<any[]> {
            const response = await fetch(this.config.endpoint);
            return response.json();
          }
        }
      `
    },
    {
      name: 'Structured Data',
      type: ItemType.TABELLE,
      content: [
        { id: 1, name: 'Item 1', value: 100, active: true },
        { id: 2, name: 'Item 2', value: 200, active: false },
        { id: 3, name: 'Item 3', value: 300, active: true },
        { id: 4, name: 'Item 4', value: 400, active: false },
      ]
    },
    {
      name: 'Plain Text',
      type: ItemType.NOTIZZETTEL,
      content: 'This is a simple note with some repetitive text. ' +
               'The text repeats patterns. The text repeats patterns. ' +
               'This creates opportunities for compression.'
    }
  ];
  
  for (const test of testCases) {
    const original = new TextEncoder().encode(JSON.stringify(test.content));
    const compressed = ContentAwareCompressor.compress(test.content, test.type);
    
    const ratio = (original.length / compressed.length).toFixed(2);
    const savings = ((original.length - compressed.length) / original.length * 100).toFixed(1);
    
    console.log(`  ${test.name.padEnd(20)} ${original.length} → ${compressed.length} bytes`);
    console.log(`                        Ratio: ${ratio}x, Saved: ${savings}%`);
  }
}

testContentCompression();

// ============================================================================
// TEST 3: QUANTUM ENTANGLEMENT
// ============================================================================

console.log('\n📊 TEST 3: Quantum Entanglement Blocks');
console.log('-'.repeat(40));

function testQuantumEntanglement() {
  // Create a NEXUS document with related items
  const nexus = new UniversalDocumentNexus();
  const origin = {
    host: 'test.local',
    path: '/test',
    tool: 'BinaryOptimizer-Test'
  };
  
  // Create spatially close items (will be entangled)
  const items = [];
  for (let i = 0; i < 5; i++) {
    const item = nexus.createItem({
      type: ItemType.FUNKTION,
      title: `Function_${i}`,
      position: { x: 100 + i * 10, y: 200 + i * 10, z: 0 }, // Close together
      dimensions: { width: 200, height: 150 },
      content: { code: `function process${i}() { return ${i}; }` },
      is_contextual: true
    }, origin);
    items.push(item);
  }
  
  // Analyze relationships
  const relationships = nexus.analyzeAndVisualizeRelationships();
  
  // Find entanglements
  const entanglements = QuantumEntanglementSerializer.findEntanglements(
    [...nexus.allItems], // Convert readonly to mutable
    relationships
  );
  
  console.log(`  Found ${entanglements.size} entanglement groups`);
  
  // Measure compression
  let originalSize = 0;
  let entangledSize = 0;
  
  for (const [entangleId, itemIds] of entanglements) {
    const entangledItems = nexus.allItems.filter(item => itemIds.includes(item.id));
    
    // Original: each item serialized separately
    for (const item of entangledItems) {
      originalSize += new TextEncoder().encode(JSON.stringify(item)).length;
    }
    
    // Entangled: items serialized together
    const entangleBytes = QuantumEntanglementSerializer.serializeEntanglement(
      entangledItems,
      entangleId
    );
    entangledSize += entangleBytes.length;
    
    console.log(`  Group ${entangleId}: ${entangledItems.length} items`);
    console.log(`    Original: ${originalSize} bytes`);
    console.log(`    Entangled: ${entangledSize} bytes`);
  }
  
  if (originalSize > 0) {
    const savings = ((originalSize - entangledSize) / originalSize * 100).toFixed(1);
    console.log(`  ✅ Total savings: ${savings}%`);
  }
}

testQuantumEntanglement();

// ============================================================================
// TEST 4: BLOOM FILTER
// ============================================================================

console.log('\n📊 TEST 4: Bloom Filter for Relationships');
console.log('-'.repeat(40));

function testBloomFilter() {
  const bloom = new BloomFilter(1000, 0.01);
  
  // Add some relationships
  const relationships = [
    { from: 'item_1', to: 'item_2' },
    { from: 'item_2', to: 'item_3' },
    { from: 'item_3', to: 'item_4' },
    { from: 'item_1', to: 'item_4' }
  ];
  
  for (const rel of relationships) {
    bloom.add(rel.from, rel.to);
  }
  
  // Test lookups
  console.log('  Testing relationship lookups:');
  
  const tests = [
    { from: 'item_1', to: 'item_2', expected: true },
    { from: 'item_2', to: 'item_3', expected: true },
    { from: 'item_1', to: 'item_3', expected: false },
    { from: 'item_4', to: 'item_1', expected: false }
  ];
  
  let correct = 0;
  for (const test of tests) {
    const result = bloom.mayHave(test.from, test.to);
    const status = (result === test.expected || (result && !test.expected)) ? '✓' : '✗';
    console.log(`    ${test.from} → ${test.to}: ${result} ${status}`);
    if (status === '✓') correct++;
  }
  
  // Measure size
  const serialized = bloom.serialize();
  const alternativeSize = relationships.length * 64; // Rough estimate for storing as strings
  
  console.log(`\n  Bloom filter size: ${serialized.length} bytes`);
  console.log(`  Alternative (list): ~${alternativeSize} bytes`);
  console.log(`  Space savings: ${((alternativeSize - serialized.length) / alternativeSize * 100).toFixed(1)}%`);
  console.log(`  Accuracy: ${(correct / tests.length * 100).toFixed(0)}%`);
}

testBloomFilter();

// ============================================================================
// TEST 5: COMPLETE DOCUMENT OPTIMIZATION
// ============================================================================

console.log('\n📊 TEST 5: Complete Document Optimization');
console.log('-'.repeat(40));

async function testCompleteOptimization() {
  // Create a realistic document
  const nexus = new UniversalDocumentNexus();
  const origin = {
    host: 'benchmark.local',
    path: '/workspace',
    tool: 'Optimizer-Benchmark'
  };
  
  // Add various items
  console.log('  Creating test document...');
  
  // Templates
  for (let i = 0; i < 3; i++) {
    nexus.createItem({
      type: ItemType.KONSTRUKTOR,
      title: `Template_${i}`,
      position: { x: i * 300, y: 0, z: 0 },
      dimensions: { width: 250, height: 200 },
      content: {
        code: `
          class Template${i} extends BaseTemplate {
            constructor() { super(); }
            render() { return '<div>Template ${i}</div>'; }
          }
        `
      },
      is_contextual: true
    }, origin);
  }
  
  // Functions
  for (let i = 0; i < 5; i++) {
    nexus.createItem({
      type: ItemType.FUNKTION,
      title: `Process_${i}`,
      position: { x: i * 200, y: 300, z: 0 },
      dimensions: { width: 180, height: 120 },
      content: {
        code: `async function process${i}(data) { 
          return data.map(x => x * ${i + 1}); 
        }`
      },
      is_contextual: true
    }, origin);
  }
  
  // Data items
  for (let i = 0; i < 4; i++) {
    nexus.createItem({
      type: ItemType.DATABASE,
      title: `DataStore_${i}`,
      position: { x: i * 250, y: 600, z: 0 },
      dimensions: { width: 200, height: 150 },
      content: {
        schema: { id: 'number', name: 'string', value: 'number' },
        data: Array(10).fill(0).map((_, j) => ({
          id: j,
          name: `Item_${j}`,
          value: Math.random() * 100
        }))
      },
      is_contextual: false
    }, origin);
  }
  
  // Generate relationships
  const relationships = nexus.analyzeAndVisualizeRelationships();
  
  console.log(`  Created ${nexus.allItems.length} items with ${relationships.length} relationships`);
  
  // OPTIMIZE!
  console.log('\n  Running optimization...\n');
  
  const result = NEXUSBinaryOptimizer.optimize(
    [...nexus.allItems], // Convert readonly to mutable
    relationships,
    nexus.metadata
  );
  
  // Display results
  console.log('\n🎯 OPTIMIZATION RESULTS:');
  console.log('=' .repeat(60));
  console.log(`  Original size:    ${result.stats.originalSize.toLocaleString()} bytes`);
  console.log(`  Optimized size:   ${result.stats.optimizedSize.toLocaleString()} bytes`);
  console.log(`  Compression:      ${result.stats.compressionRatio.toFixed(2)}x`);
  console.log(`  Space saved:      ${((1 - 1/result.stats.compressionRatio) * 100).toFixed(1)}%`);
  console.log(`\n  Techniques applied:`);
  result.stats.techniques.forEach(tech => {
    console.log(`    ✓ ${tech}`);
  });
  
  // Calculate theoretical minimum (entropy)
  const jsonString = JSON.stringify({ 
    items: nexus.allItems, 
    relationships, 
    metadata: nexus.metadata 
  });
  const uniqueChars = new Set(jsonString).size;
  const entropy = -Array.from(jsonString).reduce((sum, char) => {
    const freq = (jsonString.match(new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length / jsonString.length;
    return sum + (freq > 0 ? freq * Math.log2(freq) : 0);
  }, 0);
  const theoreticalMin = Math.ceil(jsonString.length * entropy / 8);
  
  console.log(`\n  Theoretical minimum: ${theoreticalMin.toLocaleString()} bytes`);
  console.log(`  Efficiency: ${(theoreticalMin / result.stats.optimizedSize * 100).toFixed(1)}%`);
}

testCompleteOptimization();

// ============================================================================
// PERFORMANCE COMPARISON
// ============================================================================

console.log('\n\n⚡ PERFORMANCE METRICS');
console.log('=' .repeat(60));

function measurePerformance() {
  const iterations = 1000;
  
  // Test VarInt encoding speed
  console.time('  VarInt encoding (1000x)');
  for (let i = 0; i < iterations; i++) {
    VarIntEncoder.encode(Math.floor(Math.random() * 1000000));
  }
  console.timeEnd('  VarInt encoding (1000x)');
  
  // Test compression speed
  const testData = 'test data '.repeat(100);
  console.time('  Content compression (1000x)');
  for (let i = 0; i < iterations; i++) {
    ContentAwareCompressor.compress(testData, ItemType.NOTIZZETTEL);
  }
  console.timeEnd('  Content compression (1000x)');
  
  // Test Bloom filter speed
  const bloom = new BloomFilter(10000);
  console.time('  Bloom filter ops (1000x)');
  for (let i = 0; i < iterations; i++) {
    bloom.add(`id_${i}`, `id_${i + 1}`);
    bloom.mayHave(`id_${i}`, `id_${i + 1}`);
  }
  console.timeEnd('  Bloom filter ops (1000x)');
}

measurePerformance();

console.log('\n✅ All tests completed!\n');