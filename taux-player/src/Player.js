import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const track = {
    uri: "spotify:artist:12Chz98pHFMPJEknJQMWvI",
    name: "Knights of Cydonia",
    album: {
        images: [
            { url: "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400" }
        ]
    },
    artists: [
        { name: "Muse" }
    ]
};

function WebPlayback({ token }) {
  const [current_track, setTrack] = useState(track);

  return (
    <div>
        <SpotifyPlayer
          token={token}
          uris={['spotify:artist:12Chz98pHFMPJEknJQMWvI']}
        />
    </div>
  );
}

export default WebPlayback;