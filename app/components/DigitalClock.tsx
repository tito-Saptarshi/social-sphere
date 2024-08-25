"use client";

import { useEffect, useState } from "react";

export function DigitalClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-2xl font-bold mb-4 mt-2 text-right">
      {time && time.toLocaleTimeString()}
    </div>
  );
}
