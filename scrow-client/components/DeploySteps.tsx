import React from "react";
import { Button } from "../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../@/components/ui/dialog";
import Stepper from "./Stepper";
import { Titillium_Web } from "next/font/google";

const titillium_web = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const DeploySteps = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-16 py-8 px-16 text-[#02C845] bg-white self-center text-xl font-bold hover:bg-white/90">
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className={"max-w-[500px] " + titillium_web.className}>
        <DialogHeader>
          <DialogTitle className="text-center">New Escrow Contract</DialogTitle>
        </DialogHeader>
        <Stepper />
      </DialogContent>
    </Dialog>
  );
};
