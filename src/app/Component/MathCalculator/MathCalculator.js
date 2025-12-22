"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const uid = () => Math.random().toString(36).substring(2, 9);

export default function MathCalculator() {
  const [type, setType] = useState("add");
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Factorial
  const factorial = (n) => {
    let r = 1;
    for (let i = 2; i <= n; i++) r *= i;
    return r;
  };

  const calculate = () => {
    let output = { title: "", data: [] };
    const x = Number(num1);
    const y = Number(num2);
    const v = Number(value);

    switch (type) {
      case "add":
        output = {
          title: "Addition",
          data: [{ label: "Result", value: x + y }],
        };
        break;

      case "subtract":
        output = {
          title: "Subtraction",
          data: [{ label: "Result", value: x - y }],
        };
        break;

      case "multiply":
        output = {
          title: "Multiplication",
          data: [{ label: "Result", value: x * y }],
        };
        break;

      case "divide":
        output = {
          title: "Division",
          data: [{ label: "Result", value: y !== 0 ? x / y : "Error" }],
        };
        break;

      case "percent":
        output = {
          title: "Percentage",
          data: [{ label: `${x}% of ${y}`, value: (x / 100) * y }],
        };
        break;

      case "power":
        output = {
          title: "Power",
          data: [{ label: `${x}^${y}`, value: x ** y }],
        };
        break;

      case "sqrt":
        output = {
          title: "Square Root",
          data: [{ label: `√${x}`, value: Math.sqrt(x) }],
        };
        break;

      case "log10":
        output = {
          title: "Log Base 10",
          data: [{ label: `log10(${x})`, value: Math.log10(x) }],
        };
        break;

      case "ln":
        output = {
          title: "Natural Logarithm",
          data: [{ label: `ln(${x})`, value: Math.log(x) }],
        };
        break;

      case "abs":
        output = {
          title: "Absolute Value",
          data: [{ label: `|${x}|`, value: Math.abs(x) }],
        };
        break;

      case "round":
        output = {
          title: "Round",
          data: [{ label: `round(${x})`, value: Math.round(x) }],
        };
        break;

      case "floor":
        output = {
          title: "Floor",
          data: [{ label: `floor(${x})`, value: Math.floor(x) }],
        };
        break;

      case "ceil":
        output = {
          title: "Ceil",
          data: [{ label: `ceil(${x})`, value: Math.ceil(x) }],
        };
        break;

      case "factorial":
        output = {
          title: "Factorial",
          data: [{ label: `${x}!`, value: factorial(x) }],
        };
        break;

      case "random":
        output = {
          title: "Random Number",
          data: [
            {
              label: `Random (0-${v})`,
              value: Math.floor(Math.random() * (v + 1)),
            },
          ],
        };
        break;

      default:
        break;
    }

    setResult(output);

    setHistory((prev) => [
      {
        id: uid(),
        title: output.title,
        inputs: { num1, num2, value, type },
        data: output.data,
        time: new Date().toLocaleString(),
      },
      ...prev.slice(0, 20),
    ]);

    setNum1("");
    setNum2("");
    setValue("");
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] p-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
            Math Calculator
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border border-yellow-600/20 p-6 rounded-3xl shadow-2xl space-y-4"
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
            >
              <option value="add">Addition</option>
              <option value="subtract">Subtraction</option>
              <option value="multiply">Multiplication</option>
              <option value="divide">Division</option>
              <option value="percent">Percentage</option>
              <option value="power">Power (xⁿ)</option>
              <option value="sqrt">Square Root</option>
              <option value="log10">Log Base 10</option>
              <option value="ln">Natural Log</option>
              <option value="abs">Absolute Value</option>
              <option value="round">Round</option>
              <option value="floor">Floor</option>
              <option value="ceil">Ceil</option>
              <option value="factorial">Factorial</option>
              <option value="random">Random Number</option>
            </select>

            {/* FIRST NUMBER */}
            <input
              type="number"
              placeholder="Number 1"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
            />

            {/* SECOND NUMBER or VALUE */}
            {type !== "sqrt" &&
              type !== "ln" &&
              type !== "log10" &&
              type !== "abs" &&
              type !== "round" &&
              type !== "floor" &&
              type !== "ceil" &&
              type !== "factorial" &&
              type !== "random" && (
                <input
                  type="number"
                  placeholder="Number 2"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
                />
              )}

            {type === "random" && (
              <input
                type="number"
                placeholder="Max value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
              />
            )}

            <button
              onClick={calculate}
              className="w-full py-3 rounded-xl bg-linear-to-r from-yellow-500 to-yellow-700 text-black font-bold shadow-xl hover:opacity-90 transition"
            >
              Calculate
            </button>
          </motion.div>

          {/* RESULT */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121212] border border-yellow-700/30 p-6 rounded-3xl shadow-xl space-y-4"
            >
              <h2 className="text-2xl font-bold text-yellow-400">
                {result.title}
              </h2>

              {result.data.map((d, i) => (
                <div
                  key={i}
                  className="p-4 bg-[#1A1A1A] border border-yellow-600/20 rounded-xl"
                >
                  <p className="text-gray-400">{d.label}</p>
                  <p className="text-xl font-bold text-yellow-300">{d.value}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* RIGHT SIDE HISTORY */}
        <div className="bg-[#121212] border border-yellow-600/20 p-6 rounded-3xl shadow-xl h-fit sticky top-8 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-yellow-400">History</h2>
            <button
              onClick={() => setHistory([])}
              className="text-red-400 text-sm hover:underline"
            >
              Clear All
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-gray-500">No history yet.</p>
          ) : (
            <div className="max-h-[80vh] overflow-y-auto space-y-4 pr-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="p-4 bg-[#1A1A1A] border border-yellow-600/10 rounded-2xl"
                >
                  <div className="flex justify-between text-gray-400 text-sm mb-2">
                    <span>{h.time}</span>
                    <span className="text-yellow-400 font-bold">{h.title}</span>
                  </div>

                  <div className="text-xs flex gap-2 flex-wrap mb-3">
                    {h.inputs.num1 && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Num1: {h.inputs.num1}
                      </span>
                    )}

                    {h.inputs.num2 && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Num2: {h.inputs.num2}
                      </span>
                    )}

                    {h.inputs.value && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg">
                        Value: {h.inputs.value}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {h.data.map((d, i) => (
                      <div
                        key={i}
                        className="p-2 bg-[#0F0F0F] border border-yellow-600/10 rounded-lg text-sm"
                      >
                        <p className="text-gray-400">{d.label}</p>
                        <p className="font-bold text-yellow-300">{d.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
