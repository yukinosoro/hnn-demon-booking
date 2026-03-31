'use client';

export default function SuccessOverlay({ message = 'Booking Confirmed!' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-emerald-400/30 bg-white/10 p-8 text-center shadow-[0_0_24px_rgba(34,197,94,0.35)] backdrop-blur-lg animate-scaleIn">
        <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-300/50 bg-emerald-100/10 shadow-glow-green">
          <span className="text-5xl text-emerald-300">✓</span>
        </div>
        <h2 className="text-3xl font-bold text-emerald-200 drop-shadow-[0_0_12px_rgba(34,197,94,0.75)]">
          {message}
        </h2>
      </div>
    </div>
  );
}
