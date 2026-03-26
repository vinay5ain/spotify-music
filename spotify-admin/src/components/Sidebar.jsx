import { assets } from './../assets/admin-assets/assets';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='min-h-screen w-[78px] sm:w-[240px] border-r border-white/10 bg-[#11131a] px-3 sm:px-5'>
            <img src={assets.logo} className='mt-5 w-[max(10vw,100px)] hidden sm:block' alt="logo" />
            <img src={assets.logo_small} className='mt-5 w-8 mx-auto block sm:hidden' alt="logo_small" />
            <div className="flex flex-col gap-3 mt-10">
                <NavLink to={"/add-song"} className="flex items-center gap-2.5 rounded-lg text-slate-100 bg-[#1a1d27] border border-white/10 p-2.5 text-sm font-medium hover:bg-[#222636] transition-colors">
                    <img src={assets.add_song} className='w-5' alt="Add Song" />
                    <p className='hidden sm:block'>Add Song</p>
                </NavLink>
                <NavLink to={"/list-song"} className="flex items-center gap-2.5 rounded-lg text-slate-100 bg-[#1a1d27] border border-white/10 p-2.5 text-sm font-medium hover:bg-[#222636] transition-colors">
                    <img src={assets.song_icon} className='w-5' alt="List Song" />
                    <p className='hidden sm:block'>List Song</p>
                </NavLink>
                <NavLink to={"/add-album"} className="flex items-center gap-2.5 rounded-lg text-slate-100 bg-[#1a1d27] border border-white/10 p-2.5 text-sm font-medium hover:bg-[#222636] transition-colors">
                    <img src={assets.add_album} className='w-5' alt="Add Album" />
                    <p className='hidden sm:block'>Add Album</p>
                </NavLink>
                <NavLink to={"/list-album"} className="flex items-center gap-2.5 rounded-lg text-slate-100 bg-[#1a1d27] border border-white/10 p-2.5 text-sm font-medium hover:bg-[#222636] transition-colors">
                    <img src={assets.album_icon} className='w-5' alt="List Album" />
                    <p className='hidden sm:block'>List Album</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar