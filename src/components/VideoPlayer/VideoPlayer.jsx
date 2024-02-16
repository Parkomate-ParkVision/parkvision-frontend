import { ApiConfig } from "../../utils/config";

const VideoStream = ({ url }) => {
  const videoUrl = String(url)
    .replace("://", "%3A%2F%2F")
    .replace("/", "%2F")
    .replace(":", "%3A")
    .replace("@", "%40")
    .replace("?", "%3F")
    .replace("=", "%3D")
    .replace("&", "%26");
  return (
    <div>
      <div
        style={{
          margin: "0px",
          height: "100%",
          "background-color": "black",
        }}
      >
        <img
          src={`${ApiConfig.cctvFeed}?url=${videoUrl}`}
          width="798"
          height="449"
        />
      </div>
    </div>
  );
};

export default VideoStream;
