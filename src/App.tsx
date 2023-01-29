import "./App.scss";
import {Chess} from "./components/chess";
import {useEffect, useRef, useState} from "react";
import confetti from "canvas-confetti";
import cat1 from "./assets/images/1.png";
import cat2 from "./assets/images/2.png";
import cat3 from "./assets/images/3.png";
import cat4 from "./assets/images/4.png";
import cat5 from "./assets/images/5.png";
import cat6 from "./assets/images/6.png";
import cat7 from "./assets/images/7.png";
import cat8 from "./assets/images/8.png";
import {Direction} from "./enums";


type chess = {
    data: keyof typeof catsImage,
    current: Direction,
    url: string
}
const catsImage: Record<string, any> = {
    1: cat1,
    2: cat2,
    3: cat3,
    4: cat4,
    5: cat5,
    6: cat6,
    7: cat7,
    8: cat8,
}
const data: chess[] = [
    {current: Direction.Front, data: '1', url: ''},
    {current: Direction.Front, data: '1', url: ''},
    {current: Direction.Front, data: '2', url: ''},
    {current: Direction.Front, data: '2', url: ''},
    {current: Direction.Front, data: '3', url: ''},
    {current: Direction.Front, data: '3', url: ''},
    {current: Direction.Front, data: '4', url: ''},
    {current: Direction.Front, data: '4', url: ''},
    {current: Direction.Front, data: '5', url: ''},
    {current: Direction.Front, data: '5', url: ''},
    {current: Direction.Front, data: '6', url: ''},
    {current: Direction.Front, data: '6', url: ''},
    {current: Direction.Front, data: '7', url: ''},
    {current: Direction.Front, data: '7', url: ''},
    {current: Direction.Front, data: '8', url: ''},
    {current: Direction.Front, data: '8', url: ''},
].map(item => {
    item.url = catsImage[item.data]
    return item
})
    .sort(() => Math.random() - 0.5)

function App() {
    const [isWin, setIsWin] = useState(false);
    const [isFake, setIsFake] = useState(false);
    const [second, setSecond] = useState(0);
    const [board, setBoard] = useState(data);
    const preData = useRef<string | null>(null);
    const clickedArr = useRef<chess[]>([]);
    const timer = useRef<number | null>(null);
    let COUNT = 10

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    function putConfetti() {
        confetti({
            angle: randomInRange(55, 125),
            spread: randomInRange(50, 70),
            particleCount: randomInRange(10, 100),
            origin: {y: 0.5}
        })
    }

    useEffect(() => {
        const isWin = board.every(chess => chess.current === Direction.Back)
        setIsWin(isWin)
        if (isWin) {
            if (second < 20) {
                setIsFake(true)
            }
            while (COUNT > 0) {
                setTimeout(() => {
                    putConfetti()
                }, 200 * COUNT)
                COUNT--
            }
            clearInterval(timer.current as number)
        }
    }, [board, second])

    function startTime() {
        timer.current = setInterval(() => {
            setSecond(s => s + 1)
        }, 1000)
    }

    function handleClick(data: chess) {
        if (!timer.current) {
            startTime()
        }
        clickedArr.current.push(data)
        setBoard(board.map(item => {
            if (item === data) {
                item.current = Direction.Back
            }
            return item
        }))
        if (preData.current === null) {
            preData.current = data.data
            return
        }
        if (preData.current === data.data) {
            preData.current = null
            clickedArr.current = []
            return
        } else {
            setTimeout(() => {
                preData.current = null
                setBoard(board => board.map(item => {
                    clickedArr.current.forEach(c => {
                        if (item === c) {
                            item.current = Direction.Front
                        }
                    })
                    return item
                }))
            }, 500)
        }


    }

    return (
        <div className="chessBoard-wrap">
            <div className="tips">
                {isWin && <span>你赢了</span>}
                {isFake && <span> 但是你作弊了吧 - - </span>}
                耗时: {second} 秒
            </div>
            <div className="chessBoard">
                {
                    board.map((item, index) => {
                        return <Chess key={index} data={item} handleClick={handleClick}/>
                    })
                }
            </div>
        </div>
    );
}

export default App;
