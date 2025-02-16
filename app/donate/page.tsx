"use client";

import React from "react";
import Image from "next/image";
import { Boxes } from "../../components/ui/background-boxes";
import { cn } from "@/lib/utils";

export default function DonatePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      
      <Boxes />

      <div className="max-w-3xl mx-auto relative z-30">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Support Our Work</h1>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Venmo Option */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-semibold text-[#3D95CE]">Venmo</h2>
              <div className="relative w-48 h-48">
                <Image
                  src="/qrvenmo.png" 
                  alt="Venmo QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <a
                href="https://venmo.com/SathyaPadhu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 bg-[#3D95CE] text-white rounded-lg text-center hover:bg-[#3D95CE]/90 transition-colors"
              >
                Donate with Venmo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}