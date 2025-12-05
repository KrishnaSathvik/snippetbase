// Run this in browser console to check IndexedDB
(async () => {
  try {
    // Import idb dynamically
    const { openDB } = await import('https://cdn.jsdelivr.net/npm/idb@8/+esm');
    const db = await openDB('snippetbase-db', 1);
    const data = await db.get('snippets', 'coderef_snippets');
    
    console.log('📊 IndexedDB Check:');
    console.log('Total snippets:', data?.length || 0);
    
    if (data && data.length > 0) {
      // Show first few snippets with their timesUsed
      console.log('\n📋 Sample snippets:');
      data.slice(0, 5).forEach((s, i) => {
        console.log(`${i + 1}. ${s.title}: timesUsed=${s.timesUsed || 0}, viewCount=${s.viewCount || 0}`);
      });
      
      // Find snippets with timesUsed > 0
      const usedSnippets = data.filter(s => (s.timesUsed || 0) > 0);
      console.log(`\n🔥 Snippets with copies: ${usedSnippets.length}`);
      if (usedSnippets.length > 0) {
        usedSnippets.slice(0, 3).forEach(s => {
          console.log(`  - ${s.title}: ${s.timesUsed} copies`);
        });
      }
    } else {
      console.log('⚠️ No snippets found in IndexedDB!');
    }
  } catch (error) {
    console.error('❌ Error checking IndexedDB:', error);
  }
})();

