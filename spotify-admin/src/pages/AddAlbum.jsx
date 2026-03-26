import axios from "axios";
import { useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin-assets/assets";

function AddAlbum() {
    const [image, setImage] = useState(null);
    const [colour, setColour] = useState("#121212");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        // ✅ Check if image is selected
        if (!image) {
            toast.error("Please select an album image");
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('desc', desc);
            formData.append('image', image);
            formData.append('bgColour', colour);

            const response = await axios.post(`${url}/api/album/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.success) {
                toast.success("Album Added Successfully!");
                setName("");
                setDesc("");
                setColour("#121212");
                setImage(null);
            } else {
                toast.error("Something went wrong.");
            }
        } catch (error) {
            console.error('Add Album Error:', error);
            toast.error("Album Add Failed");
        }

        setLoading(false);
    };

    if (loading) {
        return (
            <div className="grid place-items-center min-h-[80vh]">
                <div className="w-16 h-16 border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmitHandler} className="max-w-2xl rounded-xl border border-white/10 bg-[#171923] p-6 flex flex-col items-start gap-8 text-slate-200">

            {/* Upload Image */}
            <div className="flex gap-8">
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

            {/* Album Name */}
            <div className="flex flex-col gap-2.5">
                <p>Album Name</p>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Type Here" 
                    required 
                    className="bg-[#11131a] outline-none border border-white/20 focus:border-green-500 p-2.5 w-[max(40vw,250px)] rounded-md" 
                />
            </div>

            {/* Album Description */}
            <div className="flex flex-col gap-2.5">
                <p>Album Description</p>
                <input 
                    type="text" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                    placeholder="Type Here" 
                    required 
                    className="bg-[#11131a] outline-none border border-white/20 focus:border-green-500 p-2.5 w-[max(40vw,250px)] rounded-md" 
                />
            </div>

            {/* Background Colour */}
            <div className="flex flex-col gap-3">
                <p>Background Colour</p>
                <input 
                    type="color" 
                    value={colour} 
                    onChange={(e) => setColour(e.target.value)} 
                />
            </div>

            <button type="submit" className="text-base bg-green-600 hover:bg-green-500 text-white py-2.5 px-14 rounded-md cursor-pointer transition-colors">
                Add
            </button>

        </form>
    );
}

export default AddAlbum;