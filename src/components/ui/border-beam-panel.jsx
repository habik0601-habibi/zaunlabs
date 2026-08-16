"use client";

import React, { useEffect, useRef, useState, useId } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ─── CSS tokens injected once per page ────────────────────────────────────────
// If you use multiple BorderBeamPanel instances, move this to globals.css/index.css
// and remove the MOTIQ_TOKENS injection from this component.
const MOTIQ_TOKENS = `
@layer motiq {
  :root {
    --motiq-beam-duration-idle: 3.6s;
    --motiq-beam-duration-active: 1.1s;
    --motiq-beam-ease: cubic-bezier(0.4, 0, 0.2, 1);
    --motiq-beam-thickness: 2px;
    --motiq-beam-radius: 1.5rem;
  }

  @keyframes motiq-orbit {
    from { --motiq-angle: 0deg; }
    to   { --motiq-angle: 360deg; }
  }

  @property --motiq-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
}
`;

// ─── Utility: build a conic-gradient comet stop ───────────────────────────────
function comet(hue, alpha, pos) {
  return `color-mix(in srgb, hsl(${hue} 100% 50%) ${Math.round(alpha * 100)}%, transparent) ${pos}%`;
}

// ─── Inner ring (needs @property for animation) ───────────────────────────────
function BeamRing({ colors, thickness, radius, durationIdle, durationActive, paused }) {
  const ringRef = useRef(null);
  const [active, setActive] = useState(false);

  const [hue1 = 215, hue2 = 195] = colors;

  const gradient = [
    `transparent 0%`,
    comet(hue1, 0.0, 45),
    comet(hue1, 0.7, 47),
    comet(hue1, 1.0, 49),
    `color-mix(in srgb, #ffffff, transparent 0%) 49.5%`, // ultra-bright white core
    `color-mix(in srgb, #ffffff, transparent 0%) 50.5%`, // ultra-bright white core
    comet(hue2, 1.0, 51),
    comet(hue2, 0.7, 53),
    comet(hue2, 0.0, 55),
    `transparent 100%`,
  ].join(", ");

  const style = {
    "--motiq-beam-thickness": `${thickness}px`,
    "--motiq-beam-radius": `${radius}px`,
    background: `conic-gradient(from var(--motiq-angle), ${gradient})`,
    animationName: paused ? "none" : "motiq-orbit",
    animationDuration: active ? `${durationActive}s` : `${durationIdle}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationPlayState: paused ? "paused" : "running",
    borderRadius: `${radius}px`,
    padding: `${thickness}px`,
    transition: `animation-duration 0.8s cubic-bezier(0.4,0,0.2,1)`,
    filter: `drop-shadow(0 0 2px hsl(${hue1} 100% 50% / 0.75)) drop-shadow(0 0 4px hsl(${hue2} 100% 50% / 0.5))`,
  };

  useEffect(() => {
    const el = ringRef.current?.parentElement;
    if (!el) return;
    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={style}
    >
      {/* inner mask to create ring effect */}
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          borderRadius: `${radius - thickness}px`,
          background: "inherit",
          backgroundClip: "padding-box",
        }}
      />
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────
export function BorderBeamPanel({
  children,
  className,
  // hue values for the two comet colors — defaults to Zaunlabs cobalt blue palette
  colors = [215, 195],
  thickness = 1.5,
  radius = 24,
  durationIdle = 3.6,
  durationActive = 1.1,
  pauseWhenHidden = true,
}) {
  const id = useId();
  const wrapRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [tokensInjected, setTokensInjected] = useState(false);

  // Inject CSS tokens once
  useEffect(() => {
    const existing = document.getElementById("motiq-tokens");
    if (!existing) {
      const style = document.createElement("style");
      style.id = "motiq-tokens";
      style.textContent = MOTIQ_TOKENS;
      document.head.appendChild(style);
    }
    setTokensInjected(true);
  }, []);

  // Pause when scrolled out of view
  useEffect(() => {
    if (!pauseWhenHidden || !wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [pauseWhenHidden]);

  // Respect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e) => setPaused(e.matches);
    setPaused(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn("relative", className)}
      style={{ borderRadius: `${radius}px` }}
    >
      {/* Animated beam ring — only mount after tokens are injected */}
      {tokensInjected && (
        <BeamRing
          colors={colors}
          thickness={thickness}
          radius={radius}
          durationIdle={durationIdle}
          durationActive={durationActive}
          paused={paused}
        />
      )}

      {/* Inner content — clipped to the radius */}
      <div
        className="relative z-10 h-full"
        style={{ borderRadius: `${radius - thickness}px` }}
      >
        {children}
      </div>
    </div>
  );
}
