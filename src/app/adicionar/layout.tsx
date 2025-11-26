import { AddRepertorioProvider } from "@/contexts/add-repertorio-context";

export default function AdicionarRepertorioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AddRepertorioProvider>
      {children}
    </AddRepertorioProvider>
  );
}
