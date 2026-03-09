import Section from '../../components/sustainability/Section1'
import SectionTwo from '../../components/sustainability/Sectiontwo'
import HeroSection from '@/app/common/Herosection'
import Form from '../../common/Form'
const Sustainability = () => {
    return (<>
        <HeroSection heading={"SUSTAINABILITY"} text={<>Creating Experiences That Respect the Planet <br /> and Empower Communities</>} className={"!text-[clamp(1rem,12vw,8rem)] "} />
        <Section />
        <SectionTwo />
        <Form />
    </>
    )
}
export default Sustainability