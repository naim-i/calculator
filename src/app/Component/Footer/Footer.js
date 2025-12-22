import React from "react";
import Container from "../Container/Container";
import Flex from "../Flex/Flex";
import Image from "next/image";
import List from "../List/List";
import ListItems from "../ListItems/ListItems";
import Link from "next/link";
import FdataOne from "./FdataOne";
import FdataTwo from "./FdataTwo";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <div className="bg-gray-100 w-full pb-10 pt-10">
      <Container>
        <div className=" justify-center items-center pt-20">
          <Flex className="justify-between">
            <div>
              <Logo />
            </div>
            <div className="w-[30%]">
              <h1 className="text-3xl text-black font-bold">Calculators</h1>
              <List className="pt-3">
                {FdataOne.map((item, i) => (
                  <ListItems
                    key={i}
                    className="pb-2 font-medium text-xl hover:text-yellow-900 hover:tracking-widest transition-all duration-300"
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </ListItems>
                ))}
              </List>
            </div>
            <div className="w-[30%]">
              <h1 className="text-3xl text-black font-bold">Social Media</h1>
              <List className="pt-3">
                {FdataTwo.map((item, i) => (
                  <ListItems
                    key={i}
                    className="pb-2 font-medium  text-xl hover:text-yellow-900 hover:tracking-widest transition-all duration-300"
                  >
                    <Link href={item.link}>{item.title}</Link>
                  </ListItems>
                ))}
              </List>
            </div>
          </Flex>
        </div>
        <div className="flex justify-center items-center pt-10">
          <h1>
            © 2025 <u>Name here</u>. All rights reserved.
          </h1>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
