import { useState, useEffect } from "react";
import { format, addDays, subDays } from "date-fns";
import styled from "styled-components";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [visibleDates, setVisibleDates] = useState<Date[]>([]);

  useEffect(() => {
    generateVisibleDates(selectedDate);
    console.log(selectedDate);
  }, [selectedDate]);

  const generateVisibleDates = (centerDate: Date) => {
    const dates = [];
    for (let i = -2; i <= 2; i++) {
      dates.push(addDays(centerDate, i));
    }
    setVisibleDates(dates);
  };

  const handleSwipe = (direction: "left" | "right") => {
    const newDate =
      direction === "left"
        ? subDays(selectedDate, 1)
        : addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const getDayOfWeekLabel = (dayOfWeek: number) => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return daysOfWeek[dayOfWeek];
  };

  return (
    <DatePickerContainer>
      <SwipeAreaLeft onClick={() => handleSwipe("left")}>&lt;</SwipeAreaLeft>
      <DateContainer>
        {visibleDates.map((date: Date, index: number) => (
          <DateItem key={index}>
            <div>{format(date, "MMM d")}</div>
            <div>{getDayOfWeekLabel(date.getDay())}</div>
          </DateItem>
        ))}
      </DateContainer>
      <SwipeAreaRight onClick={() => handleSwipe("right")}>&gt;</SwipeAreaRight>
    </DatePickerContainer>
  );
};

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const DateContainer = styled.div`
  display: flex;
  width: 80%;
`;

const DateItem = styled.div`
  flex: 0 0 auto;
  text-align: center;
  width: 20%;
  padding: 1rem;
  box-sizing: border-box;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

const SwipeArea = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2rem;
  height: 2rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
`;

const SwipeAreaLeft = styled(SwipeArea)`
  left: 0;
`;

const SwipeAreaRight = styled(SwipeArea)`
  right: 0;
`;

export default DatePicker;
