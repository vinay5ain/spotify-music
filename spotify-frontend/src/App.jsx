import { useContext } from 'react'
import Display from './components/Display'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import { PlayerContext } from './context/PlayerContext'

const App = () => {

  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black text-white overflow-hidden flex flex-col'>
      {songsData.length !== 0 ?
        <>
          <div className="flex-1 min-h-0 flex gap-2 p-2">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
        : null}
      <audio ref={audioRef} src={track ? track.file : ""} preload='metadata' />
    </div>
  )
}

export default App