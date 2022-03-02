import { animated, useSpring } from '@react-spring/web'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import ScreenOne from '../components/screens/ScreenOne'

type ParaProps = {
    percentage: number;
}

const Para = ({ percentage }: ParaProps) => {
    const fadeIn = useSpring({
        from: {
            opacity: 0
        },
        opacity: 1,
        delay: 1500,
        config: {duration: 2000}
    })

    const slideOutLeft = useSpring({
        from: {
            opacity: 1
        },
        to: {
            x: 0,
            opacity: 0,
        },
        delay: 3000
    })

    
    return (
        <Parallax pages={2} style={{ top: '0', left: '0' }}>
            <ParallaxLayer
            offset={0}
            speed={2.5}
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '50px', backgroundColor: '#dcfce7'}}>
                <p>Let's Get Started, Shall We?</p>
                <animated.p style={fadeIn}>Scroll Down</animated.p>
            </ParallaxLayer>
        
            <ParallaxLayer offset={1} speed={2} style={{ backgroundColor: '#333333' }} />
        
            <ParallaxLayer
            offset={1}
            speed={0.5}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '50px'
            }}>
                {/* <animated.p style={slideOutLeft}>It seems like you're into indie, huh?</animated.p> */}
                <ScreenOne percentage={percentage} />
            </ParallaxLayer>

            {/* <ParallaxLayer offset={2} speed={2} style={{ backgroundColor: '#33ad51' }} /> */}

            {/* <ParallaxLayer
            offset={2}
            speed={0.5}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '50px',
                backgroundColor: '#33ad51'
            }}>
                <p>Slide 2</p>
            </ParallaxLayer> */}
        </Parallax>
  )
}

export default Para;