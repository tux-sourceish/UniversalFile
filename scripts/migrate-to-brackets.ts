// scripts/migrate-to-brackets.ts
import { UniversalDocument } from '../src/universalDocument';
import * as fs from 'fs';
import * as path from 'path';

function migrateFile(filePath: string): void {
  console.log(`Migrating ${filePath}...`);

  try {
    // Read old format
    const oldContent = fs.readFileSync(filePath, 'utf-8');

    // Try to parse with old parser (you'd keep a legacy version)
    const doc = UniversalDocumentLegacy.fromText(oldContent);

    // Convert to new format
    const newContent = doc.toText(); // Uses new bracket format

    // Backup original
    fs.copyFileSync(filePath, filePath + '.backup');

    // Write new format
    fs.writeFileSync(filePath, newContent);

    console.log(`✅ Migrated ${filePath}`);
  } catch (error) {
    console.error(`❌ Failed to migrate ${filePath}:`, error);
  }
}

// Find all .ud.md files
function findUdFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findUdFiles(fullPath));
    } else if (entry.name.endsWith('.ud.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Run migration
const files = findUdFiles('.');
console.log(`Found ${files.length} files to migrate`);

for (const file of files) {
  migrateFile(file);
}

console.log('\n🎉 Migration complete!');
