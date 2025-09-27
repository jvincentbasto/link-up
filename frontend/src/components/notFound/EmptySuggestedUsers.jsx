const EmptySuggestedUsers = () => {
  return (
    <div className="card bg-white text-center p-[50px]">
      <p className="text-[26px] font-bold text-gray-600 leading-[1.1]">
        No Suggested Users
      </p>
      <p className="text-[14px] font-medium text-gray-400">
        Check back later for new recommendations.
      </p>
    </div>
  );
};

export default EmptySuggestedUsers;
