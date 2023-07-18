import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../@/components/ui/dialog";
import { Button } from "../@/components/ui/button";

const dashboard = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-16 py-4 px-16 text-[#02C845] bg-white self-center text-xl font-bold hover:bg-white/90">
          Get Started
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle>New Escrow Contract</DialogTitle>
        </DialogHeader>
        <div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto
          dolorem perferendis libero dicta, sed, cum temporibus cumque,
          blanditiis molestiae asperiores laudantium quo amet vel! Sit totam
          tempora quis in incidunt.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default dashboard;
