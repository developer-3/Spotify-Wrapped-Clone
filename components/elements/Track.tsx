import React from 'react'

type MyProps = {
    name: string;
    key: number;
    artist: string;
    popularity: number;
};

class Track extends React.Component<MyProps> {
    render() {
        return (
            <div className="grid grid-cols-3 text-left bg-slate-200 pt-2 pb-2 ml-10 mr-10 pr-4 pl-4">
                <p className="text-zinc-900 font-bold">{this.props.name}</p>
                <p className="text-zinc-600 font-bold">{this.props.artist}</p>
                <p className="text-zinc-600 font-bold">{this.props.popularity}</p>
            </div>
        );
    }
}

export default Track;