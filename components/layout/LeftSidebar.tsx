import LeftAds from "../ads/LeftAds";

export default function LeftSidebar() {
    return (
        <aside
            className="hidden lg:block lg:col-span-2"
            aria-label="Left sidebar advertisement"
            role="complementary"
        >
            <div className="sticky top-20">
                <LeftAds />
            </div>

        </aside>
    )
}