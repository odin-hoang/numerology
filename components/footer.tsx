"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Footer = () => {
  const [visible, setVisible] = useState(true);
  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <footer
      className={cn(
        "fixed left-0 bottom-0 w-full text-center text-xs ease-linear border-t transition-all bg-background",
        !visible && `-bottom-[130px]`
      )}
    >
      <div className="relative">
        <Button
          className="absolute px-2 left-[50%] translate-x-[-50%] -top-[20px]"
          variant={"outline"}
          size={"sm"}
          onClick={handleClick}
        >
          <CaretSortIcon />
          {visible ? "Ẩn" : "Hiện"}
        </Button>
      </div>
      <div className="h-[150px] flex items-center flex-col justify-center p-4">
        <h3>Trang web được xây dựng nhằm mục đích học tập và nghiên cứu.</h3>
        <h3>
          Nội dung trên trang web được dịch và tham khảo từ cuốn sách{" "}
          <i>&ldquo;The complete book of Numerology&rdquo;</i> của tác giả David
          A. Phillips xuất bản năm 1992.
        </h3>
        <h3>
          Chủ sở hữu tuyên bố miễn trừ mọi trách nhiệm và không đảm bảo tính
          đúng đắn của nội dung.
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
