"use client";
import { useEffect, useRef, useState } from "react";
import { Averia_Serif_Libre,Ubuntu,Noto_Sans,Noto_Sans_Mono,Nunito_Sans } from "next/font/google";
import axios from 'axios';
import o_picture from "../../public/maru.png";
import x_picture from "../../public/butsu.png";
import Image from "next/image";
const averia = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: "300",
});
const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: "300",
});
const noto_Sans = Noto_Sans({
  subsets: ["latin"],
  weight: "300"
})
const noto_mono = Noto_Sans_Mono({
  subsets: ["latin"],
  weight: "500",
})
const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: "600"
})
export default function Game() {
  const [n, setN] = useState(3);
  const [player, setPlayer] = useState("X");
  const [values, setValues] = useState(Array(3 * 3).fill(""));
  const [finished, setFinished] = useState(false);
  const [x_win, setX_win] = useState(false);
  const [o_win, setO_win] = useState(false);
  const [draw, setDraw] = useState(false);
  let row_o = useRef([]);
  let col_o = useRef([]);
  let row_x = useRef([]);
  let col_x = useRef([]);
  let order = useRef([]);
  let cross_x = useRef(0);
  let xcross_x = useRef(0);
  let cross_o = useRef(0);
  let xcross_o = useRef(0);
  let [win,setWin] = useState("");
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setValues(Array(n * n).fill(""));
    order.current = [];
    row_o.current = Array(n * n).fill();
    col_o.current = Array(n * n).fill();
    row_x.current = Array(n * n).fill();
    col_x.current = Array(n * n).fill();
    cross_x.current = 0;
    xcross_x.current = 0;
    cross_o.current = 0;
    xcross_o.current = 0;
  }, [n]);
  const fetchHistory = async() => {
    const response = await axios.get("http://localhost:8000/user")
    setHistory(response.data);
  }
  const resetHistory = async() => {
    try {
      const response = await axios.delete("http://localhost:8000/user")
      setHistory(response.data);
      fetchHistory();
    }catch (error){
      console.log('Error fetching history:', error)
    }
  }
  useEffect(() => {
    console.log("text win")
    async function postHistory(){
      try{
        if (x_win || o_win || draw ) {
          setFinished(true);
          console.log(`values :${values} , order:${order.current} , size: ${n} , win: ${win}`)
          // send data
          let history = {
            value: JSON.stringify(values),
            order: `[${order.current}]`,
            size: n,
            win: win
          }
          axios.post("http://localhost:8000/user",history);
      }
    }catch (error){
      console.log('Error add history:', error)
    }
    }
    postHistory();
    fetchHistory();
  }, [x_win, o_win, draw]);
  
  const reset = () => {
    setValues(Array(n * n).fill(""));
    setFinished(false);
    setX_win(false);
    setO_win(false);
    setDraw(false);
    order.current = [];
    row_o.current = Array(n * n).fill();
    col_o.current = Array(n * n).fill();
    row_x.current = Array(n * n).fill();
    col_x.current = Array(n * n).fill();
    cross_x.current = 0;
    xcross_x.current = 0;
    cross_o.current = 0;
    xcross_o.current = 0;
  };
  const play = (index) => {
    if (!x_win && !o_win && !draw) {
      if (values[index] === ""){
        values[index] = player;
        order.current.push(index);
        checkWin(index);
        if (!x_win && !o_win && !draw) {
          player === "X" ? setPlayer("O") : setPlayer("X");
          console.log(player);
        }
      }
    }
  };
  const checkWin = (index) => {
    let row = 0;
    let col = 0;
    let adjustIndex = index + 1;
    if (player === "X" && !o_win) {
      if (adjustIndex % n === 0) {
        row = Math.floor(adjustIndex / n);
      } else {
        row = 1 + Math.floor(adjustIndex / n);
      }
      row_x.current.push(row);
      console.log(`row x : ${row_x}`);
      if (adjustIndex % n === 0) {
        console.log(adjustIndex % n);
        col = n;
      } else {
        col = adjustIndex % n;
      }
      col_x.current.push(col);
      console.log(`col x : ${col_x}`);
      console.log(`${row} , ${col}`);
      if (row === col) {
        cross_x.current += 1;
        console.log(cross_x);
        if (cross_x.current === n) {
          setX_win(true);
          setWin("X win");
        }
      }
      if (row + col === n + 1) {
        xcross_x.current += 1;
        console.log(xcross_x);
        if (xcross_x.current === n) {
          setX_win(true);
          setWin("X win");
        }
      }
      let count_col = col_x.current.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});
      let count_row = row_x.current.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});
      if (
        Object.values(count_col).some((value) => value === n) ||
        Object.values(count_row).some((value) => value === n)
      ) {
        setX_win(true);
        setWin("X win");
      }
    }
    if (player === "O" && !x_win) {
      if (adjustIndex % n === 0) {
        row = Math.floor(adjustIndex / n);
      } else {
        row = 1 + Math.floor(adjustIndex / n);
      }
      row_o.current.push(row);
      console.log(row_o);
      if (adjustIndex % n === 0) {
        console.log(adjustIndex % n);
        col = n;
      } else {
        col = adjustIndex % n;
      }
      console.log(`${row} , ${col}`);
      col_o.current.push(col);
      if (row === col) {
        cross_o.current += 1;
        console.log(cross_o);
        if (cross_o.current === n) {
          setO_win(true);
          setWin("O win");
        }
      }
      if (row + col === n + 1) {
        xcross_o.current += 1;
        console.log(xcross_o.current);
        if (xcross_o.current === n) {
          setO_win(true);
          setWin("O win");
        }
      }
      let count_col = col_o.current.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});
      let count_row = row_o.current.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});
      if (
        Object.values(count_col).some((value) => value === n) ||
        Object.values(count_row).some((value) => value === n)
      ) {
        setO_win(true);
        setWin("O win");
      }
    }
    if(!x_win && !o_win && !values.includes("")){
      console.log(`valuse = ${values}`)
      setDraw(true);
      setWin("Draw");
    }
  };

  return (
    <div className={`${averia.className} `}>
      <div className="bg-gradient-to-b  from-indigo-200 to-white">
        <div className="h-[50px]"></div>
      <div className="text-center  ">
        <h1 className="text-black text-[35px] ">Who will be the winner?</h1>
        <div className={`text-8xl m-4  ${noto_Sans.className} flex justify-center `}>
        {
          (!x_win && !o_win && !draw && player=="X")&&<div className="flex "><Image src={x_picture} alt="x pic" height={150} ></Image><div className="flex items-center mx-2">{player} Turn</div></div>
        }
        {
          (!x_win && !o_win && !draw && player=="O")&&<><div className="flex items-center mx-2">{player} Turn</div><Image src={o_picture} alt="o pic" height={150} ></Image></>
        }
        {
          (x_win)&&<h2 className=" animate-bounce">X win !!!</h2>
        }
        {
          (o_win)&&<h2 className=" animate-bounce">O win !!!</h2>
        }
        {
          (!x_win && !o_win && draw)&&<h2> Draw </h2>
        }</div>
      </div></div>
      <div>
      {!finished && (
        <div className={`flex justify-center text-4xl mb-4`}>
          <button
            className={`px-[10px] cursor-pointer 
              ${
                n > 3? "visible":"invisible"
              }`}
              onClick={() => setN((n) => n - 1)}
              >
            {" "}
            -{" "}
          </button>
          <h1 className={`bg-white border-1 rounded-xl py-[3px] px-[12px] `}>
            {" "}
            {n}
          </h1>
          <button
            data-ripple-light="true" data-tooltip-target="tooltip-top"
            className={`px-[10px] cursor-pointer ${
              n < 6 ? "visible" : "invisible"
            } select-none transition-all  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            onClick={() => setN((n) => n + 1)}
            >
            {" "}
            +{" "}
          </button>
        </div>
      )}
      {finished && (
        <div className={`flex justify-center text-4xl m-3`}>
          <button
            className={`px-[10px] cursor-pointer p-0.5 mx-1 rounded-xl border-1  hover:text-black hover:bg-gray-200`}
            onClick={() => reset()}
            >
            Reset
          </button>
        </div>
      )}

      <div className="flex items-center mb-3">
        <div
          className={`grid gap-1 ${n > 4 ? "size-[900px]" : "size-[600px]"}  mx-auto`} 
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
          >
          {values.map((value, index) => (
            <button
            className={`${ value === "" ? `bg-gray-300`: value === "X" ? `bg-amber-100` :  `bg-red-200` } ${ (value === ""&&player === "X" ) ? `hover:bg-amber-100` :  (value === ""&&player === "O" ) ? `hover:bg-red-200` : ""} ${nunito.className} cursor-pointer text-center text-8xl`}
            disabled={finished}
            key={index}
              onClick={() => play(index)}
            >
              {value}
            </button>
          ))}
        </div>

      </div></div>
      <div className="bg-gradient-to-b from-white to-indigo-200 ">
      <h1 className="flex justify-center items-center text-6xl p-[10px] mt-5">
        {" "}
        History
      </h1>
      {history.length == 0 && (
        
        <div className="text-center text-4xl mt-[40px] p-4 h-30">
          no history
        </div>
      )}
      {history.length > 0 && (
        <div>
          <HistoryList history={history} />
          <div className="flex justify-end"><button onClick={() => resetHistory()} className=" mb-5 object-center text-xl text-black cursor-pointer mx-3 p-1.5  rounded-xl border-1 bg-white hover:bg-amber-100 ">
            clear History
          </button></div>

        </div>
      )}
    </div>
    </div>
  );
}
const HistoryList = ({ history }) => (
  <div>
    {history.map((lists, index) => (
      <Card key={index} {...lists} />
    ))}
  </div>
);
const Card = ({ value, order, size, win }) => (
  <div className=" rounded-xl shadow-lg m-[10px] inline-block p-[10px] bg-gray-50 w-[${size*150}]">
    <h1 className="flex items-center justify-center text-3xl ">
      {win}
    </h1>
    <div>
      <div
        className={`grid gap-1 h-[${size*150}] mx-auto m-2 `}
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {JSON.parse(value).map((val, index) => (
          <div
            className={`${ val === "" ? "bg-gray-300": val === "X" ? 'bg-amber-200' :  'bg-red-300' } text-3xl  ${nunito.className} flex items-center justify-center p-2`}
            key={index}
          >
            {val}
          </div>
        ))}
      </div>
      
      
    </div> 
    <h1>{order}</h1>
    
   
  </div>);
