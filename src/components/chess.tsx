import "./chess.scss";
import {Direction} from "../enums";

export function Chess({data, handleClick}: any) {
    return (
        <div className="chess" onClick={() => handleClick(data)}>
            {data.current === Direction.Front ? (
                <img
                    className="front"
                    src="https://via.placeholder.com/150?text=React"
                    alt=""
                />
            ) : (
                ""
            )}
            {data.current === Direction.Back ? (
                <img
                    className="back"
                    src={data.url}
                    alt=""
                />
            ) : (
                ""
            )}
        </div>
    );
}

