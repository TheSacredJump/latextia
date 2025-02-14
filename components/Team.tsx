"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useRouter } from "next/navigation";

export default function ThreeDCardDemo() {
  const router = useRouter();

  return (
    <div id="about" className="bg-neutral-50">
        <div className="text-black pt-10 text-center text-4xl font-extrabold">Meet the team</div>
    <CardContainer className="inter-var">
      <CardBody className="bg-gradient-to-br from-emerald-950 via-emerald-400 to-emerald-950 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-white/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-100 dark:text-white"
        >
          Sathya Padmanabhan
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-200 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          I want this to be free forever. If you want to support me, feel free to donate below!
        </CardItem>
        <CardItem
          translateZ="100"
          rotateX={20}
          rotateZ={-10}
          className="w-full mt-4"
        >
          <Image
            src="/padmanabhan_sathya.jpg"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            translateX={40}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            onClick={() => router.push("/donate")}
          >
            Donate
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    </div>
  );
}
