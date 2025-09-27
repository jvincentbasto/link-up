import { Link } from "react-router";

const Logo = ({ link = true, className = "" }) => {
  const LogoIcon = () => {
    return (
      <div
        className={`text-[24px] font-extrabold text-primary flex items-center leading-[1] ${className}`}
      >
        <span className="inline-block text-[1em] text-black">Link</span>
        <span className="inline-block text-[1em] text-current">Up</span>
        <span className="inline-block size-[.4em] rounded-full bg-current self-end mb-[.08em] ml-[1px]"></span>
      </div>
    );
  };

  return (
    <div className="">
      {link ? (
        <Link to="/" className="">
          <LogoIcon />
        </Link>
      ) : (
        <LogoIcon />
      )}
    </div>
  );
};

export default Logo;
