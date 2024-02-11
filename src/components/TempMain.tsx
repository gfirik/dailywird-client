interface TempMainProps {
  selectedDate: Date;
}

const TempMain: React.FC<TempMainProps> = ({ selectedDate }) => {
  return (
    <div>
      <h1>Selected Date: {selectedDate.toDateString()}</h1>
    </div>
  );
};

export default TempMain;
