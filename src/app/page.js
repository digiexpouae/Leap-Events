import Image from "next/image";
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
import Header from '../app/layout/header'
import Textanimation from '../app/common/textAniamtion';
import About from '../app/components/Home/about'
import Animate from "./components/animationSection/video";
import ObjectAnimation from './components/animationSection/objectAnimation'
import Slider from './components/Home/slider'
import Marquee from './components/Home/Marquee'
import FAQ from './components/Home/FAQ'
import Nav from './components/Home/nav'
export default function Home() {

  return (
    <>

        {/* <div className="absolute inset-0 "> */}
        {/* <div class="bowtie"></div> */}

        {/* <Animate /> */}
        <ObjectAnimation />

        {/* </div>   */}
      <About />
      <Nav />

      {/* <Parallexanimation /> */}
      {/* <Event /> */}

      <Slider />
      <Marquee />

      <VoicesOfLegacy />
      <FAQ />
      {/* <LogoMarquee /> */}
      <Form />
    </>
  );
}
