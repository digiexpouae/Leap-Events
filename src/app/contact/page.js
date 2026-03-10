import HeroSection from "../common/Herosection"
import Form from "../common/Form"
const contact = () => {
    return (
        <>
            <HeroSection heading={"Contact Us"} text={<>Start your journey with us today and make <br /> your next event a cornerstone of your legacy  <br />
            </>} />
            <Form className={"bg-primary-gradient"} />
        </>
    )
}
export default contact