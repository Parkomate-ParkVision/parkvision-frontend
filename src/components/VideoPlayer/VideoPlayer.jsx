import { ApiConfig } from '../../utils/config';
import feed1 from '../../assets/Feed/06-05-2024_entry_compilation.mp4';
import feed2 from '../../assets/Feed/24-05-2024_exit_compilation.mp4';


const VideoStream = ({ url, index }) => {
	const videoUrl = String(url)
		.replace('://', '%3A%2F%2F')
		.replace('/', '%2F')
		.replace(':', '%3A')
		.replace('@', '%40')
		.replace('?', '%3F')
		.replace('=', '%3D')
		.replace('&', '%26');
	return (
		<div>
			<div
				style={{
					margin: '0px',
					height: '100%',
					'background-color': 'black',
				}}
			>
				{/* <img
          src={`${ApiConfig.cctvFeed}?url=${videoUrl}`}
          width="798"
          height="449"
        /> */}
				<video width={798} height={449} src={index % 2 == 0 ? feed1 : feed2} type='video/mp4' controls autoPlay/>
			</div>
		</div>
	);
};

export default VideoStream;
