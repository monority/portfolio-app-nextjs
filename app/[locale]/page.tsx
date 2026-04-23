import Header from "@/[locale]/features/Header";
import Hero from "@/[locale]/Hero";
import SideNav from "@/[locale]/features/SideNav";
import About from "@/[locale]/About";
import Profile from "@/[locale]/Profile";
import Projects from "@/[locale]/Projects";

export default function HomePage() {
    return (
        <>
            <SideNav />
            <Header />
            <main>
                <Hero />
                <About />
                <Profile />
                <Projects />
            </main>
        </>
    );
}


