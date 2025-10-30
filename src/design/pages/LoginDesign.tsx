import "./LoginDesign.css";

export const LoginDesign = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tent-bg">
      <div className="lantern-glow"></div>
      <div className="login-card">
        <h1>🏕 Effort Forest</h1>
        {children}
      </div>
    </div>
  );
};
