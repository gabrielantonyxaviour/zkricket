"use client";

import {
  Dispatch,
  Fragment,
  SetStateAction,
  use,
  useEffect,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { csk, rcb, rr, kkr, dc, pbks, lsg, gt, srh } from "@/data/teams";
export default function Addplayer(props: {
  index: number;
  teams: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const index = props.index;
  const team = ["lsg", "csk"];

  const open = props.open;
  const setOpen = props.setOpen;
  interface Player {
    id?: string;
    name: string;
    captain?: boolean;
    role?: string;
    imageId?: number;
    battingStyle?: string;
    bowlingStyle?: string;
    team?: string;
  }
  const [role, setRole] = useState("");
  const [player, setPlayer] = useState<Player[]>([]); // Fix the missing 'Player' type
  const allTeams = {
    csk: csk,
    rcb: rcb,
    rr: rr,
    kkr: kkr,
    dc: dc,
    pbks: pbks,
    lsg: lsg,
    gt: gt,
    srh: srh,
  };
  useEffect(() => {
    if (index === 10) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "WK-Batter")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "WK-Batter")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Wicket Keeper");
    } else if (index >= 6) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "Batting Allrounder")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "Batting Allrounder")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("All Rounder");
    } else if (index >= 3) {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "Bowler")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "Bowler")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Bowler");
    } else {
      const team1 = allTeams[team[0] as keyof typeof allTeams];
      const team2 = allTeams[team[1] as keyof typeof allTeams];
      setPlayer([
        ...team1.player
          .filter((player) => player.role === "Batter")
          .map(
            (player) => ({ ...player, team: team[0] }) // Set team for players from team1
          ),
        ...team2.player
          .filter((player) => player.role === "Batter")
          .map(
            (player) => ({ ...player, team: team[1] }) // Set team for players from team2
          ),
      ]);
      setRole("Batsman");
    }
  }, [index]);
  const [playerImages, setPlayerImages] = useState<(string | null)[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      const imageUrls = await Promise.all(
        player.map(async (person) => {
          if (person.imageId) {
            return await getImage(person.imageId);
          } else {
            return null;
          }
        })
      );
      setPlayerImages(imageUrls);
    };

    fetchImages();
  }, [player]);
  const getImage = async (id: number): Promise<string> => {
    const url = `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/${id}`;
    const headers: HeadersInit = {
      "X-RapidAPI-Key": process.env.CRICKET_API || "", // Ensure process.env.CRICKET_API is not undefined
      "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
    };

    const options: RequestInit = {
      method: "GET",
      headers: headers,
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.image || null; // Return image URL or null if not found
    } catch (error) {
      console.error(error); // Log the error
      return ""; // Return null in case of error
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-y-auto rounded-lg h-96 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-fit sm:max-w-7xl sm:p-6">
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-base font-semibold leading-6 text-gray-900">
                        Add Player
                      </h1>
                      <p className="mt-2 text-sm text-gray-700">{role}</p>
                    </div>
                  </div>
                  <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Team
                              </th>
                              {/* <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Status
                              </th> */}
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {player.map((person) => (
                              <tr key={person.id}>
                                <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                  <div className="flex items-center">
                                    <div className="h-11 w-11 flex-shrink-0">
                                      <img
                                        className="h-11 w-11 rounded-full"
                                        src={
                                          playerImages[index] || "/default.png"
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">
                                        {person.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  <div className="text-gray-900">
                                    {/* {person.team} */}
                                    {person.team?.toUpperCase()}
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                  {role}
                                </td>
                                <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                  <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                                    <button
                                      type="button"
                                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                      Add Player
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
