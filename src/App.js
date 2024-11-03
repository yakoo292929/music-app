/**
 * ===========================================================================================
 * SYSTEM NAME    : music-app
 * PROGRAM ID     : src/App.js
 * PROGRAM NAME   : App.js
 *                : アプリケーション全てのページで必要な処理
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/11/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { useEffect, useRef, useState } from "react";

import spotify from "./lib/spotify";
import { SongList } from "./components/SongList";
import { Player } from "./components/Player";
import { SearchInput } from "./components/SearchInput";
import { Pagination } from "./components/Pagination";

const limit = 20;

////////////////////////////////////////////////////////////////////////
// App
////////////////////////////////////////////////////////////////////////
export default function App() {

  //-----------------------------------------//
  // useState：状態管理
  //-----------------------------------------//
  const [isLoading, setIsLoading] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState();
  const [keyword, setKeyword] = useState('');
  const [searchedSongs, setSearchedSongs] = useState();
  const [page, setPage] = useState(1);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const isSearchedResult = searchedSongs != null;

  //-----------------------------------------//
  // useRef：参照保持
  //-----------------------------------------//
  const audioRef = useRef(null);

  //-----------------------------------------//
  // useEffect：副作用レンダリング以外の処理
  //-----------------------------------------//
  useEffect(() => {

    fetchPopularSongs();

  }, []);

  //-----------------------------------------//
  // 関数：fetchPopularSongs
  //-----------------------------------------//
  const fetchPopularSongs = async () => {

    // ローディング 表示
    setIsLoading(true);

    const result = await spotify.getPopularSongs();
    const popularSongs = result.items.map((item) => {
      return item.track;
    });
    setPopularSongs(popularSongs);

   // ローディング 非表示
    setIsLoading(false);

  };


  //-----------------------------------------//
  // 関数：handleSongSelected
  //-----------------------------------------//
  const handleSongSelected = async (song) => {

    setSelectedSong(song);
    if (song.preview_url != null) {
        audioRef.current.src = song.preview_url;
        playSong();
    } else {
        pauseSong();
    }

  };

  //-----------------------------------------//
  // 関数：playSong
  //-----------------------------------------//
  const playSong = () => {

    audioRef.current.play();
    setIsPlay(true);

  };

  //-----------------------------------------//
  // 関数：pauseSong
  //-----------------------------------------//
  const pauseSong = () => {

    audioRef.current.pause();
    setIsPlay(false);

  };

  //-----------------------------------------//
  // 関数：toggleSong
  //-----------------------------------------//
  const toggleSong = () => {

    if (isPlay) {
        pauseSong();
    } else {
        playSong();
    }

  }

  //-----------------------------------------//
  // 関数：handleInputChange
  //-----------------------------------------//
  const handleInputChange = (e) => {

    setKeyword(e.target.value);

  };

  //-----------------------------------------//
  // 関数：searchSongs
  //-----------------------------------------//
  const searchSongs = async (page) => {

    // ローディング 表示
    setIsLoading(true);

    const offset = parseInt(page) ? (parseInt(page) -1) * limit : 0;
    const result =  await spotify.searchSongs(keyword, limit, offset);
    setHasNext(result.next !== null);
    setHasPrev(result.previous !== null);
    setSearchedSongs(result.items);

   // ローディング 非表示
   setIsLoading(false);

  };

  //-----------------------------------------//
  // 関数：moveToNext
  //-----------------------------------------//
  const moveToNext = async () => {

    const nextPage = page + 1;
    await searchSongs(nextPage);
    setPage(nextPage);

  };

  //-----------------------------------------//
  // 関数：moveToPrev
  //-----------------------------------------//
  const moveToPrev = async () => {

    const prevPage = page - 1;
    await searchSongs(prevPage);
    setPage(prevPage);

  };


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (

    <div className="flex flex-col min-h-screen bg-gray-900 text-white">

      <main className="flex-1 p-8 mb-20">

        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>

        <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">{isSearchedResult ? "Searched Results" : "Popular Songs" }</h2>
          <SongList
            isLoading={isLoading}
            songs={isSearchedResult ? searchedSongs : popularSongs}
            onSongSelected={handleSongSelected}
          />
          {isSearchedResult && (
            <Pagination
              onPrev={hasPrev ? moveToPrev : null}
              onNext={hasNext ? moveToNext : null}
            />
          )}
        </section>
      </main>

      {selectedSong != null && (
        <Player
          song={selectedSong}
          isPlay={isPlay}
          onButtonClick={toggleSong}
        />
      )}
      <audio ref={audioRef} />

    </div>
  );
}
