"use client";

import Header from "@/[locale]/features/Header";
import Hero from "@/[locale]/Hero";
import SideNav from "@/[locale]/features/SideNav";

export default function HomePage() {
    return (
        <>
            <SideNav />
            <Header />
            <main>
                <Hero />

            </main>
        </>
    );
}


