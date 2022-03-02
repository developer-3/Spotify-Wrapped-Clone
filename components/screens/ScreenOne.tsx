import React from 'react';
import { useSpring, config, animated, useChain, useSpringRef } from '@react-spring/web'
import { BsFillArrowRightSquareFill } from 'react-icons/bs'

type MyProps = {
    percentange: number
    inView: boolean
};

function ScreenOne(MyProps) {

    const numberRef = useSpringRef();
    const { number } = useSpring({
        from: { number: 0 },
        number: MyProps.percentage,
        delay: 1700,
        config: config.molasses,
        pause: !MyProps.inView,
        ref: numberRef
    })

    const nextRef = useSpringRef();
    const fadeIn = useSpring({
        from: {
            opacity: 0
        },
        opacity: 1,
        delay: 1500,
        config: { duration: 2000 },
        ref: nextRef
    })

    useChain([numberRef, nextRef]);


    return (
        <main>
            <div className="flex flex-col justify-center items-center min-h-screen min-w-full">
                <div className="text-9xl text-white flex">
                    <animated.p>{number.to(n => n.toFixed(0))}</animated.p>
                    %
                </div>
                <p className="text-white font-bold text-7xl">indie</p>
                <p className="text-3xl text-white">Now that's pretty impressive</p>
                <animated.button className="absolute bottom-20" style={fadeIn}><BsFillArrowRightSquareFill /></animated.button>
            </div>
        </main>
    );
}

export default ScreenOne;