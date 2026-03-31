'use client';

export default function Payment({ passengerName, route, date, busName, departure, arrival, seats, seatCost, addOnCost, totalFare, onBack, onPayNow }) {
  return (
    <div className="card-glass rounded-2xl p-6 border border-cyan-300/30 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-100 mb-4">Payment Summary</h2>

      <div className="space-y-2 text-cyan-100">
        <p><span className="font-semibold text-cyan-200">Passenger:</span> {passengerName}</p>
        <p><span className="font-semibold text-cyan-200">Route:</span> {route}</p>
        <p><span className="font-semibold text-cyan-200">Date:</span> {date}</p>
        <p><span className="font-semibold text-cyan-200">Bus:</span> {busName}</p>
        <p><span className="font-semibold text-cyan-200">Departure:</span> {departure}</p>
        <p><span className="font-semibold text-cyan-200">Arrival:</span> {arrival}</p>
        <p><span className="font-semibold text-cyan-200">Seats:</span> {seats.join(', ')}</p>
      </div>

      <div className="mt-4 border-t border-cyan-300/20 pt-4 text-cyan-100">
        <p className="text-sm">Seat total: ₹{seatCost}</p>
        <p className="text-sm">Add-ons: ₹{addOnCost}</p>
        <p className="text-lg font-bold">Total payment: ₹{totalFare}</p>
      </div>

      <div className="mt-5 flex gap-3 flex-wrap">
        <button onClick={onBack} className="btn-glow rounded-xl px-4 py-2 text-black">
          Back
        </button>
        <button onClick={onPayNow} className="btn-glow rounded-xl px-4 py-2 font-bold text-black hover:scale-105">
          Pay Now
        </button>
      </div>
    </div>
  );
}
