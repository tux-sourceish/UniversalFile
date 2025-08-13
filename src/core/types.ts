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
}

/**
 * Transformation history entry with German verbs
 */
export interface UDTransformation {
  /** German transformation verb */
  verb: 'erschaffen' | 'crystallized' | 'enhanced' | 'iterated' | 'updated' | 'moved' | 'deleted';
  /** Who or what performed the transformation */
  agent: string;
  /** ISO timestamp */
  timestamp: string;
  /** Description of what changed */
  description: string;
}

/**
 * Complete item in UniversalDocument with spatial awareness
 */
export interface UDItem {
  /** Unique identifier */
  id: UDID;
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
  origin: UDOrigin;
  /** Complete transformation history */
  history: UDTransformation[];
  /** Additional metadata */
  metadata?: Record<string, any>;
  /** Timestamp of creation */
  created_at: string;
  /** Timestamp of last modification */
  updated_at: string;
}

/**
 * Raimund's authentic German item type system (0-10)
 * Preserving the original German philosophy with English aliases
 */
export enum ItemType {
  VORTEX = 0,        // ☯ Unknown/Origin
  KONSTRUKTOR = 1,   // ☰ Code/Templates  
  TABELLE = 2,       // ☴ Tables/Views
  FLUSS = 3,         // ☵ Media/Streams
  INIT = 4,          // ☶ Configuration
  EIGENSCHAFT = 5,   // ☱ Properties
  FUNKTION = 6,      // ☲ Functions
  EREIGNIS = 7,      // ☳ Events/Triggers
  NOTIZZETTEL = 8,   // ☷ Notes/Documents (Original German!)
  DATABASE = 9,      // Extended: Hyperdimensional
  SYSTEM = 10,       // Extended: System-level
  
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
  [ItemType.SYSTEM]: 'SYSTEM'
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
 * UniversalDocument metadata (Enhanced LOKI + tux-sourceish structure)
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