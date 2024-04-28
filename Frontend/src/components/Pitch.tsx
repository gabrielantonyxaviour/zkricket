"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Player {
  team:
    | "plain"
    | "csk"
    | "rcb"
    | "mi"
    | "dc"
    | "kkr"
    | "pbks"
    | "rr"
    | "srh"
    | "gt"
    | "lsg"
    | "pkbs"
    | "dc";
  type: "batsman" | "bowler" | "allrounder" | "wicketkeeper";
  image: string;
}

interface PitchProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  setindex: React.Dispatch<React.SetStateAction<number>>;
}

const Pitch: React.FC<PitchProps> = ({ open, setOpen, setindex, index }) => {
  const [playerPositions, setPlayerPositions] = useState<Player[]>([
    { type: "batsman", image: "/players/plain/PlainBat.png", team: "plain" },
    { type: "batsman", image: "/players/plain/PlainBat.png", team: "plain" },
    { type: "batsman", image: "/players/plain/PlainBat.png", team: "plain" },
    { type: "bowler", image: "/players/plain/PlainBowl.png", team: "plain" },
    { type: "bowler", image: "/players/plain/PlainBowl.png", team: "plain" },
    { type: "bowler", image: "/players/plain/PlainBowl.png", team: "plain" },
    { type: "allrounder", image: "/players/plain/PlainAll.png", team: "plain" },
    { type: "allrounder", image: "/players/plain/PlainAll.png", team: "plain" },
    { type: "allrounder", image: "/players/plain/PlainAll.png", team: "plain" },
    { type: "allrounder", image: "/players/plain/PlainAll.png", team: "plain" },
    {
      type: "wicketkeeper",
      image: "/players/plain/PlainWk.png",
      team: "plain",
    },
  ]);

  const handlePlayerClick = (index: number) => {
    console.log("Player", index, "clicked");
    setindex(index);
    setOpen(true);
  };

  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div className="flex justify-center items-center relative">
          <img
            className="rounded-lg shadow-md border-2 border-black"
            src="/pitchbase.png"
            alt="Pitch"
          />
          {playerPositions.map((player, index) => (
            <PlayerImage
              key={index}
              index={index}
              player={player}
              onClick={() => handlePlayerClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PlayerImageProps {
  index: number;
  player: Player;
  onClick: () => void;
}

const PlayerImage: React.FC<PlayerImageProps> = ({
  index,
  player,
  onClick,
}) => {
  return (
    <img
      src={player.image}
      alt={`Player ${index + 1}`}
      className="absolute cursor-pointer w-20"
      onClick={onClick}
      style={{
        top: calculateTopPosition(index),
        left: calculateLeftPosition(index),
      }}
    />
  );
};

const calculateTopPosition = (index: number): string => {
  const centerY = window.innerHeight / 2;
  const playerHeight = 20;
  const totalPlayers = 11;
  const offset = (index - totalPlayers / 2) * playerHeight;
  if (index === 10) {
    return `${centerY - 450}px`;
  } else if (index >= 6) {
    return `${centerY - 30}px`;
  } else if (index >= 3) {
    return `${centerY + 190}px`;
  } else {
    return `${centerY - 250}px`;
  }
};

const calculateLeftPosition = (index: number): string => {
  const centerX = window.innerWidth / 2;
  if (index === 10) {
    return `${centerX - 35}px`;
  } else if (index >= 6) {
    return `${centerX - 290 + (index % 6) * 160}px`;
  } else if (index >= 3) {
    return `${centerX - 200 + (index % 3) * 160}px`;
  } else {
    return `${centerX - 200 + (index + (1 % 1)) * 160}px`;
  }
};

export default Pitch;
