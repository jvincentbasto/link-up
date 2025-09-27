import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { CameraIcon, MapPinIcon, ShuffleIcon } from "lucide-react";
import Logo from "../layouts/Logo";

import { LANGUAGES } from "../../constants";
import { apiAuthHooks } from "../../hooks/tanstack/auth";

const { useAuthUser, useOnBoarding } = apiAuthHooks;

const initialValues = {
  fullName: "",
  bio: "",
  nativeLanguage: "",
  learningLanguage: "",
  location: "",
  profilePic: "",
};

const Form = ({ user }) => {
  const didRun = useRef(false);
  const [form, setForm] = useState(initialValues);

  const { isPending, error, mutate: onboardingMutation } = useOnBoarding();

  // handlers
  const handleInput = (e, field) => {
    setForm((state) => {
      return { ...state, [field]: e.target.value };
    });
  };
  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setForm((state) => {
      return { ...state, profilePic: randomAvatar };
    });
    toast.success("Avatar Generated!");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(form);
  };

  //
  useEffect(() => {
    if (user) {
      setForm((prev) => ({ ...prev, ...user }));
    }
  }, [user]);
  // useEffect(() => {
  //   if (didRun.current) return;
  //   didRun.current = true;

  //   handleRandomAvatar();
  // }, []);

  //
  const Error = () => {
    if (!error) return null;
    const defaultError = "Unexpected error. Please try again";

    return (
      <div
        role="alert"
        className="alert alert-error alert-soft text-white mb-[10px]"
      >
        {/* <span>{error.response.data.message}</span> */}
        <span className="font-semibold text-gray-700 line-clamp-[3]">
          {error?.response?.data?.message ?? defaultError}
        </span>
      </div>
    );
  };
  const Avatar = () => {
    const Profile = () => {
      if (!form?.profilePic) {
        return <Icon cn={{ icon: "opacity-[50%]!" }} />;
      }

      return (
        <img
          src={form.profilePic}
          alt="Profile Preview"
          className="size-full object-cover hover:"
        />
      );
    };
    const Icon = ({ cn = {} }) => {
      const { wrapper, icon } = cn;

      return (
        <div
          className={`size-full roundeed-full flex justify-center items-center ${wrapper}`}
        >
          <CameraIcon
            className={`size-[40px] text-primary opacity-[100%] ${icon}`}
          />
        </div>
      );
    };

    return (
      <div className="flex items-center space-y-[20px] mb-[20px]">
        <div
          onClick={handleRandomAvatar}
          className="cursor-pointer size-[100px] rounded-full border-[2px] border-gray-400 shadow-lg p-[4px] overflow-hidden"
        >
          <div className="size-full bg-base-300 rounded-full relative">
            <Profile />
            <div className="opacity-0 hover:opacity-100 transition-all duration-200 absolute inset-0 p-[4px] bg-gray-200/80 rounded-full overflow-hidden">
              <Icon />
            </div>
          </div>
        </div>
      </div>
    );
  };
  const Languages = () => {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-[10px] mt-[5px]">
        <div className="w-full space-y-[4px]">
          <label htmlFor="nativeLanguage" className="label">
            <span className="label-text">Native Language</span>
          </label>
          <select
            id="nativeLanguage"
            name="nativeLanguage"
            value={form.nativeLanguage}
            onChange={(e) => handleInput(e, "nativeLanguage")}
            className="select select-bordered w-full"
          >
            <option value="">Select your native language</option>
            {LANGUAGES.map((lang) => (
              <option key={`native-${lang}`} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="w-full space-y-[4px]">
          <label htmlFor="learningLanguage" className="label">
            <span className="label-text">Learning Language</span>
          </label>
          <select
            id="learningLanguage"
            name="learningLanguage"
            value={form.learningLanguage}
            onChange={(e) => handleInput(e, "learningLanguage")}
            className="select select-bordered w-full"
          >
            <option value="">Select language you're learning</option>
            {LANGUAGES.map((lang) => (
              <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                {lang}
              </option>
            ))}
          </select>
        </div> */}
      </div>
    );
  };

  return (
    <div className="w-full min-h-[400px]">
      <Error />
      <form onSubmit={handleSubmit}>
        <div className="space-y-[20px]">
          <div className="">
            <h2 className="text-[24px] font-bold text-gray-600">
              Complete Your Profile
            </h2>
            <p className="text-[16px] font-medium text-gray-400">
              Get started now and bring your friends closer
            </p>
          </div>

          <div className="flex flex-col gap-[10px] mt-[30px]">
            <Avatar />
            <div className="w-full space-y-[4px]">
              <label htmlFor="fullName" className="label">
                <span className="">Full Name</span>
              </label>
              <input
                type="fullName"
                placeholder="Full Name"
                required
                autoComplete="true"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={(e) => handleInput(e, "fullName")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="w-full space-y-[4px]">
              <label htmlFor="bio" className="label">
                <span className="label-text">Bio</span>
                {form.bio.length > 0 ? (
                  <span className="label-text">{500 - form.bio.length}</span>
                ) : null}
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Your bio..."
                value={form.bio}
                maxLength={500}
                onChange={(e) => handleInput(e, "bio")}
                className="textarea textarea-bordered w-full h-[100px] max-h-[200px]"
              />
            </div>
            {/* <Languages /> */}
            <div className="w-full space-y-[4px]">
              <label htmlFor="location" className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={(e) => handleInput(e, "location")}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-[16px] px-[10px] py-[24px] mt-[10px]"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : null}
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const OnBoardingForm = ({ payload }) => {
  const { data: dataAuth = {} } = useAuthUser();

  return (
    <div className="w-full bg-transparent p-[20px]">
      <div className="mb-[25px] md:mb-[35px]">
        <Logo link={false} className="text-[28px] md:text-[32px]" />
      </div>

      <div className="w-full">
        <Form user={dataAuth?.user} />
      </div>
    </div>
  );
};
export default OnBoardingForm;
