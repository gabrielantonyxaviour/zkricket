"use client";
import Addplayer from "@/components/Addplayer";
import Pitch from "@/components/Pitch";
import { ArrowLeftCircleIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Page({ params }: { params: { slug: string } }) {
  const [addplr, setaddplr] = useState(false);
  const [index, setindex] = useState(0);
  const [teams, setteams] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setteams(["CSK", "RCB"]);
  }, []);
  return (
    <>
      <Addplayer index={index} teams={teams} open={open} setOpen={setOpen} />
      <div className="pt-10 bg-white">
        <div className="flex flex-row">
          <Link href={"/fixtures"}>
            <div className="bg-white pl-16 py-6 sm:pt-32 lg:pl-16 text-black text-6xl font-bold mt-5">
              <ArrowLeftCircleIcon className="h-10 w-10 text-black" />
            </div>
          </Link>
          <div className="bg-white pr-16 py-6 sm:pt-32 lg:pr-16 text-black text-6xl font-bold">
            {teams[0]} VS {teams[1]}
            <div className=" px-2 text-2xl font-thin">
              Fxiture: {params.slug}
            </div>
          </div>
        </div>
        <Pitch
          index={index}
          setindex={setindex}
          open={open}
          setOpen={setOpen}
        />
        <div className="flex items-center justify-center">
          <div className="mt-10 flex items-center gap-x-6">
            <a
              href="#"
              className="rounded-md shad bg-[#01A4F1] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Squad
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
