import Footer from "@/components/Footer";
import HeroSection from "@/components/hero/HeroSection";
import Navbar from "@/components/navbar/Navbar";
import PitchSection from "@/components/pitch/PitchSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <Navbar/>
      <HeroSection/>
      <PitchSection/>
      <Footer/>
    </main>
  );
}
