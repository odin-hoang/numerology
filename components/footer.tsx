"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const Footer = () => {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setVisible(!visible);
  };
  return (
    <footer
      style={{
        bottom: visible
          ? "0"
          : `${
              ref?.current?.offsetHeight && ref?.current?.offsetHeight * -1 + 20
            }px` || "-100px",
      }}
      className={cn(
        "fixed left-0 bottom-0 w-full text-center text-xs ease-linear border-t transition-all bg-background"
      )}
    >
      <div className="relative">
        <Button
          className="absolute z-10  left-[50%] translate-x-[-50%] -top-[20px]"
          variant={"outline"}
          size={"sm"}
          onClick={handleClick}
        >
          <CaretSortIcon />
          {visible ? "Ẩn" : "Hiện"}
        </Button>
      </div>
      <div
        ref={ref}
        className={cn(
          " flex opacity-100 transition-all items-center flex-col justify-center p-4 gap-2",
          !visible && "opacity-0"
        )}
      >
        <h3>Trang web được xây dựng nhằm mục đích học tập và nghiên cứu.</h3>
        <h3 className="text-gray-500">
          Nội dung trên trang web được dịch và tham khảo từ cuốn sách{" "}
          <i>&ldquo;The complete book of Numerology&rdquo;</i> của tác giả David
          A. Phillips xuất bản năm 1992.
        </h3>
        <h3>
          Chủ sở hữu tuyên bố miễn trừ mọi trách nhiệm và không đảm bảo tính
          đúng đắn của nội dung.
        </h3>
        <h3>
          Mọi thông tin phản hồi vui lòng gửi về địa chỉ email:{" "}
          <a
            className="font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent"
            href="mailto:khaifade.dev@gmail.com"
          >
            khaifade.dev@gmail.com
          </a>
        </h3>
      </div>
    </footer>
  );
};

export default Footer;
