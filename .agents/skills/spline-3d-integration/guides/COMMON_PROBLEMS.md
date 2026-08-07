# Common Problems & Debugging

These are the real-world issues that only surface after integration. Read this before finishing any Spline implementation.

---

## 🚨 Critical Gotchas (Will Break Your Site)

---

### 1. Scroll Hijacking — Page Won't Scroll

**What happens:** After adding Spline, the whole page stops scrolling. Users are stuck.

**Why:** Spline's auto-generated vanilla JS exports inject `overflow: hidden` into `<body>` CSS by default. This is baked into their generated code.

**Fix:**
```css
/* Add this to your CSS — overrides Spline's injection */
body {
  overflow: auto !important;
}
```

Or in Play Settings (Spline editor → Export → Play Settings), **disable "Page Scroll"** before generating the URL. This removes the overflow rule from the output.

**Also check:** If using the Runtime API and you embedded the generated `index.html` files, open them and manually remove the `overflow: hidden` line from the `<style>` block.

---

### 2. White Box Behind the 3D Scene

**What happens:** Your dark/transparent website has a white rectangle where the Spline scene is.

**Why:** The background color is set to white by default in Spline's export settings.

**Fix:**
1. In Spline editor → Export → Play Settings → toggle **Hide Background** ON
2. Click **Generate Draft** or **Promote to Production** — the URL does NOT auto-update with new settings
3. Copy the new URL

For the web component you can also override inline:
```html
<spline-viewer url="..." background="transparent"></spline-viewer>
```

---

### 3. Spline Scene Intermittently Fails to Load

**Fix — add a timeout fallback:**
```js
const TIMEOUT_MS = 8000;
const timeoutId = setTimeout(() => {
  document.getElementById('spline-fallback').style.display = 'block';
  document.querySelector('.spline-wrapper').style.display = 'none';
}, TIMEOUT_MS);
spline.load(sceneUrl).then(() => clearTimeout(timeoutId));
```

---

### 4. Scene Looks Fine on Mac, Lags on Everything Else

**Fix — detect capability before loading:**
```js
function shouldLoadSpline() {
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 2;
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  return !isMobile && !isLowEnd && !!gl;
}
if (shouldLoadSpline()) loadSplineScene();
else showFallback();
```

---

### 5. "Built with Spline" Badge — Removing It

**What happens:** A small "Built with Spline" logo appears in the bottom-right corner of the canvas.

**Why:** Spline injects an absolutely-positioned `<a>` element after the canvas. It links to spline.design.

**Fix 1 — MutationObserver (most reliable):**
```js
function killSplineBadge() {
  document.querySelectorAll('a[href*="spline.design"]').forEach(el => el.remove());
}
killSplineBadge();
const observer = new MutationObserver(killSplineBadge);
observer.observe(document.body, { childList: true, subtree: true });
```

**Fix 2 — Cover with a matching-color div:**
```jsx
{/* Place inside the Spline wrapper with position:relative */}
<div style={{
  position: 'absolute', bottom: 0, right: 0,
  width: '180px', height: '50px',
  background: 'YOUR_BG_COLOR',
  zIndex: 10,
  pointerEvents: 'none'
}} />
```

**Fix 3 — CSS (belt-and-suspenders):**
```css
a[href*="spline.design"],
canvas + a,
canvas ~ a {
  display: none !important;
  visibility: hidden !important;
}
```

**Use all three together** for guaranteed removal regardless of Spline SDK version.
