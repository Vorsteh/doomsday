import { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  const [showSolution, setShowSolution] = useState(false);

  function generateDate() {
    setHasGuessed(false);
    setShowSolution(false);

    const start = new Date(1700, 0, 1).getTime();
    const end = new Date(2100, 11, 31).getTime();
    const newDate = new Date(start + Math.random() * (end - start));

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

    if (
      correctAnchor === null ||
      correctDoomsday === null ||
      correctFinalDay === null
    )
      return;

    const a = parseInt(anchorInput);
    const d = parseInt(doomsdayInput);
    const f = parseInt(finalDayInput);

    setAnchorState(a === correctAnchor ? "correct" : "wrong");
    setDoomsdayState(d === correctDoomsday ? "correct" : "wrong");
    setFinalDayState(f === correctFinalDay ? "correct" : "wrong");
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
        <h1 className="font-serif text-4xl text-violet-100 tracking-wide">
          Name the Day
        </h1>
        <p className="text-gray-400 mt-3 text-sm">
          Calculate the weekday using Conway's Doomsday Algorithm.
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 mb-4 text-center">
        <p className="text-gray-500 font-mono text-xs uppercase mb-3">
          Date
        </p>
        <p className="text-violet-100 text-3xl font-serif">
          {date?.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 mb-4 flex flex-col gap-6">
        {!showSolution ? (
          <>
            <div>
              <label className={labelClasses}>Century Anchor Day</label>
              <select
                value={anchorInput}
                onChange={(e) => setAnchorInput(e.target.value)}
                className={`w-full rounded-lg px-4 py-2.5 text-sm border ${stateClasses[anchorState]}`}
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
                className={`w-full rounded-lg px-4 py-2.5 text-sm border ${stateClasses[doomsdayState]}`}
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
              <label className={labelClasses}>Final Day</label>
              <select
                value={finalDayInput}
                onChange={(e) => setFinalDayInput(e.target.value)}
                className={`w-full rounded-lg px-4 py-2.5 text-sm border ${stateClasses[finalDayState]}`}
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
          </>
        ) : (
          <div className="text-gray-300 text-sm flex flex-col gap-4">
            {date &&
              correctAnchor !== null &&
              correctDoomsday !== null &&
              correctFinalDay !== null && (
                <>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Century Anchor
                    </p>
                    <BlockMath math={`\\text{Anchor} = ${correctAnchor}`} />
                    <p>{DAY_NAMES[correctAnchor]}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Year Breakdown
                    </p>
                    <BlockMath
                      math={`
                        \\begin{aligned}
                        y &= ${date.getFullYear()} \\\\
                        c &= \\lfloor y / 100 \\rfloor = ${Math.floor(
                        date.getFullYear() / 100
                      )} \\\\
                        y' &= y \\mod 100 = ${date.getFullYear() % 100}
                        \\end{aligned}
                      `}
                    />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Doomsday Calculation
                    </p>
                    <BlockMath
                      math={`
                        \\begin{aligned}
                        a &= \\lfloor ${
                        date.getFullYear() % 100
                      } / 12 \\rfloor = ${Math.floor(
                        (date.getFullYear() % 100) / 12
                      )} \\\\
                        b &= ${date.getFullYear() % 100} \\mod 12 = ${
                        (date.getFullYear() % 100) % 12
                      } \\\\
                        c &= \\lfloor b / 4 \\rfloor = ${Math.floor(
                        ((date.getFullYear() % 100) % 12) / 4
                      )} \\\\
                        d &= (a + b + c + \\text{anchor}) \\mod 7 \\\\
                        &= ${correctDoomsday}
                        \\end{aligned}
                        `}
                    />
                    <p>{DAY_NAMES[correctDoomsday]}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">
                      Final Day
                    </p>
                    <BlockMath math={`\\text{Day} = ${correctFinalDay}`} />
                    <p className="text-lg">
                      {DAY_NAMES[correctFinalDay]}
                    </p>
                  </div>
                </>
              )}
          </div>
        )}
      </div>

      {(hasGuessed || showSolution) && (
        <div className="bg-white/[0.03] border border-white/10 rounded-xl px-8 py-5 mb-4 flex flex-col gap-2 text-sm font-mono">
          <FeedbackRow
            label="Anchor"
            state={anchorState}
            correct={correctAnchor}
          />
          <FeedbackRow
            label="Doomsday"
            state={doomsdayState}
            correct={correctDoomsday}
          />
          <FeedbackRow
            label="Final Day"
            state={finalDayState}
            correct={correctFinalDay}
          />
        </div>
      )}

      <div className="flex gap-3">
        {!hasGuessed ? (
          <button
            onClick={handleCheck}
            className="flex-1 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white"
          >
            Check
          </button>
        ) : (
          <button
            onClick={() => setShowSolution(true)}
            className="flex-1 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white"
          >
            Show Solution
          </button>
        )}

        <button
          onClick={generateDate}
          className="flex-1 py-2.5 rounded-lg border border-white/10 text-gray-400 hover:text-gray-200"
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
}: {
  label: string;
  state: StepState;
  correct: number | null;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500 text-xs uppercase">
        {label}
      </span>
      <span
        className={
          state === "correct"
            ? "text-emerald-400"
            : "text-red-400"
        }
      >
        {state === "correct"
          ? "Correct"
          : correct !== null
          ? `Answer: ${DAY_NAMES[correct]}`
          : ""}
      </span>
    </div>
  );
}
