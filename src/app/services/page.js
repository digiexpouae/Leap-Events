import Form from '../common/Form'
import LogoMarquee from '../components/Home/Marquee'
import SectionOne from '../components/services/sectionOne'
import SectionThree from '../components/services/Sectionthree'
import LeapEvent from '../components/services/leapEvent'
import SectionFive from '../components/services/SectionFive'
import FadeUp from '../common/Transition'
import HoverSection from '../components/services/hoverSection'
const Services = () => {





    const description = "We craft creative strategies that turn moments into impactful experiences."

    const heading = "Services"
    const text = <>Transforming Ideas into Iconic Events.<br /> We blend innovation with execution to <br /> turn every event into a lasting legacy</>
    const tabs = [
        "Concept",
        "Spacial Design",
        "Event Production",
        "Venue Management",
        "Operations & Safety",
        "Marketing & Sponsorship",
        "Innovative Properties",
        "Experience Management",
    ];

    const headingtwo = <>Each event is a canvas, painted with<br />  the bold strokes of creativity and <br /> innovation that define our spirit.</>

    return (<>


<SectionOne />
     <SectionThree />
       <LeapEvent />
     <SectionFive />
       <FadeUp amount={0.1}>      <HoverSection /></FadeUp>

       <FadeUp>  <LogoMarquee /></FadeUp>
        <FadeUp> <Form /></FadeUp>
    </>

    )
}
export default Services