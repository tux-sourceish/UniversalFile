/**
 * μ1_UDFactory - HIMMEL (☰) Templates & Creation
 * 
 * Factory methods for creating common .ud items with sensible defaults.
 * Makes the UniversalFile format instantly usable for developers.
 */

import { UniversalDocument } from './μ6_UDCore';
import { ItemType, UDOrigin, UDPosition } from './types';
import { UDFormat } from './μ3_UDFormat';

export class μ1_UDFactory {
  
  /**
   * Create a simple note item
   * 
   * @param title - Note title
   * @param content - Note content (markdown supported)
   * @param position - Spatial position
   * @param origin - Optional origin (defaults to UniversalFile)
   * @returns Created item
   */
  static μ1_createNote(
    doc: UniversalDocument,
    title: string,
    content: string,
    position: UDPosition,
    origin?: UDOrigin
  ) {
    return doc.μ6_createItem({
      type: ItemType.NOTIZZETTEL,
      title,
      position,
      dimensions: { width: 300, height: 200 },
      content: { text: content, format: 'markdown' },
      is_contextual: true,
      bagua_descriptor: UDFormat.BAGUA.ERDE | UDFormat.BAGUA.WIND
    }, origin || {
      host: 'universal-file',
      path: '/workspace',
      tool: 'μ1_UDFactory'
    });
  }

  /**
   * Create a code snippet item
   * 
   * @param title - Code title
   * @param code - Source code content
   * @param language - Programming language
   * @param position - Spatial position
   * @param origin - Optional origin
   * @returns Created item
   */
  static μ1_createCode(
    doc: UniversalDocument,
    title: string,
    code: string,
    language: string,
    position: UDPosition,
    origin?: UDOrigin
  ) {
    return doc.μ6_createItem({
      type: ItemType.KONSTRUKTOR,
      title,
      position,
      dimensions: { width: 400, height: 300 },
      content: { code, language, executable: false },
      is_contextual: true,
      bagua_descriptor: UDFormat.BAGUA.HIMMEL | UDFormat.BAGUA.FEUER
    }, origin || {
      host: 'universal-file',
      path: '/workspace',
      tool: 'μ1_UDFactory'
    });
  }

  /**
   * Create a media item (image, video, audio)
   * 
   * @param title - Media title
   * @param mediaUrl - URL or path to media
   * @param mediaType - Type of media
   * @param position - Spatial position
   * @param origin - Optional origin
   * @returns Created item
   */
  static μ1_createMedia(
    doc: UniversalDocument,
    title: string,
    mediaUrl: string,
    mediaType: 'image' | 'video' | 'audio',
    position: UDPosition,
    origin?: UDOrigin
  ) {
    const dimensions = {
      image: { width: 350, height: 250 },
      video: { width: 480, height: 320 },
      audio: { width: 300, height: 100 }
    };

    return doc.μ6_createItem({
      type: ItemType.FLUSS,
      title,
      position,
      dimensions: dimensions[mediaType],
      content: { url: mediaUrl, type: mediaType },
      is_contextual: false,
      bagua_descriptor: UDFormat.BAGUA.WASSER | UDFormat.BAGUA.WIND
    }, origin || {
      host: 'universal-file',
      path: '/workspace',
      tool: 'μ1_UDFactory'
    });
  }

  /**
   * Create a table/data item
   * 
   * @param title - Table title
   * @param headers - Column headers
   * @param rows - Table data rows
   * @param position - Spatial position
   * @param origin - Optional origin
   * @returns Created item
   */
  static μ1_createTable(
    doc: UniversalDocument,
    title: string,
    headers: string[],
    rows: any[][],
    position: UDPosition,
    origin?: UDOrigin
  ) {
    return doc.μ6_createItem({
      type: ItemType.TABELLE,
      title,
      position,
      dimensions: { width: Math.max(400, headers.length * 100), height: Math.max(200, (rows.length + 1) * 30) },
      content: { headers, rows, format: 'table' },
      is_contextual: true,
      bagua_descriptor: UDFormat.BAGUA.WIND | UDFormat.BAGUA.SEE
    }, origin || {
      host: 'universal-file',
      path: '/workspace',
      tool: 'μ1_UDFactory'
    });
  }

  /**
   * Create a configuration/settings item
   * 
   * @param title - Config title
   * @param settings - Settings object
   * @param position - Spatial position
   * @param origin - Optional origin
   * @returns Created item
   */
  static μ1_createConfig(
    doc: UniversalDocument,
    title: string,
    settings: Record<string, any>,
    position: UDPosition,
    origin?: UDOrigin
  ) {
    return doc.μ6_createItem({
      type: ItemType.INIT,
      title,
      position,
      dimensions: { width: 300, height: 250 },
      content: { settings, format: 'json' },
      is_contextual: false,
      bagua_descriptor: UDFormat.BAGUA.BERG | UDFormat.BAGUA.SEE
    }, origin || {
      host: 'universal-file',
      path: '/workspace',
      tool: 'μ1_UDFactory'
    });
  }

  /**
   * Create a function/process item
   * 
   * @param title - Function title
   * @param functionCode - Function implementation
   * @param parameters - Function parameters description
   * @param position - Spatial position
   * @param origin - Optional origin
   * @returns Created item
   */
  static μ1_createFunction(
    doc: UniversalDocument,
    title: string,
    functionCode: string,
    parameters: string[],
    position: UDPosition,
    origin?: UDOrigin
  ) {
    return doc.μ6_createItem({
      type: ItemType.FUNKTION,
      title,
      position,
      dimensions: { width: 400, height: 300 },
      content: { code: functionCode, parameters, language: 'javascript' },
      is_contextual: true,
      bagua_descriptor: UDFormat.BAGUA.FEUER | UDFormat.BAGUA.HIMMEL
    }, origin || {
      host: 'universal-file',
      path: '/workspace',
      tool: 'μ1_UDFactory'
    });
  }

  /**
   * Create an event/trigger item
   * 
   * @param title - Event title
   * @param eventType - Type of event
   * @param triggerCondition - When this event fires
   * @param position - Spatial position
   * @param origin - Optional origin
   * @returns Created item
   */
  static μ1_createEvent(
    doc: UniversalDocument,
    title: string,
    eventType: string,
    triggerCondition: string,
    position: UDPosition,
    origin?: UDOrigin
  ) {
    return doc.μ6_createItem({
      type: ItemType.EREIGNIS,
      title,
      position,
      dimensions: { width: 250, height: 150 },
      content: { eventType, trigger: triggerCondition, active: true },
      is_contextual: false,
      bagua_descriptor: UDFormat.BAGUA.DONNER | UDFormat.BAGUA.FEUER
    }, origin || {
      host: 'universal-file',
      path: '/workspace',
      tool: 'μ1_UDFactory'
    });
  }

  /**
   * Create a spatial workspace with multiple items arranged in a grid
   * 
   * @param doc - Document to populate
   * @param title - Workspace title
   * @param items - Array of items to create
   * @returns Array of created items
   */
  static μ1_createSpatialWorkspace(
    doc: UniversalDocument,
    title: string,
    items: Array<{
      type: 'note' | 'code' | 'media' | 'table' | 'config' | 'function' | 'event';
      title: string;
      content: any;
      [key: string]: any;
    }>
  ) {
    const createdItems: any[] = [];
    const gridSize = Math.ceil(Math.sqrt(items.length));
    const spacing = 450;
    
    items.forEach((itemData, index) => {
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const position = {
        x: col * spacing + 100,
        y: row * spacing + 100,
        z: 0
      };

      let createdItem;
      
      switch (itemData.type) {
        case 'note':
          createdItem = μ1_UDFactory.μ1_createNote(doc, itemData.title, itemData.content, position);
          break;
        case 'code':
          createdItem = μ1_UDFactory.μ1_createCode(doc, itemData.title, itemData.content, itemData.language || 'javascript', position);
          break;
        case 'media':
          createdItem = μ1_UDFactory.μ1_createMedia(doc, itemData.title, itemData.content, itemData.mediaType || 'image', position);
          break;
        case 'table':
          createdItem = μ1_UDFactory.μ1_createTable(doc, itemData.title, itemData.headers || [], itemData.rows || [], position);
          break;
        case 'config':
          createdItem = μ1_UDFactory.μ1_createConfig(doc, itemData.title, itemData.content, position);
          break;
        case 'function':
          createdItem = μ1_UDFactory.μ1_createFunction(doc, itemData.title, itemData.content, itemData.parameters || [], position);
          break;
        case 'event':
          createdItem = μ1_UDFactory.μ1_createEvent(doc, itemData.title, itemData.eventType || 'custom', itemData.content, position);
          break;
        default:
          createdItem = μ1_UDFactory.μ1_createNote(doc, itemData.title, String(itemData.content), position);
      }
      
      createdItems.push(createdItem);
    });

    return createdItems;
  }

  /**
   * Quick demo document with various item types
   * 
   * @returns UniversalDocument with demo content
   */
  static μ1_createDemo(): UniversalDocument {
    const doc = new UniversalDocument({
      creator: 'LOKI (Claude Code) + tux-sourceish Demo',
      canvas_bounds: { x: -1000, y: -750, width: 2000, height: 1500 }
    });

    // Create diverse demo content
    μ1_UDFactory.μ1_createSpatialWorkspace(doc, 'Demo Workspace', [
      {
        type: 'note',
        title: '🌟 Welcome to UniversalFile!',
        content: `# UniversalFile Format Demo

This is a **spatial document** with full transformation history!

## Features:
- 🧮 Bagua-based classification
- 📍 3D spatial positioning  
- 🔄 Complete transformation tracking
- ⚡ Binary serialization
- 🎯 Algebraic transistor queries

Try transforming this item and see the history grow!`
      },
      {
        type: 'code',
        title: '🚀 Quick Example',
        language: 'typescript',
        content: `import { UniversalDocument, μ1_UDFactory } from 'universal-file';

// Create new document
const doc = new UniversalDocument();

// Add spatial note
const note = μ1_UDFactory.μ1_createNote(
  doc,
  'My Idea',
  'This is a spatial note!',
  { x: 100, y: 200, z: 0 }
);

// Save to binary
const binary = doc.toBinary();

// Load from binary
const doc2 = UniversalDocument.fromBinary(binary);`
      },
      {
        type: 'table',
        title: '📊 Bagua Classifications',
        content: null, // Table content is in headers/rows
        headers: ['Trigram', 'Element', 'Responsibility', 'Code'],
        rows: [
          ['☰ HIMMEL', 'Heaven', 'Templates, Creation', '1'],
          ['☴ WIND', 'Wind', 'UI, Interfaces', '2'],
          ['☵ WASSER', 'Water', 'Flow, Procedures', '4'],
          ['☶ BERG', 'Mountain', 'Init, Foundation', '8'],
          ['☱ SEE', 'Lake', 'Properties', '16'],
          ['☲ FEUER', 'Fire', 'Functions', '32'],
          ['☳ DONNER', 'Thunder', 'Events', '64'],
          ['☷ ERDE', 'Earth', 'Data, Storage', '128']
        ]
      },
      {
        type: 'function',
        title: '⚡ Algebraic Transistor',
        parameters: ['condition: boolean'],
        content: `function algebraicTransistor(condition: boolean): number {
  // Raimund's revolutionary pattern:
  // 0^0 = 1 (TRUE)  
  // 0^1 = 0 (FALSE)
  return Math.pow(0, condition ? 0 : 1);
}

// Usage: Replace if-else with math!
// Traditional: if (isActive) return panel; else return null;
// Algebraic:   return panel * algebraicTransistor(isActive);`
      }
    ]);

    return doc;
  }
}