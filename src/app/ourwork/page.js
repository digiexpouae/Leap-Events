
import Form from '../common/Form'
import Event from '../components/Home/Section3'
// import HeroSection from '../common/Herosection'
import {ThreeDImageRing} from '../components/work/heroSection'
import Sectiontwo from '../common/SectionTwo'
import WorkSection from '../components/work/event'
import SectionThree from '../components/work/sectionThree'
import Nav from '../components/Home/nav'
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
    "/assets/ev-h-1.jpg",
    "/assets/ev-h-2.jpg",
    "/assets/ev-h-3.jpg",
    "/assets/ev-h-4.jpg",
    "/assets/ev-h-1.jpg",
    "/assets/ev-h-2.jpg",
    "/assets/ev-h-3.jpg",
    "/assets/ev-h-4.jpg",
   
  ];

    const text = "EXPLORE OUR CURATED PORTFOLIO OF PAST EVENTS THAT HAVE NOT ONLY MET BUT EXCEEDED EXPECTATIONS, LEAVING LASTING IMPRESSIONS AND CRAFTING ENDURING LEGACIES"
    return (

        <div>
            {/* <HeroSection heading={heading} text={<>At Leap Events, every event is a testament to our <br /> commitment to excellence and innovation</>} />            <Sectiontwo heading={text} categories={tabs} /> */}
            <div className='h-screen relative w-full flex flex-col items-center justify-center overflow-relative '>
              <div className='max-w-5xl mx-auto uppercase flex items-center justify-center  '>
                <h2 className='text-5xl text-black font-bold'>
                    Events
                </h2>

              </div>
              
               <ThreeDImageRing
  images={imageUrls}
     imageDistance={900}
  autoRotate={true}       // default — spins on its own
  autoRotateSpeed={0.16}  // degrees per frame, ~9°/s at 60fps
/>
<p className='text-black text-sm md:text-base text-center'>  From corporate stages to large-scale festivals, we plan, design, and deliver
    <br />
     every detail in-house  so the vision lands exactly as promised.</p>
</div>
<Nav />
               <SectionThree />
            <WorkSection />

            {/* <Event className={"bg-[var(--color-bg-secondary)]"} /> */}
        
            <Form />
        </div>

    )
}
export default index