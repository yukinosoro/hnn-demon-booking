'use client';

/**
 * Header Component
 * Displays the title and logo of the bus reservation system
 */
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-[#050726] via-[#0b1e3b] to-[#0d1630] backdrop-blur-xl border-b border-blue-500/20 text-white shadow-[0_8px_40px_rgba(12,16,41,0.55)]">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="text-4xl">�</div>
          <div>
            <h1 className="text-3xl font-bold">HNN - Demon Booking</h1>
            <p className="text-blue-100 text-sm">Book Your Journey, Reserve Your Seat</p>
          </div>
        </div>
      </div>
    </header>
  );
}
