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
import numeral from 'numeral';

const TradingPerformance = ({ strategy }) => {
  return (
    <div className="rounded-xl shadow-2xl dark:border w-full bg-white dark:bg-black py-6 px-10">
      <h1 className="text-xl text-blue-900 dark:text-white saturate-200 font-medium mb-6">
        Trading Performance
      </h1>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead>Metric</TableHead>
            <TableHead className="text-right">{strategy.name}</TableHead>
            <TableHead className="text-right">
              Vanguard 500 Index Investor
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">Total Trades</TableCell>
            <TableCell className="text-right">{numeral(strategy.metrics['Initial Capital']).format('$0,0')}</TableCell>
            <TableCell className="text-right">$10,000</TableCell>
          </TableRow>
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">Winning Trades</TableCell>
            <TableCell className="text-right">{numeral(strategy.metrics['Ending Capital']).format('$0,0')}</TableCell>
            <TableCell className="text-right">$90,228</TableCell>
          </TableRow>
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">
              Losing Trades
            </TableCell>
            <TableCell className="text-right">9.20%</TableCell>
            <TableCell className="text-right">10.11%</TableCell>
          </TableRow >
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">Win %</TableCell>
            <TableCell className="text-right">14.18%</TableCell>
            <TableCell className="text-right">15.73%</TableCell>
          </TableRow>
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">Average Win</TableCell>
            <TableCell className="text-right">35.41%</TableCell>
            <TableCell className="text-right">32.73%</TableCell>
          </TableRow>
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">Median Win</TableCell>
            <TableCell className="text-right">-14.41%</TableCell>
            <TableCell className="text-right">-36.73%</TableCell>
          </TableRow>
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">Average Loss</TableCell>
            <TableCell className="text-right">0.60</TableCell>
            <TableCell className="text-right">0.61</TableCell>
          </TableRow>
          <TableRow className="odd:bg-gray-100 dark:odd:bg-gray-800">
            <TableCell className="font-medium">Median Loss</TableCell>
            <TableCell className="text-right">1.00</TableCell>
            <TableCell className="text-right">0.91</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TradingPerformance;
