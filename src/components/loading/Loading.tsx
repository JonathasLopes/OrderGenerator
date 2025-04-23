import { CirclesWithBar } from "react-loader-spinner";
import './Loading.css';

function Loading() {
    return (
        <div className="loading-container">
            <CirclesWithBar
                height="100"
                width="100"
                color="#FFD600"
                outerCircleColor="#FFD600"
                innerCircleColor="#FFD600"
                barColor="#FFD600"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Loading;