interface MainFeedProps {
  selectedDate: Date;
}

const MainFeed: React.FC<MainFeedProps> = ({ selectedDate }) => {
  return (
    <div>
      <h1>Selected Date: {selectedDate.toDateString()}</h1>
    </div>
  );
};

export default MainFeed;
