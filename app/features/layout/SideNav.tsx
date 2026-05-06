"use client";

import LocalTime from "@/components/utils/LocalTime";

export default function SideNav() {
  return (
    <aside className="side-nav">
      <div className="p-4">
        <LocalTime />
      </div>
    </aside>
  );
}