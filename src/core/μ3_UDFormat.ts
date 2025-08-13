/**
 * μ3_UDFormat - WASSER (☵) Flow & Constants
 * 
 * Raimund's Bagua system constants and algebraic transistor operations.
 * The philosophical foundation of the UniversalFile format.
 * 
 * Based on "Früher Himmel" I Ching arrangement - the most powerful ordering.
 */

export class UDFormat {
  
  /**
   * Raimund's Bagua Constants - Früher Himmel Anordnung
   * Each trigram represents a fundamental aspect of reality
   */
  static readonly BAGUA = {
    HIMMEL: 1,   // ☰ (1) - Heaven/Sky - Templates, Creation
    WIND: 2,     // ☴ (2) - Wind/Gentle - UI, Views, Interfaces  
    WASSER: 4,   // ☵ (4) - Water/Flow - Procedures, Navigation
    BERG: 8,     // ☶ (8) - Mountain/Stillness - Init, Foundation
    SEE: 16,     // ☱ (16) - Lake/Joy - Properties, Attributes
    FEUER: 32,   // ☲ (32) - Fire/Clinging - Functions, Processing
    DONNER: 64,  // ☳ (64) - Thunder/Arousing - Events, Reactions
    ERDE: 128,   // ☷ (128) - Earth/Receptive - Data, Storage
    TAIJI: 256   // ☯ (256) - Unity/Center - Holistic Integration
  } as const;

  /**
   * Bagua Names for Human-Readable Output
   */
  static readonly BAGUA_NAMES = {
    [UDFormat.BAGUA.HIMMEL]: 'HIMMEL ☰',
    [UDFormat.BAGUA.WIND]: 'WIND ☴',
    [UDFormat.BAGUA.WASSER]: 'WASSER ☵',
    [UDFormat.BAGUA.BERG]: 'BERG ☶',
    [UDFormat.BAGUA.SEE]: 'SEE ☱',
    [UDFormat.BAGUA.FEUER]: 'FEUER ☲',
    [UDFormat.BAGUA.DONNER]: 'DONNER ☳',
    [UDFormat.BAGUA.ERDE]: 'ERDE ☷',
    [UDFormat.BAGUA.TAIJI]: 'TAIJI ☯'
  } as const;

  /**
   * I Ching Names (LOKI + tux-sourceish authentic style)
   */
  static readonly BAGUA_ICHING_NAMES = {
    [UDFormat.BAGUA.HIMMEL]: 'QIAN ☰ (Creative)',
    [UDFormat.BAGUA.WIND]: 'XUN ☴ (Gentle)',
    [UDFormat.BAGUA.WASSER]: 'KAN ☵ (Abysmal)',
    [UDFormat.BAGUA.BERG]: 'GEN ☶ (Keeping Still)',
    [UDFormat.BAGUA.SEE]: 'DUI ☱ (Joyous)',
    [UDFormat.BAGUA.FEUER]: 'LI ☲ (Clinging)',
    [UDFormat.BAGUA.DONNER]: 'ZHEN ☳ (Arousing)',
    [UDFormat.BAGUA.ERDE]: 'KUN ☷ (Receptive)',
    [UDFormat.BAGUA.TAIJI]: 'TAIJI ☯ (Unity)'
  } as const;

  /**
   * Bagua Symbols Only
   */
  static readonly BAGUA_SYMBOLS = {
    [UDFormat.BAGUA.HIMMEL]: '☰',
    [UDFormat.BAGUA.WIND]: '☴',
    [UDFormat.BAGUA.WASSER]: '☵',
    [UDFormat.BAGUA.BERG]: '☶',
    [UDFormat.BAGUA.SEE]: '☱',
    [UDFormat.BAGUA.FEUER]: '☲',
    [UDFormat.BAGUA.DONNER]: '☳',
    [UDFormat.BAGUA.ERDE]: '☷',
    [UDFormat.BAGUA.TAIJI]: '☯'
  } as const;

  /**
   * Raimund's Algebraic Transistor Function
   * 
   * Converts boolean logic to mathematical expressions using the principle:
   * - 0^0 = 1 (TRUE condition)
   * - 0^1 = 0 (FALSE condition)
   * 
   * @param condition - Boolean condition to convert
   * @returns 1 if true, 0 if false
   * 
   * @example
   * ```typescript
   * // Traditional: if (userLoggedIn) return activePanel; else return null;
   * // Algebraic: return activePanel * UDFormat.transistor(userLoggedIn);
   * ```
   */
  static transistor(condition: boolean): number {
    return Math.pow(0, condition ? 0 : 1);
  }

  /**
   * Inverse Algebraic Transistor
   * Returns 1 when condition is false, 0 when true
   * 
   * @param condition - Boolean condition to invert
   * @returns 0 if true, 1 if false
   */
  static inverseTransistor(condition: boolean): number {
    return Math.pow(0, condition ? 1 : 0);
  }

  /**
   * Check if a number contains specific Bagua aspects (bitwise AND)
   * 
   * @param baguaDescriptor - The bagua number to check
   * @param aspects - Array of bagua constants to check for
   * @returns true if descriptor contains all specified aspects
   * 
   * @example
   * ```typescript
   * const item = { bagua_descriptor: UDFormat.BAGUA.WIND | UDFormat.BAGUA.FEUER };
   * UDFormat.hasBaguaAspects(item.bagua_descriptor, [UDFormat.BAGUA.WIND]); // true
   * ```
   */
  static hasBaguaAspects(baguaDescriptor: number, aspects: number[]): boolean {
    return aspects.every(aspect => (baguaDescriptor & aspect) === aspect);
  }

  /**
   * Get human-readable bagua representation
   * 
   * @param baguaDescriptor - The bagua number to decode
   * @returns Array of bagua names that make up this descriptor
   */
  static decodeBagua(baguaDescriptor: number): string[] {
    const aspects: string[] = [];
    
    Object.entries(UDFormat.BAGUA).forEach(([_, value]) => {
      if ((baguaDescriptor & value) === value) {
        aspects.push(UDFormat.BAGUA_NAMES[value as keyof typeof UDFormat.BAGUA_NAMES]);
      }
    });
    
    return aspects;
  }

  /**
   * Get authentic I Ching style bagua representation (LOKI + tux-sourceish style)
   * 
   * @param baguaDescriptor - The bagua number to decode
   * @returns Symbolic + I Ching names + numeric
   * 
   * @example
   * // Returns: "☰☲ (QIAN+LI - Creative+Clinging) [33]"
   */
  static decodeBaguaAuthentic(baguaDescriptor: number): string {
    const symbols: string[] = [];
    const names: string[] = [];
    
    Object.entries(UDFormat.BAGUA).forEach(([_, value]) => {
      if ((baguaDescriptor & value) === value) {
        symbols.push(UDFormat.BAGUA_SYMBOLS[value as keyof typeof UDFormat.BAGUA_SYMBOLS]);
        names.push(UDFormat.BAGUA_ICHING_NAMES[value as keyof typeof UDFormat.BAGUA_ICHING_NAMES]);
      }
    });
    
    if (symbols.length === 0) return `☯ (TAIJI - Unity) [${baguaDescriptor}]`;
    if (symbols.length === 1) return `${symbols[0]} (${names[0]}) [${baguaDescriptor}]`;
    
    // Multiple aspects - combine symbols and extract core names
    const symbolString = symbols.join('');
    const coreNames = names.map(name => name.split(' ')[0]).join('+');
    const meanings = names.map(name => name.match(/\(([^)]+)\)/)?.[1] || '').filter(Boolean).join('+');
    
    return `${symbolString} (${coreNames} - ${meanings}) [${baguaDescriptor}]`;
  }

  /**
   * Generate symbolic bagua only (for compact display)
   */
  static getBaguaSymbols(baguaDescriptor: number): string {
    const symbols: string[] = [];
    
    Object.entries(UDFormat.BAGUA).forEach(([_, value]) => {
      if ((baguaDescriptor & value) === value) {
        symbols.push(UDFormat.BAGUA_SYMBOLS[value as keyof typeof UDFormat.BAGUA_SYMBOLS]);
      }
    });
    
    return symbols.length > 0 ? symbols.join('') : '☯';
  }

  /**
   * Calculate Bagua precedence for philosophical sorting
   * Based on Früher Himmel arrangement power hierarchy
   * 
   * @param baguaDescriptor - The bagua number to evaluate
   * @returns Precedence value (higher = more important)
   */
  static calculateBaguaPrecedence(baguaDescriptor: number): number {
    const precedenceMap = {
      [UDFormat.BAGUA.TAIJI]: 9,   // Unity - Highest precedence
      [UDFormat.BAGUA.HIMMEL]: 8,  // Creation - Second highest
      [UDFormat.BAGUA.ERDE]: 7,    // Foundation - Very important
      [UDFormat.BAGUA.FEUER]: 6,   // Processing - High importance
      [UDFormat.BAGUA.WASSER]: 5,  // Flow - Medium-high
      [UDFormat.BAGUA.BERG]: 4,    // Stability - Medium
      [UDFormat.BAGUA.DONNER]: 3,  // Events - Medium-low
      [UDFormat.BAGUA.SEE]: 2,     // Properties - Low-medium
      [UDFormat.BAGUA.WIND]: 1     // Interfaces - Lowest precedence
    };

    let totalPrecedence = 0;
    Object.entries(precedenceMap).forEach(([baguaValue, precedence]) => {
      if ((baguaDescriptor & Number(baguaValue)) === Number(baguaValue)) {
        totalPrecedence += precedence;
      }
    });

    return totalPrecedence;
  }

  /**
   * Find polar opposite in Bagua system
   * Based on I Ching trigram complementarity
   * 
   * @param baguaDescriptor - The bagua number to find opposite for
   * @returns Polar opposite bagua descriptor
   */
  static findPolarOpposite(baguaDescriptor: number): number {
    const polarMap = {
      [UDFormat.BAGUA.HIMMEL]: UDFormat.BAGUA.ERDE,   // Heaven ↔ Earth
      [UDFormat.BAGUA.WIND]: UDFormat.BAGUA.BERG,     // Wind ↔ Mountain
      [UDFormat.BAGUA.WASSER]: UDFormat.BAGUA.FEUER,  // Water ↔ Fire
      [UDFormat.BAGUA.SEE]: UDFormat.BAGUA.DONNER,    // Lake ↔ Thunder
      [UDFormat.BAGUA.ERDE]: UDFormat.BAGUA.HIMMEL,
      [UDFormat.BAGUA.BERG]: UDFormat.BAGUA.WIND,
      [UDFormat.BAGUA.FEUER]: UDFormat.BAGUA.WASSER,
      [UDFormat.BAGUA.DONNER]: UDFormat.BAGUA.SEE,
      [UDFormat.BAGUA.TAIJI]: UDFormat.BAGUA.TAIJI    // Unity is self-opposite
    };

    let oppositeDescriptor = 0;
    Object.entries(polarMap).forEach(([original, opposite]) => {
      if ((baguaDescriptor & Number(original)) === Number(original)) {
        oppositeDescriptor |= opposite;
      }
    });

    return oppositeDescriptor;
  }

  /**
   * Binary format constants
   */
  static readonly BINARY = {
    /** Magic number for .ud files: "UDAR" in hex */
    MAGIC: 0x55444152,
    /** Current format version */
    VERSION: 0x0200,
    /** Signature bytes: "UD" */
    SIGNATURE: 0x5544,
    /** Header size in bytes */
    HEADER_SIZE: 16
  } as const;

  /**
   * Generate unique UDID with timestamp and spatial awareness
   * 
   * @param position - Optional position for spatial uniqueness
   * @returns Unique identifier string
   */
  static generateUDID(position?: { x: number; y: number; z: number }): string {
    const timestamp = Date.now();
    const spatialHash = position ? 
      Math.abs(position.x + position.y * 1000 + position.z * 1000000) % 10000 :
      Math.floor(Math.random() * 10000);
    
    return `ud_item_${timestamp}_${spatialHash}`;
  }

  /**
   * Validate UDID format
   * 
   * @param udid - The ID to validate
   * @returns true if valid UDID format
   */
  static isValidUDID(udid: string): boolean {
    return /^ud_item_\d+_\d+$/.test(udid);
  }
}