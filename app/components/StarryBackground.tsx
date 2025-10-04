import { Starfield } from "./ui/starfield-1";

export default function StarryBackground() {
  return (
    <div className="max-w-screen-2xl absolute inset-0 -z-10 pointer-events-none">
      <Starfield />
    </div>
  )
}