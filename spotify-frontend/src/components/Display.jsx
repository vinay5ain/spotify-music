import { Route, Routes, useLocation } from "react-router-dom"
import DisplayHome from "./DisplayHome"
import DisplayAlbum from "./DisplayAlbum"
import DisplaySearch from "./DisplaySearch"
import { useContext, useMemo } from "react"
import { PlayerContext } from "../context/PlayerContext";

function Display() {
    const { albumsData } = useContext(PlayerContext);
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.split('/').pop() : "";
    const currentAlbum = useMemo(
        () => albumsData.find((album) => album._id === albumId),
        [albumsData, albumId]
    );
    const bgStyle = isAlbum && currentAlbum?.bgColour
        ? { background: `linear-gradient(180deg, ${currentAlbum.bgColour} 0%, #121212 45%)` }
        : { background: "#121212" };

    return (
        <div style={bgStyle} className="w-full h-full min-h-0 overflow-y-auto rounded-2xl px-4 pt-4 pb-6 lg:w-[75%] lg:px-6">
            {albumsData.length > 0 ?
                <Routes>
                    <Route path="/" element={<DisplayHome />} />
                    <Route path="/search" element={<DisplaySearch />} />
                    <Route path="/album/:id" element={<DisplayAlbum album={currentAlbum} />} />
                </Routes>
                : null}
        </div>
    )
}

export default Display