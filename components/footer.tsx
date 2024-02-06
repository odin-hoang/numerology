import React from "react";

const Footer = () => {
  return (
    <footer className="fixed left-0 bottom-0 w-full text-center text-xs p-5 bg-white border-t">
      <h3>Trang web được xây dựng nhằm mục đích học tập và nghiên cứu.</h3>
      <h3>
        Nội dung trên trang web được dịch và tham khảo từ cuốn sách{" "}
        <i>"The complete book of Numerology"</i> của tác giả David A. Phillips
        xuất bản năm 1992.
      </h3>
      <h3>
        Chủ sở hữu tuyên bố miễn trừ mọi trách nhiệm và không đảm bảo tính đúng
        đắn của nội dung.
      </h3>
    </footer>
  );
};

export default Footer;
