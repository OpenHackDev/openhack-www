export function LoadingSpinner() {
  return (
    <div className="inset-0 z-50 flex items-center justify-center bg-white/60 top-0 fixed">
      <div className="flex gap-3 items-end h-14">
        {[
          { color: "bg-oh-green", delay: "0s" },
          { color: "bg-oh-yellow", delay: "0.15s" },
          { color: "bg-oh-blue", delay: "0.3s" },
        ].map(({ color, delay }, i) => (
          <div
            key={i}
            className={`w-7 h-7 border-4 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${color}`}
            style={{
              animation: "oh-square-bounce 1s ease-in-out infinite",
              animationDelay: delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
