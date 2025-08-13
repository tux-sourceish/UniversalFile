/**
 * μ6_UDCore - FEUER (☲) Functions & Processing
 * 
 * Pure .ud engine extracted from UniversalDesktop v2.1
 * Zero dependencies, maximum portability, fractal-ready.
 * 
 * @version 2.0.0-fractal
 * @author SingularUniverse Team
 */

import { 
  UDID, 
  UDItem, 
  UDOrigin, 
  UDTransformation, 
  UDPosition, 
  UDRect, 
  UDMetadata,
  UDEmbeddedFont,
  ItemType,
  GERMAN_TYPE_NAMES,
  UDValidationError
} from './types';
import { UDFormat } from './μ3_UDFormat';

/**
 * UniversalDocument - The Heart of the .UD Format
 * 
 * Pure spatial document engine with complete transformation history,
 * Bagua-based classification, and binary serialization.
 */
export class UniversalDocument {
  
  /** Current format version (LOKI + tux-sourceish authentic style) */
  private static readonly _VERSION = "2.0-revolutionary";
  
  /** Binary magic number for file identification */
  private static readonly MAGIC = 0x55444152; // "UDAR" in hex
  
  /** Document metadata */
  public metadata: UDMetadata;
  
  /** All items in this document */
  private items: Map<UDID, UDItem> = new Map();
  
  /** Item type enumeration for external access */
  static ItemType = ItemType;
  
  /** Bagua constants for external access */
  static BAGUA = UDFormat.BAGUA;

  /**
   * Create new UniversalDocument
   * 
   * @param metadata - Optional initial metadata
   */
  constructor(metadata?: Partial<UDMetadata>) {
    this.metadata = {
      format_version: UniversalDocument._VERSION,
      creator: "LOKI (Claude Code) + tux-sourceish",
      created_at: new Date().toISOString(),
      canvas_bounds: { x: -2000, y: -2000, width: 4000, height: 4000 },
      item_count: 0,
      embedded_font: this.μ6_createUniversalMonoFont(),
      bagua_config: {
        arrangement: 'früher_himmel',
        precedence_order: [256, 1, 128, 32, 4, 8, 64, 16, 2], // TAIJI → HIMMEL → ERDE → ...
        symbolic_encoding: true
      },
      ...metadata
    };
  }

  /**
   * Create default UniversalMono font definition
   */
  private μ6_createUniversalMonoFont(): UDEmbeddedFont {
    return {
      name: "UniversalMono",
      version: "1.0",
      size_kb: 50,
      format: "woff2",
      base64_data: "{{FONT_DATA_PLACEHOLDER}}", // Would contain actual font in production
      fallback_cascade: ["JetBrains Mono", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      unicode_blocks: ["U+0020-U+007F", "U+2630-U+2637", "U+262F", "U+2609-U+260F"],
      bagua_support: true,
      compression: "brotli"
    };
  }

  /**
   * Create new item with complete tracking
   * 
   * @param itemData - Item configuration
   * @param origin - Origin information for provenance
   * @returns Created item
   */
  public μ6_createItem(
    itemData: {
      type: ItemType;
      title: string;
      position: UDPosition;
      dimensions: { width: number; height: number };
      content: any;
      is_contextual: boolean;
      bagua_descriptor?: number;
    },
    origin: UDOrigin
  ): UDItem {
    const id = UDFormat.generateUDID(itemData.position);
    const now = new Date().toISOString();
    
    const item: UDItem = {
      id,
      type: itemData.type,
      title: itemData.title,
      position: itemData.position,
      dimensions: itemData.dimensions,
      content: itemData.content,
      is_contextual: itemData.is_contextual,
      bagua_descriptor: itemData.bagua_descriptor || UDFormat.BAGUA.ERDE,
      origin,
      history: [{
        verb: 'erschaffen',
        agent: origin.tool,
        timestamp: now,
        description: `Item created: ${itemData.title}`
      }],
      created_at: now,
      updated_at: now
    };
    
    this.items.set(id, item);
    this.metadata.item_count = this.items.size;
    
    return item;
  }

  /**
   * Transform existing item with history tracking
   * 
   * @param itemId - ID of item to transform
   * @param transformation - Transformation details
   * @param changes - Changes to apply
   * @returns Updated item or null if not found
   */
  public μ6_transformItem(
    itemId: UDID,
    transformation: Omit<UDTransformation, 'timestamp'>,
    changes: Partial<UDItem>
  ): UDItem | null {
    const item = this.items.get(itemId);
    if (!item) return null;
    
    const updatedItem = {
      ...item,
      ...changes,
      updated_at: new Date().toISOString(),
      history: [
        ...item.history,
        {
          ...transformation,
          timestamp: new Date().toISOString()
        }
      ]
    };
    
    this.items.set(itemId, updatedItem);
    return updatedItem;
  }

  /**
   * Delete item with transformation tracking
   * 
   * @param itemId - ID of item to delete
   * @param agent - Who is deleting the item
   * @returns true if deleted, false if not found
   */
  public μ6_deleteItem(itemId: UDID, agent: string): boolean {
    const item = this.items.get(itemId);
    if (!item) return false;
    
    // Add deletion to history before removing
    item.history.push({
      verb: 'deleted',
      agent,
      timestamp: new Date().toISOString(),
      description: `Item deleted: ${item.title}`
    });
    
    this.items.delete(itemId);
    this.metadata.item_count = this.items.size;
    
    return true;
  }

  /**
   * Get all items as array
   */
  public μ6_getAllItems(): UDItem[] {
    return Array.from(this.items.values());
  }

  /**
   * Get item by ID
   */
  public μ6_getItem(itemId: UDID): UDItem | null {
    return this.items.get(itemId) || null;
  }

  /**
   * Query items by Bagua aspects
   * 
   * @param aspects - Object with bagua aspects to match
   * @returns Items matching the query
   */
  public μ6_queryByBagua(aspects: Record<string, boolean>): UDItem[] {
    const requiredAspects: number[] = [];
    
    Object.entries(aspects).forEach(([aspectName, required]) => {
      if (required) {
        const aspectValue = UDFormat.BAGUA[aspectName.toUpperCase() as keyof typeof UDFormat.BAGUA];
        if (aspectValue !== undefined) {
          requiredAspects.push(aspectValue);
        }
      }
    });
    
    return this.μ6_getAllItems().filter(item => 
      UDFormat.hasBaguaAspects(item.bagua_descriptor, requiredAspects)
    );
  }

  /**
   * Algebraic transistor query - items visible based on condition
   * 
   * @param baguaQuery - Bagua aspects to match
   * @param condition - Boolean condition for transistor
   * @returns Items matching query, filtered by algebraic transistor
   */
  public μ6_queryWithTransistor(
    baguaQuery: Record<string, boolean>,
    condition: boolean
  ): UDItem[] {
    const items = this.μ6_queryByBagua(baguaQuery);
    const transistorValue = UDFormat.transistor(condition);
    
    // If transistor returns 0, return empty array
    // If transistor returns 1, return full results
    return transistorValue === 1 ? items : [];
  }

  /**
   * Sort items by Bagua precedence (philosophical importance)
   */
  public μ6_sortByBaguaPrecedence(): UDItem[] {
    return this.μ6_getAllItems().sort((a, b) => {
      const precedenceA = UDFormat.calculateBaguaPrecedence(a.bagua_descriptor);
      const precedenceB = UDFormat.calculateBaguaPrecedence(b.bagua_descriptor);
      return precedenceB - precedenceA; // Higher precedence first
    });
  }

  /**
   * Find polar opposite items in Bagua system
   * 
   * @param item - Item to find opposites for
   * @returns Items with polar opposite Bagua descriptors
   */
  public μ6_findPolarOpposites(item: UDItem): UDItem[] {
    const oppositeDescriptor = UDFormat.findPolarOpposite(item.bagua_descriptor);
    
    return this.μ6_getAllItems().filter(otherItem => 
      otherItem.id !== item.id && 
      otherItem.bagua_descriptor === oppositeDescriptor
    );
  }

  /**
   * Serialize to binary format (UDAR header + hybrid content)
   * 
   * @returns ArrayBuffer with complete document
   */
  public toBinary(): ArrayBuffer {
    // Generate hybrid text content
    const hybridContent = this.μ6_toHybridText();
    const contentBytes = new TextEncoder().encode(hybridContent);
    
    // Create binary header (16 bytes)
    const headerBuffer = new ArrayBuffer(16);
    const headerView = new DataView(headerBuffer);
    
    headerView.setUint32(0, UniversalDocument.MAGIC, false); // Magic: "UDAR"
    headerView.setUint16(4, 0x0200, false); // Version: 2.0
    headerView.setUint32(6, 16, false); // Content offset
    headerView.setUint32(10, contentBytes.length, false); // Content length
    headerView.setUint16(14, 0x5544, false); // Signature: "UD"
    
    // Combine header and content
    const totalBuffer = new ArrayBuffer(16 + contentBytes.length);
    const totalView = new Uint8Array(totalBuffer);
    
    totalView.set(new Uint8Array(headerBuffer), 0);
    totalView.set(contentBytes, 16);
    
    return totalBuffer;
  }

  /**
   * Load from binary format
   * 
   * @param buffer - ArrayBuffer with UDAR data
   * @returns New UniversalDocument instance
   */
  public static fromBinary(buffer: ArrayBuffer): UniversalDocument {
    const view = new DataView(buffer);
    
    // Validate header
    const magic = view.getUint32(0, false);
    if (magic !== UniversalDocument.MAGIC) {
      throw new UDValidationError('Invalid magic number', 'INVALID_MAGIC');
    }
    
    const version = view.getUint16(4, false);
    const contentOffset = view.getUint32(6, false);
    const contentLength = view.getUint32(10, false);
    const signature = view.getUint16(14, false);
    
    if (signature !== 0x5544) {
      throw new UDValidationError('Invalid signature', 'INVALID_SIGNATURE');
    }
    
    // Extract content
    const contentBytes = new Uint8Array(buffer, contentOffset, contentLength);
    const hybridContent = new TextDecoder().decode(contentBytes);
    
    // Parse hybrid content
    return UniversalDocument.μ6_fromHybridText(hybridContent);
  }

  /**
   * Generate hybrid bracket format (LOKI + tux-sourceish authentic structure)
   */
  private μ6_toHybridText(): string {
    let output = '';
    
    // Document header (authentic LOKI structure)
    output += '---ud-document\\n';
    output += `([{\\n`;
    output += `  format_version: "${this.metadata.format_version}",\\n`;
    output += `  creator: "${this.metadata.creator}",\\n`;
    output += `  created_at: "${this.metadata.created_at}",\\n`;
    output += `  canvas_bounds: {x: ${this.metadata.canvas_bounds.x}, y: ${this.metadata.canvas_bounds.y}, width: ${this.metadata.canvas_bounds.width}, height: ${this.metadata.canvas_bounds.height}},\\n`;
    output += `  item_count: ${this.metadata.item_count}`;
    
    // Embedded font (authentic LOKI feature)
    if (this.metadata.embedded_font) {
      const font = this.metadata.embedded_font;
      output += `,\\n  embedded_font: {\\n`;
      output += `    name: "${font.name}",\\n`;
      output += `    version: "${font.version}",\\n`;
      output += `    size_kb: ${font.size_kb},\\n`;
      output += `    format: "${font.format}",\\n`;
      output += `    base64_data: "${font.base64_data}",\\n`;
      output += `    fallback_cascade: [${font.fallback_cascade.map(f => `"${f}"`).join(', ')}],\\n`;
      output += `    unicode_blocks: [${font.unicode_blocks.map(b => `"${b}"`).join(', ')}],\\n`;
      output += `    bagua_support: ${font.bagua_support},\\n`;
      output += `    compression: "${font.compression || 'none'}"\\n`;
      output += `  }`;
    }
    
    output += `\\n}])\\n`;
    output += '---ud-document-end\\n\\n';
    
    // Items (authentic LOKI + tux-sourceish structure)
    this.μ6_getAllItems().forEach(item => {
      output += `([{ITEM\\n`;
      output += `  id: ${item.id}\\n`;
      output += `  type: ${GERMAN_TYPE_NAMES[item.type]}\\n`;
      output += `  title: "${item.title}"\\n`;
      output += `  position: {x: ${item.position.x}, y: ${item.position.y}, z: ${item.position.z}}\\n`;
      output += `  dimensions: {width: ${item.dimensions.width}, height: ${item.dimensions.height}}\\n`;
      output += `  bagua: ${UDFormat.decodeBaguaAuthentic(item.bagua_descriptor)}\\n`;
      output += `  is_contextual: ${item.is_contextual}\\n`;
      output += `  created_at: ${item.created_at}\\n`;
      output += `  updated_at: ${item.updated_at}\\n`;
      
      // Origin
      output += `  ([{ORIGIN\\n`;
      output += `    host: ${item.origin.host}\\n`;
      output += `    path: ${item.origin.path}\\n`;
      output += `    tool: ${item.origin.tool}\\n`;
      output += `  }])\\n`;
      
      // History
      output += `  ([{HISTORY\\n`;
      item.history.forEach(h => {
        output += `    - verb: ${h.verb}\\n`;
        output += `      agent: ${h.agent}\\n`;
        output += `      timestamp: ${h.timestamp}\\n`;
        output += `      description: ${h.description}\\n`;
      });
      output += `  }])\\n`;
      output += `}])\\n\\n`;
      
      // Content
      output += `([{CONTENT\\n`;
      if (typeof item.content === 'string') {
        output += item.content;
      } else {
        output += JSON.stringify(item.content, null, 2);
      }
      output += `\\n}])\\n\\n`;
    });
    
    return output;
  }

  /**
   * Parse hybrid bracket format
   * 
   * @param hybridText - Hybrid format content
   * @returns New UniversalDocument instance
   */
  private static μ6_fromHybridText(hybridText: string): UniversalDocument {
    const lines = hybridText.split('\\n');
    const doc = new UniversalDocument();
    
    let currentSection: 'header' | 'item' | 'content' | null = null;
    let currentItem: Partial<UDItem> | null = null;
    let contentLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('---ud-document')) {
        currentSection = 'header';
      } else if (line.startsWith('([{ITEM')) {
        currentSection = 'item';
        currentItem = { history: [] };
      } else if (line.startsWith('([{CONTENT')) {
        currentSection = 'content';
        contentLines = [];
      } else if (line === '}])' && currentSection === 'content') {
        // End of content section - save item
        if (currentItem) {
          currentItem.content = contentLines.join('\\n');
          
          // Validate and add item
          if (currentItem.id && currentItem.type !== undefined) {
            doc.items.set(currentItem.id as UDID, currentItem as UDItem);
          }
        }
        currentSection = null;
        currentItem = null;
        contentLines = [];
      } else if (currentSection === 'content') {
        contentLines.push(line);
      } else if (currentSection === 'item' && currentItem) {
        // Parse item properties
        if (line.includes(':')) {
          const [key, ...valueParts] = line.split(':');
          const value = valueParts.join(':').trim();
          
          switch (key.trim()) {
            case 'id':
              currentItem.id = value as UDID;
              break;
            case 'type':
              currentItem.type = ItemType[value as keyof typeof ItemType];
              break;
            case 'title':
              currentItem.title = value;
              break;
            case 'position':
              const posMatch = value.match(/{x: (-?\\d+), y: (-?\\d+), z: (-?\\d+)}/);
              if (posMatch) {
                currentItem.position = {
                  x: parseInt(posMatch[1]),
                  y: parseInt(posMatch[2]),
                  z: parseInt(posMatch[3])
                };
              }
              break;
            case 'dimensions':
              const dimMatch = value.match(/{width: (\\d+), height: (\\d+)}/);
              if (dimMatch) {
                currentItem.dimensions = {
                  width: parseInt(dimMatch[1]),
                  height: parseInt(dimMatch[2])
                };
              }
              break;
            case 'bagua':
              const baguaMatch = value.match(/\\((\\d+)\\)$/);
              if (baguaMatch) {
                currentItem.bagua_descriptor = parseInt(baguaMatch[1]);
              }
              break;
            case 'is_contextual':
              currentItem.is_contextual = value === 'true';
              break;
            case 'created_at':
              currentItem.created_at = value;
              break;
            case 'updated_at':
              currentItem.updated_at = value;
              break;
          }
        }
      }
    }
    
    doc.metadata.item_count = doc.items.size;
    return doc;
  }

  /**
   * Export to human-readable markdown format
   */
  public toMarkdown(): string {
    let markdown = `# UniversalDocument\\n\\n`;
    markdown += `**Created:** ${this.metadata.created_at}\\n`;
    markdown += `**Creator:** ${this.metadata.creator}\\n`;
    markdown += `**Items:** ${this.metadata.item_count}\\n\\n`;
    
    this.μ6_sortByBaguaPrecedence().forEach(item => {
      const baguaNames = UDFormat.decodeBagua(item.bagua_descriptor);
      markdown += `## ${item.title}\\n\\n`;
      markdown += `- **Type:** ${ItemType[item.type]}\\n`;
      markdown += `- **Position:** (${item.position.x}, ${item.position.y}, ${item.position.z})\\n`;
      markdown += `- **Bagua:** ${baguaNames.join(', ')}\\n`;
      markdown += `- **Contextual:** ${item.is_contextual ? 'Yes' : 'No'}\\n\\n`;
      
      if (typeof item.content === 'string') {
        markdown += `${item.content}\\n\\n`;
      } else {
        markdown += `\`\`\`json\\n${JSON.stringify(item.content, null, 2)}\\n\`\`\`\\n\\n`;
      }
      
      markdown += `---\\n\\n`;
    });
    
    return markdown;
  }
}