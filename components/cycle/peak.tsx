import React, { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getPeakMeaning } from "@/lib/request";
export type TPeak = {
  number: number;
  meaning: string;
};
interface PeakProps {
  children: React.ReactNode;
  peak: number;
}

export default function Peak({ children, peak }: PeakProps) {
  useEffect(() => {
    getPeakMeaning(peak).then((data) => {
      setContent(data.meaning);
    });
  }, [peak]);
  const [content, setContent] = React.useState("");
  return (
    <AlertDialog>
      <AlertDialogTrigger className="">{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Đỉnh cao số {peak}</AlertDialogTitle>
          <AlertDialogDescription className="max-h-[60vh] px-4 overflow-auto text-justify">
            {content}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Xem tiếp</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
