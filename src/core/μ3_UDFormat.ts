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
   * Raimund's Extended Bagua Constants - NEXUS v2.8 Früher Himmel Anordnung
   * Each trigram represents a fundamental aspect of reality with quantum resonance
   */
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
   * Raimund's Algebraic Transistor Function (NEXUS Enhanced)
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
   * Quantum Transistor - NEXUS v2.8 Feature
   * Probabilistic transistor with quantum uncertainty
   * 
   * @param probability - Probability threshold (0.0 - 1.0)
   * @returns 1 or 0 based on quantum randomness
   */
  static quantumTransistor(probability: number): number {
    const random = Math.random();
    return UDFormat.transistor(random < probability);
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
   * NEXUS v2.8: Enhanced Polar Pairs with Resonance Factors
   * Polare Beziehungen des Frühen Himmels mit Quantums-Resonanz
   */
  static readonly POLAR_PAIRS = new Map([
    [UDFormat.BAGUA.HIMMEL, { opposite: UDFormat.BAGUA.ERDE, resonance: 0.9 }],   // HIMMEL ↔ ERDE
    [UDFormat.BAGUA.WIND,   { opposite: UDFormat.BAGUA.DONNER, resonance: 0.8 }], // WIND ↔ DONNER  
    [UDFormat.BAGUA.WASSER, { opposite: UDFormat.BAGUA.FEUER, resonance: 0.85 }], // WASSER ↔ FEUER
    [UDFormat.BAGUA.BERG,   { opposite: UDFormat.BAGUA.SEE, resonance: 0.75 }],   // BERG ↔ SEE
    [UDFormat.BAGUA.ERDE,   { opposite: UDFormat.BAGUA.HIMMEL, resonance: 0.9 }], // ERDE ↔ HIMMEL
    [UDFormat.BAGUA.DONNER, { opposite: UDFormat.BAGUA.WIND, resonance: 0.8 }],   // DONNER ↔ WIND
    [UDFormat.BAGUA.FEUER,  { opposite: UDFormat.BAGUA.WASSER, resonance: 0.85 }],// FEUER ↔ WASSER
    [UDFormat.BAGUA.SEE,    { opposite: UDFormat.BAGUA.BERG, resonance: 0.75 }],  // SEE ↔ BERG
    [UDFormat.BAGUA.TAIJI,  { opposite: UDFormat.BAGUA.TAIJI, resonance: 1.0 }]   // TAIJI self-resonance
  ]);

  /**
   * Find polar opposite in Bagua system with resonance
   * Based on I Ching trigram complementarity (NEXUS Enhanced)
   * 
   * @param baguaDescriptor - The bagua number to find opposite for
   * @returns Polar opposite bagua descriptor
   */
  static findPolarOpposite(baguaDescriptor: number): number {
    let oppositeDescriptor = 0;
    
    for (const [original, { opposite }] of UDFormat.POLAR_PAIRS) {
      if ((baguaDescriptor & original) === original) {
        oppositeDescriptor |= opposite;
      }
    }

    return oppositeDescriptor;
  }

  /**
   * Calculate Bagua Resonance between two descriptors (NEXUS v2.8)
   * 
   * @param bagua1 - First bagua descriptor
   * @param bagua2 - Second bagua descriptor  
   * @returns Resonance factor (0.0 - 1.0)
   */
  static calculateBaguaResonance(bagua1: number, bagua2: number): number {
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