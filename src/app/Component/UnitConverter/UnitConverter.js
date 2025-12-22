"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const categories = {
  length: {
    label: "Length",
    emoji: "📏",
    units: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      foot: 3.28084,
      inch: 39.3701,
    },
  },

  weight: {
    label: "Weight",
    emoji: "⚖️",
    units: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
    },
  },

  temperature: {
    label: "Temperature",
    emoji: "🌡️",
    units: {
      celsius: "C",
      fahrenheit: "F",
      kelvin: "K",
    },
  },
};

export default function UltraUnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const convertTemp = (value, from, to) => {
    let c =
      from === "celsius"
        ? value
        : from === "fahrenheit"
        ? (value - 32) * (5 / 9)
        : value - 273.15;

    return to === "celsius"
      ? c
      : to === "fahrenheit"
      ? c * (9 / 5) + 32
      : c + 273.15;
  };

  const convert = () => {
    if (!value) return;

    let output;

    if (category === "temperature") {
      output = convertTemp(parseFloat(value), fromUnit, toUnit).toFixed(3);
    } else {
      const base = value / categories[category].units[fromUnit];
      output = (base * categories[category].units[toUnit]).toFixed(3);
    }

    setResult(output);

    setHistory([
      {
        cat: category,
        from: fromUnit,
        to: toUnit,
        value,
        result: output,
      },
      ...history,
    ]);
  };

  const swap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const clearHistory = () => setHistory([]);

  return (
    <>
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-black">
        <div className="max-w-5xl mx-auto p-6 ">
          {/* Main Box */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl shadow-2xl p-10 rounded-3xl border border-white/20"
          >
            <h1 className="text-4xl font-bold text-white text-center mb-8">
              Unit Converter 🔥
            </h1>

            {/* Category Selector */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {Object.keys(categories).map((key) => (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  key={key}
                  onClick={() => {
                    setCategory(key);
                    const firstUnit = Object.keys(categories[key].units)[0];
                    setFromUnit(firstUnit);
                    setToUnit(firstUnit);
                  }}
                  className={`p-4 rounded-xl text-white font-semibold
                         transition border ${
                           category === key
                             ? "bg-white/20 border-white"
                             : "bg-white/10 border-transparent"
                         }`}
                >
                  <span className="text-2xl">{categories[key].emoji}</span>
                  <p>{categories[key].label}</p>
                </motion.button>
              ))}
            </div>

            {/* Unit Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-white">
                <label className="font-semibold">From Unit</label>
                <select
                  className="w-full p-3 mt-2 bg-white/20 rounded-xl outline-none"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                >
                  {Object.keys(categories[category].units).map((u) => (
                    <option key={u} value={u} className="text-black">
                      {u.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-white">
                <label className="font-semibold">To Unit</label>
                <select
                  className="w-full p-3 mt-2 bg-white/20 rounded-xl outline-none"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                >
                  {Object.keys(categories[category].units).map((u) => (
                    <option key={u} value={u} className="text-black">
                      {u.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center mt-5">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={swap}
                className="bg-yellow-400 px-6 py-2 rounded-xl font-bold shadow-md"
              >
                ⇅ Swap
              </motion.button>
            </div>

            {/* Value Input */}
            <div className="mt-6">
              <label className="text-white font-semibold">Enter Value</label>
              <input
                type="number"
                className="w-full p-4 mt-2 rounded-xl bg-white/20 text-white outline-none"
                placeholder="Enter number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            {/* Convert */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={convert}
              className="w-full mt-8 bg-green-500 hover:bg-green-600text-white text-lg py-3 rounded-xl font-bold"
            >
              Convert
            </motion.button>

            {/* Result Display */}
            {result && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mt-6 bg-white/20 p-4 rounded-xl text-center text-white text-2xl font-bold"
              >
                Result: {result}
              </motion.div>
            )}
          </motion.div>

          {/* History Panel */}
          <div className="mt-10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">History</h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-red-400 font-semibold hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <p className="text-white/60">No history yet.</p>
            ) : (
              <ul className="space-y-3">
                {history.map((item, idx) => (
                  <li
                    key={idx}
                    className="bg-white/20 p-3 rounded-xl text-white flex justify-between"
                  >
                    <span>
                      {item.value} {item.from.toUpperCase()} →{" "}
                      {item.to.toUpperCase()}
                    </span>
                    <strong>= {item.result}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
