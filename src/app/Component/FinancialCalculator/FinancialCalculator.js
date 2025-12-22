"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const uid = () => Math.random().toString(36).substring(2, 10);
const formatNum = (n) =>
  Number(n).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function FinancialCalculator() {
  const [type, setType] = useState("loan");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const calculate = () => {
    if (!amount || !rate || !years) return;

    const P = Number(amount);
    const R = Number(rate) / 100;
    const Y = Number(years);
    const N = Y * 12;
    const mR = R / 12;

    let res = { title: "", data: [] };

    switch (type) {
      case "loan":
        const emi =
          mR === 0 ? P / N : (P * mR * (1 + mR) ** N) / ((1 + mR) ** N - 1);
        res = {
          title: "Loan EMI",
          data: [
            { label: "Monthly EMI", value: emi },
            { label: "Total Payment", value: emi * N },
            { label: "Total Interest", value: emi * N - P },
          ],
        };
        break;

      case "simple":
        const interest = P * R * Y;
        res = {
          title: "Simple Interest",
          data: [
            { label: "Interest", value: interest },
            { label: "Total Amount", value: P + interest },
          ],
        };
        break;

      case "compound":
        const fv = P * (1 + R) ** Y;
        res = {
          title: "Compound Interest",
          data: [
            { label: "Future Value", value: fv },
            { label: "Total Gain", value: fv - P },
          ],
        };
        break;

      case "futurevalue":
        const fv2 = P * (1 + mR) ** N;
        res = {
          title: "Future Value (Monthly)",
          data: [
            { label: "Future Value", value: fv2 },
            { label: "Gain", value: fv2 - P },
          ],
        };
        break;

      case "presentvalue":
        const pv = P / (1 + mR) ** N;
        res = {
          title: "Present Value",
          data: [{ label: "Present Value", value: pv }],
        };
        break;

      case "roi":
        const gain = P * R * Y;
        res = {
          title: "ROI",
          data: [
            { label: "Profit", value: gain },
            { label: "Total Value", value: P + gain },
          ],
        };
        break;
    }

    setResult(res);

    setHistory((prev) => [
      {
        id: uid(),
        title: res.title,
        amount: P,
        rate: Number(rate),
        years: Y,
        time: new Date().toLocaleString(),
        data: res.data,
      },
      ...prev.slice(0, 9),
    ]);

    setAmount("");
    setRate("");
    setYears("");
  };

  return (
    <div className=" bg-[#0F0F0F] p-6 flex justify-center pb-24 pt-24">
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">
        {/* LEFT SIDE - Calculator + Result */}
        <div className="space-y-10">
          {/* Title */}
          <h1 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
            Premium Financial Calculator
          </h1>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1A1A1A] border border-yellow-600/20 p-6 rounded-3xl shadow-2xl space-y-4"
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
            >
              <option value="loan">Loan EMI</option>
              <option value="simple">Simple Interest</option>
              <option value="compound">Compound Interest</option>
              <option value="futurevalue">Future Value</option>
              <option value="presentvalue">Present Value</option>
              <option value="roi">ROI</option>
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
            />

            <input
              type="number"
              placeholder="Rate (%)"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
            />

            <input
              type="number"
              placeholder="Years"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
            />

            <button
              onClick={calculate}
              className="w-full py-3 rounded-xl bg-linear-to-r from-yellow-500 to-yellow-700 text-black font-bold shadow-xl hover:opacity-90 transition"
            >
              Calculate
            </button>
          </motion.div>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121212] border border-yellow-600/30 p-6 rounded-3xl shadow-xl space-y-4"
            >
              <h2 className="text-2xl font-bold text-yellow-400">
                {result.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.data.map((d, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#1A1A1A] border border-yellow-600/20 rounded-xl text-center"
                  >
                    <p className="text-gray-400">{d.label}</p>
                    <p className="text-xl font-bold text-yellow-300">
                      {formatNum(d.value)}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* RIGHT SIDE - HISTORY */}
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
            <div className="max-h-[75vh] overflow-y-auto space-y-4 pr-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="p-4 bg-[#1A1A1A] border border-yellow-600/10 rounded-2xl"
                >
                  <div className="flex justify-between text-gray-400 text-sm mb-2">
                    <span>{h.time}</span>
                    <span className="text-yellow-400 font-bold">{h.title}</span>
                  </div>

                  <div className="text-xs flex gap-3 flex-wrap mb-3">
                    <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                      Amount: {formatNum(h.amount)}
                    </span>
                    <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                      Rate: {h.rate}%
                    </span>
                    <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                      Years: {h.years}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {h.data.map((d, i) => (
                      <div
                        key={i}
                        className="p-2 bg-[#0F0F0F] border border-yellow-600/10 rounded-lg text-sm"
                      >
                        <p className="text-gray-400">{d.label}</p>
                        <p className="font-bold text-yellow-300">
                          {formatNum(d.value)}
                        </p>
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
