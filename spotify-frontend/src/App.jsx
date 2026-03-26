import { useContext } from 'react'
import Display from './components/Display'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import { PlayerContext } from './context/PlayerContext'

const App = () => {

  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black text-white'>
      {songsData.length !== 0 ?
        <>
          <div className="h-[90%] flex gap-2 p-2">
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