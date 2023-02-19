import { SpinnerContainer, SpinnerOverlay } from "./spinnerStyles";

const ButtonLoadingSpinner = ({ styles }) => {
  // console.log("loading ...");
  return (
    <SpinnerOverlay style={{ styles }}>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default ButtonLoadingSpinner;
