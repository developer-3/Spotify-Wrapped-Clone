import { animated, useSpring } from '@react-spring/web'

const Loading = () => {
    const styles = useSpring({
        loop: true,
        from: { rotateZ: 0 },
        to: { rotateZ: 180 },
        config: {
            friction: 35,
            precision: 0.4
        }
    })

    return (
        <div>
            <animated.div
                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: '#46e891',
                    borderRadius: 16,
                    ...styles,
                }}
            />
        </div>
    )
}

export default Loading;