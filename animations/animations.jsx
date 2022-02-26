import { animated, useSpring } from '@react-spring/web'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const FadeIn = () => {
  const styles = useSpring({
    from: {
        opacity: 0,
        y: 300
    },
    opacity: 1,
    y: 100
  })

  return <animated.div style={styles}>I will fade in</animated.div>
}

// export default FadeIn


const Para = () => {
    const fadeIn = useSpring({
        from: {
            opacity: 0
        },
        opacity: 1,
        delay: 1500,
        config: {duration: 2000}
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
            <p>Scroll up</p>
            </ParallaxLayer>
        </Parallax>
  )
}

export default Para;