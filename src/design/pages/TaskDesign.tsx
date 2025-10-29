import React from "react";
import "../theme/Theme.css";
import "./TaskDesign.css";
import Campfire from "../components/Campfire";
import WarmClock from "../components/WarmClock";

type Props = {
  campfireSize?: number;
  showClock?: boolean;
  childrenBelow?: React.ReactNode;
};

const TaskDesign: React.FC<Props> = ({ campfireSize = 260, showClock = true, childrenBelow }) => {
  React.useEffect(() => {
    document.body.classList.add("design-forest");
    return () => document.body.classList.remove("design-forest");
  }, []);

  return (
    <main className="taskdesign tree-silhouette" aria-label="森林キャンプテーマのタスクページ">
      <div className="center-stack">
        <Campfire size={campfireSize} />
        {showClock && <WarmClock />}
        {childrenBelow}
      </div>
    </main>
  );
};

export default TaskDesign;
