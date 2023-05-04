import React, { useState, useEffect } from 'react';

export default function Leaderboard() {
  const [ratLeaderboard, setRatLeaderboard] = useState([]);
  const [ratLeaderboardComponents, setRatLeaderboardComponents] = useState([]);

  useEffect(() => {
    async function getLeaderboard() {
      try {
        const rats = await fetch('/sql/rat');
        const data = await rats.json();
        setRatLeaderboard(data);
      } catch (err) {
        console.log(err);
      }
    }
    getLeaderboard();
  }, []);

  useEffect(() => {
    if (ratLeaderboard !== []) {
      const temp = ratLeaderboard.map((rat, index) => (
        <div
          key={index}
          className="flex flex-row justify-center items-center w-full font-mono bg-mirisbeige"
        >
          <h1>{index + 1}.</h1>
          <div
            key={index}
            className="border rounded-xl shadow bg-mirispink w-1/4 flexflex-col font-mono text-gray-600 items-center text-center"
          >
            <p>Name: {rat.name}</p>
            <p>Sightings: {rat.sightings}</p>
          </div>
        </div>
      ));

      setRatLeaderboardComponents(temp);
    }
  }, [ratLeaderboard]);

  return (
    <div className="flex flex-col items-center gap-3 bg-mirisbeige">
      <h1 className="text-4xl text-gray-600 font-mono font-bold">
        LEADERBOARD:
      </h1>
      {ratLeaderboardComponents}
    </div>
  );
}
