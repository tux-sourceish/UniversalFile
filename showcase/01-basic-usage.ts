/**
 * Basic UniversalFile Usage
 * Learn the fundamentals of creating spatial documents
 */

import { UniversalDocument } from '@tux-sourceish/universalfile';
import * as fs from 'fs';

// Create your first document
const doc = new UniversalDocument();

// Add a simple note
const note = doc.addItem({
  type: UniversalDocument.ItemType.NOTIZZETTEL,
  title: "My First Note",
  position: { x: 100, y: 100, z: 0 },
  content: { text: "Hello, spatial world!" }
});

console.log("Created note:", note.id);

// Save to file
const binary = doc.toBinary();
fs.writeFileSync('my-first-document.ud', Buffer.from(binary));

// Load it back
const loaded = UniversalDocument.fromBinary(binary);
console.log("Loaded items:", loaded.allItems.length);