"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import UserIcon from "@/components/UserIcon";
import PagePadding from "@/components/PagePadding";
import { FaChromecast } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Logo from "./elements/Logo";
import Navigation from "./elements/Navigation";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

const HeaderDraw = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-[240px] h-full">
        {/* 로고 */}
        {/* 네비게이션, 재생목록 */}
        <div className="py-3">
          <div className=" px-3">
            <Logo
              isInDrawer
              onClickClose={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <Navigation />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Header = ({ children }) => {
  const { headerImageSrc } = useUIState();
  const [isScrolled, serIsScrooled] = useState(false);
  const headRef = useRef();

  useEffect(() => {
    const handlerScroll = () => {
      const scrollValue = headRef?.current?.scrollTop;
      serIsScrooled(scrollValue !== 0);
    };

    headRef?.current?.addEventListener("scroll", handlerScroll);
    return () => {
      headRef?.current?.removeEventListener("scroll", handlerScroll);
    };
  }, []);

  return (
    <header ref={headRef} className="relative overflow-y-auto h-full w-full">
      {/* bgSection */}
      <section className="absolute top-0 w-full">
        <div className="relative h-[400px] w-full">
          <Image
            alt="media"
            className="object-cover"
            fill
            src={
              headerImageSrc ||
              "https://images.unsplash.com/photo-1707833558984-3293e794031c"
            }
          />
          <div className="absolute h-[400px] top-0 bg-black opacity-40 w-full"></div>
          <div className="absolute h-[400px] top-0 bg-gradient-to-t from-black  w-full"></div>
        </div>
      </section>
      <section
        className={cn("sticky top-0 left-0 z-10", isScrolled && "bg-black")}
      >
        <PagePadding>
          <div className="h-[64px] flex flex-row justify-between items-center">
            <article className="h-[42px] min-w-[480px] hidden lg:flex bg-[rgba(0,0,0,0.14)]  rounded-2xl px-[16px] gap-[16px] flex flex-row items-center border border-neutral-500">
              <div>
                <FiSearch size={24} />
              </div>
              <input
                className="h-full w-full bg-transparent"
                type="text"
                placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
              />
            </article>
            <HeaderDraw className="lg:hidden">
              <article>
                <Logo />
              </article>
            </HeaderDraw>
            <article className="flex flex-row gap-6 items-center">
              <FaChromecast size={26} />
              <UserIcon />
            </article>
          </div>
        </PagePadding>
      </section>
      <section className="absolute">{children}</section>
    </header>
  );
};

export default Header;
