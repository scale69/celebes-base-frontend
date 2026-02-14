import { Suspense } from "react";
import AdsTemplate from "../ads/AdsTemplate";

export default function LeftSidebar() {
    return (
        <aside
            className="hidden overflow-scroll lg:block md:col-span-2 lg:col-span-2"
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