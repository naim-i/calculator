"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../Container/Container";

export default function Calculator() {
  const [value, setValue] = useState("0");
  const [history, setHistory] = useState([]);

  const append = (val) => {
    setValue((prev) => (prev === "0" ? val : prev + val));
  };

  const calculate = () => {
    try {
      let expr = value
        .replace(/sin/gi, "Math.sin")
        .replace(/cos/gi, "Math.cos")
        .replace(/tan/gi, "Math.tan")
        .replace(/sqrt/gi, "Math.sqrt")
        .replace(/\^/g, "**");

      const result = Function(`return ${expr}`)();
      setHistory((prev) => [...prev, `${value} = ${result}`]);
      setValue(String(result));
    } catch {
      setValue("Error");
    }
  };

  const clear = () => setValue("0");

  const backspace = () =>
    setValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));

  const scientificOps = [
    { label: "sin", fn: () => setValue(`sin(${value})`) },
    { label: "cos", fn: () => setValue(`cos(${value})`) },
    { label: "tan", fn: () => setValue(`tan(${value})`) },
    { label: "√", fn: () => setValue(`sqrt(${value})`) },
    { label: "x²", fn: () => setValue(`(${value})^2`) },
    { label: "π", fn: () => append("3.1415926535") },
    { label: "e", fn: () => append("2.7182818284") },
  ];

  const numpad = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "+",
    "=",
  ];

  return (
    <>
      <div className="bg-[#0F0F0F]">
        <Container>
          <div className=" h-2/4 flex items-center justify-center lg:py-20 px-3 lg:px-0 py-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Calculator UI */}
              <div className="md:col-span-2 backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl">
                <div className="text-white text-3xl font-light text-right mb-6 p-4 bg-black/30 rounded-2xl border border-white/10 overflow-x-auto whitespace-nowrap scrollbar-hide">
                  {value}
                </div>

                {/* Scientific Buttons */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {scientificOps.map((op, i) => (
                    <button
                      key={i}
                      onClick={op.fn}
                      className="p-3 text-sm rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-white border border-white/20 shadow"
                    >
                      {op.label}
                    </button>
                  ))}
                </div>

                {/* Controls */}
                <div className="grid grid-cols-4 gap-3 mb-4 text-xl font-semibold">
                  <button
                    onClick={clear}
                    className="col-span-2 bg-red-500 hover:bg-red-600 text-white p-4 rounded-2xl shadow-lg"
                  >
                    C
                  </button>
                  <button
                    onClick={backspace}
                    className="col-span-2 bg-yellow-400 hover:bg-yellow-500 p-4 rounded-2xl shadow-lg"
                  >
                    ⌫
                  </button>
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-4 gap-3">
                  {numpad.map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => (btn === "=" ? calculate() : append(btn))}
                      className="p-4 rounded-2xl text-xl font-semibold bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 shadow-lg"
                    >
                      {btn}
                    </button>
                  ))}
                </div>
              </div>

              {/* History Panel */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-2xl h-full max-h-150 overflow-y-auto text-white">
                <h2 className="text-2xl font-semibold mb-4">History</h2>
                <ul className="space-y-2 text-lg">
                  {history.length === 0 && (
                    <p className="text-gray-300">No history yet</p>
                  )}
                  {history.map((item, idx) => (
                    <li
                      key={idx}
                      className="p-3 bg-white/10 border border-white/10 rounded-xl shadow"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    </>
  );
}
