import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useTelegram } from "../hooks/useTelegram";

export default function WelcomeText() {
  const { user } = useTelegram();
  const [todayDate, setTodayDate] = useState("");

  const { isPending, error, data } = useQuery({
    queryKey: ["user", user],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:4444/v1/users`, {
          headers: {
            telegramid: user?.id || "433734174",
          },
        });

        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user");
      }
    },
  });
  useEffect(() => {
    const today = new Date();
    const formattedDate = format(today, "do MMMM, eeee");
    setTodayDate(formattedDate);
  }, []);

  return (
    <div className="w-full max-w-md p-6 shadow-md bg-neutral-50">
      <div className="flex flex-col justify-center p-4 text-neutral-800">
        <h2 className="text-xl">Hi, {user ? user.username : "Stranger"}!</h2>
        {isPending && <h3 className="text-blue-600">Loading...</h3>}
        {error && (
          <p className="text-red-600">Error has occured: {error.message}</p>
        )}
        {data && (
          <div>
            <h3 className="mb-2 text-lg">
              You have {data?.wirds?.length} wirds for today
            </h3>
            <h5> fetched data from {data?.telegramId}</h5>
          </div>
        )}
        <h4>Today: {todayDate}</h4>
      </div>
    </div>
  );
}
