interface MainFeedProps {
  selectedDate: Date;
}

const MainFeed: React.FC<MainFeedProps> = ({ selectedDate }) => {
  return (
    <div className="w-full max-w-md m-2 rounded-t-lg shadow-lg min-h-80 bg-neutral-200">
      <h1>Selected Date: {selectedDate.toDateString()}</h1>
    </div>
  );
};

export default MainFeed;
