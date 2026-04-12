import { useState, useMemo } from "react";

const BASE_CARDS = [
    { year: "0", value: 0 },
    { year: "12", value: 1 },
    { year: "24", value: 2 },
    { year: "36", value: 3 },
    { year: "48", value: 4 },
    { year: "60", value: 5 },
    { year: "72", value: 6 },
    { year: "84", value: 0 },
    { year: "96", value: 1 },
];

const EXTRA_CARDS = [
    { year: "11", value: 3 },
    { year: "22", value: 6 },
    { year: "33", value: 2 },
    { year: "44", value: 5 },
    { year: "55", value: 1 },
    { year: "66", value: 4 },
    { year: "77", value: 0 },
    { year: "88", value: 3 },
    { year: "99", value: 6 },
];

const DAY_NAMES = [
  "Sunday (0)","Monday (1)","Tuesday (2)","Wednesday (3)","Thursday (4)","Friday (5)","Saturday (6)",
];

function shuffle(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Flashcards() {
  const [showExtra, setShowExtra] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  const cards = useMemo(() => {
    const base = showExtra
      ? [...BASE_CARDS, ...EXTRA_CARDS]
      : BASE_CARDS;

    return shuffle(base);
  }, [showExtra]);

  const card = cards[index];

  function nextCard() {
    setFlipped(false);

    setTimeout(() => {
        setIndex((prev) =>
        prev === cards.length - 1 ? 0 : prev + 1
        );
    }, 150); 
    }

  function prevCard() {
    setFlipped(false);

    setTimeout(() => {
        setIndex((prev) =>
        prev === 0 ? cards.length - 1 : prev - 1
        );
    }, 150);
    }

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-10">

      <button
        onClick={() => {
          setShowExtra(!showExtra);
          setIndex(0);
          setFlipped(false);
        }}
        className="px-5 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-sm transition"
      >
        {showExtra ? "Hide extras" : "Show extras"}
      </button>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="w-80 h-48 cursor-pointer perspective"
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${
            flipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute w-full h-full flex items-center justify-center
                       bg-gradient-to-br from-violet-600/20 to-indigo-600/20
                       border border-white/10 rounded-2xl text-4xl font-serif text-violet-100 shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            {card.year}
          </div>

          <div
            className="absolute w-full h-full flex items-center justify-center
                       bg-gradient-to-br from-violet-600 to-indigo-600
                       rounded-2xl text-3xl font-semibold text-white shadow-xl rotate-y-180"
            style={{ backfaceVisibility: "hidden" }}
          >
            {DAY_NAMES[card.value]}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevCard}
          className="px-5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition"
        >
          ← Prev
        </button>

        <button
          onClick={nextCard}
          className="px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition"
        >
          Next →
        </button>
      </div>

      <p className="text-xs text-gray-500">
        Click the card to flip
      </p>
    </div>
  );
}