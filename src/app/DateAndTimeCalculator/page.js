import React from 'react'
import DateAndTimeCalculator from '../Component/DateAndTimeCalculator/DateAndTimeCalculator'

export const metadata = {
  title: "Age Calculator – Calculate Age from Birthdate | CalculatorRe",
  description:
    "Calculate your exact age from your birthdate in years, months, and days with CalculatorRe's free Age Calculator. Fast, accurate, and easy to use online.",
};

const page = () => {
  return (
    <DateAndTimeCalculator/>
  )
}

export default page