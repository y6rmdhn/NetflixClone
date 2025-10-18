import DefaultLayout from "@/components/layouts/default_layout";
import Footer from "@/components/modules/landingPage/footer";
import Jumbotron from "@/components/modules/landingPage/jumbotron";
import SectionDownload from "@/components/modules/landingPage/sectionContent/SectionDownload";
import SectionEjoy from "@/components/modules/landingPage/sectionContent/SectionEnjoy";
import SectionFaq from "@/components/modules/landingPage/sectionContent/SectionFaq";
import SectionProfile from "@/components/modules/landingPage/sectionContent/SectionProfile";
import SectionWatch from "@/components/modules/landingPage/sectionContent/SectionWatch";
import { Navbar } from "./Navbar";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

function Landing() {
  return (
    <>
      <Navbar />
      <Jumbotron />
      <SectionEjoy />
      <SectionDownload />
      <SectionWatch />
      <SectionProfile />
      <SectionFaq />
      <Footer />
    </>
  );
}

export default Landing;
