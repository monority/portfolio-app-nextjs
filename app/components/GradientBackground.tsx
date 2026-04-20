"use client";

import "./gradient-background.css";

export function GradientBackground() {
    return (
        <div className="gb-root" aria-hidden="true">
            <div className="gb-grid" />

            <div className="gb-glow" />

            <svg
                className="gb-svg"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="gb-lg" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                        <stop offset="50%" className="gb-line-mid" />
                        <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Top-edge shimmer */}
                <line
                    x1="0"
                    y1="0.5"
                    x2="100%"
                    y2="0.5"
                    stroke="url(#gb-lg)"
                    strokeWidth="1"
                    className="gb-topline"
                />
            </svg>
        </div>
    );
}
