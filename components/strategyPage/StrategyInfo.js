import React from "react";

const StrategyInfo = ({ strategy }) => {
  return (
    <div className="border-b">
      <h1 className="text-3xl font-semibold  mb-2">{strategy.name}</h1>
    </div>
  );
};

export default StrategyInfo;