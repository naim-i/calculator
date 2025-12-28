import React from "react";
import Container from "../Container/Container";
import Flex from "../Flex/Flex";

const About = () => {
  return (
    <>
      <div className="bg-[#0F0F0F] p-10 md:lg:p-24">
        <Container>
          <div>
            {/* About header */}
            <div className="text-center mb-12 :after:content-[''] after:block after:w-full after:h-2 after:bg-yellow-400 after:mx-auto after:mt-12 after:rounded-se-xl after:rounded-bl-xl">
              <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
                Who We Are
              </h1>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Welcome to [Your Website Name] — your trusted source for clear,
                reliable, and easy-to-use online calculators. Our mission is to
                simplify decision-making by giving you fast and accurate answers
                in just a few clicks.
              </p>
            </div>
            {/* About content */}
            <div>
                {/* About content one */}
              <div className="max-w-md">
                <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
                  Our Mission
                </h5>
                <p className="text-white">
                  We believe that everyone should have access to powerful
                  digital tools that make everyday tasks simple. Whether you’re
                  doing homework, planning finances, or making a business
                  decision, we’re here to help.
                </p>
              </div>
              {/* About content two */}
              <Flex className="justify-end">
                <div className="max-w-md">
                  <h5 className="text-xl font-medium text-yellow-400 mb-2 mt-12">
                    What Makes Us Different
                  </h5>
                  <p className="text-white">
                    • A growing library of calculators across multiple
                    categories
                  </p>
                  <p className="text-white">
                    • Designed by professionals for accuracy and usability
                  </p>
                  <p className="text-white">
                    • Constantly updated based on user feedback
                  </p>
                  <p className="text-white">
                    • Secure, ad-friendly, and accessible on any device
                  </p>
                </div>
              </Flex>

              {/* About bottom */}
              <div className="pt-12 text-center border-t-2 border-yellow-600/40 mt-16">
                <h5 className="text-xl font-medium text-yellow-400 mb-2">
                  Our Vision
                </h5>
                <p className="text-yellow-600/95 text-lg">
                  To become the world’s most trusted hub for online calculators
                  — helping millions solve real-life problems instantly.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default About;
