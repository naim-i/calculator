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
  const [show, setShow] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Click outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (
        window.innerWidth < 1024 &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  // const handleClick = () => {
  //   setshow(!show);
  // };

  return (
    <div className="w-full bg-gray-500 flex items-center pt-6">
      <Container>
        <Flex className="justify-between items-center relative">
          <div className="ml-5 lg:ml-0 w-[50%] lg:w-auto md:w-auto">
            <Logo />
          </div>
          <div ref={menuRef}>
            <FaBars
              ref={buttonRef}
              onClick={() => setShow((prev) => !prev)}
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
