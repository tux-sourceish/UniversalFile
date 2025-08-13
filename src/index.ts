/**
 * UniversalFile v2.0 - Revolutionary Spatial Document Format
 * 
 * Pure .ud format library with fractal territory support.
 * Extracted and refined from UniversalDesktop v2.1 for maximum portability.
 * 
 * @version 2.0.0-fractal
 * @author SingularUniverse Team
 */

// Core .ud engine (pure, no dependencies)
export { UniversalDocument } from './core/μ6_UDCore';
export { UDFormat } from './core/μ3_UDFormat';
export { μ1_UDFactory } from './core/μ1_UDFactory';

// Fractal territory system (coming in v2.1)
// export { μ5_TerritoryManager } from './fractal/μ5_TerritoryManager';
// export { μ3_FractalSerializer } from './fractal/μ3_FractalSerializer';

// Type exports
export type {
  UDID,
  UDItem,
  UDOrigin,
  UDTransformation,
  UDPosition,
  UDRect,
  UDMetadata,
  UDEmbeddedFont,
  Territory,
  TerritoryCluster
} from './core/types';

// Re-export enums and constants
export { ItemType, GERMAN_TYPE_NAMES } from './core/types';