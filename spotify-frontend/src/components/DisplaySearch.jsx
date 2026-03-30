import { useContext, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function DisplaySearch() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const { songsData, albumsData, playWithId } = useContext(PlayerContext);

  const { filteredSongs, filteredAlbums } = useMemo(() => {
    const query = normalize(q);
    if (!query) return { filteredSongs: [], filteredAlbums: [] };

    const matchSong = (s) => {
      const hay = normalize(`${s?.name} ${s?.desc} ${s?.album}`);
      return hay.includes(query);
    };
    const matchAlbum = (a) => {
      const hay = normalize(`${a?.name} ${a?.desc}`);
      return hay.includes(query);
    };

    return {
      filteredSongs: songsData.filter(matchSong).slice(0, 30),
      filteredAlbums: albumsData.filter(matchAlbum).slice(0, 20)
    };
  }, [q, songsData, albumsData]);

  const onChange = (e) => {
    const value = e.target.value;
    if (!value) setSearchParams({});
    else setSearchParams({ q: value });
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-3">
        <input
          value={q}
          onChange={onChange}
          placeholder="What do you want to listen to?"
          className="w-full max-w-xl rounded-full bg-[#2a2a2a] px-4 py-2 text-sm outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-green-500"
        />
      </div>

      {!q ? (
        <p className="mt-6 text-sm text-slate-300">Start typing to search songs and albums.</p>
      ) : (
        <div className="mt-6 grid gap-8">
          <div>
            <h2 className="text-xl font-bold">Top results</h2>
            <div className="mt-3 grid gap-2">
              {filteredSongs.length === 0 && filteredAlbums.length === 0 ? (
                <p className="text-sm text-slate-300">No results for “{q}”.</p>
              ) : null}
              {filteredAlbums.slice(0, 3).map((a) => (
                <button
                  key={a._id}
                  onClick={() => navigate(`/album/${a._id}`)}
                  className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-left hover:bg-white/10 transition-colors"
                >
                  <img className="h-12 w-12 rounded object-cover" src={a.image} alt={a.name} loading="lazy" />
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{a.name}</p>
                    <p className="text-xs text-slate-300 truncate">{a.desc}</p>
                  </div>
                </button>
              ))}
              {filteredSongs.slice(0, 5).map((s) => (
                <button
                  key={s._id}
                  onClick={() => playWithId(s._id)}
                  className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-left hover:bg-white/10 transition-colors"
                >
                  <img className="h-12 w-12 rounded object-cover" src={s.image} alt={s.name} loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{s.name}</p>
                    <p className="text-xs text-slate-300 truncate">{s.album}</p>
                  </div>
                  <span className="text-xs text-slate-300">{s.duration}</span>
                </button>
              ))}
            </div>
          </div>

          {filteredAlbums.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold">Albums</h2>
              <div className="mt-3 flex gap-3 overflow-auto pb-2">
                {filteredAlbums.map((a) => (
                  <div
                    key={a._id}
                    onClick={() => navigate(`/album/${a._id}`)}
                    className="min-w-[180px] max-w-[180px] p-2 px-3 rounded-md cursor-pointer transition-colors hover:bg-[#ffffff1a]"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded-md bg-[#1f1f1f]">
                      <img className="h-full w-full object-cover" src={a.image} alt={a.name} loading="lazy" />
                    </div>
                    <p className="font-bold mt-2 mb-1 truncate">{a.name}</p>
                    <p className="text-slate-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {filteredSongs.length > 0 ? (
            <div>
              <h2 className="text-xl font-bold">Songs</h2>
              <div className="mt-3 grid gap-2">
                {filteredSongs.map((s) => (
                  <button
                    key={s._id}
                    onClick={() => playWithId(s._id)}
                    className="flex items-center gap-3 rounded-xl bg-white/5 p-3 text-left hover:bg-white/10 transition-colors"
                  >
                    <img className="h-10 w-10 rounded object-cover" src={s.image} alt={s.name} loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold truncate">{s.name}</p>
                      <p className="text-xs text-slate-300 truncate">{s.album}</p>
                    </div>
                    <span className="text-xs text-slate-300">{s.duration}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default DisplaySearch;

