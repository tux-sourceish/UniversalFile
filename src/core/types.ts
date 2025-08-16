/**
 * UniversalFile Core Types - The Foundation
 * 
 * All essential types for the .ud format, extracted and refined
 * from UniversalDesktop v2.1 for pure standalone usage.
 */

/**
 * Unique identifier for UniversalDocument items
 */
export type UDID = string;

/**
 * 3D position in space for spatial computing
 */
export interface UDPosition { 
  /** X coordinate in 3D space */
  x: number; 
  /** Y coordinate in 3D space */
  y: number; 
  /** Z coordinate (layer/depth) in 3D space */
  z: number; 
}

/**
 * Rectangular bounds definition for spatial elements
 */
export interface UDRect { 
  /** X coordinate of the top-left corner */
  x: number; 
  /** Y coordinate of the top-left corner */
  y: number; 
  /** Width of the rectangle */
  width: number; 
  /** Height of the rectangle */
  height: number; 
}

/**
 * Origin tracking for provenance and authenticity
 */
export interface UDOrigin {
  /** Host system identifier */
  host: string;
  /** Path or workspace context */
  path: string;
  /** Tool or application that created this */
  tool: string;
  /** Device identifier */
  device?: string;
  /** Quantum signature for authenticity */
  quantum_signature?: string;
}

/**
 * Transformation verbs with authentic German philosophy
 */
export type TransformationVerb = 'erschaffen' | 'kristallisiert' | 'sublimiert' | 'destilliert' | 'iteriert' | 'fusioniert' | 'entfernt';

/**
 * Transformation history entry with German verbs and quantum tracking
 */
export interface UDTransformation {
  /** Unique transformation ID */
  readonly id: UDID;
  /** Unix timestamp in milliseconds */
  timestamp: number;
  /** German transformation verb */
  verb: TransformationVerb;
  /** Who or what performed the transformation */
  agent: string;
  /** Description of what changed */
  description: string;
  /** Reference to previous state */
  previous_state_ref?: UDID;
  /** Quantum hash for immutability proof */
  quantum_hash?: string;
}

/**
 * Complete item in UniversalDocument with spatial awareness and NEXUS extensions
 */
export interface UDItem {
  /** Unique identifier */
  readonly id: UDID;
  /** Raimund's enhanced item types */
  type: ItemType;
  /** Human-readable title */
  title: string;
  /** 3D spatial position */
  position: UDPosition;
  /** Rectangular dimensions */
  dimensions: { width: number; height: number };
  /** Item content (can be any type) */
  content: any;
  /** Whether this item provides context to AI */
  is_contextual: boolean;
  /** Bagua descriptor for philosophical classification */
  bagua_descriptor: number;
  /** Origin tracking for provenance */
  origin?: UDOrigin;
  /** Complete transformation history */
  transformation_history: UDTransformation[];
  /** Unix timestamp of creation in milliseconds */
  readonly created_at: number;
  /** Unix timestamp of last modification in milliseconds */
  updated_at: number;
  
  // NEXUS Extensions
  /** Vector embedding for semantic search */
  vector_embedding?: Float32Array;
  /** Relationship strengths to other items */
  relationship_strength?: Map<UDID, number>;
  /** Compression ratio for content */
  compression_ratio?: number;
  /** Access frequency for performance metrics */
  access_frequency?: number;
}

/**
 * Raimund's authentic German item type system (0-12)
 * Preserving the original German philosophy with English aliases
 */
export enum ItemType {
  VORTEX = 0,        // ☯ Unknown/Origin (TAIJI)
  KONSTRUKTOR = 1,   // ☰ Code/Templates (HIMMEL)  
  TABELLE = 2,       // ☴ Tables/Views (WIND)
  FLUSS = 3,         // ☵ Media/Streams (WASSER)
  INIT = 4,          // ☶ Configuration (BERG)
  EIGENSCHAFT = 5,   // ☱ Properties (SEE)
  FUNKTION = 6,      // ☲ Functions (FEUER)
  EREIGNIS = 7,      // ☳ Events/Triggers (DONNER)
  NOTIZZETTEL = 8,   // ☷ Notes/Documents (Original German!)
  DATABASE = 9,      // Extended: Hyperdimensional Vector DB
  SYSTEM = 10,       // Extended: System-level
  AI_AGENT = 11,     // NEXUS: AI Agents
  QUANTUM_STATE = 12,// NEXUS: Quantum State
  
  // English aliases for compatibility
  VARIABLE = 8,      // Alias for NOTIZZETTEL
  NOTE = 8,          // Alias for NOTIZZETTEL
  DOCUMENT = 8       // Alias for NOTIZZETTEL
}

/**
 * German type names mapping for authentic output
 */
export const GERMAN_TYPE_NAMES = {
  [ItemType.VORTEX]: 'VORTEX',
  [ItemType.KONSTRUKTOR]: 'KONSTRUKTOR', 
  [ItemType.TABELLE]: 'TABELLE',
  [ItemType.FLUSS]: 'FLUSS',
  [ItemType.INIT]: 'INIT',
  [ItemType.EIGENSCHAFT]: 'EIGENSCHAFT',
  [ItemType.FUNKTION]: 'FUNKTION',
  [ItemType.EREIGNIS]: 'EREIGNIS',
  [ItemType.NOTIZZETTEL]: 'NOTIZZETTEL',
  [ItemType.DATABASE]: 'DATABASE',
  [ItemType.SYSTEM]: 'SYSTEM',
  [ItemType.AI_AGENT]: 'AI_AGENT',
  [ItemType.QUANTUM_STATE]: 'QUANTUM_STATE'
  // Note: VARIABLE, NOTE, DOCUMENT are aliases for NOTIZZETTEL (value 8)
  // They will automatically resolve to 'NOTIZZETTEL' when looked up
} as const;

/**
 * Territory for fractal .ud organization
 */
export interface Territory {
  /** Unique territory identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Spatial bounds of the territory */
  bounds: UDRect;
  /** Visual color identifier */
  color: string;
  /** Project or context */
  project: string;
  /** Items contained in this territory */
  items: UDItem[];
  /** Creation timestamp */
  createdAt: Date;
  /** Last access timestamp */
  lastAccessed: Date;
  /** Bagua descriptor for territory type */
  bagua_descriptor: number;
  /** Territory metadata and analytics */
  metadata?: {
    density: number;
    itemTypes: Record<string, number>;
    contextualItems: number;
    averageItemSize: number;
  };
}

/**
 * DBSCAN clustering result for territory generation
 */
export interface TerritoryCluster {
  /** Clustered items */
  clusters: UDItem[][];
  /** Items that don't belong to any cluster */
  noise: UDItem[];
  /** Clustering performance metrics */
  metrics: {
    totalClusters: number;
    averageClusterSize: number;
    largestCluster: number;
    clusteringEfficiency: number;
  };
}

/**
 * Embedded font definition for true self-containment
 */
export interface UDEmbeddedFont {
  /** Font family name */
  name: string;
  /** Font version */
  version: string;
  /** Size in kilobytes */
  size_kb: number;
  /** Font format */
  format: 'woff2' | 'woff' | 'ttf' | 'otf';
  /** Base64 encoded font data */
  base64_data: string;
  /** Fallback font cascade */
  fallback_cascade: string[];
  /** Supported Unicode blocks */
  unicode_blocks: string[];
  /** Whether font includes Bagua symbols */
  bagua_support: boolean;
  /** Compression method used */
  compression?: 'brotli' | 'gzip' | 'none';
}

/**
 * UniversalDocument metadata (Enhanced NEXUS v2.8 structure)
 */
export interface UDMetadata {
  /** Format version */
  format_version: string;
  /** Creator identifier */
  creator: string;
  /** Creation timestamp */
  created_at: string;
  /** Canvas spatial bounds */
  canvas_bounds: UDRect;
  /** Total item count */
  item_count: number;
  /** Embedded font for true portability */
  embedded_font?: UDEmbeddedFont;
  
  // NEXUS Features
  /** Presets for TUI formats and Bagua themes */
  presets?: {
    tui_formats: Record<string, { width: number, height: number, codepage?: number }>;
    bagua_themes: Record<string, Record<string, string>>;
  };
  /** Performance statistics */
  performance_stats?: {
    compression_efficiency: number;
    relationship_density: number;
    quantum_integrity: number;
  };
  /** AI capabilities available */
  ai_capabilities?: string[];
  /** Additional settings */
  settings?: Record<string, any>;
  /** Bagua configuration */
  bagua_config?: {
    arrangement: 'früher_himmel' | 'später_himmel';
    precedence_order: number[];
    symbolic_encoding: boolean;
  };
}

/**
 * Bagua flag type for type-safe Bagua operations
 */
export type BaguaFlag = 'HIMMEL' | 'WIND' | 'WASSER' | 'BERG' | 'SEE' | 'FEUER' | 'DONNER' | 'ERDE' | 'TAIJI';

/**
 * Relationship between items for LLM visualization (NEXUS)
 */
export interface UDRelationship {
  /** Source item ID */
  from: UDID;
  /** Target item ID */
  to: UDID;
  /** Type of relationship */
  type: 'derived' | 'references' | 'contains' | 'bagua_resonance' | 'semantic_similarity' | 'temporal_sequence';
  /** Relationship strength (0.0 - 1.0) */
  strength: number;
  /** Additional metadata */
  metadata: {
    description: string;
    confidence: number;
    bagua_affinity?: number;
    semantic_distance?: number;
  };
}

/**
 * Compressed content block for efficient storage (NEXUS)
 */
export interface UDContentBlock {
  /** Magic number for block identification */
  magic: number;
  /** Compression algorithm used */
  compression: 'lz4' | 'gzip' | 'raw';
  /** Content encoding */
  encoding: 'utf8' | 'binary' | 'base64';
  /** Original content size */
  original_size: number;
  /** Compressed data */
  compressed_data: Uint8Array;
  /** Checksum for integrity */
  checksum: number;
}

/**
 * Validation error for UD format parsing
 */
export class UDValidationError extends Error {
  constructor(
    message: string,
    public errorType: string,
    public itemId?: string,
    public lineNumber?: number
  ) {
    super(message);
    this.name = 'UDValidationError';
  }
}