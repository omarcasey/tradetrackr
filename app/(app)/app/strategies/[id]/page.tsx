"use client";
import React, { useEffect, useRef } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/spinner";
import { useFirestore, useFirestoreDocData, useUser } from "reactfire";
import { doc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BsGraphDownArrow, BsTable } from "react-icons/bs";
import { TfiStatsUp } from "react-icons/tfi";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoCalendarOutline } from "react-icons/io5";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoStatsChartSharp } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import Summary from "@/components/strategyPage/performanceSummary";
import PortfolioGrowth from "@/components/strategyPage/portfolioGrowth";
import AnnualReturnsGraph from "@/components/strategyPage/AnnualReturnsGraph";
import TrailingReturns from "@/components/strategyPage/TrailingReturns";
import ActiveReturnsChart from "@/components/strategyPage/ActiveReturnsChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnnualReturns from "@/components/strategyPage/AnnualReturns";
import MonthlyReturns from "@/components/strategyPage/MonthlyReturns";
import RiskandReturnMetrics from "@/components/strategyPage/RiskandReturnMetrics";

const StrategyPage = () => {
  const params = useParams<{ id: string }>();
  const { data: user, status } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const strategyId = params?.id;

  const sectionRefs = {
    summary: useRef<HTMLDivElement>(null),
    activereturns: useRef<HTMLDivElement>(null),
    metrics: useRef<HTMLDivElement>(null),
    annualreturns: useRef<HTMLDivElement>(null),
    monthlyreturns: useRef<HTMLDivElement>(null),
    drawdowns: useRef<HTMLDivElement>(null),
    rollingreturns: useRef<HTMLDivElement>(null),
    trades: useRef<HTMLDivElement>(null),
  };

  if (!strategyId) {
    return <div>Strategy ID is missing.</div>;
  }

  const strategyRef = doc(firestore, "strategies", strategyId);
  const { data: strategy, status: strategyStatus } =
    useFirestoreDocData(strategyRef);

  if (status === "loading" || strategyStatus === "loading") {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoadingSpinner size={45} />
      </div>
    );
  }

  if (!user) {
    return <div>Please sign in to view strategies.</div>;
  }

  if (strategyStatus === "error") {
    return <div>Error fetching strategies.</div>;
  }

  const scrollToSection = (sectionId: keyof typeof sectionRefs) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex w-full">
        <div className="w-56 pr-10 space-y-1">
          <p className={`ml-7 mb-3 mt-5 text-gray-400 text-xs uppercase`}>
            Portfolio Report
          </p>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("summary")}
          >
            <IoEyeOutline size={16} className="mr-2" />
            <p className={`font-normal`}>Summary</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("activereturns")}
          >
            <IoStatsChartSharp className="mr-2" />
            <p className={`font-normal`}>Active Returns</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("metrics")}
          >
            <IoIosCheckboxOutline size={16} className="mr-2" />
            <p className={`font-normal`}>Metrics</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("annualreturns")}
          >
            <IoCalendarClearOutline className="mr-2" />
            <p className={`font-normal`}>Annual Returns</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("monthlyreturns")}
          >
            <IoCalendarOutline className="mr-2" />
            <p className={`font-normal`}>Monthly Returns</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("drawdowns")}
          >
            <BsGraphDownArrow className="mr-2" />
            <p className={`font-normal`}>Drawdown Graphs</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("rollingreturns")}
          >
            <TfiStatsUp className="mr-2" />
            <p className={`font-normal`}>Rolling Returns</p>
          </Button>
          <Button
            variant={"ghost"}
            size={"default"}
            className="w-full flex items-center justify-start"
            onClick={() => scrollToSection("trades")}
          >
            <BsTable className="mr-2" />
            <p className={`font-normal`}>Trades</p>
          </Button>
        </div>
        <ScrollArea className="flex-1 rounded-md bg-slate-50 dark:bg-black">
          <p>{strategy.name}</p>
          <div id="summary" ref={sectionRefs.summary} className="p-6 space-y-8">
            <Summary />
            <PortfolioGrowth strategy={strategy} />
            <AnnualReturnsGraph strategy={strategy} />
            <TrailingReturns />
          </div>
          <div
            id="activereturns"
            ref={sectionRefs.activereturns}
            className="p-6 space-y-8"
          >
            <ActiveReturnsChart />
          </div>
          <div
            id="metrics"
            ref={sectionRefs.metrics}
            className="p-6 space-y-8"
          >
            <RiskandReturnMetrics />
          </div>
          <div
            id="annualreturns"
            ref={sectionRefs.annualreturns}
            className="p-6 space-y-8"
          >
            <AnnualReturns strategy={strategy} />
          </div>
          <div
            id="monthlyreturns"
            ref={sectionRefs.monthlyreturns}
            className="p-6 space-y-8"
          >
            <MonthlyReturns strategy={strategy} />
          </div>
          <div
            id="drawdowns"
            ref={sectionRefs.drawdowns}
            className="p-6 space-y-8"
          ></div>
          <div
            id="rollingreturns"
            ref={sectionRefs.rollingreturns}
            className="p-6 space-y-8"
          ></div>
          <div
            id="trades"
            ref={sectionRefs.trades}
            className="p-6 space-y-8"
          ></div>
        </ScrollArea>
      </div>
    </>
  );
};

export default StrategyPage;