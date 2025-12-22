import React from "react";
import List from "../List/List";
import ListItems from "../ListItems/ListItems";
import Flex from "../Flex/Flex";
import Container from "../Container/Container";
import Image from "next/image";
import { MdOutlineCategory } from "react-icons/md";
import Link from "next/link";
import MenuData from "@/app/Component/Navbar/MenuData";
import Logo from "../Logo/Logo";

const Navbar = () => {
  return (
    <div className="w-full bg-gray-500 flex items-center pt-6">
      <Container>
        <Flex className="justify-between items-center">
          <div>
            <Logo />
          </div>
          <div>
            <List className="flex gap-4 items-center">
              {MenuData.map((item, index) => (
                <ListItems key={index}>
                  <Link href={item.link} className="text-white text-xl px-4 hover:text-yellow-400 hover:tracking-widest transition-all duration-300">
                    {item.title}
                  </Link>
                </ListItems>
              ))}
            </List>
          </div>
          <div>
            <Flex className="gap-2 items-center cursor-pointer text-white">
              <span className="text-3xl uppercase ">Category</span>
              <MdOutlineCategory className="text-3xl" />
            </Flex>
          </div>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;
