// src/components/Header.tsx
const Header: React.FC = () => {
  return (
    <div className="app-header">
      <h1>🔥 Effort Forest</h1>
      <nav>
        <a href="/dash">Dashboard</a>
        <a href="/task">Tasks</a>
        <button>Logout</button>
      </nav>
    </div>
  );
};
export default Header