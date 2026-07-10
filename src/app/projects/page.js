
import Form from '../common/Form'
import Event from '../components/Home/Section3'
// import HeroSection from '../common/Herosection'
import {ThreeDImageRing} from '../components/work/heroSection'
import Sectiontwo from '../common/SectionTwo'
import WorkSection from '../components/work/event'
import SectionThree from '../components/work/sectionThree'
import Nav from '../components/Home/nav'
import FadeUp from '../common/Transition'
const index = () => {
    const tabs = [
        "All Projects",
        "Conferences",
        "Ceremonies",
        "Activations",
        "Management",
        "Shows",
        "Sports Events",
        "Festivals",
    ];
    const heading = "Our Work"
    
      const imageUrls = [
    "/assets/ev-ferjan.webp",
    "/assets/ev-international.webp",
    "/assets/ev-gems.webp",
    "/assets/ev-souq-ramdan.webp",
   "/assets/ev-ferjan.webp",
    "/assets/ev-international.webp",
    "/assets/ev-gems.webp",
    "/assets/ev-souq-ramdan.webp",
   
  ];

    const text = "EXPLORE OUR CURATED PORTFOLIO OF PAST EVENTS THAT HAVE NOT ONLY MET BUT EXCEEDED EXPECTATIONS, LEAVING LASTING IMPRESSIONS AND CRAFTING ENDURING LEGACIES"
    return (

        // event
        <div>
            {/* <HeroSection heading={heading} text={<>At Leap Events, every event is a testament to our <br /> commitment to excellence and innovation</>} />            <Sectiontwo heading={text} categories={tabs} /> */}
            <div className='h-screen relative w-full flex flex-col items-center justify-between py-34 lg:py-24 xl:py-34 overflow-hidden '>
              <div className='max-w-5xl mx-auto uppercase flex items-center justify-center  '>
                <h2 className='text-5xl  xl:text-7xl text-black font-bold'>
                    PROJECTS
                </h2>

              </div>
              
               <ThreeDImageRing
  images={imageUrls}
     imageDistance={1000}
  autoRotate={true}       // default — spins on its own
  autoRotateSpeed={0.4}  // degrees per frame, ~9°/s at 60fps
/>
<p className='text-black px-4 text-xs md:text-base text-center  '>  From corporate stages to large-scale festivals, we plan, design, and deliver
    <br />
     every detail in-house  so the vision lands exactly as promised.</p>
</div>
<Nav />
               <SectionThree />
          <WorkSection />

            {/* <Event className={"bg-[var(--color-bg-secondary)]"} /> */}
        
            <FadeUp> <Form /></FadeUp>
        </div>

    )
}
export default index