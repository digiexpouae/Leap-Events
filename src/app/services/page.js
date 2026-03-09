import HeroSection from "../common/Herosection"
import SectionTwo from '../common/SectionTwo'
import Service from '../components/services/Sectionthree'
import SectionFour from '../components/services/sectionFour'
import Form from '../common/Form'
import LogoMarquee from '../common/LogoMarquee'
import { defaultServices, defaultServicesTwo, ServicesThree, ServicesFour, ServicesFive, ServicesSix, ServicesSeven, ServicesEight } from '../utils/defaultService'
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



        <HeroSection heading={heading} text={text} />
        <SectionTwo heading={headingtwo} categories={tabs} />
        <Service heading={<>CREATIVE STRATEGY AND <br /> CONCEPT DEVELOPMENT</>} description={description} services={defaultServices} />
        <Service heading={<>Spatial and  <br /> Experiential Design</>} description={"Immersive designs that captivate and inspire your audience."} services={defaultServicesTwo} />
        <Service heading={<>Technical Production and  <br /> Execution </>} description={"Cutting-edge production for flawless, innovative events."} services={ServicesThree} />
        <Service heading={<>Venue and <br /> Management</>} description={"Efficient venue management for seamless event execution."} services={ServicesFour} />
        <Service heading={<>Event Operations <br /> and Safety </>} description={"Ensuring safe, smooth operations from start to finish."} services={ServicesFive} />
        <Service heading={<>Marketing and <br /> Sponsorship</>} description={"Maximizing event visibility with strategic marketing and sponsorships.."} services={ServicesSix} />
        <Service heading={<>Innovative <br /> Properties</>} description={"Engaging, immersive activations that create memorable experiences."} services={ServicesSeven} />
        <Service heading={<>Experience and Entertainment <br /> Management</>} description={"Curating talent and entertainment for standout event experiences."} services={ServicesEight} />






        <SectionFour />
        <LogoMarquee />
        <Form />
    </>

    )
}
export default Services