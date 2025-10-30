import React, { useMemo } from "react";
import "./FriendsPanel.css";
import "../theme/Theme.css";

export type Friend = { id: string; username: string; status: "online" | "offline" };

type Props = {
  friends: Friend[];
  onClickFriend?: (id: string) => void;
  title?: string;
};

const FriendsPanel: React.FC<Props> = ({ friends, onClickFriend, title = "Friends" }) => {
  const [online, offline] = useMemo(() => {
    const on = friends.filter(f => f.status === "online").sort((a,b)=>a.username.localeCompare(b.username));
    const off = friends.filter(f => f.status !== "online").sort((a,b)=>a.username.localeCompare(b.username));
    return [on, off];
  }, [friends]);

  return (
    <section className="friends-panel" aria-label="フレンドのオンライン状況">
      <header className="fp-header">
        <span className="fp-title">🌲 {title}</span>
        <span className="fp-count"><strong>{online.length}</strong> online</span>
      </header>

      <div className="fp-group">
        <div className="fp-group-title">Online</div>
        {online.length === 0 && <div className="fp-empty">いまは焚火を独り占め中…</div>}
        {online.map(f => (
          <button key={f.id} className="fp-item online" onClick={() => onClickFriend?.(f.id)} aria-label={`${f.username} はオンライン`}>
            <span className="presence">
              <span className="ping" />
              <span className="dot" />
            </span>
            <span className="name">{f.username}</span>
            <span className="leaf" aria-hidden>🍃</span>
          </button>
        ))}
      </div>

      <div className="fp-group">
        <div className="fp-group-title">Offline</div>
        {offline.length === 0 && <div className="fp-empty">全員キャンプに集合中！</div>}
        {offline.map(f => (
          <div key={f.id} className="fp-item offline" aria-label={`${f.username} はオフライン`}>
            <span className="presence">
              <span className="dot" />
            </span>
            <span className="name">{f.username}</span>
            <span className="leaf" aria-hidden>🌿</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FriendsPanel;
