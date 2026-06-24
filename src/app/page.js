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
import FadeUp from "./common/Transition";

export default function Home() {

  return (
    <>
{/* s */}
        {/* <div className="absolute inset-0 "> */}
        {/* <div class="bowtie"></div> */}

        {/* <Animate /> */}

        <ObjectAnimation />
        {/* </div>   */}
          <FadeUp>  <About /></FadeUp> 
    
      <Nav />

  <Event />

    <FadeUp>   <Slider /></FadeUp> 
     <FadeUp>  <Marquee /></FadeUp> 
           {/* <div className="elfsight-app-574ead0b-1073-4e2a-a741-8944560a1b8b" data-elfsight-app-lazy></div> */}


          {/* <FadeUp>  <VoicesOfLegacy />     </FadeUp>  */}
         <FadeUp>   <FAQ />     </ FadeUp> 
      {/* <LogoMarquee /> */}
            <FadeUp>  <Form />        </FadeUp> 
    </>
  );
}
