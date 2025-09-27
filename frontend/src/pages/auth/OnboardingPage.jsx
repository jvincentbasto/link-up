import OnBoardingForm from "../../components/forms/OnBoardingForm";

const OnboardingPage = () => {
  return (
    <div className="card w-full max-w-[800px] bg-base-200 shadow-lg z-[10]">
      <div className="card-body p-[10px] md:p-[20px]">
        <OnBoardingForm />
      </div>
    </div>
  );
};
export default OnboardingPage;
