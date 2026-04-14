"use client";

import DarkModeToggle from "../components/DarkModeToggle";

export default function DesignPage() {
  return (
    <div className="page-shell">
      <div className="design-page__content">
        <div className="design-page__header">
          <DarkModeToggle />
        </div>
        <h1 className="design-page__title">Ronan Chenu</h1>
        <p className="design-page__subtitle">
          Creative Developer — Design / Artist Version
        </p>
      </div>
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" className="design-page__logo">
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M14 20h12M20 14v12" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="25" fill="currentColor" fontSize="16" fontFamily="Inter">
          EC Model
        </text>
      </svg>
    </div>
  );
}
