import { assets } from "../assets/admin-assets/assets";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from "../App";
import { toast } from "react-toastify";

function AddSong() {
    const [image, setImage] = useState(null);
    const [song, setSong] = useState(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [album, setAlbum] = useState("none");
    const [loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState([]);

    // Submit Handler
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ✅ Check for required files
        if (!image || !song) {
            toast.error("Please select both image and audio files");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('album', album);
            formData.append('audio', song);
            formData.append('image', image);

            const response = await axios.post(`${url}/api/song/add`, formData);

            if (response.data.success) {
                toast.success("Song Added Successfully!");
                setName(""); 
                setDesc(""); 
                setAlbum("none"); 
                setImage(null); 
                setSong(null);
            } else {
                toast.error("Something went wrong.");
            }

        } catch (error) {
            console.error('Add Song Error:', error);
            const errorMessage = error?.response?.data?.message || "Song Add Failed";
            toast.error(errorMessage);
        }

        setLoading(false);
    }

    // Load Album Data
    const loadAlbumData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setAlbumData(response.data.albums);
            }
        } catch (error) {
            console.error('Load Album Data Error:', error);
            toast.error("Failed to load albums");
        }
    }

    useEffect(() => {
        loadAlbumData();
    }, []);

    if (loading) {
        return (
            <div className="grid place-items-center min-h-[80vh]">
                <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmitHandler} className="max-w-2xl rounded-xl border border-white/10 bg-[#171923] p-6 flex flex-col items-start gap-8 text-slate-200">

            {/* Upload Section */}
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <p>Upload Song</p>
                    <input 
                        type="file" 
                        id="song" 
                        accept="audio/*" 
                        hidden 
                        onChange={(e) => setSong(e.target.files[0])} 
                    />
                    <label htmlFor="song">
                        <img 
                            src={song ? assets.upload_added : assets.upload_song} 
                            className="w-24 cursor-pointer" 
                            alt="upload_song" 
                        />
                    </label>
                </div>

                <div className="flex flex-col gap-4">
                    <p>Upload Image</p>
                    <input 
                        type="file" 
                        id="image" 
                        accept="image/*" 
                        hidden 
                        onChange={(e) => setImage(e.target.files[0])} 
                    />
                    <label htmlFor="image">
                        <img 
                            src={image ? URL.createObjectURL(image) : assets.upload_area} 
                            className="w-24 cursor-pointer" 
                            alt="upload_area" 
                        />
                    </label>
                </div>
            </div>

            {/* Song Name */}
            <div className="flex flex-col gap-2.5">
                <p>Song Name</p>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Type Here" 
                    required 
                    className="bg-[#11131a] outline-none border border-white/20 focus:border-green-500 p-2.5 w-[max(40vw,250px)] rounded-md" 
                />
            </div>

            {/* Song Description */}
            <div className="flex flex-col gap-2.5">
                <p>Song Description</p>
                <input 
                    type="text" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                    placeholder="Type Here" 
                    required 
                    className="bg-[#11131a] outline-none border border-white/20 focus:border-green-500 p-2.5 w-[max(40vw,250px)] rounded-md" 
                />
            </div>

            {/* Album Selector */}
            <div className="flex flex-col gap-2.5">
                <p>Album</p>
                <select 
                    value={album} 
                    onChange={(e) => setAlbum(e.target.value)} 
                    className="bg-[#11131a] outline-none border border-white/20 focus:border-green-500 p-2.5 w-[250px] rounded-md"
                >
                    <option value="none">None</option>
                    {albumData.map((item, index) => (
                        <option key={index} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="text-base bg-green-600 hover:bg-green-500 text-white py-2.5 px-14 rounded-md cursor-pointer transition-colors">
                Add
            </button>
        </form>
    );
}

export default AddSong;