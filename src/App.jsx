import { useMemo, useRef, useState } from "react";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 90, y: 210 });
  const cardRef = useRef(null);

  const yesScale = useMemo(() => 1 + Math.min(noCount * 0.18, 2.5), [noCount]);

  const moveNo = () => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const padding = 18;
    const maxX = rect.width - padding - 30;
    const maxY = rect.height - padding - 24;

    const x = Math.floor(padding + Math.random() * (maxX - padding));
    const y = Math.floor(150 + Math.random() * (maxY - 150));

    setNoPos({ x, y });
    setNoCount((c) => c + 1);
  };

  if (accepted) {
    return (
      <div className="page">
        <div className="card cardTall">
          <h1 className="title">Will you be my Valentine?</h1>
          <div className="yay">YAY! 💖</div>
          <img src="./yay.jpg" className="finalImg" />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card" ref={cardRef}>
        <h1 className="title">Will you be my Valentine?</h1>

        <button
          className="yesBtn"
          style={{ transform: `scale(${yesScale})` }}
          onClick={() => setAccepted(true)}
        >
          Yes
        </button>

        <button
          className="noBtn"
          style={{ left: noPos.x, top: noPos.y }}
          onMouseEnter={moveNo}
          onClick={moveNo}
        >
          No
        </button>
      </div>
    </div>
  );
}
