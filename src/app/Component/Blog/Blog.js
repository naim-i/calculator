"use client";
import React from "react";
import Container from "../Container/Container";

const Blog = () => {
  return (
    <div className="bg-[#0F0F0F] p-10 md:lg:p-24">
      <Container>
        <div>
          {/* header part */}
          <div className="text-center mb-12 :after:content-[''] after:block after:w-full after:h-2 after:bg-yellow-400 after:mx-auto after:mt-12 after:rounded-se-xl after:rounded-bl-xl">
            <h1 className="text-4xl font-bold text-yellow-400 mb-8">Blog</h1>
            <h3 className="text-2xl font-semibold text-yellow-600/95 mb-5">
              Welcome to Our Blog
            </h3>
            <p className="text-lg text-white max-w-3xl mx-auto">
              Our blog is where we break down numbers, concepts, and real-life
              decisions into easy, practical insights. Whether you want
              financial tips, math tricks, or in-depth guides on how to use our
              tools — you’ll find it here.
            </p>
          </div>
          {/* blog content */}
          <div className="space-y-16">
            {/* blog content header */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                Popular Blog Topics
              </h3>
            </div>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              • Finance Tips & Guides
            </h5>
            <span className="text-white text-lg">
              Learn how to manage loans, savings, and investments with
              confidence.
            </span>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              • Step-by-Step Calculator Tutorials
            </h5>
            <span className="text-white text-lg">
              Understand how each tool works and how to get the most accurate
              results.
            </span>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              • Everyday Math Simplified
            </h5>
            <span className="text-white">
              Quick explanations of common math problems and formulas.
            </span>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              • Productivity & Business Insights
            </h5>
            <span className="text-white text-lg">
              Articles that help entrepreneurs, students, and professionals make
              better decisions.
            </span>
            <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
              Stay Updated
            </h5>
            <span className="text-white text-lg">
              We publish fresh content regularly — bookmark this page or follow
              us to keep learning!
            </span>
            {/* blog-centent-bottom */}
            <div className="pt-12 text-center border-t-2 border-yellow-600/40 mt-16">
              <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
                Stay Updated
              </h3>
              <p className="text-xl font-regular text-yellow-600/95">
                We publish fresh content regularly — bookmark this page or
                follow us to keep learning!
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Blog;
