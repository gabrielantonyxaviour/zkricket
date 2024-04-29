"use client";
import FixtureCard from "@/components/FixtureCard";
import React, { useEffect, useState } from "react";
import { Pixelify_Sans } from "next/font/google";
import fetchFixtures from "@/utils/supabaseFunctions/fetchFixtures";
const pxsans = Pixelify_Sans({ subsets: ["latin"] });

function page() {
  const [upcomingMatches, setupcomingMatches] = useState([]); // State to store upcoming matches
  useEffect(() => {
    const fetchUpcomingFixtures = async () => {
      try {
        // Fetch fixtures
        const { message, response } = await fetchFixtures();

        if (message === "Success") {
          // Get current date
          const currentDate = new Date();

          // Filter upcoming matches
          const filteredMatches = response.filter((match: any) => {
            const startDate = new Date(Number(match.startDate));
            return startDate > currentDate;
          });

          // Map the filtered matches to the desired format
          const upcomingMatches = filteredMatches.map((match: any) => ({
            id: match.id, // Assuming fid represents matchId
            team1: match.team1,
            team2: match.team2,
            title: "Indian Primere League", // Common title
          }));

          // Set upcoming matches in state
          const firstSixUpcomingMatches = upcomingMatches.slice(0, 6);
          setupcomingMatches(firstSixUpcomingMatches);
        } else {
          console.error("Error fetching upcoming fixtures:", message);
        }
      } catch (error) {
        console.error("Error fetching upcoming fixtures:", error);
      }
    };

    // Call the function to fetch upcoming fixtures
    fetchUpcomingFixtures();
  }, []);

  return (
    <div>
      <div className="bg-white px-16 py-6 sm:pt-32 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Upcoming Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Participate in upcoming fixtures
          </p>
        </div>
      </div>
      <div className="px-12 bg-white">
        <FixtureCard fixtures={upcomingMatches} completed={false} />
      </div>
      <div className="bg-white px-6 py-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Ongoing Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            View Ongoing fixtures
          </p>
        </div>
      </div>
      <div className="px-12 bg-white">
        <FixtureCard fixtures={Upcoming} completed={true} />
      </div>
      <div className="bg-white px-6 py-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ${pxsans.className}`}
          >
            Completed Fixtures
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            View Completed fixtures
          </p>
        </div>
      </div>
      <div className="px-12 bg-white">
        <FixtureCard fixtures={upcomingMatches} completed={true} />
      </div>
    </div>
  );
}

export default page;
