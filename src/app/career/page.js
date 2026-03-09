import Form from '../common/Form'
import HeroSection from '../common/Herosection'
import Roles from "../components/Career/Roles"
import SectionTwo from '../components/Career/sectionTwo'
import ApplyNow from '../components/Career/Applynow'

const index = () => {
    return (
        <>
            <HeroSection heading={"Careers"} text={<>Join the Culture That <br /> Creates the Magic</>} />
            <SectionTwo />
            <Roles />
            <ApplyNow />
        </>
    )
}
export default index