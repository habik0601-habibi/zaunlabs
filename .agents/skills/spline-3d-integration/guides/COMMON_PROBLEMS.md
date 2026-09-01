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

**Why — this differs by runtime version. Check before reaching for a fix:**

| Runtime | Badge is… | Removable by |
| --- | --- | --- |
| older builds | an absolutely-positioned `<a href="…spline.design">` after the canvas | DOM / CSS |
| **`@splinetool/runtime` v1.x (current)** | **a WebGL post-processing pass composited into the canvas framebuffer** | **render pipeline only** |

On v1.x the scene's `publish.settings.web.logo: true` makes the runtime load
`shared.images.SplineWatermark` and call `pipeline.setWatermark(texture)`, which
flips on `pipeline.logoOverlayPass`. The EffectComposer then paints it over the
final frame. **There is no element in the DOM** — `document.querySelectorAll('a')`
returns nothing matching, there is no shadow root, and no scene object shows up in
`getAllObjects()`. CSS and MutationObservers are dead code against this version.

**Supported fix — turn it off at the source:**
Spline editor → Export/Publish settings → toggle the Spline logo off → republish.
The scene then ships `logo: false` and no watermark pass is ever created. Requires
a paid Spline plan. This is the only approach that survives runtime upgrades.

**Runtime override (v1.x)** — private internals, so optional-chain everything and
expect it to break on upgrade. Note the runtime binds the texture *after* awaiting
the image load, which can resolve **after** `onLoad` fires, so disabling the pass
once is not enough — stub the setter too:
```js
const pipeline = (splineApp._renderer ?? splineApp.renderer)?.pipeline
if (pipeline) {
  pipeline.setWatermark?.(null)       // disable if already bound
  pipeline.setWatermark = () => {}     // block late re-binding
  if (pipeline.logoOverlayPass) pipeline.logoOverlayPass.enabled = false
  pipeline.updateRenderToScreen?.()
  splineApp.requestRender?.()          // scene may render on-demand
}
```
Verify with `pipeline.logoOverlayPass.enabled === false` several seconds after
load, not just at load. Be aware this overrides a licensing flag — check your
Spline plan's terms.

**Do not cover it with a matching-color div.** The canvas underneath is a
gradient/3D render, so a flat rectangle never matches and reads as a visible
patch in the corner.
