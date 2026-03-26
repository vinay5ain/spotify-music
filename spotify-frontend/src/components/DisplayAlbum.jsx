import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { assets } from '../assets/frontend-assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { useContext, useMemo } from 'react';

const DisplayAlbum = ({ album }) => {

    const { id } = useParams();
    const { playWithId, songsData, track, pause, playStatus } = useContext(PlayerContext);
    const albumData = album || null;
    const albumSongs = useMemo(
        () => songsData.filter((item) => item.album === albumData?.name),
        [songsData, albumData]
    );

    return albumData ? (
        <>
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className='w-48 h-48 rounded object-cover shadow-xl' src={albumData.image} alt={albumData.name} />
                <div className="flex flex-col gap-3">
                    <p>Playlist</p>
                    <h2 className='text-5xl font-bold mb-2 md:text-7xl'>{albumData.name}</h2>
                    <h4>{albumData.desc}</h4>
                    <div className='flex items-center flex-wrap gap-2 text-sm'>
                        <img className='inline-block w-5' src={assets.spotify_logo} alt="spotify_logo" />
                        <b>Spotify</b>
                        <span className='text-gray-300'>• {albumSongs.length} songs</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-[0.5fr_2fr_2fr_0.5fr] mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>#<b className='mr-4'>Title</b></p>
                <p>Name</p>
                <p className='hidden sm:block'>Date Added</p>
                <img className='m-auto w-4' src={assets.clock_icon} alt="clock_icon" />
            </div>
            <hr />
            {albumSongs.map((item, index) => (
                <div
                    key={item._id}
                    onClick={() => track?._id === item._id && playStatus ? pause() : playWithId(item._id)}
                    className="grid grid-cols-3 sm:grid-cols-[0.5fr_2fr_2fr_0.5fr] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer"
                >
                    <div className='flex items-center w-10'>
                        {track?._id === item._id && playStatus ?
                            <img className='object-contain m-auto mr-4 w-5 h-5' src={assets.music_gif} alt="playing" />
                            : <b className='mr-4 text-[#a7a7a7]'>{index + 1}</b>
                        }

                        <img className='inline-block w-10 h-10 object-cover rounded mr-5'
                            src={item.image}
                            alt={item.name}
                        />
                    </div>
                    <p className='text-[15px] font-bold'>{item.name}</p>
                    <p className='text-[15px] hidden sm:block'>5 days ago</p>
                    <p className='text-[15px] text-center'>{item.duration}</p>
                </div>
            ))}
        </>
    ) : (
        <>
            <Navbar />
            <p className="mt-8 text-sm text-slate-300">Album not found for id: {id}</p>
        </>
    )
}

export default DisplayAlbum;
