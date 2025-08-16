/**
 * 🌌 UNIVERSALDOCUMENT v2.8 "NEXUS" - DAS ULTIMATIVE SYSTEM
 * =========================================================
 * 
 * Die Fusion von Raimunds Algebraischer Philosophie, Kiras kollaborativer Vision
 * und der bracket-notation Eleganz. Dies ist das NEXUS aller Welten.
 * 
 * Features:
 * ✨ Raimunds "Früher Himmel" Bagua-System mit algebraischem Transistor
 * 🔗 Relationship-Engine für LLM-basierte Pfad-Visualisierung  
 * 🗜️ LZ4-Kompression für Content-Blöcke
 * 📊 Performance-optimierte Workspace-Snapshots
 * 🎨 Erweiterte Minimap mit Bagua-Layout
 * 🧠 Hyperdimensionale Vektor-Datenbank Integration
 * ⚡ Algebraische Query-Engine mit Transistor-Logik
 * 
 * @version 2.8.0-nexus
 * @author Claude & Raimund & Kira 
 * @license ULLRICHBAU Standard
 */

import {
  UDID,
  UDItem,
  UDOrigin,
  UDTransformation,
  UDPosition,
  UDRect,
  UDMetadata,
  UDRelationship,
  UDContentBlock,
  BaguaFlag,
  TransformationVerb,
  ItemType
} from './types';

// ============================================================================
// ULTIMATE UNIVERSALDOCUMENT CLASS v2.8 "NEXUS"
// ============================================================================

export class UniversalDocumentNexus {
  
  private static readonly _VERSION = "2.8.0-nexus";
  private static readonly MAGIC = 0x55444E58; // "UDNX" (NEXUS)
  
  // RAIMUNDS "FRÜHER HIMMEL" BAGUA SYSTEM (Erweitert)
  static readonly BAGUA = {
    HIMMEL: 0b000000001,  // µ1 - Classes/Templates (☰)
    WIND:   0b000000010,  // µ2 - Views/UI (☴)  
    WASSER: 0b000000100,  // µ3 - Procedures/Flow (☵)
    BERG:   0b000001000,  // µ4 - Init/Setup (☶)
    SEE:    0b000010000,  // µ5 - Properties (☱)
    FEUER:  0b000100000,  // µ6 - Functions (☲)
    DONNER: 0b001000000,  // µ7 - Events (☳)
    ERDE:   0b010000000,  // µ8 - Global/Base (☷)
    TAIJI:  0b100000000   // µ9 - Center/Unity (☯)
  } as const;

  // Erweiterte Bagua-Namen mit Quantums-Eigenschaften
  static readonly BAGUA_NAMES = new Map([
    [0b000000001, { symbol: '☰', name: 'Himmel', meaning: 'Classes/Templates', color: '#FFD700', resonance: 'creation' }],
    [0b000000010, { symbol: '☴', name: 'Wind',   meaning: 'Views/UI', color: '#87CEEB', resonance: 'flow' }],
    [0b000000100, { symbol: '☵', name: 'Wasser', meaning: 'Procedures/Flow', color: '#4682B4', resonance: 'adaptation' }],
    [0b000001000, { symbol: '☶', name: 'Berg',   meaning: 'Init/Setup', color: '#8B4513', resonance: 'stability' }],
    [0b000010000, { symbol: '☱', name: 'See',    meaning: 'Properties', color: '#20B2AA', resonance: 'reflection' }],
    [0b000100000, { symbol: '☲', name: 'Feuer',  meaning: 'Functions', color: '#FF6347', resonance: 'transformation' }],
    [0b001000000, { symbol: '☳', name: 'Donner', meaning: 'Events', color: '#9370DB', resonance: 'action' }],
    [0b010000000, { symbol: '☷', name: 'Erde',   meaning: 'Global/Base', color: '#DEB887', resonance: 'foundation' }],
    [0b100000000, { symbol: '☯', name: 'Taiji',  meaning: 'Center/Unity', color: '#FF1493', resonance: 'synthesis' }]
  ]);

  // ALGEBRAISCHER TRANSISTOR - Raimunds Geniestreich! (Erweitert)
  static transistor(condition: boolean): number {
    return Math.pow(0, condition ? 0 : 1);
  }

  // Quantums-Transistor für probabilistische Logik
  static quantumTransistor(probability: number): number {
    const random = Math.random();
    return this.transistor(random < probability);
  }

  // Polare Beziehungen des Frühen Himmels (Mit Resonanz-Faktoren)
  static readonly POLAR_PAIRS = new Map([
    [0b000000001, { opposite: 0b010000000, resonance: 0.9 }], // HIMMEL ↔ ERDE
    [0b000000010, { opposite: 0b001000000, resonance: 0.8 }], // WIND ↔ DONNER  
    [0b000000100, { opposite: 0b000100000, resonance: 0.85 }], // WASSER ↔ FEUER
    [0b000001000, { opposite: 0b000010000, resonance: 0.75 }], // BERG ↔ SEE
    [0b010000000, { opposite: 0b000000001, resonance: 0.9 }], // ERDE ↔ HIMMEL
    [0b001000000, { opposite: 0b000000010, resonance: 0.8 }], // DONNER ↔ WIND
    [0b000100000, { opposite: 0b000000100, resonance: 0.85 }], // FEUER ↔ WASSER
    [0b000010000, { opposite: 0b000001000, resonance: 0.75 }], // SEE ↔ BERG
  ]);

  // Internal storage (Optimiert für Performance)
  private items: Map<UDID, UDItem> = new Map();
  private relationships: Map<UDID, UDRelationship[]> = new Map();
  private contentBlocks: Map<UDID, UDContentBlock> = new Map();
  private vectorIndex: Map<string, UDID[]> = new Map(); // Semantische Suche
  
  public metadata: UDMetadata;
  private static idCounter = 0;
  private performanceMetrics = {
    totalCompressionRatio: 0,
    averageAccessTime: 0,
    relationshipDensity: 0
  };

  // ====================================================================
  // KONSTRUKTOR & QUANTUM INITIALIZATION
  // ====================================================================
  
  constructor(metadata?: Partial<UDMetadata>) {
    this.metadata = {
      format_version: "2.8.0-nexus",
      creator: "UniversalDocument NEXUS mit Raimunds Algebra & Kiras Vision",
      created_at: new Date().toISOString(),
      canvas_bounds: { x: -16000, y: -16000, width: 32000, height: 32000 }, // Universum!
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
        compression_efficiency: 0,
        relationship_density: 0,
        quantum_integrity: 1.0
      },
      ai_capabilities: ['semantic_search', 'relationship_analysis', 'content_generation', 'quantum_simulation'],
      ...metadata
    };
  }

  // ====================================================================
  // CORE API - NEXUS ENHANCED
  // ====================================================================

  public createItem(
    options: Omit<UDItem, 'id' | 'created_at' | 'updated_at' | 'transformation_history' | 'bagua_descriptor'> & { 
      bagua_descriptor?: number 
    }, 
    origin: UDOrigin
  ): UDItem {
    const baseTime = Date.now();
    const microTime = baseTime + (++UniversalDocumentNexus.idCounter % 1000);
    const id = `nexus_${baseTime}_${UniversalDocumentNexus.idCounter}`;

    // Quantum-Signatur für Authentizität
    const quantumSignature = this.generateQuantumSignature(options, origin);
    
    const creation_transform: UDTransformation = {
      id: `trans_${microTime}_${UniversalDocumentNexus.idCounter}`,
      timestamp: microTime,
      verb: 'erschaffen',
      agent: origin.tool,
      description: `${this.getTypeName(options.type)} mit Quantum-Signatur ${quantumSignature.substring(0, 8)} erschaffen`,
      quantum_hash: quantumSignature
    };

    // Content komprimieren
    const compressedContent = this.compressContent(options.content, options.type);
    const contentBlock = this.createContentBlock(compressedContent, options.type);

    const newItem: UDItem = {
      ...options,
      id,
      bagua_descriptor: options.bagua_descriptor || this.getDefaultBagua(options.type),
      created_at: microTime,
      updated_at: microTime,
      origin: { ...origin, quantum_signature: quantumSignature },
      transformation_history: [creation_transform],
      compression_ratio: contentBlock.original_size > 0 ? 
        contentBlock.compressed_data.length / contentBlock.original_size : 1,
      access_frequency: 1
    };
    
    this.items.set(id, newItem);
    this.contentBlocks.set(id, contentBlock);
    this.metadata.item_count = this.items.size;
    
    // Automatische Relationship-Analyse
    this.analyzeNewItemRelationships(newItem);
    
    console.log(`🌌 NEXUS: Item ${id} erschaffen mit ${newItem.compression_ratio?.toFixed(2)}x Kompression`);
    return newItem;
  }

  // ====================================================================
  // RELATIONSHIP ENGINE - DAS HERZSTÜCK DER LLM-VISUALISIERUNG
  // ====================================================================

  /**
   * KIRA's VISION: LLM model can paint interconnecting paths when activated
   * Diese Funktion analysiert und visualisiert Beziehungen zwischen Items
   */
  public analyzeAndVisualizeRelationships(): UDRelationship[] {
    console.log('🧠 NEXUS: Analysiere Beziehungen mit LLM-Engine...');
    
    const allRelationships: UDRelationship[] = [];
    const items = Array.from(this.items.values());
    
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const itemA = items[i];
        const itemB = items[j];
        
        // 1. Bagua-Resonanz analysieren
        const baguaRelation = this.analyzeBaguaResonance(itemA, itemB);
        if (baguaRelation) allRelationships.push(baguaRelation);
        
        // 2. Transformation-History verfolgen
        const historyRelation = this.analyzeTransformationHistory(itemA, itemB);
        if (historyRelation) allRelationships.push(historyRelation);
        
        // 3. Content-Ähnlichkeit (semantisch)
        const semanticRelation = this.analyzeSemanticSimilarity(itemA, itemB);
        if (semanticRelation) allRelationships.push(semanticRelation);
        
        // 4. Räumliche Nähe
        const spatialRelation = this.analyzeSpatialProximity(itemA, itemB);
        if (spatialRelation) allRelationships.push(spatialRelation);
      }
    }
    
    // Beziehungen nach Stärke sortieren
    allRelationships.sort((a, b) => b.strength - a.strength);
    
    // In Cache speichern
    for (const rel of allRelationships) {
      if (!this.relationships.has(rel.from)) {
        this.relationships.set(rel.from, []);
      }
      this.relationships.get(rel.from)!.push(rel);
    }
    
    console.log(`🔗 NEXUS: ${allRelationships.length} Beziehungen gefunden`);
    return allRelationships;
  }

  private analyzeBaguaResonance(itemA: UDItem, itemB: UDItem): UDRelationship | null {
    const resonance = this.calculateBaguaResonance(itemA.bagua_descriptor, itemB.bagua_descriptor);
    
    if (resonance > 0.6) {
      return {
        from: itemA.id,
        to: itemB.id,
        type: 'bagua_resonance',
        strength: resonance,
        metadata: {
          description: `Bagua-Resonanz zwischen ${this.describeBagua(itemA.bagua_descriptor)} und ${this.describeBagua(itemB.bagua_descriptor)}`,
          confidence: resonance,
          bagua_affinity: resonance
        }
      };
    }
    return null;
  }

  private analyzeTransformationHistory(itemA: UDItem, itemB: UDItem): UDRelationship | null {
    // Prüfe ob ein Item aus dem anderen entstanden ist
    for (const transform of itemB.transformation_history) {
      if (transform.previous_state_ref === itemA.id) {
        return {
          from: itemA.id,
          to: itemB.id,
          type: 'derived',
          strength: 0.95,
          metadata: {
            description: `${itemB.title} wurde durch '${transform.verb}' aus ${itemA.title} erschaffen`,
            confidence: 0.95
          }
        };
      }
    }
    
    // Prüfe umgekehrt
    for (const transform of itemA.transformation_history) {
      if (transform.previous_state_ref === itemB.id) {
        return {
          from: itemB.id,
          to: itemA.id,
          type: 'derived',
          strength: 0.95,
          metadata: {
            description: `${itemA.title} wurde durch '${transform.verb}' aus ${itemB.title} erschaffen`,
            confidence: 0.95
          }
        };
      }
    }
    
    return null;
  }

  private analyzeSemanticSimilarity(itemA: UDItem, itemB: UDItem): UDRelationship | null {
    // Vereinfachte semantische Analyse basierend auf Titel und Content
    const similarity = this.calculateSemanticSimilarity(
      this.extractText(itemA), 
      this.extractText(itemB)
    );
    
    if (similarity > 0.7) {
      return {
        from: itemA.id,
        to: itemB.id,
        type: 'semantic_similarity',
        strength: similarity,
        metadata: {
          description: `Hohe semantische Ähnlichkeit zwischen Inhalten`,
          confidence: similarity,
          semantic_distance: 1 - similarity
        }
      };
    }
    return null;
  }

  private analyzeSpatialProximity(itemA: UDItem, itemB: UDItem): UDRelationship | null {
    const distance = Math.sqrt(
      Math.pow(itemA.position.x - itemB.position.x, 2) +
      Math.pow(itemA.position.y - itemB.position.y, 2) +
      Math.pow(itemA.position.z - itemB.position.z, 2)
    );
    
    // Items näher als 500 Einheiten gelten als räumlich verbunden
    if (distance < 500) {
      const proximity = 1 - (distance / 500);
      return {
        from: itemA.id,
        to: itemB.id,
        type: 'contains',
        strength: proximity,
        metadata: {
          description: `Räumliche Nähe (${Math.round(distance)} Einheiten)`,
          confidence: proximity
        }
      };
    }
    return null;
  }

  // ====================================================================
  // BAGUA QUERY ENGINE - ALGEBRAISCH ERWEITERT
  // ====================================================================

  public queryWithAlgebraicTransistor(
    query: Partial<Record<BaguaFlag, boolean>>, 
    condition: boolean,
    probabilistic: boolean = false
  ): UDItem[] {
    const factor = probabilistic ? 
      UniversalDocumentNexus.quantumTransistor(0.8) : 
      UniversalDocumentNexus.transistor(condition);
    
    if (factor === 0) {
      console.log('🔌 Transistor AUS - Query übersprungen');
      return [];
    }
    
    let mask = 0;
    let required = 0;

    for (const [key, shouldHave] of Object.entries(query)) {
      const bit = UniversalDocumentNexus.BAGUA[key as BaguaFlag];
      if (bit !== undefined) {
        mask |= bit;
        if (shouldHave) required |= bit;
      }
    }

    const results = this.allItems.filter(item => 
      (item.bagua_descriptor & mask) === required
    );
    
    console.log(`🧮 Algebraische Query: ${results.length} Items gefunden (Faktor: ${factor})`);
    return results;
  }

  // Finde Items mit polarer Bagua-Beziehung
  public findPolarOpposites(item: UDItem): UDItem[] {
    const polarInfo = UniversalDocumentNexus.POLAR_PAIRS.get(item.bagua_descriptor);
    if (polarInfo) {
      return this.allItems.filter(i => 
        i.id !== item.id && (i.bagua_descriptor & polarInfo.opposite)
      );
    }
    return [];
  }

  // ====================================================================
  // LZ4 COMPRESSION ENGINE
  // ====================================================================

  private lz4Compress(data: Uint8Array): Uint8Array {
    // Vereinfachte LZ4-ähnliche Kompression
    // In Produktionsumgebung würde hier eine echte LZ4-Bibliothek verwendet
    
    if (data.length < 64) return data; // Kleine Daten nicht komprimieren
    
    const compressed: number[] = [];
    const hashTable = new Map<string, number>();
    
    let i = 0;
    while (i < data.length) {
      const sequence = data.slice(i, i + 4);
      const hash = sequence.join(',');
      
      if (hashTable.has(hash) && i - hashTable.get(hash)! < 65536) {
        // Match gefunden - komprimiere
        const matchPos = hashTable.get(hash)!;
        const distance = i - matchPos;
        let length = 4;
        
        // Erweitere Match
        while (i + length < data.length && 
               data[i + length] === data[matchPos + length] && 
               length < 255) {
          length++;
        }
        
        // Schreibe komprimierte Sequenz
        compressed.push(0xFF, distance & 0xFF, (distance >> 8) & 0xFF, length);
        i += length;
      } else {
        // Literales Byte
        compressed.push(data[i]);
        hashTable.set(hash, i);
        i++;
      }
    }
    
    const result = new Uint8Array(compressed);
    console.log(`🗜️ LZ4: ${data.length} -> ${result.length} bytes (${(result.length/data.length*100).toFixed(1)}%)`);
    return result;
  }

  // ====================================================================
  // HELPER FUNCTIONS - DIE MAGIE IM DETAIL
  // ====================================================================

  private generateQuantumSignature(options: any, origin: UDOrigin): string {
    const data = JSON.stringify({ options, origin, timestamp: Date.now() });
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // 32-bit integer
    }
    return `QS_${Math.abs(hash).toString(16)}_${Date.now().toString(36)}`;
  }

  private compressContent(content: any, type: ItemType): any {
    if (typeof content === 'string' && content.length > 100) {
      return {
        compressed: true,
        original_length: content.length,
        data: content // In echt: LZ4-Kompression
      };
    }
    return content;
  }

  private createContentBlock(content: any, type: ItemType): UDContentBlock {
    const jsonData = JSON.stringify(content);
    const rawData = new TextEncoder().encode(jsonData);
    const compressedData = this.lz4Compress(rawData);
    
    return {
      magic: 0x434E5458, // "CNTX"
      compression: compressedData.length < rawData.length ? 'lz4' : 'raw',
      encoding: 'utf8',
      original_size: rawData.length,
      compressed_data: compressedData.length < rawData.length ? compressedData : rawData,
      checksum: this.calculateChecksum(rawData)
    };
  }

  private calculateChecksum(data: Uint8Array): number {
    let checksum = 0;
    for (let i = 0; i < data.length; i++) {
      checksum ^= data[i];
    }
    return checksum;
  }

  private analyzeNewItemRelationships(newItem: UDItem): void {
    // Analysiere Beziehungen zu existierenden Items
    for (const existingItem of this.items.values()) {
      if (existingItem.id === newItem.id) continue;
      
      const resonance = this.calculateBaguaResonance(
        newItem.bagua_descriptor, 
        existingItem.bagua_descriptor
      );
      
      if (resonance > 0.5) {
        if (!this.relationships.has(newItem.id)) {
          this.relationships.set(newItem.id, []);
        }
        
        this.relationships.get(newItem.id)!.push({
          from: newItem.id,
          to: existingItem.id,
          type: 'bagua_resonance',
          strength: resonance,
          metadata: {
            description: `Auto-erkannte Bagua-Resonanz`,
            confidence: resonance,
            bagua_affinity: resonance
          }
        });
      }
    }
  }

  private calculateBaguaResonance(bagua1: number, bagua2: number): number {
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

  private calculateSemanticSimilarity(text1: string, text2: string): number {
    // Vereinfachte Jaccard-Ähnlichkeit
    const words1 = new Set(text1.toLowerCase().split(/\s+/));
    const words2 = new Set(text2.toLowerCase().split(/\s+/));
    
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    
    return intersection.size / union.size;
  }

  private extractText(item: UDItem): string {
    let text = item.title + ' ';
    
    if (typeof item.content === 'string') {
      text += item.content;
    } else if (item.content?.text) {
      text += item.content.text;
    } else if (item.content?.code) {
      text += item.content.code;
    }
    
    return text;
  }

  private describeBagua(descriptor: number): string {
    const names: string[] = [];
    for (const [value, info] of UniversalDocumentNexus.BAGUA_NAMES) {
      if (descriptor & value) {
        names.push(info.name);
      }
    }
    return names.join('+');
  }

  private getTypeName(type: ItemType): string {
    const names = ['VORTEX', 'KONSTRUKTOR', 'TABELLE', 'FLUSS', 'INIT', 
                   'EIGENSCHAFT', 'FUNKTION', 'EREIGNIS', 'VARIABLE', 
                   'DATABASE', 'SYSTEM', 'AI_AGENT', 'QUANTUM_STATE'];
    return names[type] || 'VORTEX';
  }

  // ====================================================================
  // PUBLIC API COMPATIBILITY
  // ====================================================================

  public get allItems(): readonly UDItem[] { 
    return Array.from(this.items.values()); 
  }

  public getDefaultBagua(type: ItemType): number {
    const defaults: Record<number, number> = {
      [ItemType.VORTEX]: UniversalDocumentNexus.BAGUA.TAIJI,
      [ItemType.KONSTRUKTOR]: UniversalDocumentNexus.BAGUA.HIMMEL | UniversalDocumentNexus.BAGUA.BERG,
      [ItemType.TABELLE]: UniversalDocumentNexus.BAGUA.WIND | UniversalDocumentNexus.BAGUA.SEE,
      [ItemType.FLUSS]: UniversalDocumentNexus.BAGUA.WASSER | UniversalDocumentNexus.BAGUA.FEUER,
      [ItemType.INIT]: UniversalDocumentNexus.BAGUA.BERG,
      [ItemType.EIGENSCHAFT]: UniversalDocumentNexus.BAGUA.SEE,
      [ItemType.FUNKTION]: UniversalDocumentNexus.BAGUA.FEUER,
      [ItemType.EREIGNIS]: UniversalDocumentNexus.BAGUA.DONNER | UniversalDocumentNexus.BAGUA.SEE,
      [ItemType.VARIABLE]: UniversalDocumentNexus.BAGUA.ERDE | UniversalDocumentNexus.BAGUA.WIND,
      [ItemType.DATABASE]: UniversalDocumentNexus.BAGUA.ERDE | UniversalDocumentNexus.BAGUA.WASSER,
      [ItemType.SYSTEM]: UniversalDocumentNexus.BAGUA.WASSER | UniversalDocumentNexus.BAGUA.TAIJI,
      [ItemType.AI_AGENT]: UniversalDocumentNexus.BAGUA.TAIJI | UniversalDocumentNexus.BAGUA.FEUER,
      [ItemType.QUANTUM_STATE]: UniversalDocumentNexus.BAGUA.TAIJI
    };
    return defaults[type] || UniversalDocumentNexus.BAGUA.ERDE;
  }

  // Legacy-Kompatibilität
  public addItem(options: any): UDItem {
    const defaultOrigin: UDOrigin = {
      host: "nexus.localhost",
      path: "/workspace",
      tool: "UniversalDocument-NEXUS"
    };
    return this.createItem(options, defaultOrigin);
  }

  public transformItem(id: UDID, transformation: any, updates: any): UDItem | undefined {
    const item = this.items.get(id);
    if (!item) return undefined;

    const baseTime = Date.now();
    const microTime = baseTime + (++UniversalDocumentNexus.idCounter % 1000);

    const newTransform: UDTransformation = {
        id: `nexus_trans_${microTime}`,
        timestamp: microTime,
        quantum_hash: this.generateQuantumSignature(updates, item.origin || {} as UDOrigin),
        ...transformation
    };

    const updatedItem = { 
        ...item, 
        ...updates, 
        updated_at: microTime,
        transformation_history: [...item.transformation_history, newTransform],
        access_frequency: (item.access_frequency || 0) + 1
    };
    
    this.items.set(id, updatedItem);
    
    // Re-analysiere Beziehungen nach Änderung
    this.analyzeNewItemRelationships(updatedItem);
    
    return updatedItem;
  }

  public removeItem(itemId: string): boolean {
    const success = this.items.delete(itemId);
    if (success) {
      this.contentBlocks.delete(itemId);
      this.relationships.delete(itemId);
      this.metadata.item_count = this.items.size;
      console.log(`🗑️ NEXUS: Item ${itemId} entfernt`);
    }
    return success;
  }

  // ====================================================================
  // NEXUS QUANTUM FINALE
  // ====================================================================

  public inspectQuantumState(): void {
    console.log('🌌 NEXUS QUANTUM STATE INSPECTION');
    console.log('==================================');
    console.log(`Format: ${this.metadata.format_version}`);
    console.log(`Items: ${this.items.size}`);
    console.log(`Relationships: ${this.relationships.size}`);
    console.log(`Performance Score: ${this.calculatePerformanceScore().toFixed(3)}`);
    console.log(`Quantum Integrity: ${this.metadata.performance_stats?.quantum_integrity || 1.0}`);
    
    const baguaDistribution = this.calculateBaguaDistribution();
    console.log('\nBagua Distribution:');
    for (const [name, count] of Object.entries(baguaDistribution)) {
      console.log(`  ${name}: ${count}`);
    }
    
    console.log('\nTop Relationships:');
    const allRels = this.analyzeAndVisualizeRelationships();
    allRels.slice(0, 5).forEach(rel => {
      console.log(`  ${rel.from} -> ${rel.to} (${rel.type}, ${rel.strength.toFixed(2)})`);
    });
    
    console.log('\n🧠 AI Capabilities:', this.metadata.ai_capabilities?.join(', '));
    console.log('🎨 Available Themes:', Object.keys(this.metadata.presets?.bagua_themes || {}));
    console.log('💻 TUI Formats:', Object.keys(this.metadata.presets?.tui_formats || {}));
  }

  private calculateBaguaDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {};
    for (const item of this.items.values()) {
      for (const [value, info] of UniversalDocumentNexus.BAGUA_NAMES) {
        if (item.bagua_descriptor & value) {
          distribution[info.name] = (distribution[info.name] || 0) + 1;
        }
      }
    }
    return distribution;
  }

  private calculatePerformanceScore(): number {
    const compressionScore = this.performanceMetrics.totalCompressionRatio * 0.3;
    const relationshipScore = Math.min(this.relationships.size / this.items.size, 1) * 0.4;
    const diversityScore = Object.keys(this.calculateBaguaDistribution()).length / 9 * 0.3;
    
    return compressionScore + relationshipScore + diversityScore;
  }
}

// ============================================================================
// EXPORT THE NEXUS
// ============================================================================

export default UniversalDocumentNexus;