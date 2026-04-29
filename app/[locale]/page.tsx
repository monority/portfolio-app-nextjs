import Header from "@/[locale]/features/Header";
import SideNav from "@/[locale]/features/SideNav";
import Hero from "@/[locale]/sections/hero/Hero";
import About from "@/[locale]/sections/about/About";
import Profile from "@/[locale]/sections/profile/Profile";
import Projects from "@/[locale]/sections/projects/Projects";
import Creation from "@/[locale]/sections/creation/Creation";
import Modules from "@/[locale]/sections/modules/Modules";

export default function HomePage() {
    return (
        <>
            <SideNav />
            <Header />
            <main>
                <Hero />
                <About />
                <Projects />
                <Creation />
                <Modules />
                <Profile />
            </main>
        </>
    );
}
