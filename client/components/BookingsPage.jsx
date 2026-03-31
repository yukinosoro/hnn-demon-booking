'use client';

export default function BookingsPage({ bookings, onCancel, onNewBooking }) {
  return (
    <div className="card-glass rounded-2xl p-6 border border-cyan-300/30 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold text-cyan-100">Your Bookings</h2>
        <button
          onClick={onNewBooking}
          className="btn-glow rounded-xl px-4 py-2 font-bold text-black"
        >
          New Booking
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="text-cyan-200">No booking records yet.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((item) => (
            <div
              key={item.id}
              className={`rounded-xl p-4 border ${
                item.status === 'cancelled'
                  ? 'border-red-400/40 bg-red-900/10'
                  : 'border-cyan-400/30 bg-cyan-900/10'
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-1 overflow-hidden">
                  <p className="text-sm text-cyan-200">
                    #{item.id} • {item.serviceType?.charAt(0).toUpperCase() + item.serviceType?.slice(1)} • 
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      item.status === 'cancelled' ? 'bg-red-700 text-red-300' : 'bg-emerald-700 text-emerald-200'
                    }`}>
                      {item.status === 'cancelled' ? 'Cancelled' : 'Active'}
                    </span>
                  </p>
                  <p className="font-semibold text-cyan-100">{item.busName} ({item.route})</p>
                  <p className="text-xs text-cyan-300">{item.date} | {item.departure} - {item.arrival}</p>
                  <p className="text-sm">Seats: {item.seats.join(', ')}</p>
                  <p className="text-sm">Total: ₹{item.totalFare}</p>
                </div>
                <div className="text-right">
                  {item.status !== 'cancelled' ? (
                    <button
                      onClick={() => onCancel(item.id)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-xs font-semibold text-white hover:scale-105 transition duration-300"
                    >
                      Cancel
                    </button>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-700/40 px-2 py-1 text-xs font-semibold text-red-300">
                      Cancelled
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
