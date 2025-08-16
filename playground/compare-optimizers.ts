#!/usr/bin/env npx ts-node
/**
 * ⚔️ OPTIMIZER BATTLE: Traditional vs Algebraic
 * =============================================
 * 
 * Head-to-head comparison of compression performance and speed.
 * 
 * Run with: npx ts-node playground/compare-optimizers.ts
 */

import { UniversalDocumentNexus } from '../src/core/μ6_UDNexus';
import NEXUSBinaryOptimizer from '../src/core/μ8_BinaryOptimizer';
import AlgebraicBinaryOptimizer from '../src/core/μ8_BinaryOptimizerAlgebraic';
import { ItemType } from '../src/core/types';

console.log('⚔️ OPTIMIZER BATTLE: Traditional vs Algebraic\n');

// Create test document
function createTestDocument() {
  const nexus = new UniversalDocumentNexus();
  const origin = {
    host: 'battle.test',
    path: '/benchmark',
    tool: 'OptimizerBattle'
  };
  
  // Add 20 items for meaningful test
  for (let i = 0; i < 20; i++) {
    nexus.createItem({
      type: i % 2 === 0 ? ItemType.FUNKTION : ItemType.KONSTRUKTOR,
      title: `TestItem_${i}`,
      position: { 
        x: (i % 5) * 100, 
        y: Math.floor(i / 5) * 100, 
        z: 0 
      },
      dimensions: { width: 200, height: 150 },
      content: { 
        data: `Item ${i} `.repeat(10),
        value: i * 10
      },
      is_contextual: true
    }, origin);
  }
  
  const relationships = nexus.analyzeAndVisualizeRelationships();
  return { items: [...nexus.allItems], relationships, metadata: nexus.metadata };
}

// Performance benchmark
function benchmark(name: string, fn: () => any, iterations: number = 100): any {
  const start = process.hrtime.bigint();
  let result;
  
  for (let i = 0; i < iterations; i++) {
    result = fn();
  }
  
  const end = process.hrtime.bigint();
  const timeMs = Number(end - start) / 1_000_000 / iterations;
  
  console.log(`  ${name}: ${timeMs.toFixed(3)}ms avg`);
  return result;
}

async function runBattle() {
  console.log('🔧 Creating test document...');
  const testData = createTestDocument();
  
  console.log(`📊 Test data: ${testData.items.length} items, ${testData.relationships.length} relationships\n`);
  
  // ROUND 1: COMPRESSION RATIO
  console.log('🥊 ROUND 1: Compression Battle');
  console.log('=' .repeat(50));
  
  console.log('\n🔵 Traditional Optimizer:');
  const traditionalResult = NEXUSBinaryOptimizer.optimize(
    testData.items,
    testData.relationships,
    testData.metadata
  );
  
  console.log('\n🟡 Algebraic Optimizer:');
  const algebraicResult = AlgebraicBinaryOptimizer.optimize(
    testData.items,
    testData.relationships,
    testData.metadata
  );
  
  // Compare results
  console.log('\n🎯 COMPRESSION COMPARISON:');
  console.log('-'.repeat(30));
  console.log(`Traditional: ${traditionalResult.stats.originalSize} → ${traditionalResult.stats.optimizedSize} bytes (${traditionalResult.stats.compressionRatio.toFixed(2)}x)`);
  console.log(`Algebraic:   ${algebraicResult.stats.originalSize} → ${algebraicResult.stats.optimizedSize} bytes (${algebraicResult.stats.compressionRatio.toFixed(2)}x)`);
  
  const winner = traditionalResult.stats.compressionRatio > algebraicResult.stats.compressionRatio ? 'Traditional' : 'Algebraic';
  console.log(`\n🏆 Compression Winner: ${winner}`);
  
  // ROUND 2: SPEED BATTLE
  console.log('\n\n🥊 ROUND 2: Speed Battle');
  console.log('=' .repeat(50));
  
  console.log('\n🔵 Traditional Speed:');
  benchmark('Traditional Optimize', () => 
    NEXUSBinaryOptimizer.optimize(testData.items, testData.relationships, testData.metadata)
  );
  
  console.log('\n🟡 Algebraic Speed:');
  benchmark('Algebraic Optimize', () => 
    AlgebraicBinaryOptimizer.optimize(testData.items, testData.relationships, testData.metadata)
  );
  
  // ROUND 3: MEMORY USAGE
  console.log('\n\n🥊 ROUND 3: Memory Analysis');
  console.log('=' .repeat(50));
  
  const memBefore = process.memoryUsage();
  
  // Traditional
  for (let i = 0; i < 50; i++) {
    NEXUSBinaryOptimizer.optimize(testData.items, testData.relationships, testData.metadata);
  }
  
  const memTraditional = process.memoryUsage();
  
  // Algebraic
  for (let i = 0; i < 50; i++) {
    AlgebraicBinaryOptimizer.optimize(testData.items, testData.relationships, testData.metadata);
  }
  
  const memAlgebraic = process.memoryUsage();
  
  console.log(`Traditional heap: ${((memTraditional.heapUsed - memBefore.heapUsed) / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Algebraic heap:   ${((memAlgebraic.heapUsed - memTraditional.heapUsed) / 1024 / 1024).toFixed(2)}MB`);
  
  // FINAL RESULTS
  console.log('\n\n🏆 FINAL BATTLE RESULTS');
  console.log('=' .repeat(50));
  
  console.log('\n📊 Traditional Optimizer:');
  console.log(`  ✓ Techniques: ${traditionalResult.stats.techniques.length}`);
  console.log(`  ✓ Compression: ${traditionalResult.stats.compressionRatio.toFixed(2)}x`);
  
  console.log('\n🧮 Algebraic Optimizer:');
  console.log(`  ✓ Techniques: ${algebraicResult.stats.techniques.length}`);
  console.log(`  ✓ Compression: ${algebraicResult.stats.compressionRatio.toFixed(2)}x`);
  console.log(`  ✓ Branch-free operations`);
  console.log(`  ✓ Predictable performance`);
  
  console.log('\n🎖️ WINNER: Both have unique strengths!');
  console.log('  Traditional: Better for complex patterns');
  console.log('  Algebraic: Better for predictable performance');
}

runBattle();