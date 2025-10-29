import "./SignUpDesign.css";

export const SignUpDesign = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="tent-bg-signup">
      <div className="lantern-glow-signup"></div>
      <div className="signup-card">
        <h1>🏕 Join Effort Forest</h1>
        <p className="signup-desc">テントの中で、あなたの冒険を始めよう。</p>
        {children}
      </div>
    </div>
  );
};
