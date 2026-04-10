import { useState, useEffect } from "react";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type StepState = "idle" | "correct" | "wrong";

export default function PracticePage() {
  const [date, setDate] = useState<Date | null>(null);

  const [correctAnchor, setCorrectAnchor] = useState<number | null>(null);
  const [correctDoomsday, setCorrectDoomsday] = useState<number | null>(null);
  const [correctFinalDay, setCorrectFinalDay] = useState<number | null>(null);

  const [anchorInput, setAnchorInput] = useState("");
  const [doomsdayInput, setDoomsdayInput] = useState("");
  const [finalDayInput, setFinalDayInput] = useState("");

  const [anchorState, setAnchorState] = useState<StepState>("idle");
  const [doomsdayState, setDoomsdayState] = useState<StepState>("idle");
  const [finalDayState, setFinalDayState] = useState<StepState>("idle");

  const [hasGuessed, setHasGuessed] = useState(false);

  function generateDate() {
    setHasGuessed(false);

    const start = new Date(2000, 0, 1).getTime();
    const now = Date.now();

    const newDate = new Date(start + Math.random() * (now - start));

    setDate(newDate);

    setAnchorInput("");
    setDoomsdayInput("");
    setFinalDayInput("");

    setAnchorState("idle");
    setDoomsdayState("idle");
    setFinalDayState("idle");
  }

  function calculateAnswers(d: Date) {
    const year = d.getFullYear();
    const century = Math.floor(year / 100);
    const yearOfCentury = year % 100;

    const anchorDays = [2, 0, 5, 3];
    const anchor = anchorDays[century % 4];

    const a = Math.floor(yearOfCentury / 12);
    const b = yearOfCentury % 12;
    const c = Math.floor(b / 4);

    const doomsday = (a + b + c + anchor) % 7;
    const finalDay = d.getDay();

    setCorrectAnchor(anchor);
    setCorrectDoomsday(doomsday);
    setCorrectFinalDay(finalDay);
  }

  function handleCheck() {
    setHasGuessed(true);

    if (correctAnchor === null) return;

    setAnchorState(parseInt(anchorInput) === correctAnchor ? "correct" : "wrong");
    setDoomsdayState(parseInt(doomsdayInput) === correctDoomsday ? "correct" : "wrong");
    setFinalDayState(parseInt(finalDayInput) === correctFinalDay ? "correct" : "wrong");
  }

  useEffect(() => {
    generateDate();
  }, []);

  useEffect(() => {
    if (date) calculateAnswers(date);
  }, [date]);

  const stateClasses: Record<StepState, string> = {
    idle: "border-white/10 bg-white/[0.03] text-gray-200",
    correct: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    wrong: "border-red-500/40 bg-red-500/10 text-red-300",
  };

  const labelClasses =
    "font-mono text-xs tracking-widest uppercase text-violet-400 mb-2 block";

  return (
    <div>
      <div className="mb-10">
        <p className="font-mono text-xs tracking-widest uppercase text-violet-400 mb-2">
          Practice
        </p>
        <h1 className="font-serif text-4xl font-normal text-violet-100 tracking-wide">
          Name the Day
        </h1>
        <p className="text-gray-400 mt-3 text-sm leading-relaxed">
          Given a random date, calculate the day of the week using Conway's Doomsday Algorithm.
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 mb-4 text-center">
        <p className="text-gray-500 font-mono text-xs tracking-widest uppercase mb-3">
          Date
        </p>
        <p className="text-violet-100 text-3xl font-serif tracking-wide">
          {date?.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 mb-4 flex flex-col gap-6">
        <div>
          <label className={labelClasses}>Century Anchor Day</label>
          <select
            value={anchorInput}
            onChange={(e) => setAnchorInput(e.target.value)}
            className={`w-full rounded-lg px-4 py-2.5 text-sm border transition-colors outline-none cursor-pointer ${stateClasses[anchorState]}`}
          >
            <option value="" disabled>
              Select anchor day…
            </option>
            {DAY_NAMES.map((name, i) => (
              <option key={i} value={i} className="bg-gray-900">
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Year's Doomsday</label>
          <select
            value={doomsdayInput}
            onChange={(e) => setDoomsdayInput(e.target.value)}
            className={`w-full rounded-lg px-4 py-2.5 text-sm border transition-colors outline-none cursor-pointer ${stateClasses[doomsdayState]}`}
          >
            <option value="" disabled>
              Select doomsday…
            </option>
            {DAY_NAMES.map((name, i) => (
              <option key={i} value={i} className="bg-gray-900">
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Final Day of Week</label>
          <select
            value={finalDayInput}
            onChange={(e) => setFinalDayInput(e.target.value)}
            className={`w-full rounded-lg px-4 py-2.5 text-sm border transition-colors outline-none cursor-pointer ${stateClasses[finalDayState]}`}
          >
            <option value="" disabled>
              Select day…
            </option>
            {DAY_NAMES.map((name, i) => (
              <option key={i} value={i} className="bg-gray-900">
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {anchorState !== "idle" && (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl px-8 py-5 mb-4 flex flex-col gap-1.5 text-sm font-mono">
          <FeedbackRow
            label="Anchor"
            state={anchorState}
            correct={correctAnchor!}
            getDayName={(n) => DAY_NAMES[n]}
          />
          <FeedbackRow
            label="Doomsday"
            state={doomsdayState}
            correct={correctDoomsday!}
            getDayName={(n) => DAY_NAMES[n]}
          />
          <FeedbackRow
            label="Final Day"
            state={finalDayState}
            correct={correctFinalDay!}
            getDayName={(n) => DAY_NAMES[n]}
          />
        </div>
      )}

      <div className="flex gap-3">
        {!hasGuessed ? (
          <button
            onClick={handleCheck}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-violet-600 hover:bg-violet-500 text-white transition-colors"
          >
            Check
          </button>
        ) : (
          <button
            onClick={() => {
              setAnchorState("wrong");
              setDoomsdayState("wrong");
              setFinalDayState("wrong");
            }}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium bg-amber-600 hover:bg-amber-500 text-white transition-colors"
          >
            Show Solution
          </button>
        )}

        <button
          onClick={generateDate}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-white/10 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors"
        >
          New Date
        </button>
      </div>
    </div>
  );
}

function FeedbackRow({
  label,
  state,
  correct,
  getDayName,
}: {
  label: string;
  state: StepState;
  correct: number;
  getDayName: (n: number) => string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 text-xs tracking-widest uppercase">
        {label}
      </span>
      <span
        className={
          state === "correct" ? "text-emerald-400" : "text-red-400"
        }
      >
        {state === "correct"
          ? "Correct"
          : `Answer: ${getDayName(correct)}`}
      </span>
    </div>
  );
}
