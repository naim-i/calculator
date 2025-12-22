"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const uid = () => Math.random().toString(36).substring(2, 10);

export default function DateAndTimeCalculator() {
  const [type, setType] = useState("dateDiff");
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Format helpers
  const format = (val) => (Number.isFinite(val) ? val : 0);

  const calculate = () => {
    let out = { title: "", data: [] };

    // --- DATE DIFFERENCE ---
    if (type === "dateDiff") {
      if (!date1 || !date2) return;

      const d1 = new Date(date1);
      const d2 = new Date(date2);

      let diffMs = Math.abs(d2 - d1);
      let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      out.title = "Date Difference";
      out.data = [{ label: "Days", value: diffDays }];
    }

    // --- DATETIME DIFFERENCE ---
    if (type === "datetimeDiff") {
      if (!date1 || !date2 || !time1 || !time2) return;

      const d1 = new Date(`${date1}T${time1}`);
      const d2 = new Date(`${date2}T${time2}`);

      let diffMs = Math.abs(d2 - d1);
      let seconds = Math.floor(diffMs / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      out.title = "Date-Time Difference";
      out.data = [
        { label: "Days", value: days },
        { label: "Hours", value: hours % 24 },
        { label: "Minutes", value: minutes % 60 },
        { label: "Seconds", value: seconds % 60 },
      ];
    }

    // --- ADD DAYS ---
    if (type === "addDays") {
      if (!date1 || !value) return;
      const d = new Date(date1);
      d.setDate(d.getDate() + Number(value));
      out.title = "Add Days";
      out.data = [
        { label: "Result Date", value: d.toLocaleString() },
      ];
    }

    // --- ADD HOURS ---
    if (type === "addHours") {
      if (!date1 || !time1 || !value) return;
      const d = new Date(`${date1}T${time1}`);
      d.setHours(d.getHours() + Number(value));
      out.title = "Add Hours";
      out.data = [{ label: "Result", value: d.toLocaleString() }];
    }

    // --- ADD MINUTES ---
    if (type === "addMinutes") {
      if (!date1 || !time1 || !value) return;
      const d = new Date(`${date1}T${time1}`);
      d.setMinutes(d.getMinutes() + Number(value));
      out.title = "Add Minutes";
      out.data = [{ label: "Result", value: d.toLocaleString() }];
    }

    // --- ADD SECONDS ---
    if (type === "addSeconds") {
      if (!date1 || !time1 || !value) return;
      const d = new Date(`${date1}T${time1}`);
      d.setSeconds(d.getSeconds() + Number(value));
      out.title = "Add Seconds";
      out.data = [{ label: "Result", value: d.toLocaleString() }];
    }

    setResult(out);

    // Save to history
    setHistory((prev) => [
      {
        id: uid(),
        title: out.title,
        input: { date1, date2, time1, time2, value, type },
        data: out.data,
        time: new Date().toLocaleString(),
      },
      ...prev.slice(0, 9),
    ]);

    // Clear inputs
    setDate1("");
    setDate2("");
    setTime1("");
    setTime2("");
    setValue("");
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] p-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">

        {/* LEFT SIDE */}
        <div className="space-y-8">
          <h1 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
            Date & Time Calculator
          </h1>

          {/* MAIN CARD */}
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
              <option value="dateDiff">Date Difference</option>
              <option value="datetimeDiff">Date-Time Difference</option>
              <option value="addDays">Add Days</option>
              <option value="addHours">Add Hours</option>
              <option value="addMinutes">Add Minutes</option>
              <option value="addSeconds">Add Seconds</option>
            </select>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input
                type="date"
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="p-3 rounded-xl bg-[#454545] border border-yellow-600/20 text-yellow-300"
              />
              {(type === "dateDiff" ||
                type === "datetimeDiff") && (
                <input
                  type="date"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="p-3 rounded-xl bg-[#454545] border border-yellow-600/20 text-yellow-300"
                />
              )}
            </div>

            {/* Time fields */}
            {(type === "datetimeDiff" ||
              type === "addHours" ||
              type === "addMinutes" ||
              type === "addSeconds") && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="time"
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  className="p-3 rounded-xl bg-[#454545] border border-yellow-600/20 text-yellow-300"
                />
                {type === "datetimeDiff" && (
                  <input
                    type="time"
                    value={time2}
                    onChange={(e) => setTime2(e.target.value)}
                    className="p-3 rounded-xl bg-[#454545] border border-yellow-600/20 text-yellow-300"
                  />
                )}
              </div>
            )}

            {/* Add/subtract number */}
            {(type === "addDays" ||
              type === "addHours" ||
              type === "addMinutes" ||
              type === "addSeconds") && (
              <input
                type="number"
                placeholder="Value"
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
              className="bg-[#121212] border border-yellow-600/30 p-6 rounded-3xl shadow-xl space-y-4"
            >
              <h2 className="text-2xl font-bold text-yellow-400">
                {result.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.data.map((d, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#1A1A1A] border border-yellow-600/20 rounded-xl"
                  >
                    <p className="text-gray-400">{d.label}</p>
                    <p className="text-xl font-bold text-yellow-300">
                      {d.value}
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
                    <span className="text-yellow-400 font-bold">
                      {h.title}
                    </span>
                  </div>

                  <div className="text-xs flex gap-2 flex-wrap mb-3">
                    {h.input.date1 && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Date 1: {h.input.date1}
                      </span>
                    )}

                    {h.input.date2 && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Date 2: {h.input.date2}
                      </span>
                    )}

                    {h.input.time1 && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Time 1: {h.input.time1}
                      </span>
                    )}
                    {h.input.time2 && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Time 2: {h.input.time2}
                      </span>
                    )}

                    {h.input.value && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg">
                        Value: {h.input.value}
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
                        <p className="font-bold text-yellow-300">
                          {d.value}
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
