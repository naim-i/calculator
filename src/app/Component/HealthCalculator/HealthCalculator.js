"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const uid = () => Math.random().toString(36).substring(2, 10);
const formatNum = (n, decimals = 2) =>
  (Number.isFinite(n) ? Number(n).toFixed(decimals) : "0.00");

export default function HealthCalculator() {
  const [type, setType] = useState("bmi");
  const [weight, setWeight] = useState(""); // kg
  const [height, setHeight] = useState(""); // cm
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");
  const [activity, setActivity] = useState("1.2"); // BMR multiplier
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  // Calculations
  const calcBMI = (w, hCm) => {
    const h = hCm / 100;
    if (h <= 0) return null;
    const bmi = w / (h * h);
    const category =
      bmi < 18.5
        ? "Underweight"
        : bmi < 25
        ? "Normal"
        : bmi < 30
        ? "Overweight"
        : "Obese";
    return { bmi, category };
  };

  // Mifflin-St Jeor BMR
  const calcBMR = (w, hCm, a, s) => {
    const h = hCm;
    const genderFactor = s === "male" ? 5 : -161;
    const bmr = 10 * w + 6.25 * h - 5 * a + genderFactor;
    return bmr;
  };

  const calcIdealWeightRange = (hCm) => {
    const h = hCm / 100;
    const low = 18.5 * h * h;
    const high = 24.9 * h * h;
    return { low, high };
  };

  const calcWaterIntake = (w) => {
    // simple rule: 35 ml per kg body weight
    return w * 35; // ml
  };

  const calcBodyFatEstimate = (bmi, ageVal, s) => {
    // Simple estimate (Deurenberg formula)
    // bodyfat% = 1.20 * BMI + 0.23 * age - 10.8 * sex - 5.4
    // sex: 1 for male, 0 for female -> 10.8 * sex
    const sexFactor = s === "male" ? 1 : 0;
    return 1.2 * bmi + 0.23 * ageVal - 10.8 * sexFactor - 5.4;
  };

  const calculate = () => {
    const w = Number(weight);
    const h = Number(height);
    const a = Number(age);
    if (
      (type === "bmi" && (!w || !h)) ||
      (type === "bmr" && (!w || !h || !a)) ||
      (type === "ideal" && !h) ||
      (type === "water" && !w) ||
      (type === "bodyfat" && (!w || !h || !a))
    ) {
      return;
    }

    let out = { title: "", data: [] };

    if (type === "bmi") {
      const { bmi, category } = calcBMI(w, h);
      out.title = "Body Mass Index (BMI)";
      out.data = [
        { label: "BMI", value: formatNum(bmi, 2) },
        { label: "Category", value: category },
      ];
    }

    if (type === "bmr") {
      const bmr = calcBMR(w, h, a, sex);
      const calories = bmr * Number(activity);
      out.title = "Basal Metabolic Rate (BMR) & Daily Calories";
      out.data = [
        { label: "BMR (kcal/day)", value: Math.round(bmr) },
        { label: "Estimated Daily Calories", value: Math.round(calories) },
        { label: "Activity Level", value: activityLabel(activity) },
      ];
    }

    if (type === "ideal") {
      const { low, high } = calcIdealWeightRange(h);
      out.title = "Ideal Weight Range (BMI 18.5–24.9)";
      out.data = [
        { label: "Lower (kg)", value: formatNum(low, 2) },
        { label: "Upper (kg)", value: formatNum(high, 2) },
      ];
    }

    if (type === "water") {
      const ml = calcWaterIntake(w);
      out.title = "Daily Water Intake";
      out.data = [
        { label: "Recommended (ml/day)", value: Math.round(ml) },
        { label: "Recommended (L/day)", value: formatNum(ml / 1000, 2) },
      ];
    }

    if (type === "bodyfat") {
      const { bmi } = calcBMI(w, h);
      const bf = calcBodyFatEstimate(bmi, a, sex);
      out.title = "Estimated Body Fat % (Deurenberg)";
      out.data = [
        { label: "Body Fat %", value: formatNum(bf, 2) },
        { label: "BMI used", value: formatNum(bmi, 2) },
      ];
    }

    setResult(out);

    setHistory((prev) => [
      {
        id: uid(),
        title: out.title,
        type,
        weight: w,
        height: h,
        age: a || null,
        sex,
        activity,
        time: new Date().toLocaleString(),
        data: out.data,
      },
      ...prev.slice(0, 9),
    ]);

    // Clear inputs for better UX (keeps sex & activity)
    setWeight("");
    setHeight("");
    setAge("");
  };

  function activityLabel(val) {
    switch (val) {
      case "1.2":
        return "Sedentary";
      case "1.375":
        return "Lightly active";
      case "1.55":
        return "Moderately active";
      case "1.725":
        return "Very active";
      case "1.9":
        return "Extra active";
      default:
        return "Custom";
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] p-6 flex justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-8">

        {/* LEFT SIDE - Calculators + Result */}
        <div className="space-y-8">
          {/* Title */}
          <h1 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
            Premium Health Calculator
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
              <option value="bmi">BMI</option>
              <option value="bmr">BMR (Calories)</option>
              <option value="ideal">Ideal Weight Range</option>
              <option value="water">Daily Water Intake</option>
              <option value="bodyfat">Body Fat % (Estimate)</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
              <input
                type="number"
                placeholder="Age (years)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
              />

              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#121212] border border-yellow-600/20 text-yellow-300"
              >
                <option value="1.2">Sedentary</option>
                <option value="1.375">Lightly active</option>
                <option value="1.55">Moderately active</option>
                <option value="1.725">Very active</option>
                <option value="1.9">Extra active</option>
              </select>
            </div>

            <button
              onClick={calculate}
              className="w-full py-3 rounded-xl bg-linear-to-r from-yellow-500 to-yellow-700 text-black font-bold shadow-xl hover:opacity-90 transition"
            >
              Calculate
            </button>
          </motion.div>

          {/* Result */}
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
                  <div className="flex justify-between text-gray-100 text-sm mb-2">
                    <span>{h.time}</span>
                    <span className="text-yellow-400 font-bold">{h.title}</span>
                  </div>

                  <div className="text-xs flex gap-2 flex-wrap mb-3">
                    {h.weight !== null && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Weight: {h.weight} kg
                      </span>
                    )}
                    {h.height !== null && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Height: {h.height} cm
                      </span>
                    )}
                    {h.age !== null && (
                      <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                        Age: {h.age}
                      </span>
                    )}
                    <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                      Sex: {h.sex}
                    </span>
                    <span className="px-2 py-1 bg-[#121212] border border-yellow-600/20 rounded-lg text-gray-100">
                      Activity: {activityLabel(h.activity)}
                    </span>
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

