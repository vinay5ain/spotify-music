import { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

function ListAlbum() {
    const [data, setData] = useState([]);

    const fetchAlbums = async () => {
        try {

            const response = await axios.get(`${url}/api/album/list`);

            if (response.data.success) {
                setData(response.data.albums)
            }

        } catch (error) {
            console.log('error', error)
            toast.error("Album List Error");
        }
    }

    const removeAlbum = async (id) => {
        try {

            const response = await axios.delete(`${url}/api/album/remove/${id}`);

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchAlbums();
            }

        } catch (error) {
            console.log('error', error)
            toast.error("Song Remove Error");
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, [])

    return (
        <div className="rounded-xl border border-white/10 bg-[#171923] p-4 text-slate-100">
            <p className="text-lg font-semibold">All Albums</p>
            <hr className="my-3 border-white/10" />
            <div>
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center justify-items-center gap-2.5 p-3 border border-white/10 text-sm bg-[#1d2030]">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={item._id} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center justify-items-center gap-2.5 p-3 border border-white/10 text-sm">
                            <img className='w-12 h-12 rounded object-cover' src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColour} readOnly />
                            <p className='font-bold cursor-pointer hover:text-red-500' onClick={() => removeAlbum(item._id)}>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListAlbum