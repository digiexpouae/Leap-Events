import Header from '../layout/header'
import Footer from '../layout/footer'
import Herosection from '../components/about/Herosection'
import SectionTwo from '../components/about/sectiontwo'
import Sectionthree from '../components/about/Sectionthree'
import Sectionfour from '../components/about/Sectionfour'
import Logomarquee from '../common/LogoMarquee'
import Event from '../components/Home/Section3'
import Form from '../common/Form'
import BuiltOnCraft from '../components/about/BuildonCraft'
import TeamSectionHover from '../components/about/TeamHover'
import Precision from '../components/about/Passion'
import Team from '../components/about/Team'
import Awards from '../components/about/Awards'
import OurTeam from '../components/about/OurTeam'
import FadeUp from '../common/Transition'
import ProgressSlider from '../components/about/progressSlider'
import AwardMobile from '../components/about/awardsMobile'
const about = () => {
    return (
        <div>

            <Herosection />
            {/* <Herosection heading={"Our Story"} text={<> Our vision extends beyond the immediate thrill <br /> of the event to leave
                a lasting imprint that <br /> propels our clients into the future</>} /> */}
        <BuiltOnCraft /> 
           <OurTeam />     
<div className="bg-[#d6efff]  py-16 flex flex-col justify-between gap-10 ">
             {/* Heading */}
     <FadeUp>
        <div className=" md:top-16  md:flex justify-center px-6">
          <h2 className="text-center font-bold tracking-tight text-[#0b1220] text-3xl md:text-5xl leading-[1.05]">
            WHERE PASSION
            <br />
            MEETS PRECISION
          </h2>
        </div>
        </FadeUp>

        
          <Precision />
          <ProgressSlider />
         <div className=" flex justify-center">
          <button
            type="button"
            className="rounded-full bg-[#6c8cff] cursor-pointer text-white text-sm md:text-base
                       px-6 py-3 md:px-8 md:py-3.5 font-medium
                       shadow-[0_10px_30px_-10px_rgba(108,140,255,0.7)]
                       hover:bg-[#5a7bff] transition-colors"
          >
            Get to know us
          </button>
        </div>

            </div>
          {/* <Team />/ */}
       
            {/* <SectionTwo /> */}
            {/* <Sectionthree /> */}
            {/* <Sectionfour /> */}
            {/* <Logomarquee /> */}
            {/* <div
                className="relative w-full z-50 bg-primary-gradient pt-12 sm:pt-16 lg:pt-20  "
            >


                <div className="flex nd:flex-col sm:flex-row px-4 md:px-16 items-center justify-center gap-4 mb-8 sm:mb-10">
                    <h2
                        className={`font-black uppercase  text-[clamp(1.8rem,5vw,3rem)]  text-black`}
                        style={{ letterSpacing: "-0.01em", lineHeight: 1.05 }}
                    >Collaborations
                    </h2>


                </div>
                <Event />
            </div> */}
       <FadeUp> <Awards /></FadeUp>
          <FadeUp> <AwardMobile /></FadeUp>
          <FadeUp>    <Form /></FadeUp>

        </div>
    )
}
export default about