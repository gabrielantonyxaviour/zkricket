"use client";
import Addplayer from "@/components/Addplayer";
import Logs from "@/components/Logs";
import Pitch from "@/components/Pitch";
import fetchMatchDetail from "@/utils/supabaseFunctions/fetchMatchDetails";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Page({ params }: { params: { slug: string } }) {
  const [addplr, setaddplr] = useState(false);
  const [index, setindex] = useState(0);
  const [teams, setteams] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const teamShortForms: { [key: string]: string } = {
    "Chennai Super Kings": "CSK",
    "Royal Challengers Bangalore": "RCB",
    "Mumbai Indians": "MI",
    "Delhi Capitals": "DC",
    "Kolkata Knight Riders": "KKR",
    "Punjab Kings": "PBKS",
    "Rajasthan Royals": "RR",
    "Sunrisers Hyderabad": "SRH",
    "Gujarat Titans": "GT",
    "Lucknow Super Giants": "LSG",
  };
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
  const [playerPositions, setPlayerPositions] = useState<Player[]>([
    {
      name: "Choose Player",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "bat",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "bowl",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "ar",
      team: "plain",
    },
    {
      name: "Choose Player",
      type: "wk",
      team: "plain",
    },
  ]);

  useEffect(() => {
    const fetchTeams = async () => {
      const { message, response } = await fetchMatchDetail(params.slug);
      if (message === "Success") {
        setteams([
          teamShortForms[response[0].team1],
          teamShortForms[response[0].team2],
        ]);
      }
    };
    fetchTeams();
  }, []);
  return (
    <>
      <Addplayer
        index={index}
        teams={teams}
        open={open}
        setOpen={setOpen}
        setPlayerPositions={setPlayerPositions}
        slug={params.slug}
      />
      <div className="pt-10 bg-white">
        <div className="flex flex-row">
          <Link href={"/fixtures"}>
            <div className=" pl-16 py-6 sm:pt-32 lg:pl-16 text-black text-6xl font-bold mt-5">
              <ArrowLeftCircleIcon className="h-10 w-10 text-black" />
            </div>
          </Link>
          <div className=" pr-16 py-6 sm:pt-32 lg:pr-16 text-black text-6xl font-bold">
            {teams[0]} VS {teams[1]}
            <div className=" px-2 text-2xl font-thin">
              Fixture: {params.slug}
            </div>
          </div>
        </div>
        <div className="pt-20">
          <Pitch
            index={index}
            setindex={setindex}
            open={open}
            setOpen={setOpen}
            playerPositions={playerPositions}
          />
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md shad bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Squad
            </a>
          </div>
        </div>

        <div className="px-24">
          <div className=" pr-16 py-6 sm:pt-32 lg:pr-16 text-black text-6xl font-bold">
            Logs
          </div>
          <Logs />
        </div>
      </div>
    </>
  );
}
