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
        /** Internal storage for document items */
        this.items = new Map();
        this.metadata = this.createDefaultMetadata();
        console.log(`🌌 UniversalDocument v${UniversalDocument.VERSION} initialisiert. Bereit, die Welt zu beglücken.`);
    }
    createDefaultMetadata() {
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
    createItem(options, origin) {
        const id = `ud_item_${Date.now()}_${++UniversalDocument.idCounter}`;
        const now = Date.now();
        const creation_transform = {
            id: `ud_trans_${now}_${UniversalDocument.idCounter}`,
            timestamp: now,
            verb: 'erschaffen',
            agent: origin.tool,
            description: `Element vom Typ '${Object.keys(UniversalDocument.ItemType)[options.type]}' erstellt.`
        };
        const newItem = {
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
    transformItem(id, transformation, updates) {
        const item = this.items.get(id);
        if (!item)
            return undefined;
        const newTransform = {
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
    get allItems() { return Array.from(this.items.values()); }
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
    static getDefaultBagua(type) {
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
    toBinary() {
        // Serialize metadata and items to JSON first
        const metadataJson = JSON.stringify(this.metadata);
        const itemsJson = JSON.stringify(Array.from(this.items.values()));
        // Calculate offsets
        const headerSize = 16; // UD_MAGIC (4) + VERSION (2) + METADATA_OFFSET (4) + ITEMS_OFFSET (4) + padding (2)
        const metadataOffset = headerSize;
        const itemsOffset = metadataOffset + metadataJson.length * 2; // UTF-16 encoding
        const totalSize = itemsOffset + itemsJson.length * 2;
        // Create buffer
        const buffer = new ArrayBuffer(totalSize);
        const view = new DataView(buffer);
        // Write header
        view.setUint32(0, UniversalDocument.UD_MAGIC, true); // Little endian
        view.setUint16(4, 0x0207, true); // Version 2.7
        view.setUint32(6, metadataOffset, true);
        view.setUint32(10, itemsOffset, true);
        view.setUint16(14, 0x0000, true); // Padding
        // Write metadata as UTF-16
        const metadataArray = new Uint16Array(buffer, metadataOffset, metadataJson.length);
        for (let i = 0; i < metadataJson.length; i++) {
            metadataArray[i] = metadataJson.charCodeAt(i);
        }
        // Write items as UTF-16
        const itemsArray = new Uint16Array(buffer, itemsOffset, itemsJson.length);
        for (let i = 0; i < itemsJson.length; i++) {
            itemsArray[i] = itemsJson.charCodeAt(i);
        }
        return buffer;
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
    static fromBinary(buffer) {
        const view = new DataView(buffer);
        // Read header
        const magic = view.getUint32(0, true);
        if (magic !== UniversalDocument.UD_MAGIC) {
            throw new Error('Invalid UniversalDocument magic number');
        }
        const version = view.getUint16(4, true);
        const metadataOffset = view.getUint32(6, true);
        const itemsOffset = view.getUint32(10, true);
        // Read metadata
        const metadataLength = (itemsOffset - metadataOffset) / 2;
        const metadataArray = new Uint16Array(buffer, metadataOffset, metadataLength);
        let metadataJson = '';
        for (let i = 0; i < metadataLength; i++) {
            metadataJson += String.fromCharCode(metadataArray[i]);
        }
        // Read items
        const itemsLength = (buffer.byteLength - itemsOffset) / 2;
        const itemsArray = new Uint16Array(buffer, itemsOffset, itemsLength);
        let itemsJson = '';
        for (let i = 0; i < itemsLength; i++) {
            itemsJson += String.fromCharCode(itemsArray[i]);
        }
        // Create document
        const doc = new UniversalDocument();
        doc.metadata = JSON.parse(metadataJson);
        // Restore items
        const items = JSON.parse(itemsJson);
        doc.items.clear();
        for (const item of items) {
            doc.items.set(item.id, item);
        }
        return doc;
    }
    /**
     * Query items by Bagua flags
     *
     * @param flags - Object with Bagua flags to match
     * @returns Array of items matching the Bagua criteria
     *
     * @example
     * ```typescript
     * const windItems = doc.queryByBagua({ XUN: true });
     * const taijiItems = doc.queryByBagua({ TAIJI: true });
     * ```
     */
    queryByBagua(flags) {
        const result = [];
        const flagMask = Object.entries(flags).reduce((mask, [key, value]) => {
            if (value && key in UniversalDocument.BAGUA) {
                return mask | UniversalDocument.BAGUA[key];
            }
            return mask;
        }, 0);
        for (const item of Array.from(this.items.values())) {
            if ((item.bagua_descriptor & flagMask) === flagMask) {
                result.push(item);
            }
        }
        return result;
    }
    /**
     * Add an item to the document (compatibility method)
     *
     * @param options - Item configuration
     * @returns The created UDItem
     *
     * @example
     * ```typescript
     * const item = doc.addItem({
     *   type: UniversalDocument.ItemType.NOTIZZETTEL,
     *   position: { x: 0, y: 0, z: 0 },
     *   content: { text: "Hello World" }
     * });
     * ```
     */
    addItem(options) {
        const defaultOrigin = {
            host: "localhost",
            path: "/workspace",
            tool: "UniversalDocument"
        };
        return this.createItem(options, defaultOrigin);
    }
    /**
     * KIRA's PROPOSAL: Text serialization for human collaboration
     * Serializes document to interactive markdown format with YAML frontmatter
     *
     * @returns String containing markdown with UD metadata
     *
     * @example
     * ```typescript
     * const markdown = doc.toText();
     * fs.writeFileSync('document.ud.md', markdown);
     * ```
     */
    toText() {
        const lines = [];
        // Document frontmatter
        lines.push('---');
        lines.push(`ud-format: ${this.metadata.format_version}`);
        lines.push(`ud-creator: ${this.metadata.creator}`);
        lines.push(`ud-created: ${this.metadata.created_at}`);
        lines.push(`ud-items: ${this.metadata.item_count}`);
        lines.push(`ud-canvas: ${this.metadata.canvas_bounds.x},${this.metadata.canvas_bounds.y},${this.metadata.canvas_bounds.width},${this.metadata.canvas_bounds.height}`);
        lines.push('---');
        lines.push('');
        // Document title
        lines.push(`# 🌌 UniversalDocument`);
        lines.push('');
        lines.push(`*Generated from ${this.metadata.creator} at ${this.metadata.created_at}*`);
        lines.push('');
        // Items sections
        for (const item of Array.from(this.items.values())) {
            lines.push('---');
            lines.push(`ud-id: ${item.id}`);
            lines.push(`ud-type: ${Object.keys(UniversalDocument.ItemType)[item.type]}`);
            lines.push(`ud-position: ${item.position.x},${item.position.y},${item.position.z}`);
            lines.push(`ud-dimensions: ${item.dimensions.width}x${item.dimensions.height}`);
            lines.push(`ud-bagua: ${this.baguaToString(item.bagua_descriptor)}`);
            lines.push(`ud-contextual: ${item.is_contextual}`);
            if (item.origin) {
                lines.push(`ud-origin: ${item.origin.host}:${item.origin.path} (${item.origin.tool})`);
            }
            lines.push(`ud-created: ${new Date(item.created_at).toISOString()}`);
            lines.push(`ud-updated: ${new Date(item.updated_at).toISOString()}`);
            lines.push('---');
            lines.push('');
            // Item title and content
            lines.push(`## ${item.title || 'Untitled Item'}`);
            lines.push('');
            // Render content based on type
            lines.push(this.renderItemContent(item));
            lines.push('');
            // Transformation history
            if (item.transformation_history.length > 0) {
                lines.push('### 🔄 Transformation History');
                lines.push('');
                for (const transform of item.transformation_history) {
                    lines.push(`- **${transform.verb}** by \`${transform.agent}\` at ${new Date(transform.timestamp).toISOString()}`);
                    lines.push(`  > ${transform.description}`);
                }
                lines.push('');
            }
        }
        return lines.join('\n');
    }
    /**
     * KIRA's PROPOSAL: Load from interactive markdown format
     * Deserializes document from markdown with YAML frontmatter
     *
     * @param text - Markdown text with UD metadata
     * @returns New UniversalDocument instance
     */
    static fromText(text) {
        const doc = new UniversalDocument();
        // Split by --- to get sections
        const sections = text.split('---');
        // Parse document frontmatter (first section)
        if (sections.length > 0) {
            const docMeta = sections[0];
            const metaLines = docMeta.split('\n').filter(l => l.includes(':'));
            for (const line of metaLines) {
                const [key, value] = line.split(':').map(s => s.trim());
                if (key === 'ud-creator')
                    doc.metadata.creator = value;
                if (key === 'ud-created')
                    doc.metadata.created_at = value;
                if (key === 'ud-format')
                    doc.metadata.format_version = value;
                if (key === 'ud-canvas') {
                    const coords = value.split(',').map(Number);
                    if (coords.length === 4) {
                        doc.metadata.canvas_bounds = {
                            x: coords[0], y: coords[1],
                            width: coords[2], height: coords[3]
                        };
                    }
                }
            }
        }
        // Parse items from remaining sections (skip document content section)
        // Structure: [0: doc-frontmatter, 1: empty, 2: doc-content, 3: item1-meta, 4: item1-content, 5: item2-meta, 6: item2-content, ...]
        for (let i = 3; i < sections.length; i += 2) {
            const itemMeta = sections[i];
            const itemContent = sections[i + 1] || '';
            // Only process if we have metadata section
            if (itemMeta && itemMeta.trim() && itemMeta.includes('ud-id:')) {
                const item = doc.parseItemFromText(itemMeta, itemContent);
                if (item) {
                    doc.items.set(item.id, item);
                }
            }
        }
        doc.metadata.item_count = doc.items.size;
        return doc;
    }
    static parseTransformationHistory(lines, startIndex) {
        const transformations = [];
        let currentTransform = null;
        let i = startIndex;
        while (i < lines.length) {
            const line = lines[i];
            const trimmed = line.trim();
            // New transformation entry
            if (trimmed.startsWith('- verb:')) {
                // Save previous if exists
                if (currentTransform && currentTransform.verb) {
                    transformations.push(currentTransform);
                }
                currentTransform = {
                    id: `ud_trans_${Date.now()}_${Math.random()}`,
                    timestamp: Date.now(),
                    verb: trimmed.substring('- verb:'.length).trim(),
                    agent: '',
                    description: ''
                };
            }
            // Agent line
            else if (trimmed.startsWith('agent:') && currentTransform) {
                currentTransform.agent = trimmed.substring('agent:'.length).trim();
            }
            // Description line (can be multiline)
            else if (trimmed.startsWith('description:') && currentTransform) {
                currentTransform.description = trimmed.substring('description:'.length).trim();
                // Check for multiline description
                let j = i + 1;
                while (j < lines.length && lines[j].startsWith('    ')) {
                    currentTransform.description += '\n' + lines[j].trim();
                    j++;
                }
                i = j - 1; // Adjust index
            }
            // End of transformation block
            else if (!line.startsWith(' ') || trimmed === '') {
                if (currentTransform && currentTransform.verb) {
                    transformations.push(currentTransform);
                }
                break;
            }
            i++;
        }
        // Don't forget the last one
        if (currentTransform && currentTransform.verb) {
            transformations.push(currentTransform);
        }
        return { transformations, nextIndex: i };
    }
    baguaToString(descriptor) {
        const flags = [];
        if (descriptor & UniversalDocument.BAGUA.QIAN)
            flags.push('QIAN');
        if (descriptor & UniversalDocument.BAGUA.DUI)
            flags.push('DUI');
        if (descriptor & UniversalDocument.BAGUA.KUN)
            flags.push('KUN');
        if (descriptor & UniversalDocument.BAGUA.LI)
            flags.push('LI');
        if (descriptor & UniversalDocument.BAGUA.XUN)
            flags.push('XUN');
        if (descriptor & UniversalDocument.BAGUA.ZHEN)
            flags.push('ZHEN');
        if (descriptor & UniversalDocument.BAGUA.GEN)
            flags.push('GEN');
        if (descriptor & UniversalDocument.BAGUA.KAN)
            flags.push('KAN');
        if (descriptor & UniversalDocument.BAGUA.TAIJI)
            flags.push('TAIJI');
        return flags.join('|');
    }
    renderItemContent(item) {
        switch (item.type) {
            case UniversalDocument.ItemType.NOTIZZETTEL:
                return typeof item.content === 'string' ? item.content :
                    item.content.text || JSON.stringify(item.content);
            case UniversalDocument.ItemType.TABELLE:
                if (item.content.headers && item.content.rows) {
                    let table = '| ' + item.content.headers.join(' | ') + ' |\n';
                    table += '| ' + item.content.headers.map(() => '---').join(' | ') + ' |\n';
                    for (const row of item.content.rows) {
                        table += '| ' + row.join(' | ') + ' |\n';
                    }
                    return table;
                }
                return JSON.stringify(item.content);
            case UniversalDocument.ItemType.CODE:
                return '```\n' + (item.content.code || JSON.stringify(item.content)) + '\n```';
            default:
                return '```json\n' + JSON.stringify(item.content, null, 2) + '\n```';
        }
    }
    parseItemFromText(meta, content) {
        try {
            // Parse item metadata
            const metaLines = meta.split('\n').filter(l => l.includes(':'));
            const itemData = {};
            for (const line of metaLines) {
                const [key, value] = line.split(':').map(s => s.trim());
                switch (key) {
                    case 'ud-id':
                        itemData.id = value;
                        break;
                    case 'ud-type':
                        itemData.type = UniversalDocument.ItemType[value];
                        break;
                    case 'ud-position':
                        const pos = value.split(',').map(Number);
                        itemData.position = { x: pos[0], y: pos[1], z: pos[2] };
                        break;
                    case 'ud-dimensions':
                        const dims = value.split('x').map(Number);
                        itemData.dimensions = { width: dims[0], height: dims[1] };
                        break;
                    case 'ud-bagua':
                        itemData.bagua_descriptor = UniversalDocument.parseBaguaFromString(value);
                        break;
                    case 'ud-contextual':
                        itemData.is_contextual = value === 'true';
                        break;
                    case 'ud-origin':
                        itemData.origin = UniversalDocument.parseOriginFromString(value);
                        break;
                    case 'ud-created':
                        itemData.created_at = new Date(value).getTime();
                        break;
                    case 'ud-updated':
                        itemData.updated_at = new Date(value).getTime();
                        break;
                }
            }
            // Parse content section
            const contentLines = content.split('\n');
            let title = '';
            let itemContent = '';
            let transformations = [];
            let i = 0;
            // Find title (first ## header)
            while (i < contentLines.length) {
                const line = contentLines[i].trim();
                if (line.startsWith('## ')) {
                    title = line.substring(3).trim();
                    i++;
                    break;
                }
                i++;
            }
            // Parse content until transformation history
            const contentStart = i;
            while (i < contentLines.length) {
                const line = contentLines[i].trim();
                if (line.startsWith('### 🔄 Transformation History')) {
                    break;
                }
                i++;
            }
            // Extract content
            const contentSection = contentLines.slice(contentStart, i).join('\n').trim();
            itemContent = this.parseContentByType(itemData.type, contentSection);
            // Parse transformation history
            if (i < contentLines.length) {
                i++; // Skip history header
                while (i < contentLines.length) {
                    const line = contentLines[i].trim();
                    if (line.startsWith('- **')) {
                        const transform = this.parseTransformationFromLine(line, contentLines[i + 1]);
                        if (transform) {
                            transformations.push(transform);
                        }
                        i += 2; // Skip description line
                    }
                    else {
                        i++;
                    }
                }
            }
            // Create UDItem
            const item = {
                id: itemData.id,
                type: itemData.type,
                title: title,
                position: itemData.position,
                dimensions: itemData.dimensions,
                bagua_descriptor: itemData.bagua_descriptor,
                content: itemContent,
                is_contextual: itemData.is_contextual,
                origin: itemData.origin,
                transformation_history: transformations,
                created_at: itemData.created_at,
                updated_at: itemData.updated_at
            };
            return item;
        }
        catch (error) {
            console.error('Failed to parse item from text:', error);
            return null;
        }
    }
    static parseBaguaFromString(value) {
        let descriptor = 0;
        const flags = value.split('|');
        for (const flag of flags) {
            if (flag in UniversalDocument.BAGUA) {
                descriptor |= UniversalDocument.BAGUA[flag];
            }
        }
        return descriptor;
    }
    static parseOriginFromString(value) {
        // Format: "host:path (tool)"
        const match = value.match(/^([^:]+):([^(]+)\s*\(([^)]+)\)$/);
        if (match) {
            return {
                host: match[1].trim(),
                path: match[2].trim(),
                tool: match[3].trim()
            };
        }
        return { host: 'unknown', path: '/', tool: 'unknown' };
    }
    parseContentByType(type, content) {
        switch (type) {
            case UniversalDocument.ItemType.NOTIZZETTEL:
                return { text: content };
            case UniversalDocument.ItemType.TABELLE:
                return this.parseTableFromMarkdown(content);
            case UniversalDocument.ItemType.CODE:
                // Remove code fences
                const codeMatch = content.match(/```[\s\S]*?\n([\s\S]*?)\n```/);
                return { code: codeMatch ? codeMatch[1] : content };
            default:
                // Try to parse as JSON, fallback to text
                try {
                    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
                    if (jsonMatch) {
                        return JSON.parse(jsonMatch[1]);
                    }
                }
                catch (e) {
                    // Fallback to text
                }
                return { text: content };
        }
    }
    parseTableFromMarkdown(content) {
        const lines = content.split('\n').filter(l => l.trim().startsWith('|'));
        if (lines.length < 2)
            return { text: content };
        const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
        const rows = lines.slice(2).map(line => line.split('|').map(cell => cell.trim()).filter(cell => cell));
        return { headers, rows };
    }
    parseTransformationFromLine(line, descLine) {
        // Format: - **verb** by `agent` at timestamp
        const match = line.match(/- \*\*([^*]+)\*\* by `([^`]+)` at (.+)$/);
        if (!match) {
            return null;
        }
        const description = descLine ? descLine.trim().replace(/^>\s*/, '') : '';
        return {
            id: `parsed_${Date.now()}_${Math.random()}`,
            verb: match[1],
            agent: match[2],
            timestamp: new Date(match[3]).getTime(),
            description
        };
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
    analyzeAndVisualizeRelationships() {
        // Future implementation:
        // 1. Go through all items
        // 2. Analyze content, origin and transformation_history
        // 3. Find connections (e.g., Item B was transformed from Item A)
        // 4. Return a list of "paths" that the UI can paint
        console.log("Relationship analysis will be implemented in a future version.");
        return [];
    }
}
/** Current format version */
UniversalDocument.VERSION = "2.7.0-kira";
/** Binary magic number for file identification */
UniversalDocument.UD_MAGIC = 0x55440001;
/** Bagua constants for metadata encoding */
UniversalDocument.BAGUA = {
    QIAN: 0b000000001, // Bit 0: ☰ Heaven/Template/Master
    DUI: 0b000000010, // Bit 1: ☱ Lake/Interactive
    KUN: 0b000000100, // Bit 2: ☷ Earth/Data Container
    LI: 0b000001000, // Bit 3: ☲ Fire/Searchable
    XUN: 0b000010000, // Bit 4: ☴ Wind/Dynamic/Flowing
    ZHEN: 0b000100000, // Bit 5: ☳ Thunder/Actionable
    GEN: 0b001000000, // Bit 6: ☶ Mountain/Fixed/Immutable
    KAN: 0b010000000, // Bit 7: ☵ Water/Linked/Connected
    TAIJI: 0b100000000 // Bit 8: ☯ Center/Active/Focus
};
/** Item type enumeration */
UniversalDocument.ItemType = {
    NOTIZZETTEL: 0, // Text notes
    TABELLE: 1, // Tables/spreadsheets
    CODE: 2, // Source code
    TUI: 3, // Terminal interfaces
    BROWSER: 4, // Web content
    MEDIA: 5, // Images/videos
    CHART: 6, // Data visualizations
    CALENDAR: 7, // Time-based data
    AI_GENERATED: 8, // AI-created content
    DATABASE: 9, // Hyperdimensional vector databases
    SYSTEM: 10 // System-level items
};
/** Counter for unique ID generation */
UniversalDocument.idCounter = 0;
