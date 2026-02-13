import { Suspense } from "react";
import LeftAds from "../ads/LeftAds";
import AdsTemplate from "../ads/AdsTemplate";

export default function LeftSidebar() {
    return (
        <aside
            className="hidden overflow-scroll lg:block lg:col-span-2"
            aria-label="Left sidebar advertisement"
            role="complementary"
        >
            <div className="sticky">
                <Suspense fallback={null}>
                    <AdsTemplate placement="left sidebar" />
                </Suspense>
            </div>

        </aside>
    )
}