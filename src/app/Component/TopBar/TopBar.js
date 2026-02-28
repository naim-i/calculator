"use client";
import React from "react";
import Container from "../Container/Container";
import Flex from "../Flex/Flex";
import List from "../List/List";
import ListItems from "../ListItems/ListItems";
import Link from "next/link";
import TopBarData from "./TopBarData";
import { useEffect, useState, useRef } from "react";

const TopBar = () => {
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

  return (
    <>
      <div className="bg-slate-700 items-center w-full h-15">
        <Container>
          <Flex className="justify-between items-center gap-4 text-xl text-gray-600 py-2">
            <div ref={menuRef}>
              <h2
                ref={buttonRef}
                onClick={() => setShow((prev) => !prev)}
                className="text-white align-center text-3xl block lg:hidden ml-15  cursor-pointer"
              >
                More Calculators
              </h2>
              {show && (
                <List className="lg:flex gap-3 items-center absolute lg:static top-42 left-10 bg-gray-50 lg:bg-transparent rounded-2xl py-4 px-4 lg:p-2 shadow-2xl lg:shadow-none z-50 ">
                  {TopBarData.map((item, i) => (
                    <ListItems
                      key={i}
                      className="lg:text-slate-200 lg:hover:text-sky-400 transition-all duration-300 text-gray-700 text-xl px-4 hover:text-sky-400 hover:tracking-widest pb-2 lg:pb-0 block py-2 lg:py-0"
                    >
                      <Link href={item.link}>{item.title}</Link>
                    </ListItems>
                  ))}
                </List>
              )}
            </div>
          </Flex>
        </Container>
      </div>
    </>
  );
};

export default TopBar;
