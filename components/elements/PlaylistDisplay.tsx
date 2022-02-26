import type { NextPage } from 'next'
import React from 'react';

type MyProps = {
    img: string;
    name: string;
    key: number;
};

class PlaylistDisplay extends React.Component<MyProps> {
    render() {
        return (
            <div className="grid gap-4 grid-cols-1 w-1/5 bg-gray-700 rounded-md">
                <img className="mx-auto pt-6 w-5/6 bg-cover" src={this.props.img}/>
                <h3 className="text-white text-center font-bold pb-2">{this.props.name}</h3>
            </div>
        );
    }
}

export default PlaylistDisplay;