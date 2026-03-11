import Index from '../../app/components/Articles/articles'
import HeroSection from '../common/Herosection'
import Form from '../common/Form'
const Articles = () => {
    return (
        <div>
            <HeroSection heading={"Articles"} text={<>Dive into the depths of event management <br /> with Leap Events’ Perspectives</>} />
            <Index />
            <Form />
        </div>
    )
}
export default Articles