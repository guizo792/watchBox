import { Provider } from "react-redux";
import { createStore } from "redux";
import { liveVideoStreamingReducer } from "../../store/liveVideoStreaming/reducer";
import LiveStream from "./liveStream";

export const store = createStore(liveVideoStreamingReducer);

function LiveStreaming(props) {
  return (
    <Provider store={store}>
      <LiveStream />
    </Provider>
  );
}

export default LiveStreaming;
