import Image from "next/image";
import Header from '../app/layout/header'
import HeroSection from "./components/Home/Herosection";
import Video from "./components/Home/Video";
import SectionTwo from './components/Home/Section2'
import SectionThree from '../app/components/Home/Section3'
import VoicesOfLegacy from "./components/Home/Voiceoflegacy";
import Form from '../app/common/Form'
import Footer from '../app/layout/footer'
import LogoMarquee from '../app/common/LogoMarquee'
import Parallexanimation from "./components/Home/Parallexanimation";
import Event from '../app/components/Home/event'
export default function Home() {

  return (
    <>
      <Header />

      <Parallexanimation />
      <Event />
      <VoicesOfLegacy />
      <LogoMarquee />
      <Form />
      <Footer />
    </>
  );
}
