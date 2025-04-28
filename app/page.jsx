"use client";
import Image from "next/image";
import Link from "next/link";
import table from "../public/tableRed.jpg";
import { Averia_Serif_Libre } from "next/font/google";
import o_picture from "../public/maru.png";
import x_picture from "../public/butsu.png";
import { useState } from "react";
const averia = Averia_Serif_Libre({
  subsets: ["latin"],
  weight: "300",
});
export default function Home() {
  const text =
    "Tic Tac Toe ----- Tic Tac Toe ----- Tic Tac Toe ----- Tic Tac Toe ----- Tic Tac Toe ----- Tic Tac Toe ----- ";
  const chars = text.split("");
  const [click, setClick] = useState(false);
  return (
    <div
      className={`flex justify-center items-start relative ${averia.className} m-2.5`}
    >
      <div className="absolute h-[750px] w-[750px] animate-spin360 pointer-events-none ">
        {chars.map((char, i) => {
          const angle = (360 / chars.length) * i;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 text-[2em] "
              style={{
                transform: `rotate(${angle}deg) translate(375px)  rotate(90deg)`,
                transformOrigin: "0 0",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-[150px]">
        <div className="relative w-[350px] ">
          <h1 className="text-5xl text-center ">Your Turn</h1>
          {click && (
            <Image
              onClick={() => setClick((t) => !t)}
              src={o_picture}
              alt="O"
              width={350}
              className="mx-auto cursor-pointer"
            ></Image>
          )}
          {!click && (
            <Image
              onClick={() => setClick((t) => !t)}
              src={x_picture}
              alt="X"
              width={350}
              className="mx-auto cursor-pointer"
            ></Image>
          )}

          <Link
            href="/game"
            className={` text-black hover:text-gray-500 flex justify-center items-center ${averia.className}  font-normal text-6xl cursor-pointer`}
          >
            Play
          </Link>
        </div>
      </div>
    </div>
  );
}
