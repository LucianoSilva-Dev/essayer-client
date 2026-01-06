import { FaqPageContent } from "@/modules/faq/components/content";

export const metadata = {
  title: "Perguntas Frequentes",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen flex justify-center items-start py-12">
      <FaqPageContent />
    </main>
  );
}
