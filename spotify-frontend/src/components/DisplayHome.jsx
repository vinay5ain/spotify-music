import { useContext } from "react"
import AlbumItem from "./AlbumItem"
import Navbar from "./Navbar"
import SongsItem from "./SongsItem"
import { PlayerContext } from './../context/PlayerContext';

function DisplayHome() {
    const { songsData, albumsData } = useContext(PlayerContext)
    return (
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex gap-3 overflow-auto pb-2">
                    {albumsData.map((item) => (<AlbumItem key={item._id} image={item.image} name={item.name} desc={item.desc} id={item._id} />))}
                </div>
            </div>
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Today&apos;s biggest hits</h1>
                <div className="flex gap-3 overflow-auto pb-2">
                    {songsData.map((item) => (<SongsItem key={item._id} image={item.image} name={item.name} desc={item.desc} id={item._id} />))}
                </div>
            </div>
        </>
    )
}

export default DisplayHome