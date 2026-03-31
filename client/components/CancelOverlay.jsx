'use client';

export default function CancelOverlay({ message = '❌ Booking Cancelled' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-red-400/30 shadow-[0_0_24px_rgba(239,68,68,0.25)] text-center animate-scaleIn">
        <h2 className="text-3xl font-bold text-red-300 drop-shadow-[0_0_15px_rgba(239,68,68,0.9)]">
          {message}
        </h2>
      </div>
    </div>
  );
}
