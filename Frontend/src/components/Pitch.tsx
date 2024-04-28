"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Player {
  name: string;
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
  type: "bat" | "bowl" | "ar" | "wk";
}

interface PitchProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  setindex: React.Dispatch<React.SetStateAction<number>>;
  playerPositions: Player[];
}

const Pitch: React.FC<PitchProps> = ({
  open,
  setOpen,
  setindex,
  index,
  playerPositions,
}) => {
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
            <>
              <PlayerImage
                name={player.name}
                key={index}
                index={index}
                player={player}
                onClick={() => handlePlayerClick(index)}
              />
              <div></div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PlayerImageProps {
  name: string;
  index: number;
  player: Player;
  onClick: () => void;
}

const PlayerImage: React.FC<PlayerImageProps> = ({
  name,
  index,
  player,
  onClick,
}) => {
  return (
    <>
      {player.team == "plain" ? (
        <img
          src={`/players/plain/${player.type}.png`}
          alt={`Player ${index + 1}`}
          className="absolute cursor-pointer w-20"
          onClick={onClick}
          style={{
            top: calculateTopPosition(index),
            left: calculateLeftPosition(index),
          }}
        />
      ) : (
        <img
          src={`/players/${player.team}/${player.type}.png`}
          alt={`Player ${index + 1}`}
          className="absolute cursor-pointer w-20"
          onClick={onClick}
          style={{
            top: calculateTopPosition(index),
            left: calculateLeftPosition(index),
          }}
        />
      )}
      <div
        className="absolute cursor-pointer text-xs mt-5 mr-5 px-1 bg-slate-50 text-black  rounded-md"
        onClick={onClick}
        style={{
          top: calculateTopTextPosition(index),
          left: calculateLeftPosition(index),
        }}
      >
        {name}
      </div>
    </>
  );
};

const calculateTopPosition = (index: number): string => {
  const centerY = window.innerHeight / 2;
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

const calculateTopTextPosition = (index: number): string => {
  const centerY = window.innerHeight / 2;
  if (index === 10) {
    return `${centerY - 450 + 110}px`;
  } else if (index >= 6) {
    return `${centerY - 30 + 110}px`;
  } else if (index >= 3) {
    return `${centerY + 190 + 110}px`;
  } else {
    return `${centerY - 250 + 110}px`;
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
