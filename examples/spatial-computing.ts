#!/usr/bin/env ts-node

/**
 * Spatial Computing Example for UniversalFile
 * 
 * This example demonstrates advanced spatial computing features:
 * - 3D positioning and layers
 * - Minimap generation
 * - Spatial queries and collision detection
 * - Relationship mapping
 * - Immersive workspace simulation
 */

import { UniversalDocument } from '../universalDocument';
import * as fs from 'fs';

console.log('🌐 UniversalFile Spatial Computing Example\n');

// Create a new spatial document
const doc = new UniversalDocument();
console.log('📄 Created new spatial document');

// Define origin for workspace
const origin = {
  host: 'workspace.local',
  path: '/spatial-computing/demo',
  tool: 'Spatial Computing Example'
};

// 1. Create a 3D workspace with multiple layers
console.log('\n1️⃣ Creating 3D workspace with layers...');

// Background layer (z = -1)
const background = doc.createItem({
  type: UniversalDocument.ItemType.MEDIA,
  title: 'Workspace Background',
  position: { x: 0, y: 0, z: -1 },
  dimensions: { width: 2000, height: 1500 },
  content: {
    type: 'image',
    url: 'workspace-background.jpg',
    opacity: 0.1
  },
  is_contextual: true
}, origin);

// Main content layer (z = 0)
const projects = [
  { name: 'Project Alpha', x: 200, y: 200, color: '#FF6B6B' },
  { name: 'Project Beta', x: 700, y: 200, color: '#4ECDC4' },
  { name: 'Project Gamma', x: 1200, y: 200, color: '#45B7D1' },
  { name: 'Project Delta', x: 200, y: 700, color: '#96CEB4' },
  { name: 'Project Epsilon', x: 700, y: 700, color: '#FECA57' }
];

const projectItems = projects.map(project => 
  doc.createItem({
    type: UniversalDocument.ItemType.NOTIZZETTEL,
    title: project.name,
    position: { x: project.x, y: project.y, z: 0 },
    dimensions: { width: 300, height: 200 },
    content: `${project.name} - Main project documentation and overview`,
    is_contextual: false,
    bagua_descriptor: UniversalDocument.BAGUA.KUN |    // Data Container
                     UniversalDocument.BAGUA.LI |     // Searchable
                     UniversalDocument.BAGUA.TAIJI    // Active
  }, origin)
);

// Add sub-items around each project
projectItems.forEach((project, index) => {
  const baseX = project.position.x;
  const baseY = project.position.y;
  
  // Task list
  doc.createItem({
    type: UniversalDocument.ItemType.TABELLE,
    title: `${project.title} Tasks`,
    position: { x: baseX + 350, y: baseY, z: 0 },
    dimensions: { width: 250, height: 150 },
    content: {
      headers: ['Task', 'Status'],
      rows: [
        ['Design', '✅'],
        ['Development', '🔄'],
        ['Testing', '📋'],
        ['Deploy', '⏳']
      ]
    },
    is_contextual: false,
    bagua_descriptor: UniversalDocument.BAGUA.ZHEN |   // Actionable
                     UniversalDocument.BAGUA.DUI |    // Interactive
                     UniversalDocument.BAGUA.KAN      // Linked
  }, origin);
  
  // Code snippets
  doc.createItem({
    type: UniversalDocument.ItemType.CODE,
    title: `${project.title} Code`,
    position: { x: baseX - 300, y: baseY + 50, z: 0 },
    dimensions: { width: 280, height: 180 },
    content: {
      language: 'typescript',
      code: `// ${project.title} implementation
class ${project.title.replace(' ', '')} {
  constructor() {
    this.initialize();
  }
  
  initialize() {
    console.log('${project.title} initialized');
  }
}`
    },
    is_contextual: false,
    bagua_descriptor: UniversalDocument.BAGUA.GEN |    // Fixed
                     UniversalDocument.BAGUA.LI |     // Searchable
                     UniversalDocument.BAGUA.KAN      // Linked
  }, origin);
});

// Overlay layer (z = 1) - Analytics and monitoring
const analytics = doc.createItem({
  type: UniversalDocument.ItemType.CHART,
  title: 'Workspace Analytics',
  position: { x: 1400, y: 100, z: 1 },
  dimensions: { width: 400, height: 300 },
  content: {
    type: 'dashboard',
    metrics: {
      'Total Projects': 5,
      'Active Items': 15,
      'Completed Tasks': 8,
      'Pending Tasks': 12
    },
    charts: [
      { type: 'pie', data: 'project_completion' },
      { type: 'line', data: 'progress_over_time' }
    ]
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.LI |      // Searchable
                   UniversalDocument.BAGUA.XUN |     // Dynamic
                   UniversalDocument.BAGUA.TAIJI     // Active
}, origin);

console.log(`   ✅ Created 3D workspace with ${doc.allItems.length} items across 3 layers`);

// 2. Generate minimap data
console.log('\n2️⃣ Generating minimap visualization...');

// Simulate minimap generation
const minimap = {
  generateMinimapData: () => {
    const items = doc.allItems;
    const minimapItems = items.map(item => ({
      id: item.id,
      position: item.position,
      dimensions: item.dimensions,
      title: item.title,
      type: item.type,
      active: (item.bagua_descriptor & UniversalDocument.BAGUA.TAIJI) !== 0,
      color: getBaguaColor(item.bagua_descriptor)
    }));
    
    // Calculate bounds
    const positions = items.map(item => ({
      x: item.position.x,
      y: item.position.y,
      right: item.position.x + item.dimensions.width,
      bottom: item.position.y + item.dimensions.height
    }));
    
    const bounds = {
      minX: Math.min(...positions.map(p => p.x)),
      minY: Math.min(...positions.map(p => p.y)),
      maxX: Math.max(...positions.map(p => p.right)),
      maxY: Math.max(...positions.map(p => p.bottom))
    };
    
    // Organize by layers
    const layers = items.reduce((acc, item) => {
      const layer = item.position.z;
      if (!acc[layer]) acc[layer] = [];
      acc[layer].push(minimapItems.find(mi => mi.id === item.id));
      return acc;
    }, {} as Record<number, any[]>);
    
    return { items: minimapItems, bounds, layers };
  }
};

function getBaguaColor(bagua: number): string {
  if (bagua & UniversalDocument.BAGUA.TAIJI) return '#FFD700'; // Gold for Active
  if (bagua & UniversalDocument.BAGUA.ZHEN) return '#FF6347';  // Tomato for Action
  if (bagua & UniversalDocument.BAGUA.DUI) return '#4682B4';   // Steel Blue for Interactive
  if (bagua & UniversalDocument.BAGUA.LI) return '#90EE90';    // Light Green for Searchable
  if (bagua & UniversalDocument.BAGUA.KAN) return '#20B2AA';   // Light Sea Green for Linked
  return '#D3D3D3'; // Default gray
}

const minimapData = minimap.generateMinimapData();

console.log(`   📊 Minimap generated:`);
console.log(`      Items: ${minimapData.items.length}`);
console.log(`      Bounds: (${minimapData.bounds.minX},${minimapData.bounds.minY}) to (${minimapData.bounds.maxX},${minimapData.bounds.maxY})`);
console.log(`      Layers: ${Object.keys(minimapData.layers).join(', ')}`);

// Display layer information
Object.keys(minimapData.layers).forEach(layer => {
  console.log(`      Layer ${layer}: ${minimapData.layers[layer].length} items`);
});

// 3. Spatial queries and collision detection
console.log('\n3️⃣ Performing spatial queries...');

// Find items in specific regions
const topLeftRegion = doc.allItems.filter(item => 
  item.position.x < 500 && item.position.y < 400
);

const centerRegion = doc.allItems.filter(item => 
  item.position.x >= 500 && item.position.x < 1000 &&
  item.position.y >= 300 && item.position.y < 800
);

const activeItems = doc.allItems.filter(item => 
  (item.bagua_descriptor & UniversalDocument.BAGUA.TAIJI) !== 0
);

console.log(`   📍 Spatial query results:`);
console.log(`      Top-left region: ${topLeftRegion.length} items`);
console.log(`      Center region: ${centerRegion.length} items`);
console.log(`      Active items: ${activeItems.length} items`);

// Collision detection
function checkCollision(item1: any, item2: any): boolean {
  const rect1 = {
    left: item1.position.x,
    right: item1.position.x + item1.dimensions.width,
    top: item1.position.y,
    bottom: item1.position.y + item1.dimensions.height
  };
  
  const rect2 = {
    left: item2.position.x,
    right: item2.position.x + item2.dimensions.width,
    top: item2.position.y,
    bottom: item2.position.y + item2.dimensions.height
  };
  
  return !(rect1.right < rect2.left || 
           rect1.left > rect2.right || 
           rect1.bottom < rect2.top || 
           rect1.top > rect2.bottom);
}

const items = doc.allItems.filter(item => item.position.z === 0); // Same layer
const collisions = [];

for (let i = 0; i < items.length; i++) {
  for (let j = i + 1; j < items.length; j++) {
    if (checkCollision(items[i], items[j])) {
      collisions.push({ item1: items[i], item2: items[j] });
    }
  }
}

console.log(`   💥 Collision detection: ${collisions.length} overlapping items`);

// 4. Relationship mapping
console.log('\n4️⃣ Analyzing spatial relationships...');

// Find items that are spatially related (nearby)
function findNearbyItems(item: any, threshold: number = 100): any[] {
  return doc.allItems.filter(other => {
    if (other.id === item.id) return false;
    
    const distance = Math.sqrt(
      Math.pow(item.position.x - other.position.x, 2) +
      Math.pow(item.position.y - other.position.y, 2)
    );
    
    return distance < threshold;
  });
}

const relationships = doc.allItems.map(item => ({
  item,
  nearby: findNearbyItems(item, 400),
  connections: []
}));

// Add logical connections based on Bagua properties
relationships.forEach(rel => {
  const item = rel.item;
  
  // Items with KAN (linked) property connect to nearby items
  if (item.bagua_descriptor & UniversalDocument.BAGUA.KAN) {
    rel.connections.push(...rel.nearby.map(nearby => ({
      type: 'spatial_link',
      target: nearby.id,
      strength: 0.8
    })));
  }
  
  // Items with same type are conceptually related
  const sameType = doc.allItems.filter(other => 
    other.type === item.type && other.id !== item.id
  );
  rel.connections.push(...sameType.map(similar => ({
    type: 'type_similarity',
    target: similar.id,
    strength: 0.6
  })));
});

const totalConnections = relationships.reduce((sum, rel) => sum + rel.connections.length, 0);
console.log(`   🔗 Relationship analysis:`);
console.log(`      Total relationships: ${totalConnections}`);
console.log(`      Average connections per item: ${(totalConnections / doc.allItems.length).toFixed(2)}`);

// 5. Simulate workspace navigation
console.log('\n5️⃣ Simulating workspace navigation...');

// Create a virtual camera/viewport
const viewport = {
  x: 0,
  y: 0,
  width: 1024,
  height: 768,
  zoom: 1.0
};

function getVisibleItems(viewport: any) {
  return doc.allItems.filter(item => {
    const itemBounds = {
      left: item.position.x,
      right: item.position.x + item.dimensions.width,
      top: item.position.y,
      bottom: item.position.y + item.dimensions.height
    };
    
    const viewBounds = {
      left: viewport.x,
      right: viewport.x + viewport.width,
      top: viewport.y,
      bottom: viewport.y + viewport.height
    };
    
    return !(itemBounds.right < viewBounds.left ||
             itemBounds.left > viewBounds.right ||
             itemBounds.bottom < viewBounds.top ||
             itemBounds.top > viewBounds.bottom);
  });
}

// Simulate navigation sequence
const navigationSequence = [
  { x: 0, y: 0, description: 'Start at origin' },
  { x: 500, y: 400, description: 'Move to center workspace' },
  { x: 1200, y: 200, description: 'Navigate to Project Gamma' },
  { x: 1400, y: 100, description: 'Check analytics overlay' },
  { x: 200, y: 700, description: 'Visit Project Delta' }
];

console.log(`   🧭 Navigation simulation:`);
navigationSequence.forEach((pos, index) => {
  viewport.x = pos.x - viewport.width / 2;
  viewport.y = pos.y - viewport.height / 2;
  
  const visible = getVisibleItems(viewport);
  console.log(`      ${index + 1}. ${pos.description}`);
  console.log(`         Visible items: ${visible.length}`);
  console.log(`         Viewport: (${viewport.x.toFixed(0)}, ${viewport.y.toFixed(0)})`);
});

// 6. Export spatial data
console.log('\n6️⃣ Exporting spatial data...');

const spatialExport = {
  metadata: {
    format: 'UniversalFile Spatial Export',
    version: '2.7.0-kira',
    timestamp: new Date().toISOString(),
    bounds: minimapData.bounds,
    itemCount: doc.allItems.length,
    layerCount: Object.keys(minimapData.layers).length
  },
  layers: minimapData.layers,
  relationships: relationships.map(rel => ({
    itemId: rel.item.id,
    connections: rel.connections
  })),
  collisions: collisions.map(collision => ({
    item1: collision.item1.id,
    item2: collision.item2.id
  })),
  analytics: {
    totalConnections,
    averageConnectionsPerItem: totalConnections / doc.allItems.length,
    spatialDensity: doc.allItems.length / ((minimapData.bounds.maxX - minimapData.bounds.minX) * (minimapData.bounds.maxY - minimapData.bounds.minY) / 1000000),
    layerDistribution: Object.keys(minimapData.layers).reduce((acc, layer) => {
      acc[layer] = minimapData.layers[layer].length;
      return acc;
    }, {} as Record<string, number>)
  }
};

// Save spatial data
fs.writeFileSync('examples/spatial-export.json', JSON.stringify(spatialExport, null, 2));
console.log('   💾 Spatial data exported to examples/spatial-export.json');

// Save binary document
const binary = doc.toBinary();
fs.writeFileSync('examples/spatial-workspace.ud', Buffer.from(binary));
console.log(`   💾 Spatial workspace saved to examples/spatial-workspace.ud (${binary.byteLength} bytes)`);

// 7. Performance analysis
console.log('\n7️⃣ Performance analysis...');

const performanceMetrics = {
  itemCount: doc.allItems.length,
  binarySize: binary.byteLength,
  averageBytesPerItem: binary.byteLength / doc.allItems.length,
  spatialQueries: {
    topLeft: topLeftRegion.length,
    center: centerRegion.length,
    active: activeItems.length
  },
  relationshipAnalysis: {
    totalConnections,
    averagePerItem: totalConnections / doc.allItems.length
  },
  collisionDetection: {
    totalCollisions: collisions.length,
    collisionRate: (collisions.length / (doc.allItems.length * (doc.allItems.length - 1) / 2)) * 100
  }
};

console.log(`   📊 Performance metrics:`);
console.log(`      Items: ${performanceMetrics.itemCount}`);
console.log(`      Binary size: ${performanceMetrics.binarySize} bytes`);
console.log(`      Avg bytes/item: ${performanceMetrics.averageBytesPerItem.toFixed(2)}`);
console.log(`      Spatial queries: ${JSON.stringify(performanceMetrics.spatialQueries)}`);
console.log(`      Relationships: ${performanceMetrics.relationshipAnalysis.totalConnections} total, ${performanceMetrics.relationshipAnalysis.averagePerItem.toFixed(2)} avg/item`);
console.log(`      Collisions: ${performanceMetrics.collisionDetection.totalCollisions} (${performanceMetrics.collisionDetection.collisionRate.toFixed(2)}% rate)`);

console.log('\n🌐 Spatial computing example completed successfully!');
console.log('✨ You now understand advanced spatial features of UniversalFile!');
console.log('🎯 Ready to build immersive spatial applications!');