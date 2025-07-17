#!/usr/bin/env ts-node

/**
 * AI Integration Example for UniversalFile
 * 
 * This example demonstrates AI-enhanced workflows:
 * - Vector database integration
 * - Semantic search capabilities
 * - AI-generated content tracking
 * - Knowledge graph construction
 * - Automated content enhancement
 */

import { UniversalDocument } from '../universalDocument';
import * as fs from 'fs';

console.log('🤖 UniversalFile AI Integration Example\n');

// Create a new AI-enhanced document
const doc = new UniversalDocument();
console.log('📄 Created new AI-enhanced document');

// Define AI agent origin
const aiOrigin = {
  host: 'ai-cluster.local',
  path: '/models/gpt-4',
  tool: 'AI Integration Example'
};

// Define user origin
const userOrigin = {
  host: 'localhost',
  path: '/examples/ai-integration',
  tool: 'AI Integration Example'
};

// 1. Create initial knowledge base
console.log('\n1️⃣ Creating initial knowledge base...');

const knowledgeItems = [
  {
    title: 'Machine Learning Fundamentals',
    content: `Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. Key concepts include supervised learning, unsupervised learning, and reinforcement learning.`,
    category: 'education',
    tags: ['ml', 'ai', 'fundamentals']
  },
  {
    title: 'Neural Networks Deep Dive',
    content: `Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information using connectionist approaches. Deep learning uses multiple layers to progressively extract higher-level features.`,
    category: 'technical',
    tags: ['neural-networks', 'deep-learning', 'architecture']
  },
  {
    title: 'Data Science Workflow',
    content: `A typical data science workflow includes data collection, cleaning, exploration, modeling, validation, and deployment. Each step requires specific tools and techniques to ensure quality results.`,
    category: 'process',
    tags: ['data-science', 'workflow', 'methodology']
  },
  {
    title: 'AI Ethics and Bias',
    content: `AI systems can perpetuate and amplify biases present in training data. Ethical AI development requires careful consideration of fairness, transparency, accountability, and social impact.`,
    category: 'ethics',
    tags: ['ethics', 'bias', 'fairness', 'responsibility']
  },
  {
    title: 'Computer Vision Applications',
    content: `Computer vision enables machines to interpret and understand visual information. Applications include object detection, image classification, medical imaging, autonomous vehicles, and augmented reality.`,
    category: 'applications',
    tags: ['computer-vision', 'applications', 'image-processing']
  }
];

const knowledgeBase = knowledgeItems.map((item, index) => 
  doc.createItem({
    type: UniversalDocument.ItemType.NOTIZZETTEL,
    title: item.title,
    position: { x: 100 + (index % 3) * 400, y: 100 + Math.floor(index / 3) * 300, z: 0 },
    dimensions: { width: 350, height: 200 },
    content: item.content,
    is_contextual: false,
    bagua_descriptor: UniversalDocument.BAGUA.KUN |    // Data Container
                     UniversalDocument.BAGUA.LI |     // Searchable
                     UniversalDocument.BAGUA.XUN      // Dynamic
  }, userOrigin)
);

console.log(`   ✅ Created knowledge base with ${knowledgeBase.length} items`);

// 2. Create vector database for semantic search
console.log('\n2️⃣ Creating vector database for semantic search...');

// Simulate vector embeddings (in real implementation, use actual embedding model)
function generateSimulatedEmbedding(text: string): number[] {
  // Simple hash-based simulation for demonstration
  const hash = text.split('').reduce((acc, char) => {
    return ((acc << 5) - acc + char.charCodeAt(0)) & 0xffffffff;
  }, 0);
  
  // Generate 384-dimensional vector (typical for sentence transformers)
  const embedding = [];
  for (let i = 0; i < 384; i++) {
    embedding.push(Math.sin(hash + i) * 0.1 + Math.cos(hash * 2 + i) * 0.05);
  }
  
  return embedding;
}

const vectorDatabase = doc.createItem({
  type: UniversalDocument.ItemType.DATABASE,
  title: 'AI Knowledge Vectors',
  position: { x: 100, y: 700, z: 0 },
  dimensions: { width: 800, height: 300 },
  content: {
    model: 'sentence-transformers/all-MiniLM-L6-v2',
    dimensions: 384,
    vectors: knowledgeBase.map(item => ({
      id: item.id,
      embedding: generateSimulatedEmbedding(item.content as string),
      metadata: {
        title: item.title,
        content: item.content,
        created_at: item.created_at
      }
    })),
    index_type: 'faiss',
    similarity_metric: 'cosine'
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.DATABASE |
                   UniversalDocument.BAGUA.LI |     // Searchable
                   UniversalDocument.BAGUA.XUN |    // Dynamic
                   UniversalDocument.BAGUA.TAIJI    // Active
}, aiOrigin);

console.log(`   ✅ Created vector database with ${knowledgeBase.length} embeddings`);

// 3. Implement semantic search functionality
console.log('\n3️⃣ Implementing semantic search...');

function semanticSearch(query: string, threshold: number = 0.7): any[] {
  const queryEmbedding = generateSimulatedEmbedding(query);
  const vectorDB = vectorDatabase.content;
  
  // Calculate cosine similarity
  const similarities = vectorDB.vectors.map((vector: any) => {
    const dotProduct = queryEmbedding.reduce((sum, val, i) => sum + val * vector.embedding[i], 0);
    const queryMagnitude = Math.sqrt(queryEmbedding.reduce((sum, val) => sum + val * val, 0));
    const vectorMagnitude = Math.sqrt(vector.embedding.reduce((sum: number, val: number) => sum + val * val, 0));
    
    return {
      id: vector.id,
      similarity: dotProduct / (queryMagnitude * vectorMagnitude),
      metadata: vector.metadata
    };
  });
  
  return similarities
    .filter(result => result.similarity > threshold)
    .sort((a, b) => b.similarity - a.similarity);
}

// Test semantic search
const queries = [
  'neural networks and deep learning',
  'ethical considerations in AI',
  'computer vision applications',
  'data preprocessing techniques'
];

console.log(`   🔍 Semantic search results:`);
queries.forEach(query => {
  const results = semanticSearch(query, 0.5);
  console.log(`      Query: "${query}"`);
  console.log(`      Results: ${results.length} matches`);
  results.slice(0, 2).forEach(result => {
    console.log(`        - ${result.metadata.title} (similarity: ${result.similarity.toFixed(3)})`);
  });
});

// 4. Generate AI-enhanced content
console.log('\n4️⃣ Generating AI-enhanced content...');

// Simulate AI content generation
function generateAIContent(prompt: string, context: any[]): any {
  const contextTitles = context.map(c => c.metadata.title).join(', ');
  
  const responses = {
    'summary': `Based on the knowledge base covering ${contextTitles}, here's a comprehensive summary: AI and machine learning represent transformative technologies that combine mathematical algorithms with vast datasets to create intelligent systems. Key considerations include technical implementation, ethical implications, and practical applications across various domains.`,
    'connections': `The knowledge base reveals interconnected concepts: Machine learning fundamentals provide the foundation for neural networks, which enable computer vision applications. Throughout this technological landscape, ethical considerations and robust data science workflows ensure responsible development and deployment.`,
    'recommendations': `To expand this knowledge base, consider adding: 1) Natural Language Processing fundamentals, 2) Reinforcement Learning applications, 3) AI deployment and MLOps practices, 4) Explainable AI techniques, and 5) Real-world case studies demonstrating successful AI implementations.`
  };
  
  return responses[prompt as keyof typeof responses] || 'AI response generated based on context.';
}

// Generate AI summaries
const aiSummary = doc.createItem({
  type: UniversalDocument.ItemType.AI_GENERATED,
  title: 'AI Knowledge Summary',
  position: { x: 1000, y: 100, z: 1 },
  dimensions: { width: 400, height: 250 },
  content: {
    prompt: 'Generate a summary of the AI knowledge base',
    context_items: knowledgeBase.map(item => item.id),
    model: 'gpt-4',
    response: generateAIContent('summary', knowledgeBase),
    confidence: 0.89,
    tokens_used: 156,
    generation_time: 2.3
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.AI_GENERATED |
                   UniversalDocument.BAGUA.LI |     // Searchable
                   UniversalDocument.BAGUA.XUN |    // Dynamic
                   UniversalDocument.BAGUA.TAIJI    // Active
}, aiOrigin);

const aiConnections = doc.createItem({
  type: UniversalDocument.ItemType.AI_GENERATED,
  title: 'Concept Connections',
  position: { x: 1000, y: 400, z: 1 },
  dimensions: { width: 400, height: 200 },
  content: {
    prompt: 'Identify connections between concepts in the knowledge base',
    context_items: knowledgeBase.map(item => item.id),
    model: 'gpt-4',
    response: generateAIContent('connections', knowledgeBase),
    confidence: 0.92,
    tokens_used: 142,
    generation_time: 1.8
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.AI_GENERATED |
                   UniversalDocument.BAGUA.KAN |    // Linked
                   UniversalDocument.BAGUA.XUN |    // Dynamic
                   UniversalDocument.BAGUA.LI       // Searchable
}, aiOrigin);

console.log(`   ✅ Generated AI-enhanced content with confidence scores`);

// 5. Create knowledge graph
console.log('\n5️⃣ Constructing knowledge graph...');

// Analyze relationships between items
function extractRelationships(items: any[]): any[] {
  const relationships = [];
  
  // Semantic relationships based on vector similarity
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const similarity = semanticSearch(items[i].content, 0.6)
        .find(result => result.id === items[j].id);
      
      if (similarity) {
        relationships.push({
          from: items[i].id,
          to: items[j].id,
          type: 'semantic_similarity',
          strength: similarity.similarity,
          description: `Semantic similarity between "${items[i].title}" and "${items[j].title}"`
        });
      }
    }
  }
  
  // Add AI-generated relationships
  const aiItems = doc.allItems.filter(item => item.type === UniversalDocument.ItemType.AI_GENERATED);
  aiItems.forEach(aiItem => {
    const contextItems = aiItem.content.context_items || [];
    contextItems.forEach((contextId: string) => {
      relationships.push({
        from: contextId,
        to: aiItem.id,
        type: 'ai_generated_from',
        strength: aiItem.content.confidence,
        description: `AI content generated from source material`
      });
    });
  });
  
  return relationships;
}

const knowledgeGraph = doc.createItem({
  type: UniversalDocument.ItemType.CHART,
  title: 'AI Knowledge Graph',
  position: { x: 100, y: 1100, z: 0 },
  dimensions: { width: 800, height: 400 },
  content: {
    type: 'knowledge_graph',
    nodes: doc.allItems.map(item => ({
      id: item.id,
      title: item.title,
      type: item.type,
      category: item.type === UniversalDocument.ItemType.AI_GENERATED ? 'ai_generated' : 'knowledge',
      bagua: item.bagua_descriptor
    })),
    edges: extractRelationships(doc.allItems),
    layout: 'force_directed',
    clustering_algorithm: 'modularity'
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.CHART |
                   UniversalDocument.BAGUA.KAN |    // Linked
                   UniversalDocument.BAGUA.XUN |    // Dynamic
                   UniversalDocument.BAGUA.LI       // Searchable
}, aiOrigin);

const relationships = extractRelationships(doc.allItems);
console.log(`   📊 Knowledge graph created:`);
console.log(`      Nodes: ${doc.allItems.length}`);
console.log(`      Edges: ${relationships.length}`);
console.log(`      Average connections per node: ${(relationships.length * 2 / doc.allItems.length).toFixed(2)}`);

// 6. Automated content enhancement
console.log('\n6️⃣ Automated content enhancement...');

// Enhance existing content with AI insights
knowledgeBase.forEach(item => {
  const relatedItems = semanticSearch(item.content as string, 0.7);
  const enhancement = {
    related_concepts: relatedItems.slice(0, 3).map(r => r.metadata.title),
    ai_insights: `This concept connects to ${relatedItems.length} related topics in the knowledge base. Consider exploring connections to enhance understanding.`,
    suggested_tags: ['ai-enhanced', 'knowledge-base', 'connected'],
    last_enhanced: new Date().toISOString()
  };
  
  doc.transformItem(item.id, {
    verb: 'ai_enhanced',
    agent: 'ai:content-enhancer',
    description: 'Added AI-generated insights and connections'
  }, {
    content: {
      original: item.content,
      enhancement: enhancement
    }
  });
});

console.log(`   ✅ Enhanced ${knowledgeBase.length} items with AI insights`);

// 7. Create AI analytics dashboard
console.log('\n7️⃣ Creating AI analytics dashboard...');

const aiAnalytics = doc.createItem({
  type: UniversalDocument.ItemType.CHART,
  title: 'AI Integration Analytics',
  position: { x: 1000, y: 700, z: 1 },
  dimensions: { width: 500, height: 400 },
  content: {
    type: 'analytics_dashboard',
    metrics: {
      total_items: doc.allItems.length,
      ai_generated_items: doc.allItems.filter(item => item.type === UniversalDocument.ItemType.AI_GENERATED).length,
      vector_database_size: vectorDatabase.content.vectors.length,
      knowledge_graph_nodes: knowledgeGraph.content.nodes.length,
      knowledge_graph_edges: knowledgeGraph.content.edges.length,
      average_ai_confidence: doc.allItems
        .filter(item => item.type === UniversalDocument.ItemType.AI_GENERATED)
        .reduce((sum, item) => sum + (item.content.confidence || 0), 0) / 
        doc.allItems.filter(item => item.type === UniversalDocument.ItemType.AI_GENERATED).length,
      total_enhancements: knowledgeBase.length
    },
    visualizations: [
      { type: 'pie_chart', title: 'Content Types', data: 'content_type_distribution' },
      { type: 'bar_chart', title: 'AI Confidence Scores', data: 'ai_confidence_distribution' },
      { type: 'network_graph', title: 'Knowledge Connections', data: 'knowledge_graph_preview' },
      { type: 'timeline', title: 'Content Evolution', data: 'transformation_timeline' }
    ]
  },
  is_contextual: false,
  bagua_descriptor: UniversalDocument.BAGUA.CHART |
                   UniversalDocument.BAGUA.LI |     // Searchable
                   UniversalDocument.BAGUA.XUN |    // Dynamic
                   UniversalDocument.BAGUA.TAIJI    // Active
}, aiOrigin);

const analytics = aiAnalytics.content.metrics;
console.log(`   📊 AI Analytics Dashboard:`);
console.log(`      Total items: ${analytics.total_items}`);
console.log(`      AI generated: ${analytics.ai_generated_items}`);
console.log(`      Vector database size: ${analytics.vector_database_size}`);
console.log(`      Knowledge graph: ${analytics.knowledge_graph_nodes} nodes, ${analytics.knowledge_graph_edges} edges`);
console.log(`      Average AI confidence: ${analytics.average_ai_confidence.toFixed(3)}`);
console.log(`      Content enhancements: ${analytics.total_enhancements}`);

// 8. Export AI-enhanced data
console.log('\n8️⃣ Exporting AI-enhanced data...');

const aiExport = {
  metadata: {
    format: 'UniversalFile AI Export',
    version: '2.7.0-kira',
    timestamp: new Date().toISOString(),
    total_items: doc.allItems.length,
    ai_items: doc.allItems.filter(item => item.type === UniversalDocument.ItemType.AI_GENERATED).length
  },
  knowledge_base: knowledgeBase.map(item => ({
    id: item.id,
    title: item.title,
    content: item.content,
    enhancements: item.transformation_history.filter(t => t.verb === 'ai_enhanced')
  })),
  vector_database: {
    model: vectorDatabase.content.model,
    dimensions: vectorDatabase.content.dimensions,
    vector_count: vectorDatabase.content.vectors.length,
    similarity_metric: vectorDatabase.content.similarity_metric
  },
  ai_generated_content: doc.allItems
    .filter(item => item.type === UniversalDocument.ItemType.AI_GENERATED)
    .map(item => ({
      id: item.id,
      title: item.title,
      content: item.content,
      confidence: item.content.confidence,
      model: item.content.model
    })),
  knowledge_graph: {
    nodes: knowledgeGraph.content.nodes,
    edges: knowledgeGraph.content.edges,
    metrics: {
      node_count: knowledgeGraph.content.nodes.length,
      edge_count: knowledgeGraph.content.edges.length,
      clustering_coefficient: 0.73, // Simulated
      average_path_length: 2.4 // Simulated
    }
  },
  semantic_search_results: queries.map(query => ({
    query,
    results: semanticSearch(query, 0.5).slice(0, 3)
  })),
  analytics: analytics
};

// Save AI export
fs.writeFileSync('examples/ai-export.json', JSON.stringify(aiExport, null, 2));
console.log('   💾 AI data exported to examples/ai-export.json');

// Save binary document
const binary = doc.toBinary();
fs.writeFileSync('examples/ai-enhanced-document.ud', Buffer.from(binary));
console.log(`   💾 AI-enhanced document saved to examples/ai-enhanced-document.ud (${binary.byteLength} bytes)`);

// 9. Performance evaluation
console.log('\n9️⃣ Performance evaluation...');

const performanceMetrics = {
  document_size: {
    total_items: doc.allItems.length,
    binary_size: binary.byteLength,
    average_bytes_per_item: binary.byteLength / doc.allItems.length
  },
  ai_performance: {
    vector_database_size: vectorDatabase.content.vectors.length,
    embedding_dimensions: vectorDatabase.content.dimensions,
    average_search_results: queries.reduce((sum, query) => sum + semanticSearch(query, 0.5).length, 0) / queries.length,
    ai_confidence_scores: doc.allItems
      .filter(item => item.type === UniversalDocument.ItemType.AI_GENERATED)
      .map(item => item.content.confidence)
  },
  knowledge_graph_metrics: {
    nodes: knowledgeGraph.content.nodes.length,
    edges: knowledgeGraph.content.edges.length,
    density: (knowledgeGraph.content.edges.length * 2) / (knowledgeGraph.content.nodes.length * (knowledgeGraph.content.nodes.length - 1)),
    average_degree: (knowledgeGraph.content.edges.length * 2) / knowledgeGraph.content.nodes.length
  },
  enhancement_statistics: {
    enhanced_items: knowledgeBase.length,
    total_transformations: doc.allItems.reduce((sum, item) => sum + item.transformation_history.length, 0),
    ai_transformations: doc.allItems.reduce((sum, item) => 
      sum + item.transformation_history.filter(t => t.verb === 'ai_enhanced').length, 0)
  }
};

console.log(`   📊 Performance evaluation:`);
console.log(`      Document: ${performanceMetrics.document_size.total_items} items, ${performanceMetrics.document_size.binary_size} bytes`);
console.log(`      Vector DB: ${performanceMetrics.ai_performance.vector_database_size} vectors, ${performanceMetrics.ai_performance.embedding_dimensions}D`);
console.log(`      Knowledge Graph: ${performanceMetrics.knowledge_graph_metrics.nodes} nodes, ${performanceMetrics.knowledge_graph_metrics.edges} edges`);
console.log(`      AI Confidence: ${performanceMetrics.ai_performance.ai_confidence_scores.map(c => c.toFixed(3)).join(', ')}`);
console.log(`      Enhancements: ${performanceMetrics.enhancement_statistics.ai_transformations} AI transformations`);

console.log('\n🤖 AI integration example completed successfully!');
console.log('🧠 You now understand how to build AI-enhanced spatial documents!');
console.log('🚀 Ready to create intelligent, self-improving knowledge systems!');