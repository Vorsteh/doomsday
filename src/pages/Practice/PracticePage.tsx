import { useState } from "react";
import { PageContainer } from "../../components/PageContainer";

import { FindTheDay, Flashcards } from "./modes";

type PracticeMode = "find-day" | "flashcards";

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode>("find-day");

  return (
    <PageContainer>
      <div>
        <div className="mb-6">
          <p className="font-mono text-xs tracking-widest uppercase text-violet-400 mb-2">
            Practice
          </p>
          <h1 className="font-serif text-4xl text-violet-100 tracking-wide">
            Practice Modes
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("find-day")}
            className={`px-4 py-2 rounded-lg text-sm ${
              mode === "find-day"
                ? "bg-violet-600 text-white"
                : "bg-white/5 text-gray-400"
            }`}
          >
            Find the Day
          </button>
          <button
            onClick={() => setMode("flashcards")}
            className={`px-4 py-2 rounded-lg text-sm ${
              mode === "flashcards"
                ? "bg-violet-600 text-white"
                : "bg-white/5 text-gray-400"
            }`}
          >
            Flashcards
          </button>
        </div>

        {mode === "find-day" && <FindTheDay />}
        {mode === "flashcards" && <Flashcards />}
      </div>
    </PageContainer>
  );
}