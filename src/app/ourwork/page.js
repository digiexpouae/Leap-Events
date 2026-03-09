
import Form from '../common/Form'
import Event from '../components/Home/Section3'
import HeroSection from '../common/Herosection'
import Sectiontwo from '../common/SectionTwo'
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

    const text = "EXPLORE OUR CURATED PORTFOLIO OF PAST EVENTS THAT HAVE NOT ONLY MET BUT EXCEEDED EXPECTATIONS, LEAVING LASTING IMPRESSIONS AND CRAFTING ENDURING LEGACIES"
    return (

        <div>
            <HeroSection heading={heading} text={<>At LINKVIVA, every event is a testament to our <br /> commitment to excellence and innovation</>} />
            <Sectiontwo heading={text} categories={tabs} />
            <Event className={"bg-[var(--color-bg-secondary)]"} />
            <Form />
        </div>

    )
}
export default index