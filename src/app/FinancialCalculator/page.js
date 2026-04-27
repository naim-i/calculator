import React from "react";
import FinancialCalculator from "../Component/FinancialCalculator/FinancialCalculator";

export const metadata = {
  title: "Free Financial Calculator – EMI, Interest, ROI & More | CalculatorRe",
  description:
    "Calculate loan EMI, simple & compound interest, future value, present value, and ROI with CalculatorRe's free Financial Calculator. Fast, accurate & easy to use.",
};

const page = () => {
  return (
    <>
      <FinancialCalculator />
    </>
  );
};

export default page;
