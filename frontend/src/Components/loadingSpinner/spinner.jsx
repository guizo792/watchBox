import { SpinnerContainer, SpinnerOverlay } from "./spinnerStyles";

const LoadingSpinner = () => {
  console.log("loading ...");
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default LoadingSpinner;
