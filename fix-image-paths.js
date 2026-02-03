const fs = require('fs');
const path = require('path');

// Directory containing the docs
const docsDir = './docs';

// Function to fix image paths in a file
function fixImagePaths(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Replace all instances of ./img/ with /img/
        content = content.replace(/\(\.\//g, '(/');
        
        // Only write if content has changed
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`Fixed image paths in: ${filePath}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Get all .md files in docs directory
const files = fs.readdirSync(docsDir)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(docsDir, file));

console.log('Fixing image paths in documentation files...');
files.forEach(fixImagePaths);
console.log('Done!');