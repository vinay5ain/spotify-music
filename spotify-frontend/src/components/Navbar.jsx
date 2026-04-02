import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/frontend-assets/assets'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const initial = user?.name?.trim()?.[0]?.toUpperCase() || "?";

    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img onClick={() => navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="arrow_left" />
                    <img onClick={() => navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="arrow_right" />
                </div>
                <div className="flex items-center gap-4">
                    <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:scale-[1.02] transition-transform'>Explore Premium</p>
                    <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer hover:bg-black/80'>Install App</p>
                    <button
                        type="button"
                        title={user?.name || "Account"}
                        className='bg-[#1ed760] text-black w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold hover:brightness-110'
                    >
                        {initial}
                    </button>
                    <button
                        type="button"
                        onClick={() => { logout(); navigate('/login', { replace: true }); }}
                        className="text-[13px] text-slate-300 hover:text-white underline-offset-2 hover:underline"
                    >
                        Log out
                    </button>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
                <p className='bg-black text-white px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
                <p className='bg-black text-white px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
            </div>
        </>
    )
}

export default Navbar