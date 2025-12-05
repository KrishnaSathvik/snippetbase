# Debug Copy Count Issue

## Check IndexedDB Data

Run this in your browser console (F12 → Console tab):

```javascript
// Check IndexedDB data
(async () => {
  const { openDB } = await import('https://cdn.jsdelivr.net/npm/idb@8/+esm');
  const db = await openDB('snippetbase-db', 1);
  const data = await db.get('snippets', 'coderef_snippets');
  console.log('Total snippets:', data?.length || 0);
  console.log('First snippet:', data?.[0]);
  console.log('Sample snippet with timesUsed:', data?.find(s => s.timesUsed > 0));
  
  // Check a specific snippet by ID (replace with actual snippet ID)
  const testSnippet = data?.find(s => s.title.includes('Window'));
  if (testSnippet) {
    console.log('Test snippet:', testSnippet.title, 'timesUsed:', testSnippet.timesUsed);
  }
})();
```

## Check if Copy is Being Called

Add this temporary debug code to see if the copy function is being called:

1. Open `src/pages/SnippetDetail.jsx`
2. Find the `handleCopy` function
3. Add console.log:

```javascript
const handleCopy = () => {
  console.log('Copy clicked! Snippet ID:', snippet.id);
  console.log('Current timesUsed:', snippet.timesUsed);
  snippetHook.incrementUseCount(snippet.id);
  toast.success('Copied!');
  // Check after a moment
  setTimeout(() => {
    const updated = snippetHook.snippets.find(s => s.id === snippet.id);
    console.log('Updated timesUsed:', updated?.timesUsed);
  }, 100);
};
```

## Check useSnippets Hook

Add debug to the increment function:

In `src/hooks/useSnippets.js`, find `incrementUseCount` and add:

```javascript
const incrementUseCount = (id) => {
  console.log('incrementUseCount called with ID:', id);
  setSnippets(prevSnippets => {
    console.log('Previous snippets count:', prevSnippets.length);
    const snippetIndex = prevSnippets.findIndex(s => s.id === id);
    console.log('Snippet found at index:', snippetIndex);
    
    if (snippetIndex >= 0) {
      const updated = prevSnippets.map(snippet =>
        snippet.id === id
          ? { ...snippet, timesUsed: (snippet.timesUsed || 0) + 1 }
          : snippet
      );
      console.log('Updated snippet timesUsed:', updated[snippetIndex].timesUsed);
      return updated;
    } else {
      console.log('Snippet not found in array, checking seedSnippets...');
      const seedSnippet = seedSnippets.find(s => s.id === id);
      if (seedSnippet) {
        console.log('Found in seedSnippets, adding to array');
        return [...prevSnippets, { ...seedSnippet, timesUsed: 1 }];
      }
      console.log('Snippet not found anywhere!');
      return prevSnippets;
    }
  });
};
```

