import { Suspense } from "react";
import AdsTemplate from "../ads/AdsTemplate";

export default function LeftSidebar() {
    return (
        <aside
            className="hidden overflow-scroll lg:block md:col-span-3"
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