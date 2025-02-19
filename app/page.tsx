import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Team from "@/components/Team";
import Update from "@/components/Update";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Update />
      <Navbar />
      <Hero />
      <Features />
      <Team />
    </>
  );
}
