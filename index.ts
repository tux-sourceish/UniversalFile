// 🌌 UniversalFile (.UD) Format - Main Entry Point
export * from './UDFormat';
export * from './UDDocument';
export * from './UDMinimapIntegration';

export { default as UDDocument } from './UDDocument';
export { default as UDMinimapAdapter } from './UDMinimapIntegration';

// Re-export the unified API
import { UniversalFile } from './UDFormat';
export { UniversalFile };
export default UniversalFile;
