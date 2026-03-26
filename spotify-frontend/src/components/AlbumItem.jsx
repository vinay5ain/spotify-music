import { useNavigate } from "react-router-dom";

function AlbumItem({ image, name, desc, id }) {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(`/album/${id}`)} className="min-w-[180px] max-w-[180px] p-2 px-3 rounded-md cursor-pointer transition-colors hover:bg-[#ffffff1a]">
            <div className="aspect-square w-full overflow-hidden rounded-md bg-[#1f1f1f]">
                <img className="h-full w-full object-cover" src={image} alt={`${name} album`} loading="lazy" />
            </div>
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{desc}</p>
        </div>
    )
}

export default AlbumItem