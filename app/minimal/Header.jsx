import DarkModeToggle from "../components/DarkModeToggle"
import { Icon } from "../components/ui/icon"
export default function Header() {
    return (
        <>
            <header className="minimal-header">
                <div className="minimal-header__theme">
                    <DarkModeToggle />
                </div>
                <div className="minimal-header__language">

                </div>
                <div className="minimal-header__network">
                    <div className="minimal-header__item">
                        <Icon name="github" title="github" sizeClass="icon-md" className="btn" />
                    </div>
                    <div className="minimal-header__item">
                        <Icon name="linkedin" title="linkedin" sizeClass="icon-md" className="btn" />
                    </div>
                </div>
            </header>

        </>
    );
}   