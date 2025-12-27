"use client";
import React, { useEffect, useState } from "react";
import List from "../List/List";
import ListItems from "../ListItems/ListItems";
import Flex from "../Flex/Flex";
import Container from "../Container/Container";
import Link from "next/link";
import MenuData from "@/app/Component/Navbar/MenuData";
import Logo from "../Logo/Logo";
import { FaBars } from "react-icons/fa6";
import { useRef } from "react";

const Navbar = () => {
  let [show, setshow] = useState(false);

  let userRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (userRef.current.contains(e.target)) {
        setshow(true);
      } else {
        setshow(false);
      }
    });
    // const handleResize = (e) => {
    //   if (window.innerWidth < 1024) {
    //     setshow(false);
    //   } else {
    //     setshow(true);
    //   }
    // };
    // handleResize();
    // window.addEventListener("resize", handleResize);
  }, []);

  // const handleClick = () => {
  //   setshow(!show);
  // };

  return (
    <div className="w-full bg-gray-500 flex items-center pt-6">
      <Container>
        <Flex className="justify-between items-center relative">
          <div className="ml-5 lg:ml-0">
            <Logo />
          </div>
          <div ref={userRef}>
            <FaBars
              // onClick={handleClick}
              className="text-white text-3xl block lg:hidden mr-5 absolute top-5 right-0"
            />
            {show && (
              <List className="lg:flex gap-4 items-center absolute lg:static top-16 right-2 bg-gray-50 lg:bg-transparent rounded-2xl p-5 lg:p-0 shadow-2xl lg:shadow-none z-50">
                {MenuData.map((item, index) => (
                  <ListItems key={index}>
                    <Link
                      href={item.link}
                      className="lg:text-white text-gray-700 text-xl px-4 hover:text-yellow-400 hover:tracking-widest transition-all duration-300 pb-2 lg:pb-0 block"
                    >
                      {item.title}
                    </Link>
                  </ListItems>
                ))}
              </List>
            )}
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;
