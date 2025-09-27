import { VideoIcon } from "lucide-react";

const CallButton = ({ handleVideoCall }) => {
  return (
    <div className="w-full flex justify-end items-center p-[10px] absolute top-[10px]">
      <button
        onClick={handleVideoCall}
        className="btn btn-outline btn-primary btn-sm"
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
};

export default CallButton;
