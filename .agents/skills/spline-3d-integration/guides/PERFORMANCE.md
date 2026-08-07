# Performance & Mobile Optimization

Spline scenes are WebGL — they run on the GPU. A poorly optimized scene will tank your PageSpeed score, lag on mid-range devices, and drain mobile batteries.

---

## Optimization Checklist (Pre-Integration)

- [ ] Scene file size is under 10MB
- [ ] Geometry Quality set to "Performance" in Play Settings
- [ ] Background hidden if site has its own background color
- [ ] Disabled: Page Scroll, Zoom, Pan (in Play Settings) unless explicitly needed
- [ ] Max 1–2 Spline embeds on the page (never more than 3)
- [ ] Less than 3 lights in the scene

---

## Loading Strategy

### 1. Preload the scene file
```html
<link rel="preload" href="https://prod.spline.design/REPLACE_ME/scene.splinecode" as="fetch" crossorigin>
```

### 2. Show a fallback while loading
```css
.spline-wrapper {
  background: #0a0a0a;
  width: 100%;
  height: 100vh;
}
```

### 3. Lazy load (React)
```jsx
const Spline = lazy(() => import('@splinetool/react-spline'));
```

### 4. Scroll fix (override Spline's body overflow injection)
```css
body { overflow: auto !important; }
```

### 5. Capability detection before loading
```js
function shouldLoadSpline() {
  const isMobile = window.innerWidth < 768;
  const isLowEnd = navigator.hardwareConcurrency <= 2;
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  return !isMobile && !isLowEnd && !!gl;
}
```
