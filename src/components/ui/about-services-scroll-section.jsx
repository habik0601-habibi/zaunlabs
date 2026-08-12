import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Chapter Data ──────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 'about',
    sideLabel: 'ABOUT',
    title: 'ZAUNLABS',
    lines: [
      "We're a small, senior-led team that builds fast, and builds right.",
      'No account managers — the people writing your proposal ship your code.',
    ],
    skyColor: new THREE.Color(0x0a1628),
    nebulaColor: new THREE.Color(0x0d2d5e),
    mountainFar: new THREE.Color(0x0a2040),
    mountainMid: new THREE.Color(0x0c2a55),
    mountainNear: new THREE.Color(0x081830),
    atmosphereColor: '#1a4a8a',
  },
  {
    id: 'web',
    sideLabel: 'SERVICES',
    title: 'WEB DEVELOPMENT',
    lines: [
      'Business sites, web apps, and dashboards built to convert.',
      'React, modern tooling, fast load times, built to scale with you.',
    ],
    skyColor: new THREE.Color(0x081428),
    nebulaColor: new THREE.Color(0x0b2550),
    mountainFar: new THREE.Color(0x091c3a),
    mountainMid: new THREE.Color(0x0a234a),
    mountainNear: new THREE.Color(0x071525),
    atmosphereColor: '#0d3a7a',
  },
  {
    id: 'ai',
    sideLabel: 'SERVICES',
    title: 'AI AUTOMATION',
    lines: [
      'Custom AI agents and workflow automation for real business processes.',
      'The manual work that used to take hours now takes minutes.',
    ],
    skyColor: new THREE.Color(0x06101e),
    nebulaColor: new THREE.Color(0x082040),
    mountainFar: new THREE.Color(0x071730),
    mountainMid: new THREE.Color(0x091e40),
    mountainNear: new THREE.Color(0x051220),
    atmosphereColor: '#0a2d63',
  },
];

// ─── Reduced Motion Hook ────────────────────────────────────────────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ─── Text Splitting Helper ──────────────────────────────────────────────────────
function SplitTitle({ text, visible }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-500"
          style={{
            transform: visible ? 'translateY(0)' : 'translateY(110%)',
            opacity: visible ? 1 : 0,
            transitionDelay: `${i * 28}ms`,
          }}
        >
          {char === ' ' ? '\u00a0' : char}
        </span>
      ))}
    </span>
  );
}

// ─── Mountain SVG Path Generator ───────────────────────────────────────────────
function makeMountainPath(points, height) {
  const w = 1200;
  let d = `M0,${height}`;
  points.forEach(([x, y]) => { d += ` L${x},${y}`; });
  d += ` L${w},${height} Z`;
  return d;
}

const FAR_MOUNTAINS = makeMountainPath(
  [[0,340],[80,280],[180,260],[300,300],[420,240],[520,210],[620,250],[720,220],[820,260],[950,230],[1070,270],[1200,300]],
  400
);
const MID_MOUNTAINS = makeMountainPath(
  [[0,380],[60,320],[160,290],[280,340],[380,270],[500,250],[620,290],[740,260],[860,300],[1000,270],[1120,310],[1200,360]],
  400
);
const NEAR_MOUNTAINS = makeMountainPath(
  [[0,400],[50,350],[130,330],[250,380],[380,310],[520,290],[660,330],[800,300],[940,350],[1080,320],[1200,390]],
  400
);

// ─── Static Fallback (reduced motion) ─────────────────────────────────────────
function StaticChapter({ chapter }) {
  return (
    <section className="relative py-24 md:py-32 border-t border-blue-900/30 bg-[#0a1628] flex items-center justify-center min-h-[60vh]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="text-xs font-mono tracking-[0.25em] text-blue-400 mb-4 uppercase">
          {chapter.sideLabel}
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          {chapter.title}
        </h2>
        {chapter.lines.map((line, i) => (
          <p key={i} className="text-blue-200/80 text-lg leading-relaxed mb-2">{line}</p>
        ))}
      </div>
    </section>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function AboutServicesScrollSection() {
  const reducedMotion = usePrefersReducedMotion();

  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const sideRef = useRef(null);
  const counterRef = useRef(null);

  const [chapterIndex, setChapterIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const chapterRef = useRef(0);

  // ── Reduced Motion: render static stacked chapters ──────────────────────────
  if (reducedMotion) {
    return (
      <div id="about">
        {CHAPTERS.map((ch) => (
          <StaticChapter key={ch.id} chapter={ch} />
        ))}
      </div>
    );
  }

  // ── Main 3D animated section ─────────────────────────────────────────────────
  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    // ── Renderer ───────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(wrapperRef.current.clientWidth, wrapperRef.current.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // ── Scene + Camera ─────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      wrapperRef.current.clientWidth / wrapperRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // ── Sky gradient background plane ──────────────────────────────────────────
    const skyGeo = new THREE.PlaneGeometry(20, 10);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        uTopColor: { value: CHAPTERS[0].skyColor.clone() },
        uBottomColor: { value: new THREE.Color(0x1a3a6e) },
        uProgress: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uBottomColor;
        varying vec2 vUv;
        void main() {
          vec3 col = mix(uBottomColor, uTopColor, pow(vUv.y, 0.6));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      side: THREE.FrontSide,
      depthWrite: false,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.position.z = -5;
    scene.add(sky);

    // ── Stars ──────────────────────────────────────────────────────────────────
    const STAR_COUNT = 3500;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    const starSizes = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPositions[i * 3]     = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 15 + 3;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      starSizes[i] = Math.random() * 2.5 + 0.5;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    const starMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float twinkle = 0.7 + 0.3 * sin(uTime * 2.0 + position.x * 7.3 + position.y * 3.1);
          vAlpha = twinkle;
          gl_PointSize = size * uPixelRatio * (300.0 / -mv.z);
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float soft = 1.0 - smoothstep(0.2, 0.5, d);
          gl_FragColor = vec4(0.85, 0.92, 1.0, soft * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ── Nebula glow (large soft sprite) ───────────────────────────────────────
    const nebulaTex = (() => {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size; canvas.height = size;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
      grad.addColorStop(0, 'rgba(100,150,255,0.35)');
      grad.addColorStop(0.5, 'rgba(60,100,200,0.12)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    })();
    const nebulaSpriteMat = new THREE.SpriteMaterial({
      map: nebulaTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const nebula1 = new THREE.Sprite(nebulaSpriteMat.clone());
    nebula1.scale.set(12, 8, 1);
    nebula1.position.set(-1, 1.5, -3);
    const nebula2 = new THREE.Sprite(nebulaSpriteMat.clone());
    nebula2.scale.set(10, 6, 1);
    nebula2.position.set(3, 0.5, -3);
    scene.add(nebula1, nebula2);

    // ── Atmosphere glow at horizon ─────────────────────────────────────────────
    const atmCanvas = document.createElement('canvas');
    atmCanvas.width = 512; atmCanvas.height = 128;
    const atmCtx = atmCanvas.getContext('2d');
    const atmGrad = atmCtx.createLinearGradient(0, 0, 0, 128);
    atmGrad.addColorStop(0, 'rgba(26,74,138,0)');
    atmGrad.addColorStop(0.5, 'rgba(26,74,138,0.45)');
    atmGrad.addColorStop(1, 'rgba(10,40,90,0)');
    atmCtx.fillStyle = atmGrad;
    atmCtx.fillRect(0, 0, 512, 128);
    const atmTex = new THREE.CanvasTexture(atmCanvas);
    const atmGeo = new THREE.PlaneGeometry(20, 2);
    const atmMat = new THREE.MeshBasicMaterial({
      map: atmTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmGeo, atmMat);
    atmosphere.position.set(0, -1.5, -1);
    scene.add(atmosphere);

    // ── Mountain layers using 2D canvas textures ───────────────────────────────
    const makeMtnMesh = (svgPath, color, zPos, yOffset) => {
      const w = 1200, h = 400;
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      ctx.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
      const p = new Path2D(svgPath);
      ctx.fill(p);
      const tex = new THREE.CanvasTexture(c);
      const geo = new THREE.PlaneGeometry(16, 4);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(0, yOffset, zPos);
      return mesh;
    };

    const ch0 = CHAPTERS[0];
    const mtnFar  = makeMtnMesh(FAR_MOUNTAINS,  ch0.mountainFar.getHex(),  -2, -1.2);
    const mtnMid  = makeMtnMesh(MID_MOUNTAINS,  ch0.mountainMid.getHex(),  -1.5, -1.6);
    const mtnNear = makeMtnMesh(NEAR_MOUNTAINS, ch0.mountainNear.getHex(), -1, -2.0);
    scene.add(mtnFar, mtnMid, mtnNear);

    // ── Chapter transition logic ───────────────────────────────────────────────
    const updateToChapter = (idx, immediate = false) => {
      const ch = CHAPTERS[idx];
      const dur = immediate ? 0 : 1.2;

      gsap.to(skyMat.uniforms.uTopColor.value, { r: ch.skyColor.r, g: ch.skyColor.g, b: ch.skyColor.b, duration: dur });
      gsap.to(skyMat.uniforms.uBottomColor.value, { r: ch.nebulaColor.r, g: ch.nebulaColor.g, b: ch.nebulaColor.b, duration: dur });

      // Regen mountain textures for the new chapter color
      const regenMtn = (mesh, svgPath, newColor) => {
        const w = 1200, h = 400;
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');
        ctx.fillStyle = `#${newColor.getHex().toString(16).padStart(6, '0')}`;
        const p = new Path2D(svgPath);
        ctx.fill(p);
        const tex = new THREE.CanvasTexture(c);
        mesh.material.map?.dispose();
        mesh.material.map = tex;
        mesh.material.needsUpdate = true;
      };

      gsap.delayedCall(dur * 0.4, () => {
        regenMtn(mtnFar, FAR_MOUNTAINS, ch.mountainFar);
        regenMtn(mtnMid, MID_MOUNTAINS, ch.mountainMid);
        regenMtn(mtnNear, NEAR_MOUNTAINS, ch.mountainNear);
      });

      // Camera drift between chapters
      gsap.to(camera.position, {
        x: idx * 0.3 - 0.3,
        y: idx * -0.1,
        duration: dur,
        ease: 'power2.inOut',
      });
    };

    // ── Animation loop ─────────────────────────────────────────────────────────
    let rafId;
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      starMat.uniforms.uTime.value = t;

      // Gentle star drift
      stars.rotation.y = t * 0.003;
      nebula1.position.x = -1 + Math.sin(t * 0.2) * 0.3;
      nebula2.position.x = 3 + Math.cos(t * 0.15) * 0.2;

      // Subtle camera sway
      camera.rotation.z = Math.sin(t * 0.08) * 0.008;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize Handler ─────────────────────────────────────────────────────────
    const onResize = () => {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      const h = wrapperRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Text animation helpers ─────────────────────────────────────────────────
    const showText = () => {
      setTextVisible(false);
      setTimeout(() => setTextVisible(true), 80);
    };

    const applyChapter = (idx) => {
      if (chapterRef.current === idx) return;
      chapterRef.current = idx;
      setChapterIndex(idx);
      updateToChapter(idx);
      showText();
    };

    // Initial text
    setTimeout(() => setTextVisible(true), 300);
    updateToChapter(0, true);

    // ── ScrollTrigger ──────────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        let newIdx = 0;
        if (p >= 0.66) newIdx = 2;
        else if (p >= 0.33) newIdx = 1;
        applyChapter(newIdx);

        // Parallax camera push with scroll
        camera.position.z = 5 - p * 1.5;
        mtnFar.position.x = p * -0.5;
        mtnMid.position.x = p * -1.0;
        mtnNear.position.x = p * -1.8;
      },
    });

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      st.kill();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      [starGeo, skyGeo, atmGeo].forEach(g => g.dispose());
      [starMat, skyMat, atmMat, nebulaSpriteMat].forEach(m => m.dispose());
      [mtnFar, mtnMid, mtnNear].forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.map?.dispose();
        mesh.material.dispose();
      });
      nebulaTex.dispose();
      atmTex.dispose();
    };
  }, []);

  const chapter = CHAPTERS[chapterIndex];

  return (
    <div
      id="about"
      ref={wrapperRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* ── Side menu ─────────────────────────────────────────────────────── */}
      <div
        ref={sideRef}
        className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span
          className="writing-mode-vertical text-[10px] font-mono tracking-[0.3em] text-blue-300/60 uppercase transition-all duration-700"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {chapter.sideLabel}
        </span>
        <div className="w-px h-12 bg-blue-400/30" />
        <span
          className="writing-mode-vertical text-[9px] font-mono tracking-[0.25em] text-blue-400/50 uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          SCROLL
        </span>
      </div>

      {/* ── Chapter counter ────────────────────────────────────────────────── */}
      <div
        ref={counterRef}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-blue-300/70 tabular-nums">
          {String(chapterIndex + 1).padStart(2, '0')}
        </span>
        <div className="w-px flex flex-col gap-1">
          {CHAPTERS.map((_, i) => (
            <div
              key={i}
              className="w-px transition-all duration-500"
              style={{
                height: i === chapterIndex ? 28 : 10,
                background: i === chapterIndex ? 'rgba(147,197,253,0.9)' : 'rgba(147,197,253,0.25)',
              }}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-blue-300/40 tabular-nums">
          {String(CHAPTERS.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Text overlay ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-16 px-16 sm:px-24 pointer-events-none">
        {/* Chapter badge */}
        <div
          className="mb-4 transition-all duration-500"
          style={{ opacity: textVisible ? 1 : 0, transform: textVisible ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <span className="inline-block text-[11px] font-mono tracking-[0.28em] text-blue-300/70 uppercase border border-blue-400/30 rounded px-3 py-1 bg-blue-950/20 backdrop-blur-sm">
            {chapter.sideLabel}
          </span>
        </div>

        {/* Title with char stagger */}
        <div ref={titleRef} className="overflow-hidden mb-5">
          <h2
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-none"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              textShadow: '0 4px 40px rgba(74,144,217,0.4), 0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            <SplitTitle text={chapter.title} visible={textVisible} />
          </h2>
        </div>

        {/* Subtitle lines */}
        <div ref={line1Ref} className="overflow-hidden mb-2">
          <p
            className="text-lg sm:text-xl text-blue-200/85 font-medium leading-relaxed transition-all duration-600"
            style={{
              transform: textVisible ? 'translateY(0)' : 'translateY(110%)',
              opacity: textVisible ? 1 : 0,
              transitionDelay: '220ms',
              maxWidth: '600px',
            }}
          >
            {chapter.lines[0]}
          </p>
        </div>
        <div ref={line2Ref} className="overflow-hidden">
          <p
            className="text-base sm:text-lg text-blue-300/65 font-normal leading-relaxed transition-all duration-600"
            style={{
              transform: textVisible ? 'translateY(0)' : 'translateY(110%)',
              opacity: textVisible ? 1 : 0,
              transitionDelay: '340ms',
              maxWidth: '560px',
            }}
          >
            {chapter.lines[1]}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mt-8 flex gap-2 items-center">
          {CHAPTERS.map((_, i) => (
            <div
              key={i}
              className="h-[2px] rounded-full transition-all duration-700"
              style={{
                width: i === chapterIndex ? 48 : 18,
                background: i === chapterIndex
                  ? 'rgba(147,197,253,0.9)'
                  : 'rgba(147,197,253,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom edge vignette blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #D6ECFF)' }}
      />
    </div>
  );
}
