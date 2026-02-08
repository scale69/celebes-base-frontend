import AdBanner from "../layout/AdBanner";

export default function LeftAds() {
    return (
        <aside
            className="hidden lg:block lg:col-span-2"
            aria-label="Left sidebar advertisement"
            role="complementary"
        >
            <div className="sticky top-20">
                <AdBanner size="sidebar" title="Iklan" className="mb-4" />
            </div>

        </aside>
    )
}