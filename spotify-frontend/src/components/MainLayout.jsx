import { useContext } from "react";
import Display from "./Display";
import Player from "./Player";
import Sidebar from "./Sidebar";
import { PlayerContext } from "../context/PlayerContext";

function MainLayout() {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      {songsData.length !== 0 ? (
        <>
          <div className="flex-1 min-h-0 flex gap-2 p-2">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}
      <audio ref={audioRef} src={track ? track.file : ""} preload="metadata" />
    </div>
  );
}

export default MainLayout;
