import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { addDays, format, isSameDay } from "date-fns";

export default function CarouselSize({
  onDateChange,
}: {
  onDateChange: (newDate: Date) => void;
}) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);

  const initDaysRange = 30;
  const initStartIndex = initDaysRange / 2 - 2;
  const startIndexRef = useRef<number>(initStartIndex);

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
    <div>
      <Carousel
        opts={{
          startIndex: startIndexRef.current,
        }}
        className="w-full max-w-sm p-3 border-2 border-black"
      >
        <CarouselContent>
          {visibleDates.map((date: Date, index: number) => (
            <CarouselItem key={index} className="basis-1/5">
              <div className="p-1">
                <Card>
                  <CardContent
                    className={`flex aspect-square items-center justify-center p-6 ${
                      isSameDay(date, selectedDate) ? "bg-slate-500" : ""
                    }`}
                    onClick={() => handleDateClick(date)}
                  >
                    <span className="text-3xl font-semibold">
                      {format(date, "dd")}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
