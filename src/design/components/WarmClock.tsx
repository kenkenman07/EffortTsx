import React, { useEffect, useState } from "react";
import "./WarmClock.css";
import "../theme/Theme.css";

const pad = (n: number) => n.toString().padStart(2, "0");

const WarmClock: React.FC = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const ss = pad(now.getSeconds());

  return (
    <div className="warmclock" aria-label="焚火の雰囲気の時計">
      <div className="time">
        <span className="hh">{hh}</span>
        <span className="colon">:</span>
        <span className="mm">{mm}</span>
        <span className="colon">:</span>
        <span className="ss">{ss}</span>
      </div>
      <div className="sub">Forest Camp • Focus Time</div>
    </div>
  );
};
export default WarmClock;
