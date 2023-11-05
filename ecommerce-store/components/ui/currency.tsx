"use client";

import { formatter } from "@/lib/utils";
import { useEffect, useState } from "react";

type CurrencyProps = {
  value: string | number;
};

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
