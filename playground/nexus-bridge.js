/**
 * 🌌 NEXUS Bridge - JavaScript Interface for Browser
 * ================================================
 * 
 * This bridge allows the HTML playground to interact with NEXUS features
 * through a simplified JavaScript API that mimics the TypeScript implementation.
 */

// NEXUS v2.8 Constants
const NEXUS_CONSTANTS = {
    VERSION: "2.8.0-nexus",
    MAGIC: 0x55444E58, // "UDNX"
    
    // Bagua System (binary representation)
    BAGUA: {
        HIMMEL: 0b000000001,  // μ1 - Classes/Templates (☰)
        WIND:   0b000000010,  // μ2 - Views/UI (☴)  
        WASSER: 0b000000100,  // μ3 - Procedures/Flow (☵)
        BERG:   0b000001000,  // μ4 - Init/Setup (☶)
        SEE:    0b000010000,  // μ5 - Properties (☱)
        FEUER:  0b000100000,  // μ6 - Functions (☲)
        DONNER: 0b001000000,  // μ7 - Events (☳)
        ERDE:   0b010000000,  // μ8 - Global/Base (☷)
        TAIJI:  0b100000000   // μ9 - Center/Unity (☯)
    },
    
    // Bagua Symbols
    BAGUA_SYMBOLS: {
        1: '☰', 2: '☴', 4: '☵', 8: '☶', 16: '☱', 
        32: '☲', 64: '☳', 128: '☷', 256: '☯'
    },
    
    // Item Types
    ITEM_TYPES: {
        VORTEX: 0, KONSTRUKTOR: 1, TABELLE: 2, FLUSS: 3,
        INIT: 4, EIGENSCHAFT: 5, FUNKTION: 6, EREIGNIS: 7,
        NOTIZZETTEL: 8, DATABASE: 9, SYSTEM: 10, 
        AI_AGENT: 11, QUANTUM_STATE: 12,
        // Aliases
        VARIABLE: 8, NOTE: 8, DOCUMENT: 8
    }
};

// Algebraic Transistor Implementation
function transistor(condition) {
    return Math.pow(0, condition ? 0 : 1);
}

function quantumTransistor(probability) {
    return transistor(Math.random() < probability);
}

// Bagua Utility Functions
function calculateBaguaResonance(bagua1, bagua2) {
    let commonBits = 0;
    let totalBits = 0;
    
    for (let i = 0; i < 9; i++) {
        const bit = 1 << i;
        if ((bagua1 & bit) || (bagua2 & bit)) {
            totalBits++;
            if ((bagua1 & bit) && (bagua2 & bit)) {
                commonBits++;
            }
        }
    }
    
    return totalBits > 0 ? commonBits / totalBits : 0;
}

function getBaguaSymbols(descriptor) {
    const symbols = [];
    for (let i = 0; i < 9; i++) {
        const bit = 1 << i;
        if (descriptor & bit) {
            symbols.push(NEXUS_CONSTANTS.BAGUA_SYMBOLS[bit] || '?');
        }
    }
    return symbols.join('');
}

function getDefaultBagua(itemType) {
    const defaults = {
        [NEXUS_CONSTANTS.ITEM_TYPES.VORTEX]: NEXUS_CONSTANTS.BAGUA.TAIJI,
        [NEXUS_CONSTANTS.ITEM_TYPES.KONSTRUKTOR]: NEXUS_CONSTANTS.BAGUA.HIMMEL | NEXUS_CONSTANTS.BAGUA.BERG,
        [NEXUS_CONSTANTS.ITEM_TYPES.TABELLE]: NEXUS_CONSTANTS.BAGUA.WIND | NEXUS_CONSTANTS.BAGUA.SEE,
        [NEXUS_CONSTANTS.ITEM_TYPES.FLUSS]: NEXUS_CONSTANTS.BAGUA.WASSER | NEXUS_CONSTANTS.BAGUA.FEUER,
        [NEXUS_CONSTANTS.ITEM_TYPES.INIT]: NEXUS_CONSTANTS.BAGUA.BERG,
        [NEXUS_CONSTANTS.ITEM_TYPES.EIGENSCHAFT]: NEXUS_CONSTANTS.BAGUA.SEE,
        [NEXUS_CONSTANTS.ITEM_TYPES.FUNKTION]: NEXUS_CONSTANTS.BAGUA.FEUER,
        [NEXUS_CONSTANTS.ITEM_TYPES.EREIGNIS]: NEXUS_CONSTANTS.BAGUA.DONNER | NEXUS_CONSTANTS.BAGUA.SEE,
        [NEXUS_CONSTANTS.ITEM_TYPES.NOTIZZETTEL]: NEXUS_CONSTANTS.BAGUA.ERDE | NEXUS_CONSTANTS.BAGUA.WIND,
        [NEXUS_CONSTANTS.ITEM_TYPES.DATABASE]: NEXUS_CONSTANTS.BAGUA.ERDE | NEXUS_CONSTANTS.BAGUA.WASSER,
        [NEXUS_CONSTANTS.ITEM_TYPES.SYSTEM]: NEXUS_CONSTANTS.BAGUA.WASSER | NEXUS_CONSTANTS.BAGUA.TAIJI,
        [NEXUS_CONSTANTS.ITEM_TYPES.AI_AGENT]: NEXUS_CONSTANTS.BAGUA.TAIJI | NEXUS_CONSTANTS.BAGUA.FEUER,
        [NEXUS_CONSTANTS.ITEM_TYPES.QUANTUM_STATE]: NEXUS_CONSTANTS.BAGUA.TAIJI
    };
    return defaults[itemType] || NEXUS_CONSTANTS.BAGUA.ERDE;
}

// NEXUS Document Class (JavaScript Implementation)
class NEXUSDocument {
    constructor(metadata = {}) {
        this.metadata = {
            format_version: NEXUS_CONSTANTS.VERSION,
            creator: "NEXUS HTML Playground",
            created_at: new Date().toISOString(),
            canvas_bounds: { x: -16000, y: -16000, width: 32000, height: 32000 },
            item_count: 0,
            presets: {
                tui_formats: {
                    "Commodore64": { width: 40, height: 25, codepage: 437 },
                    "VT100": { width: 80, height: 24 },
                    "Modern": { width: 120, height: 30 }
                },
                bagua_themes: {
                    "Classic": {
                        HIMMEL: '#FFD700', WIND: '#87CEEB', WASSER: '#4682B4', BERG: '#8B4513',
                        SEE: '#20B2AA', FEUER: '#FF6347', DONNER: '#9370DB', ERDE: '#DEB887', TAIJI: '#FF1493'
                    },
                    "Dark": {
                        HIMMEL: '#FFA500', WIND: '#4169E1', WASSER: '#000080', BERG: '#654321',
                        SEE: '#008B8B', FEUER: '#DC143C', DONNER: '#4B0082', ERDE: '#8B7355', TAIJI: '#C71585'
                    }
                }
            },
            performance_stats: {
                compression_efficiency: 0.85,
                relationship_density: 0.3,
                quantum_integrity: 1.0
            },
            ai_capabilities: ['semantic_search', 'relationship_analysis', 'content_generation', 'quantum_simulation'],
            ...metadata
        };
        
        this.items = [];
        this.relationships = [];
        this.idCounter = 0;
    }
    
    createItem(options, origin = {}) {
        const id = `nexus_${Date.now()}_${++this.idCounter}`;
        const now = Date.now();
        
        const item = {
            id,
            type: options.type,
            title: options.title,
            position: options.position || { x: 0, y: 0, z: 0 },
            dimensions: options.dimensions || { width: 200, height: 150 },
            content: options.content,
            is_contextual: options.is_contextual || false,
            bagua_descriptor: options.bagua_descriptor || getDefaultBagua(options.type),
            created_at: now,
            updated_at: now,
            origin: {
                host: "nexus-playground.local",
                path: "/playground",
                tool: "NEXUS-HTML-Bridge",
                quantum_signature: this.generateQuantumSignature(),
                ...origin
            },
            transformation_history: [{
                id: `trans_${now}_${this.idCounter}`,
                timestamp: now,
                verb: 'erschaffen',
                agent: 'NEXUS-HTML-Bridge',
                description: `Item erschaffen: ${options.title}`,
                quantum_hash: this.generateQuantumSignature()
            }],
            compression_ratio: 0.7 + Math.random() * 0.3, // Simulated compression
            access_frequency: 1
        };
        
        this.items.push(item);
        this.metadata.item_count = this.items.length;
        
        // Auto-analyze relationships for new item
        this.analyzeNewItemRelationships(item);
        
        return item;
    }
    
    generateQuantumSignature() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 0xFFFF);
        return `QS_${random.toString(16)}_${timestamp.toString(36)}`;
    }
    
    analyzeAndVisualizeRelationships() {
        this.relationships = [];
        
        for (let i = 0; i < this.items.length; i++) {
            for (let j = i + 1; j < this.items.length; j++) {
                const itemA = this.items[i];
                const itemB = this.items[j];
                
                // 1. Bagua resonance
                const baguaResonance = calculateBaguaResonance(itemA.bagua_descriptor, itemB.bagua_descriptor);
                if (baguaResonance > 0.6) {
                    this.relationships.push({
                        from: itemA.id,
                        to: itemB.id,
                        type: 'bagua_resonance',
                        strength: baguaResonance,
                        metadata: {
                            description: `Bagua-Resonanz zwischen ${getBaguaSymbols(itemA.bagua_descriptor)} und ${getBaguaSymbols(itemB.bagua_descriptor)}`,
                            confidence: baguaResonance,
                            bagua_affinity: baguaResonance
                        }
                    });
                }
                
                // 2. Spatial proximity
                const distance = Math.sqrt(
                    Math.pow(itemA.position.x - itemB.position.x, 2) +
                    Math.pow(itemA.position.y - itemB.position.y, 2) +
                    Math.pow(itemA.position.z - itemB.position.z, 2)
                );
                
                if (distance < 500) {
                    const proximity = 1 - (distance / 500);
                    this.relationships.push({
                        from: itemA.id,
                        to: itemB.id,
                        type: 'contains',
                        strength: proximity,
                        metadata: {
                            description: `Räumliche Nähe (${Math.round(distance)} Einheiten)`,
                            confidence: proximity
                        }
                    });
                }
                
                // 3. Semantic similarity (simplified)
                const similarity = this.calculateSemanticSimilarity(itemA, itemB);
                if (similarity > 0.7) {
                    this.relationships.push({
                        from: itemA.id,
                        to: itemB.id,
                        type: 'semantic_similarity',
                        strength: similarity,
                        metadata: {
                            description: `Hohe semantische Ähnlichkeit`,
                            confidence: similarity,
                            semantic_distance: 1 - similarity
                        }
                    });
                }
            }
        }
        
        // Sort by strength
        this.relationships.sort((a, b) => b.strength - a.strength);
        
        return this.relationships;
    }
    
    calculateSemanticSimilarity(itemA, itemB) {
        const textA = this.extractText(itemA).toLowerCase();
        const textB = this.extractText(itemB).toLowerCase();
        
        const wordsA = new Set(textA.split(/\s+/));
        const wordsB = new Set(textB.split(/\s+/));
        
        const intersection = new Set([...wordsA].filter(x => wordsB.has(x)));
        const union = new Set([...wordsA, ...wordsB]);
        
        return union.size > 0 ? intersection.size / union.size : 0;
    }
    
    extractText(item) {
        let text = item.title + ' ';
        
        if (typeof item.content === 'string') {
            text += item.content;
        } else if (item.content && typeof item.content === 'object') {
            if (item.content.text) text += item.content.text;
            if (item.content.code) text += item.content.code;
            if (item.content.description) text += item.content.description;
        }
        
        return text;
    }
    
    analyzeNewItemRelationships(newItem) {
        // This is called automatically when creating items
        // Implementation simplified for browser environment
    }
    
    queryWithAlgebraicTransistor(query, condition, probabilistic = false) {
        const factor = probabilistic ? 
            quantumTransistor(0.8) : 
            transistor(condition);
        
        if (factor === 0) {
            return [];
        }
        
        let mask = 0;
        let required = 0;
        
        for (const [key, shouldHave] of Object.entries(query)) {
            const bit = NEXUS_CONSTANTS.BAGUA[key];
            if (bit !== undefined) {
                mask |= bit;
                if (shouldHave) required |= bit;
            }
        }
        
        return this.items.filter(item => 
            (item.bagua_descriptor & mask) === required
        );
    }
    
    inspectQuantumState() {
        const baguaDistribution = this.calculateBaguaDistribution();
        
        return {
            format: this.metadata.format_version,
            items: this.items.length,
            relationships: this.relationships.length,
            compression_efficiency: this.metadata.performance_stats.compression_efficiency,
            relationship_density: this.metadata.performance_stats.relationship_density,
            quantum_integrity: this.metadata.performance_stats.quantum_integrity,
            bagua_distribution: baguaDistribution,
            ai_capabilities: this.metadata.ai_capabilities,
            performance_score: this.calculatePerformanceScore()
        };
    }
    
    calculateBaguaDistribution() {
        const distribution = {};
        const baguaNames = {
            [NEXUS_CONSTANTS.BAGUA.HIMMEL]: 'Himmel',
            [NEXUS_CONSTANTS.BAGUA.WIND]: 'Wind',
            [NEXUS_CONSTANTS.BAGUA.WASSER]: 'Wasser',
            [NEXUS_CONSTANTS.BAGUA.BERG]: 'Berg',
            [NEXUS_CONSTANTS.BAGUA.SEE]: 'See',
            [NEXUS_CONSTANTS.BAGUA.FEUER]: 'Feuer',
            [NEXUS_CONSTANTS.BAGUA.DONNER]: 'Donner',
            [NEXUS_CONSTANTS.BAGUA.ERDE]: 'Erde',
            [NEXUS_CONSTANTS.BAGUA.TAIJI]: 'Taiji'
        };
        
        for (const item of this.items) {
            for (const [value, name] of Object.entries(baguaNames)) {
                if (item.bagua_descriptor & parseInt(value)) {
                    distribution[name] = (distribution[name] || 0) + 1;
                }
            }
        }
        
        return distribution;
    }
    
    calculatePerformanceScore() {
        const compressionScore = this.metadata.performance_stats.compression_efficiency * 0.3;
        const relationshipScore = Math.min(this.relationships.length / this.items.length, 1) * 0.4;
        const diversityScore = Object.keys(this.calculateBaguaDistribution()).length / 9 * 0.3;
        
        return compressionScore + relationshipScore + diversityScore;
    }
}

// Export for global use
window.NEXUSDocument = NEXUSDocument;
window.NEXUS_CONSTANTS = NEXUS_CONSTANTS;
window.transistor = transistor;
window.quantumTransistor = quantumTransistor;
window.calculateBaguaResonance = calculateBaguaResonance;
window.getBaguaSymbols = getBaguaSymbols;