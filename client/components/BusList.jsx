'use client';

export default function BusList({ buses, onSelectBus, onBack }) {
  if (!buses || buses.length === 0) {
    return (
      <div className="card-glass rounded-2xl p-6 border border-cyan-300/30">
        <h2 className="text-xl font-bold text-cyan-100 mb-4">No buses found</h2>
        <p className="text-sm text-cyan-200">Try another route or date.</p>
        <button onClick={onBack} className="mt-4 rounded-xl border border-cyan-500 px-4 py-2 text-cyan-100 hover:bg-white/10">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {buses.map((bus) => (
        <div key={bus.id} className="card-glass rounded-2xl p-5 border border-cyan-400/25 shadow-lg">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-2xl font-black text-cyan-100">{bus.busName}</h3>
              <p className="text-sm text-cyan-200">{bus.route}</p>
            </div>
            <p className="text-lg font-bold">₹{bus.farePerSeat}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-cyan-200 mb-4">
            <div>
              <p>Departure</p>
              <p className="font-semibold text-cyan-50">{bus.departure}</p>
            </div>
            <div>
              <p>Arrival</p>
              <p className="font-semibold text-cyan-50">{bus.arrival}</p>
            </div>
            <div>
              <p>Duration</p>
              <p className="font-semibold text-cyan-50">{bus.travelTime.hours}h {bus.travelTime.minutes}m</p>
            </div>
            <div>
              <p>Avail seats</p>
              <p className="font-semibold text-cyan-50">{bus.availableSeats}</p>
            </div>
          </div>

          <button
            onClick={() => onSelectBus(bus)}
            className="btn-glow w-full rounded-xl py-2 font-bold text-black transition hover:scale-105"
          >
            Select Seats
          </button>
        </div>
      ))}

      <button onClick={onBack} className="btn-glow rounded-xl px-4 py-2 text-black">
        Back
      </button>
    </div>
  );
}
