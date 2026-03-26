import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from 'axios';

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const url = 'http://localhost:3000';

    const audioRef = useRef();
    const seekBar = useRef();
    const seekBg = useRef();

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const handleVolumeChange = useCallback((e) => {
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
        if (vol > 0) {
            setIsMuted(false);
        }
    }, []);

    const toggleMute = useCallback(() => {
        if (!audioRef.current) return;
        setIsMuted((prev) => !prev);
        if (!isMuted) {
            audioRef.current.volume = 0;
            setVolume(0);
        } else {
            audioRef.current.volume = 0.5;
            setVolume(0.5);
        }
    }, [isMuted]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => {
            if (!audio.duration) return;
            if (seekBar.current) {
                seekBar.current.style.width = `${Math.floor((audio.currentTime / audio.duration) * 100)}%`;
            }
            setTime({
                currentTime: {
                    second: Math.floor(audio.currentTime % 60),
                    minute: Math.floor(audio.currentTime / 60)
                },
                totalTime: {
                    second: Math.floor(audio.duration % 60),
                    minute: Math.floor(audio.duration / 60)
                }
            });
        };

        audio.addEventListener("timeupdate", onTimeUpdate);
        return () => audio.removeEventListener("timeupdate", onTimeUpdate);
    }, []);

    const play = async () => {
        if (!audioRef.current || !track) return;
        await audioRef.current.play();
        setPlayStatus(true);
    };

    const pause = () => {
        if (!audioRef.current) return;
        audioRef.current.pause();
        setPlayStatus(false);
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.loop = isLooping;
        }
    }, [isLooping]);

    const shuffledSongs = useMemo(() => {
        if (!isShuffle) return songsData;
        const shuffled = [...songsData];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [songsData, isShuffle]);

    const toggleShuffle = () => {
        setIsShuffle((prev) => !prev);
    };

    const getTrackIndex = useCallback(
        (id) => shuffledSongs.findIndex((item) => item._id === id),
        [shuffledSongs]
    );

    const playWithId = async (id) => {
        const selectedTrack = songsData.find((item) => item._id === id);
        if (!selectedTrack || !audioRef.current) return;
        setTrack(selectedTrack);
        setTimeout(async () => {
            await audioRef.current.play();
            setPlayStatus(true);
        }, 0);
    };

    const previusSong = async () => {
        if (!track || !audioRef.current) return;
        const currentIndex = getTrackIndex(track._id);
        if (currentIndex > 0) {
            const nextTrack = shuffledSongs[currentIndex - 1];
            setTrack(nextTrack);
            setTimeout(async () => {
                await audioRef.current.play();
                setPlayStatus(true);
            }, 0);
        }
    };

    const nextSong = async () => {
        if (!track || !audioRef.current) return;
        const currentIndex = getTrackIndex(track._id);
        if (currentIndex > -1 && currentIndex < shuffledSongs.length - 1) {
            const nextTrack = shuffledSongs[currentIndex + 1];
            setTrack(nextTrack);
            setTimeout(async () => {
                await audioRef.current.play();
                setPlayStatus(true);
            }, 0);
        }
    };

    const seekSong = (e) => {
        if (!audioRef.current || !seekBg.current) return;
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    };

    const getSongsData = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);
            const fetchedSongs = response.data.songs || [];
            setSongsData(fetchedSongs);
            setTrack((currentTrack) => currentTrack || fetchedSongs[0] || null);
        } catch (error) {
            console.log('error getSongsData', error);
        }
    };

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums || []);
        } catch (error) {
            console.log('error getSongsData', error);
        }
    };

    useEffect(() => {
        getAlbumsData();
        getSongsData();
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = volume;
    }, [volume]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            if (isLooping) return;
            const currentIndex = track ? getTrackIndex(track._id) : -1;
            if (currentIndex > -1 && currentIndex < shuffledSongs.length - 1) {
                setTrack(shuffledSongs[currentIndex + 1]);
                setTimeout(() => audio.play(), 0);
            } else {
                setPlayStatus(false);
            }
        };

        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
    }, [track, shuffledSongs, isLooping, getTrackIndex]);

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previusSong,
        nextSong,
        seekSong,
        songsData: shuffledSongs,
        albumsData,
        isLooping,
        toggleLoop,
        isShuffle,
        toggleShuffle,
        volume,
        handleVolumeChange,
        isMuted,
        toggleMute
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
}

export default PlayerContextProvider