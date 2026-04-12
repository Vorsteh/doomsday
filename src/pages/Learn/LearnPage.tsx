import { PageContainer } from "../../components/PageContainer"
import { BlockMath } from "../../components/BlockMath"


export default function LearnPage() {
  return (
    <PageContainer>
      
      <h1 className="text-3xl font-serif text-violet-100 mb-8">
        Learn the Doomsday Algorithm
      </h1>

      <div className="flex flex-col gap-10 text-sm text-gray-300">

        <section>
          <h2 className="text-violet-400 font-mono uppercase text-xs mb-2">
            Step 1
          </h2>
          <h3 className="text-lg text-violet-200 mb-2">
            Day Number System
          </h3>
          <p>
            0 = Sunday, 1 = Monday, ..., 6 = Saturday
          </p>
        </section>

        <section>
          <h2 className="text-violet-400 font-mono uppercase text-xs mb-2">
            Step 2
          </h2>
          <h3 className="text-lg text-violet-200 mb-2">
            Century Anchor Day
          </h3>
          <ul className="mt-2 space-y-1">
            <li>1700 → Sunday (0)</li>
            <li>1800 → Friday (5)</li>
            <li>1900 → Wednesday (3)</li>
            <li>2000 → Tuesday (2)</li>
          </ul>
          <p className="mt-2 text-gray-500">
            Pattern repeats every 400 years.
          </p>
        </section>

        <section>
          <h2 className="text-violet-400 font-mono uppercase text-xs mb-2">
            Step 3
          </h2>
          <h3 className="text-lg text-violet-200 mb-2">
            Year Doomsday Calculation
          </h3>

          <p className="mb-3">
            Let the last two digits of the year be{" "}
            <span className="font-mono text-violet-300">y</span>.
          </p>

          <BlockMath math={`a = \\left\\lfloor \\frac{y}{12} \\right\\rfloor`} />
          <BlockMath math={`b = y \\bmod 12`} />
          <BlockMath math={`c = \\left\\lfloor \\frac{b}{4} \\right\\rfloor`} />

          <div className="mt-4">
            <BlockMath math={`\\text{Doomsday} = (\\text{anchor} + a + b + c) \\bmod 7`} />
          </div>

          <p className="mt-4 text-gray-400">
            Example: 2005 → Doomsday = Monday (1)
          </p>
        </section>

        <section>
          <h2 className="text-violet-400 font-mono uppercase text-xs mb-2">
            Step 4
          </h2>
          <h3 className="text-lg text-violet-200 mb-2">
            Doomsday Dates
          </h3>

          <ul className="space-y-1">
            <li>4/4, 6/6, 8/8, 10/10, 12/12</li>
            <li>3/14 (π day)</li>
            <li>9/5 and 5/9</li>
            <li>7/11 and 11/7</li>
          </ul>

          <p className="mt-3">January & February:</p>
          <ul className="space-y-1">
            <li>Jan 3 (4 in leap years)</li>
            <li>Feb 28 (29 in leap years)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-violet-400 font-mono uppercase text-xs mb-2">
            Step 5
          </h2>
          <h3 className="text-lg text-violet-200 mb-2">
            Final Day Calculation
          </h3>

          <BlockMath math={`\\text{Final Day} = (\\text{Doomsday} + \\Delta) \\bmod 7`} />

          <p className="mt-3 text-gray-400">
            Example: April 6 is 2 days after April 4 → add 2
          </p>
        </section>

        <section className="border border-violet-500/20 bg-violet-500/5 rounded-xl p-5">
          <h3 className="text-violet-300 font-mono text-xs uppercase mb-3">
            Mental Math Tip
          </h3>

          <p className="mb-3">
            You can estimate{" "}
            <span className="font-mono text-violet-300">⌊y / 12⌋</span>{" "}
            quickly using this pattern:
          </p>

          <BlockMath
            math={`
            \\begin{aligned}
            0 &\\rightarrow 0 \\\\
            12 &\\rightarrow 1 \\\\
            24 &\\rightarrow 2 \\\\
            36 &\\rightarrow 3 \\\\
            48 &\\rightarrow 4 \\\\
            60 &\\rightarrow 5 \\\\
            72 &\\rightarrow 6 \\\\
            84 &\\rightarrow 7 \\\\
            96 &\\rightarrow 8
            \\end{aligned}
            `}
          />

          <p className="text-gray-400 mt-3">
            This avoids division and makes mental calculation much faster.
          </p>
        </section>

      </div>
    </PageContainer>
  )
}
