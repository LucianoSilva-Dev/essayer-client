export function Background() {
  return (
    <div
      className="absolute inset-0 rounded-2xl size-[110%] z-0 opacity-60"
      style={{
        background: "radial-gradient(circle, brand-teal-dark 0%, brand-teal-dark 30%, brand-teal-dark 80%)",
        filter: "blur(80px)",
      }}
    />
  )
}
