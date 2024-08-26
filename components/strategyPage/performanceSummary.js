import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IoInformationCircle } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const Summary = () => {
  return (
    <div className="rounded-xl shadow-xl w-full bg-white dark:bg-slate-900 py-6 px-10">
      <h1 className="text-xl text-blue-900 dark:text-white saturate-200 font-medium mb-6">
        Performance Summary
      </h1>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">Dual Momentum Model</TableHead>
            <TableHead className="text-right">
              Vanguard 500 Index Investor
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Start Balance</TableCell>
            <TableCell className="text-right">$10,000</TableCell>
            <TableCell className="text-right">$10,000</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">End Balance</TableCell>
            <TableCell className="text-right">$113,409</TableCell>
            <TableCell className="text-right">$90,228</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              Annualized Return (CAGR)
            </TableCell>
            <TableCell className="text-right">9.20%</TableCell>
            <TableCell className="text-right">10.11%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Standard Deviation</TableCell>
            <TableCell className="text-right">14.18%</TableCell>
            <TableCell className="text-right">15.73%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Best Year</TableCell>
            <TableCell className="text-right">35.41%</TableCell>
            <TableCell className="text-right">32.73%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Worst Year</TableCell>
            <TableCell className="text-right">-14.41%</TableCell>
            <TableCell className="text-right">-36.73%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Maximum Drawdown</TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoInformationCircle size={18} className="mr-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p>-23.68%</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <IoInformationCircle size={18} className="mr-2" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to library</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <p>-50.68%</p>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sharpe Ratio</TableCell>
            <TableCell className="text-right">0.60</TableCell>
            <TableCell className="text-right">0.61</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Sortino Ratio</TableCell>
            <TableCell className="text-right">1.00</TableCell>
            <TableCell className="text-right">0.91</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Benchmark Correlation</TableCell>
            <TableCell className="text-right">0.42</TableCell>
            <TableCell className="text-right">1.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Summary;