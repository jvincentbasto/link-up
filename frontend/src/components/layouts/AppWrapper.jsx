const AppWrapper = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-full px-[10px] md:px-[20px] ${className}`}>
      {children}
    </div>
  );
};
export default AppWrapper;
