# 🚀 Features Guide - How Everything Works

## 📊 Views vs Copies (Counts)

### **Views (👁️ viewCount)**
- **What it tracks:** How many times a snippet detail page has been opened/viewed
- **When it increments:** Every time you click on a snippet card and view its detail page
- **Where you see it:** On the snippet detail page, below the code block
- **Example:** If you open a snippet 5 times, it shows "👁️ 5 views"

### **Copies (🔥 timesUsed)**
- **What it tracks:** How many times the code has been copied to clipboard
- **When it increments:** When you click the "COPY ALL" button on a snippet
- **Where you see it:** 
  - On snippet cards: "🔥 423 copies"
  - On snippet detail page: "🔥 423 copies"
- **Example:** If you copy code 10 times, it shows "🔥 10 copies"

### **Key Difference:**
- **Views** = Page visits (passive tracking)
- **Copies** = Active user action (copying code)

---

## 💾 Export/Import Snippets

### **Export Snippets as JSON**

**How to use:**
1. Click the **"EXPORT"** button in the header (top right, next to navigation)
2. A JSON file will download automatically
3. File name: `snippets_export_YYYY-MM-DD.json`

**What's exported:**
```json
{
  "snippets": [...all your snippets...],
  "exportedAt": "2024-01-15T10:30:00.000Z",
  "version": "1.0",
  "totalSnippets": 150
}
```

**Use cases:**
- ✅ Backup your snippets
- ✅ Share snippets with teammates
- ✅ Sync between devices
- ✅ Version control your code snippets

### **Import JSON Snippets**

**How to use:**
1. Click the **"IMPORT"** button in the header (next to EXPORT)
2. Select a JSON file from your computer
3. Choose an option:
   - **MERGE** (OK button): Adds new snippets, keeps existing ones
   - **REPLACE** (Cancel button): Deletes all existing, imports new ones

**Validation:**
- ✅ Checks file format (must be valid JSON)
- ✅ Validates snippet structure (must have: id, title, code, language)
- ✅ Shows error message if file is invalid
- ✅ Shows success message with count of imported snippets

**Example workflow:**
```
1. Export snippets from Device A → snippets_export.json
2. Transfer file to Device B
3. Import on Device B → Choose MERGE or REPLACE
4. All snippets now available on Device B!
```

---

## 📱 PWA Install Prompt (Installable App)

### **What is PWA?**
Progressive Web App - makes your website installable like a native app on your device.

### **Where to Find Install Prompt:**

#### **Chrome/Edge (Desktop):**
1. Look for **install icon** (➕) in the address bar (right side)
2. Or click the **three dots menu** → "Install SnippetBase"
3. Or wait for automatic banner: "Install SnippetBase" button

#### **Chrome/Edge (Mobile Android):**
1. Browser shows banner: "Add SnippetBase to Home screen"
2. Or menu → "Add to Home screen"
3. Or "Install app" notification

#### **Safari (iOS):**
1. Tap **Share button** (square with arrow)
2. Scroll down → **"Add to Home Screen"**
3. Tap "Add" → App icon appears on home screen

#### **Firefox:**
1. Address bar shows **"+" icon** or **house icon**
2. Click it → "Install" option appears

### **After Installation:**
- ✅ App icon on home screen/desktop
- ✅ Opens in its own window (no browser UI)
- ✅ Works offline (cached pages)
- ✅ Faster loading (cached assets)

### **Requirements:**
- Must be served over HTTPS (or localhost for dev)
- Must have valid manifest.json (we added this ✅)
- Must have service worker (we added this ✅)

### **If you don't see the prompt:**
1. **Check browser support:** Chrome/Edge/Safari/Firefox all support PWA
2. **Check if already installed:** Look for app icon on home screen
3. **Try manually:**
   - Chrome: Menu → "Install SnippetBase"
   - Safari: Share → "Add to Home Screen"
4. **Clear cache and reload:** Sometimes needed for first-time setup

---

## 🔍 Quick Feature Reference

### **Command Palette (Cmd/Ctrl + K)**
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- Quick search and navigate
- Shows: Navigation, Favorites, Recent, All Snippets, Cheat Sheets

### **Keyboard Navigation**
- **Arrow Keys:** Navigate between snippets
- **C Key:** Copy focused snippet
- **Enter:** Open focused snippet
- **Esc:** Clear focus / Close modals

### **Advanced Search**
- **Fuzzy Search:** "pythn" finds "python" (typo tolerance)
- **Prefix:** "pyth" matches "python" (autocomplete)
- **Synonyms:** "py" → "python", "k8s" → "kubernetes"
- **Field Boosts:** Title matches rank higher than code matches

### **Storage**
- **IndexedDB:** Stores snippets (handles 50MB+ vs localStorage's 5-10MB)
- **Auto-migration:** Automatically migrates from localStorage if found
- **Offline:** Works offline after first load (PWA caching)

---

## 🐛 Troubleshooting

### **Views showing 0:**
- ✅ **Fixed!** View tracking now works correctly
- Refresh the page and open a snippet - views should increment

### **Export/Import not working:**
- Check browser console for errors
- Ensure JSON file is valid format
- Try exporting first, then importing the same file to test

### **PWA install not showing:**
- Must be on HTTPS (or localhost)
- Try hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- Check if already installed (look for app icon)
- Try different browser

### **Snippets not loading:**
- Check IndexedDB in DevTools: Application → IndexedDB → `snippetbase-db`
- Check console for errors
- Try clearing IndexedDB and reloading (seed data will re-initialize)

---

## 📝 Notes

- **Views** are tracked per snippet, stored in IndexedDB
- **Copies** are tracked per snippet, stored in IndexedDB
- **Export/Import** preserves all data: favorites, views, copies, custom snippets
- **PWA** works best on Chrome/Edge, but Safari and Firefox also support it

