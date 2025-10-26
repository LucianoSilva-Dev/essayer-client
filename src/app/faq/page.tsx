import TitleSection from "@/components/faq/TitleSection";
import FaqContainer from "@/components/faq/FaqContainer";

export default function FaqPage() {
    return (
        <main className="flex h-[100vh] flex-col flex-1 px-12 py-10">
            <TitleSection />
            <FaqContainer />
        </main>

    );
}

