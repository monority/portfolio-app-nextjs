import DarkModeToggle from "@/components/DarkModeToggle"
import Button from "@/components/ui/button";
import { Icon } from "@/components/ui/icon"
export default function Header() {
    return (
        <>
            <header className="minimal-header">

                <div className="minimal-header__network">
                    <div className="minimal-header__item">

                        <DarkModeToggle />

                    </div>
                    <div className="minimal-header__item">
                        <Button variant="primary" size="md" loading={false}>
                            <Icon name="linkedin" title="linkedin" sizeClass="icon-md" className="minimal-header__icon" />
                        </Button>
                    </div>
                    <div className="minimal-header__item">
                        <Button variant="primary" size="md" loading={false}>
                            <Icon name="github" title="github" sizeClass="icon-md" className="minimal-header__icon" />
                        </Button>
                    </div>
                </div>
            </header>

        </>
    );
}   