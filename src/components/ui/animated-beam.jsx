"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

/* AnimatedBeam — adapted from the Magic UI component of the same name.
   Converted from TSX to JSX (this is a Vite + JSX project, not TypeScript).

   Two deliberate deviations from the upstream component:

   1. The travelling light is a round-capped DASH animated along the path via
      `stroke-dashoffset`, not framer-motion animating a `<linearGradient>`'s
      x1/x2. A dash reads as a discrete *pulse* leaving the node and arriving
      at the hub, which is the effect asked for; the gradient sweep reads as a
      continuous beam. It also keeps this off the framer-motion API surface.
      The path is marked `pathLength={1}` so the dash math is resolution- and
      length-independent — one set of keyframes serves every beam.

   2. An `active` prop gates the pulse. When false the beam is just its static
      hairline, so the diagram is a still picture until it is hovered. */

/**
 * @typedef {object} AnimatedBeamProps
 * @property {React.RefObject<HTMLElement>} containerRef  Positioning context; the SVG fills it.
 * @property {React.RefObject<HTMLElement>} fromRef       Pulse origin.
 * @property {React.RefObject<HTMLElement>} toRef         Pulse destination.
 * @property {boolean} [active=false]                     Run the pulse. False = static hairline only.
 * @property {number} [curvature=0]                       Control-point lift, px. 0 leaves the node horizontally.
 * @property {boolean} [reverse=false]                    Travel to→from instead of from→to.
 * @property {string} [pathColor]                         Static hairline color.
 * @property {number} [pathWidth=1.5]                     Hairline width, px.
 * @property {number} [pathOpacity=0.35]                  Hairline opacity.
 * @property {string} [gradientStartColor]                Pulse color at the container's left edge.
 * @property {string} [gradientStopColor]                 Pulse color at the container's right edge.
 * @property {number} [pulseLength=0.08]                  Pulse length as a fraction of the path.
 * @property {number} [gap=0.6]                           Dead time between pulses, as a fraction of the path.
 * @property {number} [duration=1.8]                      Seconds for one full cycle (gap included).
 * @property {number} [delay=0]                           Seconds before the first pulse.
 */

/* `--mk-start` is the pulse length plus its rest gap: while the offset is above
   the pulse length the dash sits entirely before the path, so nothing is drawn.
   That off-path lead-in is what puts a pause between one pulse and the next. */
const PULSE_KEYFRAMES = `
@keyframes mk-beam-pulse {
  from { stroke-dashoffset: var(--mk-start, 0.08); }
  to   { stroke-dashoffset: -1; }
}
@keyframes mk-beam-pulse-reverse {
  from { stroke-dashoffset: -1; }
  to   { stroke-dashoffset: var(--mk-start, 0.08); }
}`.trim();

/** SSR-safe `prefers-reduced-motion`. */
function useReducedMotion() {
  const [reduced, setReduced] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** @param {AnimatedBeamProps} props */
export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  active = false,
  curvature = 0,
  reverse = false,
  duration = 1.8,
  delay = 0,
  pathColor = "#94A3B8",
  pathWidth = 1.5,
  pathOpacity = 0.35,
  gradientStartColor = "#4A90D9",
  gradientStopColor = "#10B981",
  pulseLength = 0.08,
  gap = 0.6,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [pathD, setPathD] = React.useState("");
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const container = containerRef.current.getBoundingClientRect();
      const a = fromRef.current.getBoundingClientRect();
      const b = toRef.current.getBoundingClientRect();

      // A hidden column (display:none) reports a zero rect — skip it rather
      // than drawing a beam to the container's top-left corner.
      if (!a.width || !b.width) return;

      setSize({ width: container.width, height: container.height });

      const startX = a.left - container.left + a.width / 2 + startXOffset;
      const startY = a.top - container.top + a.height / 2 + startYOffset;
      const endX = b.left - container.left + b.width / 2 + endXOffset;
      const endY = b.top - container.top + b.height / 2 + endYOffset;

      const controlY = startY - curvature;
      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`);
    };

    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current);
    updatePath();

    window.addEventListener("resize", updatePath);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  const showPulse = active && !reducedMotion && pathD;

  return (
    <svg
      fill="none"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu", className)}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />

      {showPulse ? (
        <path
          d={pathD}
          pathLength={1}
          stroke={`url(#${id})`}
          strokeWidth={pathWidth * 2.1}
          strokeLinecap="round"
          style={{
            "--mk-start": pulseLength + gap,
            strokeDasharray: `${pulseLength} ${1 + pulseLength + gap}`,
            animation: `${reverse ? "mk-beam-pulse-reverse" : "mk-beam-pulse"} ${duration}s linear ${delay}s infinite`,
            filter: `drop-shadow(0 0 3px ${gradientStopColor}) drop-shadow(0 0 9px ${gradientStopColor})`,
          }}
        />
      ) : null}

      <defs>
        {/* Spanning the container rather than the path, so a pulse shifts hue
            as it crosses the diagram toward the hub. */}
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2={size.width}
          y2="0"
        >
          <stop stopColor={gradientStartColor} />
          <stop offset="50%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStartColor} />
        </linearGradient>
      </defs>

      <style dangerouslySetInnerHTML={{ __html: PULSE_KEYFRAMES }} />
    </svg>
  );
}

export default AnimatedBeam;
