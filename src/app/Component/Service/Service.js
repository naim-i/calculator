import React from "react";
import Container from "../Container/Container";

const Service = () => {
  return (
    <>
      <div className="bg-[#0F0F0F] p-10 md:lg:p-24 ">
        <Container>
          {/* Service header */}
          <div className="text-center mb-12 :after:content-[''] after:block after:w-full after:h-2 after:bg-yellow-400 after:mx-auto after:mt-12 after:rounded-se-xl after:rounded-bl-xl">
            <h1 className="text-4xl font-bold text-yellow-400 mb-8">
              Our Services
            </h1>
            <p className="text-lg text-white max-w-3xl mx-auto">
              At Our Website, we provide a wide range of fast, accurate, and
              user-friendly online calculators designed to help you make smarter
              decisions with ease.
            </p>
          </div>
          {/* Service content */}
          <div>
            {/* Service content header */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                What We Offer
              </h3>
            </div>

            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              ✓ Financial Calculators
            </h5>
            <p className="text-white text-lg">• Loan & Mortgage Calculators</p>
            <p className="text-white text-lg">• Budgeting Tools</p>
            <p className="text-white text-lg">• Investment & ROI Calculators</p>
            <p className="text-white text-lg">• Savings & Interest Tools</p>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              ✓ Math & Conversion Tools
            </h5>
            <p className="text-white text-lg">
              • Algebra & Geometry Calculators
            </p>
            <p className="text-white text-lg">
              • Unit Converters (length, weight, temperature, etc.)
            </p>
            <p className="text-white text-lg">
              • Percentage & Ratio Calculators
            </p>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              ✓ Health & Fitness Calculators
            </h5>
            <p className="text-white text-lg">• BMI Calculator</p>
            <p className="text-white text-lg">• Calorie Intake Estimator</p>
            <p className="text-white text-lg">• Heart Rate Calculator</p>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              ✓ Business & Productivity Tools
            </h5>
            <p className="text-white text-lg">• Profit Margin Calculator</p>
            <p className="text-white text-lg">• Time Tracking Converters</p>
            <p className="text-white text-lg">• Invoice & Tax Calculators</p>
            {/* service content bottom */}
            <div className="pt-12 text-center border-t-2 border-yellow-600/40 mt-16">
              <h5 className="text-xl font-medium text-yellow-400 mb-2">
                Why Choose Us?
              </h5>
              <p className="text-yellow-600/95 text-lg"> Instant results</p>
              <p className="text-yellow-600/95 text-lg">
                {" "}
                Accurate calculations
              </p>
              <p className="text-yellow-600/95 text-lg">
                {" "}
                Clean, simple interface
              </p>
              <p className="text-yellow-600/95 text-lg"> 100% free to use</p>
              <p className="text-yellow-600/95 text-lg"> No sign-up required</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Service;
