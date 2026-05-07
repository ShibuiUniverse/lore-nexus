import { Header } from "./Header";
import { Footer } from "./Footer";
import { DarkWhisper, LightWhisper } from "@/components/ui/DarkWhisper";
import { LorekeeperChat } from "@/components/ui/LorekeeperChat";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <DarkWhisper />
      <LightWhisper />
      <LorekeeperChat />
      <Header />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
