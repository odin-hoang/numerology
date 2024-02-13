import React from "react";
interface MeaningOfNumberProps {
  children: React.ReactNode;
  content: React.ReactNode;
  isolatedContent?: React.ReactNode;
}
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import {
  LinkBreak1Icon,
  LinkBreak2Icon,
  PieChartIcon,
} from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
const MeaningOfNumber = ({
  children,
  content = "",
  isolatedContent,
}: MeaningOfNumberProps) => {
  return (
    <Drawer>
      <DrawerTrigger className=" hover:scale-125 transition-all ease-in">
        {children}
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="px-6 h-[90vh] overflow-auto sm:px-24 lg:px-40 w-full">
          <DrawerHeader>
            <div className="flex items-center gap-2 justify-center">
              {isolatedContent && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>
                      <LinkBreak1Icon className="mr-2 h-5 w-5" />
                      Cô lập
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[100vw] lg:w-[900px] md:w-[600px] border shadow-sm rounded-sm my-2 text-sm">
                    <div className="bg-gradient-to-b overflow-auto max-h-[70vh] md:max-h-[400px] lg:max-h-[600px]  rounded-sm from-yellow-50 text-justify to-amber-50 p-4">
                      {isolatedContent}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <h4 className="text-center w-auto px-3 h-10 font-bold bg-gradient-to-br from-[#9FA5D5] to-[#E8F5C8] leading-10 rounded-lg">
                {children}
              </h4>
            </div>
          </DrawerHeader>
          <p className="text-justify text-sm">{content}</p>
          <DrawerFooter>
            <DrawerClose>
              {/* <Button variant="outline">Xem tiếp</Button> */}
              <span className="border px-4 py-2 rounded-md shadow-sm hover:bg-slate-100 text-sm ">
                Xem tiếp
              </span>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MeaningOfNumber;
