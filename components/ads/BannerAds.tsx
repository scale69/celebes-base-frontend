import AdBanner from "../layout/AdBanner";

export default function BannerAds() {
    return (
        <div
            className="mb-8"
            role="complementary"
            aria-label="Advertisement"
        >
            <AdBanner size="horizontal" title="Sponsor" />
        </div>
    )
}