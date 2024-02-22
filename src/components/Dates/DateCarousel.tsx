import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { addDays, format, isSameDay, isToday } from "date-fns";

export default function CarouselSize({
  onDateChange,
}: {
  onDateChange: (newDate: Date) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);

  const initDaysRange = 30;
  const startIndexRef = useRef<number>(0);

  useEffect(() => {
    generateVisibleDates(selectedDate, initDaysRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateVisibleDates = (centerDate: Date, range: number) => {
    const startDate = addDays(centerDate, -Math.floor(range / 2));
    const endDate = addDays(centerDate, Math.floor(range / 2));
    const dates = [];
    for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
      dates.push(date);
    }
    setVisibleDates(dates);
    startIndexRef.current =
      dates.findIndex(
        (date) =>
          format(date, "yyyy-MM-dd") === format(centerDate, "yyyy-MM-dd")
      ) - 2;
  };

  const isNearEdge = (date: Date, visibleDates: Date[]) => {
    const first5 = visibleDates.slice(0, 5);
    const last5 = visibleDates.slice(-5);

    return {
      start: first5.some((d) => isSameDay(date, d)),
      end: last5.some((d) => isSameDay(date, d)),
    };
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);

    const nearEdge = isNearEdge(date, visibleDates);
    if (nearEdge.start || nearEdge.end) {
      const newRange = visibleDates.length + 20;
      generateVisibleDates(date, newRange);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Carousel
        opts={{
          startIndex: startIndexRef.current,
        }}
        className="max-w-sm min-w-full mt-2"
      >
        <CarouselContent>
          {visibleDates.map((date: Date, index: number) => (
            <CarouselItem key={index} className="basis-1/5">
              <div className="p-1">
                <div
                  className={`w-full flex aspect-square flex-col items-center justify-center p-2 text-neutral-500 ${
                    isSameDay(date, selectedDate)
                      ? "bg-neutral-400 rounded-lg"
                      : ""
                  } ${isToday(date) ? "text-red-700" : ""}`}
                  onClick={() => handleDateClick(date)}
                >
                  <span className="mt-2 text-xs">{format(date, "eee")}</span>
                  <span
                    className={`text-3xl font-semibold ${
                      isSameDay(date, selectedDate) ? "text-neutral-800" : ""
                    }`}
                  >
                    {parseInt(format(date, "dd")).toString()}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
