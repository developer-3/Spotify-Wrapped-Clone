import React from 'react';
import { useSpring, config, animated, to } from '@react-spring/web'

type MyProps = {
    percentange: number
};

function ScreenOne(MyProps) {

    const { number } = useSpring({
        reset: true,
        from: { number: 0 },
        number: MyProps.percentage,
        delay: 1000,
        config: config.molasses
    })


    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="text-9xl text-white flex">
                <animated.p>{number.to(n => n.toFixed(0))}</animated.p>
                %
            </div>
            <p className="text-white font-bold text-7xl">indie</p>
            <p className="text-3xl text-white">Now that's pretty impressive</p>
        </div>
    );
}

export default ScreenOne;