import Nav from "@/components/Nav";
import PageCustomCode from "@/components/PageCustomCode";
import PageCustomCodeEnd from "@/components/PageCustomCodeEnd";
import CtaFooter from "@/components/CtaFooter";
import SiteScripts from "@/components/SiteScripts";

import Preloader from "@/components/sections/Preloader";
import ThreeStyles from "@/components/sections/ThreeStyles";
import HiddenComponents from "@/components/sections/HiddenComponents";
import Hero from "@/components/sections/Hero";
import StatementMobile from "@/components/sections/StatementMobile";
import HowItWorks from "@/components/sections/HowItWorks";
import Tabs from "@/components/sections/Tabs";
import Why from "@/components/sections/Why";

export default function Home() {
  return (
    <div className="page-wrapper" style={{ opacity: 1, backgroundColor: "#06090e" }}>
      <PageCustomCode />
      <Nav />
      <main className="main-wrapper">
        <Preloader />
        <ThreeStyles />
        <HiddenComponents />
        <Hero />
        <StatementMobile />
        <HowItWorks />
        <Tabs />
        <Why />
      </main>
      <CtaFooter />
      <PageCustomCodeEnd />
      <SiteScripts />
    </div>
  );
}
