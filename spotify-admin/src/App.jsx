import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export const url = "http://localhost:3000";

const App = () => {
  return (
    <div className='min-h-screen bg-[#0f1014] text-white'>
      <ToastContainer />
      <div className='mx-auto flex min-h-screen w-full max-w-[1440px]'>
        <Sidebar />
        <div className="flex-1 overflow-y-auto">
          <Navbar />
          <div className="px-5 pb-8 pt-6 sm:px-10">
            <Routes>
              <Route path='/add-song' element={<AddSong />} />
              <Route path='/add-album' element={<AddAlbum />} />
              <Route path='/list-song' element={<ListSong />} />
              <Route path='/list-album' element={<ListAlbum />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App