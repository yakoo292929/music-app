
/**
 * ===========================================================================================
 * SYSTEM NAME    : music-app
 * PROGRAM ID     : src/lib/spotify.js
 * PROGRAM NAME   : spotify.js
 *                : spotifyクラス
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/11/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import axios from "axios";

class SpotityClient {

  static async initialize() {

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type":"application/x-www-form-urlencoded",
        },
      }
    );

    let spotify = new SpotityClient();
    spotify.token = response.data.access_token;
    return spotify;

  }

  //-----------------------------------------//
  // メソッド：getPopularSongs
  //-----------------------------------------//
  async getPopularSongs() {

    const response = await axios.get("https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe",
      {
        headers: { Authorization: "Bearer " + this.token },
      }
    );
    return response.data.tracks;

  }

  //-----------------------------------------//
  //メソッド：searchSongs
  //-----------------------------------------//
  async searchSongs(keyword, limit, offset) {

    const response = await axios.get("https://api.spotify.com/v1/search",
      {
        headers: { Authorization: "Bearer " + this.token },
        params: { q: keyword, type: "track", limit, offset },
      }
    );
    return response.data.tracks;

  }

}


const spotify = await SpotityClient.initialize();
export default spotify;
