/**
 * UniversalDocument (.UD) - The Core Engine for the Digital Universe.
 * 
 * This class is the heart of the file format and state management system.
 * It's a pure logic engine that integrates concepts of transformation,
 * origin tracking, and historical authenticity.
 * 
 * Version 2.7 "Kira" - In recognition of creative artifacts.
 * With kind support from ULLRICHBAU - Quality is our standard.
 * 
 * @example
 * ```typescript
 * // Create a new document
 * const doc = new UniversalDocument();
 * 
 * // Add an item with origin tracking
 * const item = doc.createItem({
 *   type: UniversalDocument.ItemType.NOTIZZETTEL,
 *   title: "My Note",
 *   position: { x: 100, y: 200, z: 0 },
 *   dimensions: { width: 300, height: 200 },
 *   content: "Hello UniversalFile!",
 *   is_contextual: false
 * }, {
 *   host: "localhost",
 *   path: "/workspace",
 *   tool: "UniversalDesktop"
 * });
 * 
 * // Transform the item
 * doc.transformItem(item.id, {
 *   verb: "updated",
 *   agent: "user:developer",
 *   description: "Content updated"
 * }, {
 *   content: "Updated content"
 * });
 * 
 * // Serialize to binary
 * const binary = doc.toBinary();
 * 
 * // Load from binary
 * const doc2 = UniversalDocument.fromBinary(binary);
 * ```
 * 
 * @author tux-sourceish
 * @version 2.7.0-kira
 * @since 1.0.0
 */

// ======================================================================
// TYP-DEFINITIONEN & SCHNITTSTELLEN (Evolutioniert)
// ======================================================================

/**
 * Unique identifier for UniversalDocument items
 * @typedef {string} UDID
 */
export type UDID = string;

/**
 * Rectangular bounds definition for spatial elements
 * @interface UDRect
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
 * 3D position in space for spatial computing
 * @interface UDPosition
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
 * The origin of an element. Where does it come from? What was it created with?
 * Inspired by ASCII-Art: [Where?], [With what?], [Hardware].
 * 
 * @interface UDOrigin
 * @example
 * ```typescript
 * const origin: UDOrigin = {
 *   host: "Office.localhost",
 *   path: "/Desktop.desktop",
 *   tool: "UniversalDesktop",
 *   device: "Device@TPU@usb"
 * };
 * ```
 */
export interface UDOrigin {
  /** Host identifier, e.g., "Office.localhost", "Building.server" */
  host: string;
  /** Path identifier, e.g., "/Desktop.desktop" */
  path: string;
  /** Tool used for creation, e.g., "UniversalDesktop", "Hand-Import" */
  tool: string;
  /** Optional device identifier, e.g., "Device@TPU@usb" */
  device?: string;
}

/**
 * A transformation step in the history of an element.
 * Inspired by: "sublimate", "crystallize", "distill", "iterate".
 * 
 * @interface UDTransformation
 * @example
 * ```typescript
 * const transformation: UDTransformation = {
 *   id: "transform_123",
 *   timestamp: Date.now(),
 *   verb: "crystallized",
 *   agent: "user:tux-sourceish",
 *   description: "Table extracted from note",
 *   previous_state_ref: "item_456"
 * };
 * ```
 */
export interface UDTransformation {
  /** Unique identifier for this transformation */
  readonly id: UDID;
  /** Timestamp when transformation occurred */
  timestamp: number;
  /** Action verb, e.g., "created", "iterated", "crystallized" */
  verb: string;
  /** Agent that performed the transformation, e.g., "user:tux-sourceish", "ai:gemini-2.5-pro" */
  agent: string;
  /** Description of what was done, e.g., "Table extracted from note" */
  description: string;
  /** Reference to a previous state */
  previous_state_ref?: UDID;
}

/**
 * Represents a single element with origin and history tracking.
 * Core data structure for all UniversalDocument items.
 * 
 * @interface UDItem
 * @example
 * ```typescript
 * const item: UDItem = {
 *   id: "item_123",
 *   type: UniversalDocument.ItemType.NOTIZZETTEL,
 *   title: "My Note",
 *   position: { x: 100, y: 200, z: 0 },
 *   dimensions: { width: 300, height: 200 },
 *   bagua_descriptor: UniversalDocument.BAGUA.KUN | UniversalDocument.BAGUA.XUN,
 *   content: "Hello World",
 *   is_contextual: false,
 *   origin: { host: "localhost", path: "/workspace", tool: "UniversalDesktop" },
 *   transformation_history: [],
 *   created_at: Date.now(),
 *   updated_at: Date.now()
 * };
 * ```
 */
export interface UDItem {
  /** Unique identifier for this item */
  readonly id: UDID;
  /** Item type from UniversalDocument.ItemType enum */
  type: number;
  /** Human-readable title */
  title: string;
  /** 3D position in space */
  position: UDPosition;
  /** 2D dimensions for rendering */
  dimensions: { width: number; height: number; };
  /** Bagua-based metadata descriptor (9-bit field) */
  bagua_descriptor: number;
  /** Content data (any type) */
  content: any;
  /** Whether item is contextual to current session */
  is_contextual: boolean;
  
  /** Origin information - where item came from */
  origin?: UDOrigin;
  /** Complete transformation history */
  transformation_history: UDTransformation[];

  /** Creation timestamp */
  readonly created_at: number;
  /** Last update timestamp */
  updated_at: number;
}

/**
 * Metadata for the entire document, now with TUI presets.
 * Contains document-level information and configuration.
 * 
 * @interface UDMetadata
 * @example
 * ```typescript
 * const metadata: UDMetadata = {
 *   format_version: "2.7.0-kira",
 *   creator: "UniversalDesktop",
 *   created_at: "2025-07-17T10:00:00Z",
 *   canvas_bounds: { x: -16000, y: -16000, width: 32000, height: 32000 },
 *   item_count: 42,
 *   presets: {
 *     tui_formats: {
 *       "Standard": { width: 80, height: 25, codepage: 437 },
 *       "Commodore64": { width: 40, height: 25 }
 *     }
 *   }
 * };
 * ```
 */
export interface UDMetadata {
  /** Format version string */
  format_version: string;
  /** Creator/author of the document */
  creator: string;
  /** ISO timestamp of document creation */
  created_at: string;
  /** Spatial bounds of the document canvas */
  canvas_bounds: UDRect;
  /** Current number of items in document */
  item_count: number;
  
  /** TUI format presets for authenticity */
  presets?: {
    /** Terminal/TUI format definitions */
    tui_formats: Record<string, { 
      /** Terminal width in characters */
      width: number, 
      /** Terminal height in characters */
      height: number, 
      /** Optional codepage for character encoding */
      codepage?: number 
    }>
  };
}

// ======================================================================
// DIE UNIVERSALDOCUMENT KLASSE (v2.7 "Kira")
// ======================================================================

/**
 * UniversalDocument - Core class for spatial document management
 * 
 * Features:
 * - Bagua-based metadata system (I Ching philosophy)
 * - Binary serialization with DataView
 * - Transformation history tracking
 * - 3D positioning and spatial computing
 * - Origin tracking and authenticity
 * 
 * @class UniversalDocument
 * @version 2.7.0-kira
 */
export class UniversalDocument {
  
  /** Current format version */
  private static readonly VERSION = "2.7.0-kira";
  /** Binary magic number for file identification */
  private static readonly UD_MAGIC = 0x55440001;
  
  /** Bagua constants for metadata encoding */
  static readonly BAGUA = {
    QIAN:  0b000000001, // Bit 0: ☰ Heaven/Template/Master
    DUI:   0b000000010, // Bit 1: ☱ Lake/Interactive
    KUN:   0b000000100, // Bit 2: ☷ Earth/Data Container
    LI:    0b000001000, // Bit 3: ☲ Fire/Searchable
    XUN:   0b000010000, // Bit 4: ☴ Wind/Dynamic/Flowing
    ZHEN:  0b000100000, // Bit 5: ☳ Thunder/Actionable
    GEN:   0b001000000, // Bit 6: ☶ Mountain/Fixed/Immutable
    KAN:   0b010000000, // Bit 7: ☵ Water/Linked/Connected
    TAIJI: 0b100000000  // Bit 8: ☯ Center/Active/Focus
  } as const;

  /** Item type enumeration */
  static readonly ItemType = {
    NOTIZZETTEL: 0,   // Text notes
    TABELLE: 1,       // Tables/spreadsheets
    CODE: 2,          // Source code
    TUI: 3,           // Terminal interfaces
    BROWSER: 4,       // Web content
    MEDIA: 5,         // Images/videos
    CHART: 6,         // Data visualizations
    CALENDAR: 7,      // Time-based data
    AI_GENERATED: 8,  // AI-created content
    DATABASE: 9       // Hyperdimensional vector databases
  } as const;

  /** Internal storage for document items */
  private items: Map<UDID, UDItem> = new Map();
  /** Document metadata */
  public metadata: UDMetadata;

  // ====================================================================
  // KONSTRUKTOR & INITIALISIERUNG
  // ====================================================================
  
  /**
   * Creates a new UniversalDocument instance
   * 
   * @constructor
   * @example
   * ```typescript
   * const doc = new UniversalDocument();
   * console.log(doc.metadata.format_version); // "2.7.0-kira"
   * ```
   */
  constructor() {
    this.metadata = this.createDefaultMetadata();
    console.log(`🌌 UniversalDocument v${UniversalDocument.VERSION} initialisiert. Bereit, die Welt zu beglücken.`);
  }
  
  private createDefaultMetadata(): UDMetadata {
    return {
      format_version: UniversalDocument.VERSION,
      creator: "UniversalDesktop von SingularUniverse",
      created_at: new Date().toISOString(),
      canvas_bounds: { x: -16000, y: -16000, width: 32000, height: 32000 },
      item_count: 0,
      // Füllt die Presets basierend auf deinem Screenshot
      presets: {
        tui_formats: {
          "Standard": { width: 80, height: 25, codepage: 437 },
          "Commodore64": { width: 40, height: 25 },
          "ZXSpectrum": { width: 32, height: 24 },
          "VT100": { width: 80, height: 24 }
        }
      }
    };
  }

  // ====================================================================
  // KERN-API (mit transformativer Logik)
  // ====================================================================

  /**
   * Creates a new item with origin tracking in its history.
   * 
   * @param options - Item configuration without generated fields
   * @param origin - Origin information for tracking provenance
   * @returns The created UDItem
   * 
   * @example
   * ```typescript
   * const item = doc.createItem({
   *   type: UniversalDocument.ItemType.NOTIZZETTEL,
   *   title: "My Note",
   *   position: { x: 100, y: 200, z: 0 },
   *   dimensions: { width: 300, height: 200 },
   *   content: "Hello World",
   *   is_contextual: false
   * }, {
   *   host: "localhost",
   *   path: "/workspace",
   *   tool: "UniversalDesktop"
   * });
   * ```
   */
  public createItem(options: Omit<UDItem, 'id' | 'created_at' | 'updated_at' | 'transformation_history' | 'bagua_descriptor'> & { bagua_descriptor?: number }, origin: UDOrigin): UDItem {
    const id = `ud_item_${Date.now()}`;
    const now = Date.now();

    const creation_transform: UDTransformation = {
      id: `ud_trans_${now}`,
      timestamp: now,
      verb: 'erschaffen',
      agent: origin.tool,
      description: `Element vom Typ '${Object.keys(UniversalDocument.ItemType)[options.type]}' erstellt.`
    };

    const newItem: UDItem = {
      ...options,
      id,
      bagua_descriptor: options.bagua_descriptor || UniversalDocument.getDefaultBagua(options.type),
      created_at: now,
      updated_at: now,
      origin: origin,
      transformation_history: [creation_transform],
    };
    
    this.items.set(id, newItem);
    this.metadata.item_count = this.items.size;
    return newItem;
  }

  /**
   * Modifies an item and adds a transformation entry to its history.
   * 
   * @param id - ID of the item to transform
   * @param transformation - Transformation metadata (without id/timestamp)
   * @param updates - Partial updates to apply to the item
   * @returns The updated item or undefined if not found
   * 
   * @example
   * ```typescript
   * const updated = doc.transformItem("item_123", {
   *   verb: "crystallized",
   *   agent: "user:developer",
   *   description: "Content refined and structured"
   * }, {
   *   content: "Refined content",
   *   title: "Updated Title"
   * });
   * ```
   */
  public transformItem(id: UDID, transformation: Omit<UDTransformation, 'id'|'timestamp'>, updates: Partial<Omit<UDItem, 'id' | 'created_at'>>): UDItem | undefined {
    const item = this.items.get(id);
    if (!item) return undefined;

    const newTransform: UDTransformation = {
        id: `ud_trans_${Date.now()}`,
        timestamp: Date.now(),
        ...transformation
    };

    const updatedItem = { 
        ...item, 
        ...updates, 
        updated_at: Date.now(),
        transformation_history: [...item.transformation_history, newTransform]
    };
    
    this.items.set(id, updatedItem);
    return updatedItem;
  }
  
  /**
   * Gets all items in the document
   * 
   * @returns Read-only array of all items
   * 
   * @example
   * ```typescript
   * const items = doc.allItems;
   * console.log(`Document contains ${items.length} items`);
   * ```
   */
  public get allItems(): readonly UDItem[] { return Array.from(this.items.values()); }

  /**
   * Gets default Bagua descriptor for an item type
   * 
   * @param type - Item type
   * @returns Default Bagua descriptor
   * 
   * @example
   * ```typescript
   * const bagua = UniversalDocument.getDefaultBagua(UniversalDocument.ItemType.NOTIZZETTEL);
   * console.log(`Default Bagua: ${bagua.toString(2)}`);
   * ```
   */
  public static getDefaultBagua(type: number): number {
    switch (type) {
      case UniversalDocument.ItemType.NOTIZZETTEL:
        return UniversalDocument.BAGUA.KUN | UniversalDocument.BAGUA.LI; // Data Container + Searchable
      case UniversalDocument.ItemType.TABELLE:
        return UniversalDocument.BAGUA.KUN | UniversalDocument.BAGUA.DUI; // Data Container + Interactive
      case UniversalDocument.ItemType.CODE:
        return UniversalDocument.BAGUA.GEN | UniversalDocument.BAGUA.LI; // Fixed + Searchable
      case UniversalDocument.ItemType.TUI:
        return UniversalDocument.BAGUA.DUI | UniversalDocument.BAGUA.ZHEN; // Interactive + Actionable
      case UniversalDocument.ItemType.BROWSER:
        return UniversalDocument.BAGUA.DUI | UniversalDocument.BAGUA.KAN; // Interactive + Linked
      case UniversalDocument.ItemType.MEDIA:
        return UniversalDocument.BAGUA.KUN | UniversalDocument.BAGUA.GEN; // Data Container + Fixed
      case UniversalDocument.ItemType.CHART:
        return UniversalDocument.BAGUA.XUN | UniversalDocument.BAGUA.LI; // Dynamic + Searchable
      case UniversalDocument.ItemType.CALENDAR:
        return UniversalDocument.BAGUA.XUN | UniversalDocument.BAGUA.KAN; // Dynamic + Linked
      case UniversalDocument.ItemType.AI_GENERATED:
        return UniversalDocument.BAGUA.XUN | UniversalDocument.BAGUA.TAIJI; // Dynamic + Active
      case UniversalDocument.ItemType.DATABASE:
        return UniversalDocument.BAGUA.KUN | UniversalDocument.BAGUA.LI | UniversalDocument.BAGUA.KAN; // Container + Searchable + Linked
      default:
        return UniversalDocument.BAGUA.KUN; // Default to Data Container
    }
  }


  // ====================================================================
  // BINÄRE SERIALISIERUNG (Die Blaupause)
  // ====================================================================

  /**
   * Serializes the document to binary format.
   * The header structure is directly inspired by the hand-drawn blueprint:
   * HEAD: #*$=*Filename|*Filesize|...*Model|...*#EOF
   * 
   * Binary Structure:
   * - HEADER: UD_MAGIC (4) | VERSION (2) | METADATA_OFFSET (4) | ITEMS_OFFSET (4)
   * - METADATA_BLOCK: JSON string of metadata (including TUI presets)
   * - ITEMS_BLOCK: ITEM_HEADER | BAGUA (2) | ORIGIN_DATA | TRANSFORMATION_COUNT (2) | TRANSFORMATIONS | CONTENT
   * 
   * @returns ArrayBuffer containing the serialized document
   * 
   * @example
   * ```typescript
   * const binary = doc.toBinary();
   * console.log(`Document serialized to ${binary.byteLength} bytes`);
   * 
   * // Save to file
   * fs.writeFileSync('document.ud', Buffer.from(binary));
   * ```
   */
  public toBinary(): ArrayBuffer {
    // HEADER: UD_MAGIC (4) | VERSION (2) | METADATA_OFFSET (4) | ITEMS_OFFSET (4) | ...
    // METADATA_BLOCK: JSON-String der Metadaten (inkl. TUI-Presets)
    // ITEMS_BLOCK:
    //   ITEM_1: ITEM_HEADER | BAGUA (2) | ORIGIN_DATA | TRANSFORMATION_COUNT (2) | TRANSFORMATION_1 | ... | CONTENT
    console.warn("Binary-Export ist noch nicht für die Kira-Struktur implementiert.");
    return new ArrayBuffer(0);
  }
  
  /**
   * Deserializes a document from binary format
   * 
   * @param buffer - ArrayBuffer containing the binary document data
   * @returns New UniversalDocument instance
   * 
   * @example
   * ```typescript
   * const buffer = fs.readFileSync('document.ud');
   * const doc = UniversalDocument.fromBinary(buffer.buffer);
   * console.log(`Loaded document with ${doc.allItems.length} items`);
   * ```
   */
  public static fromBinary(buffer: ArrayBuffer): UniversalDocument {
    // Implementierung zum Parsen der oben genannten Struktur
    console.warn("Binary-Import ist noch nicht für die Kira-Struktur implementiert.");
    return new UniversalDocument();
  }

  /**
   * A VISIONARY function inspired by the drawing:
   * "LLM model can paint interconnecting paths when activated"
   * This analyzes and visualizes relationships between items.
   * 
   * @returns Array of connection paths for visualization
   * 
   * @example
   * ```typescript
   * const connections = doc.analyzeAndVisualizeRelationships();
   * connections.forEach(path => {
   *   console.log(`Connection: ${path.from} -> ${path.to} (${path.type})`);
   * });
   * ```
   * 
   * @todo Implement full relationship analysis
   */
  public analyzeAndVisualizeRelationships(): any[] {
      // Future implementation:
      // 1. Go through all items
      // 2. Analyze content, origin and transformation_history
      // 3. Find connections (e.g., Item B was transformed from Item A)
      // 4. Return a list of "paths" that the UI can paint
      console.log("Relationship analysis will be implemented in a future version.");
      return [];
  }
}