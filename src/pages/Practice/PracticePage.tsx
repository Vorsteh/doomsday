
import { useState, useEffect } from "react";

export default function PracticePage() {

  const [date, setDate] = useState(null);

  function generateDate() {
    const newDate = new Date(
      new Date(2000, 0, 1).getTime() +
      Math.random() * (new Date().getTime() - new Date(2000, 0, 1).getTime())
    );
    setDate(newDate);
  }

  useEffect(() => {
    generateDate();
    return () => {
      return true;
    }
  }, [])
  

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

      <div className="bg-white/[0.03] border border-white/10 rounded-xl p-8 flex">
        <p className="text-gray-300 text-lg mx-auto">{date && date.toDateString()}</p>

        
      </div>
    </div>
  )
}

