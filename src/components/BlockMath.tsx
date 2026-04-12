import katex from "katex"
import { useEffect, useRef } from "react"

export function BlockMath({ math }: { math: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      katex.render(math, ref.current, {
        displayMode: true,
        throwOnError: false,
      })
    }
  }, [math])

  return <div ref={ref} />
}
