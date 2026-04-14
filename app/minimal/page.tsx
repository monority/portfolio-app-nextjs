"use client";

import DarkModeToggle from "../components/DarkModeToggle";

export default function MinimalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f6f3] dark:bg-[#1a1a18]">
      <div className="w-full max-w-[640px] px-6 py-12">
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        <h1 className="text-[40px] font-semibold leading-[1.2] text-[#1a1a18] dark:text-[#f7f6f3]">
          Ronan Chenu
        </h1>
        <p className="mt-2 text-[16px] text-[#6b6b6b] dark:text-[#a0a0a0]">Creative Developer</p>
      </div>
    </div>
  );
}