export default function Logo() {
  return (
    <div>
      <img
        src='/dont_panic.svg'
        className="relative motion-safe:animate-drift [transform-gpu] [will-change:transform]"
      />
      <style jsx>{`
        @keyframes drift {
          0%   { transform: translate3d(0, 0, 0) rotate(0) scale(1) }
          50%  { transform: translate3d(6px, -8px, 0) rotate(1deg) scale(1.01) }
          100% { transform: translate3d(0, 0, 0) rotate(0) scale(1); }
        }
        .logo-float { animation: drift 10s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .logo-float { animation: none } }
      `}</style>
    </div>
  )
}