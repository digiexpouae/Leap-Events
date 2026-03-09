import Header from '../layout/header'
import Footer from '../layout/footer'
import Herosection from '../common/Herosection'
import SectionTwo from '../components/about/sectiontwo'
import Sectionthree from '../components/about/Sectionthree'
import Sectionfour from '../components/about/Sectionfour'
import Logomarquee from '../common/LogoMarquee'
import Event from '../components/Home/Section3'
import Form from '../common/Form'
const about = () => {
    return (
        <div>


            <Herosection heading={"Our Story"} text={<> Our vision extends beyond the immediate thrill <br /> of the event to leave
                a lasting imprint that <br /> propels our clients into the future</>} />
            <SectionTwo />
            <Sectionthree />
            <Sectionfour />
            <Logomarquee />
            <div
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
            </div>

            <Form />

        </div>
    )
}
export default about