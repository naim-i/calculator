"use client";
import { useState, useEffect, useRef } from "react";

export default function CompactCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [history, setHistory] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [display]);

  // Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      if (/[0-9.]/.test(e.key)) handleInput(e.key);
      if (["+", "-", "*", "/"].includes(e.key))
        handleInput(e.key.replace("*", "×").replace("/", "÷"));
      if (e.key === "Enter") {
        e.preventDefault();
        calculate();
      }
      if (e.key === "Backspace") backspace();
      if (e.key === "Escape") clearAll();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [display]);

  const handleInput = (val) => {
    if (isFinished && !["+", "-", "×", "÷"].includes(val)) {
      setDisplay(val.toString());
      setIsFinished(false);
    } else {
      setIsFinished(false);
      setDisplay(
        display === "0" && !["+", "-", "×", "÷", "(", ")"].includes(val)
          ? val.toString()
          : display + val,
      );
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setEquation("");
  };
  const backspace = () =>
    setDisplay(display.length > 1 ? display.slice(0, -1) : "0");

  const calculate = () => {
    try {
      let formula = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/√\(/g, "Math.sqrt(")
        .replace(/π/g, "Math.PI")
        .replace(/x²/g, "**2");
      const result = eval(formula);
      const resStr = Number(result.toFixed(8)).toString();
      setHistory([{ eq: display + " =", res: resStr }, ...history]);
      setEquation(display + " =");
      setDisplay(resStr);
      setIsFinished(true);
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <div className="flex py-10 items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
      {/* Container Size Adjusted */}
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-[#202020] rounded-xl overflow-hidden shadow-2xl border border-white/10 lg:h-150">
        {/* ক্যালকুলেটর মেইন পার্ট */}
        <div className="flex-[1.5] flex flex-col p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden">
          <div className="text-gray-400 text-xs font-semibold mb-2 opacity-70 uppercase tracking-widest">
            Scientific
          </div>

          {/* ডিসপ্লে সেকশন - সাইজ ছোট করা হয়েছে */}
          <div className="flex flex-col justify-end items-end h-24 sm:h-28 bg-black/40 p-4 rounded-lg mb-4 border border-white/5">
            <div className="text-gray-500 text-sm h-6 text-right w-full overflow-hidden opacity-60">
              {equation}
            </div>
            <div
              ref={scrollRef}
              className="text-4xl sm:text-5xl font-bold w-full text-right overflow-x-auto no-scrollbar whitespace-nowrap tracking-tighter"
            >
              {display}
            </div>
          </div>

          {/* বাটন লেআউট - Compact Grid */}
          <div className="grid grid-cols-4 gap-1 flex-1 min-h-0">
            {["sin(", "cos(", "tan(", "√("].map((b) => (
              <button
                key={b}
                onClick={() => handleInput(b)}
                className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-2 text-xs font-medium"
              >
                {b.replace("(", "")}
              </button>
            ))}
            <button
              onClick={() => handleInput("x²")}
              className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-2 text-xs font-medium"
            >
              x²
            </button>
            <button
              onClick={() => handleInput("π")}
              className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-2 text-xs"
            >
              π
            </button>
            <button
              onClick={() => handleInput("(")}
              className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-2 text-xs"
            >
              (
            </button>
            <button
              onClick={() => handleInput(")")}
              className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-2 text-xs"
            >
              )
            </button>

            {/* মেইন কি-প্যাড */}
            <button
              onClick={clearAll}
              className="bg-red-600/20 text-red-500 hover:bg-red-600/30 font-bold rounded-md py-3 text-xs"
            >
              C
            </button>
            <button
              onClick={backspace}
              className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-3 font-bold text-orange-500 text-sm"
            >
              ⌫
            </button>
            <button
              onClick={() => handleInput("÷")}
              className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-3 text-lg font-light"
            >
              ÷
            </button>
            <button
              onClick={() => handleInput("×")}
              className="bg-[#2a2a2a] hover:bg-[#333] rounded-md py-3 text-lg font-light"
            >
              ×
            </button>

            {[7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => handleInput(n)}
                className="bg-[#3b3b3b] hover:bg-[#4a4a4a] text-lg font-semibold rounded-md py-3 transition-colors"
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => handleInput(".")}
              className="bg-[#3b3b3b] hover:bg-[#4a4a4a] text-lg rounded-md py-3"
            >
              .
            </button>
            <button
              onClick={() => handleInput(0)}
              className="bg-[#3b3b3b] hover:bg-[#4a4a4a] text-lg font-semibold rounded-md py-3"
            >
              0
            </button>
            <button
              onClick={calculate}
              className="bg-orange-500 hover:bg-orange-600 text-black text-xl font-bold col-span-2 rounded-md shadow-lg"
            >
              =
            </button>
          </div>
        </div>

        {/* হিস্ট্রি প্যানেল */}
        <div className="w-full lg:w-72 bg-[#181818] p-4 flex flex-col h-40 lg:h-full overflow-hidden">
          <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
            <h3 className="text-gray-400 font-bold text-lg uppercase tracking-widest">
              History
            </h3>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-red-400 text-lg hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
            {history.length === 0 ? (
              <p className="text-gray-600 italic text-lg text-center mt-10">
                No history available
              </p>
            ) : (
              history.map((h, i) => (
                <div
                  key={i}
                  className="text-right cursor-pointer group"
                  onClick={() => {
                    setDisplay(h.res);
                    setIsFinished(true);
                  }}
                >
                  <p className="text-gray-500 text-lg mb-0.5 truncate">
                    {h.eq}
                  </p>
                  <p className="text-2xl font-bold text-white group-hover:text-orange-500 transition-all tracking-tighter">
                    {h.res}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
