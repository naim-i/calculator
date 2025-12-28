import React from "react";
import Container from "../Container/Container";
import Flex from "../Flex/Flex";

const Contact = () => {
  return (
    <>
      <div className="bg-[#0F0F0F] p-10 md:lg:p-24">
        <Container>
          <div>
            {/* Contact header */}
            <div className="text-center mb-12 :after:content-[''] after:block after:w-full after:h-2 after:bg-yellow-400 after:mx-auto after:mt-12 after:rounded-se-xl after:rounded-bl-xl">
              <h1 className="text-yellow-400 text-4xl font-bold">
                {" "}
                We’d Love to Hear From You
              </h1>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Have questions, feedback, or suggestions? Our team is here to
                help!
              </p>
            </div>
            {/* Contact content */}
            <div>
              {/* Contact content One */}
              <div className="max-w-md">
                <h5 className="text-yellow-400 text-xl font-bold">
                  Contact Information
                </h5>
                <p className="text-white ">Email: support@[yourwebsite].com</p>
              </div>
              {/* Contact content Two */}
              <Flex className="justify-end">
                <div className="max-w-md">
                  <h5 className="text-yellow-400 text-xl font-bold mt-12">
                    Feedback & Suggestions
                  </h5>
                  <p className="text-white">
                    Tell us which calculators you’d like us to create next! We
                    value user suggestions and often build features directly
                    from your ideas.
                  </p>
                </div>
              </Flex>
            </div>
            {/* Contact bottom */}
            <div className="pt-12 text-center border-t-2 border-yellow-600/40 mt-16">
              <h5 className="text-yellow-400 text-2xl font-bold mt-12">
                Report an Issue
              </h5>
              <p className="text-yellow-600/95 text-lg mt-6">
                If you find any errors, bugs, or incorrect calculations, please
                let us know — accuracy is our top priority.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Contact;
