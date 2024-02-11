import { useState } from "react";
import TempMain from "@/components/TempMain";
import WelcomeText from "@/components/WelcomeText";
import CarouselSize from "@/components/Dates/DateCarousel";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleDateChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };
  return (
    <div className="flex flex-col items-center">
      <WelcomeText />
      <CarouselSize onDateChange={handleDateChange} />
      <TempMain selectedDate={selectedDate} />
    </div>
  );
}
