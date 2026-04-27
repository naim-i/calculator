import React from "react";
import HealthCalculator from "../Component/HealthCalculator/HealthCalculator";

export const metadata = {
  title: "Free Health Calculator – BMI, BMR, Body Fat & More | CalculatorRe",
  description:
    "Calculate your BMI, BMR, ideal weight, daily water intake, and body fat percentage with CalculatorRe's free Health Calculator. Supports male & female metrics.",
};

const page = () => {
  return <HealthCalculator />;
};

export default page;
