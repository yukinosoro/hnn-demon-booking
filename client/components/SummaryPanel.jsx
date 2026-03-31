'use client';

/**
 * SummaryPanel Component
 * Displays booking summary with real-time updates
 * Shows journey details, selected seats, and total fare
 */
export default function SummaryPanel({
  serviceType,
  formData,
  selectedSeats,
  distance,
  travelTime,
  farePerSeat,
  totalFare,
  isSearchCompleted,
  onConfirmBooking,
  onResetBooking,
}) {
  if (!isSearchCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Complete journey details to see summary</p>
        </div>
      </div>
    );
  }

  const hasSelectedSeats = selectedSeats.length > 0;

  return (
    <div className="card-glass rounded-xl p-6 border border-cyan-300/30 sticky top-6">
      <h2 className="text-2xl font-bold text-cyan-100 mb-6">Booking Summary</h2>

      <div className="space-y-6">
        {/* Journey Details */}
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            {serviceType === 'movie' ? 'Movie Details' : 'Journey Details'}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-cyan-200">Passenger:</span>
              <span className="font-semibold text-white">{formData.passengerName}</span>
            </div>
            {serviceType === 'movie' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-cyan-200">Theater:</span>
                  <span className="font-semibold text-white">{formData.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-200">Showtime:</span>
                  <span className="font-semibold text-white">{formData.to}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-cyan-200">Route:</span>
                  <span className="font-semibold text-white">{formData.route || `${formData.from}-${formData.to}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-200">Date:</span>
                  <span className="font-semibold text-white">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-200">Transport Type:</span>
                  <span className="font-semibold text-white">{formData.busType}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Travel Information */}
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Travel Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-cyan-200">Distance:</span>
              <span className="font-semibold text-white">{distance} km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-200">Duration:</span>
              <span className="font-semibold text-white">
                {travelTime.hours}h {travelTime.minutes}m
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-200">Departure:</span>
              <span className="font-semibold text-white">{formData.departureTime}</span>
            </div>
          </div>
        </div>

        {/* Selected Seats */}
        <div className="border-b pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Selected Seats
          </h3>
          {hasSelectedSeats ? (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatId) => (
                <span
                  key={seatId}
                  className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-fadeIn"
                >
                  {seatId}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm italic">No seats selected yet</p>
          )}
        </div>

        {/* Fare Breakdown */}
        <div className="border-b pb-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
            Fare Breakdown
          </h3>
          <div className="space-y-2 text-sm text-cyan-100">
            <div className="flex justify-between">
              <span className="text-cyan-200">Fare per seat:</span>
              <span className="font-semibold text-white">₹{farePerSeat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cyan-200">Number of seats:</span>
              <span className="font-semibold text-white">{selectedSeats.length}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-base">
              <span className="text-white">Total Fare:</span>
              <span className="text-cyan-200">₹{totalFare}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={onConfirmBooking}
            disabled={!hasSelectedSeats}
            className={`w-full py-3 rounded-lg font-bold text-white uppercase tracking-wider transition-all duration-300 transform ${
              hasSelectedSeats
                ? 'bg-gradient-to-r from-teal-400 to-emerald-500 shadow-[0_0_14px_rgba(16,185,129,0.55)] hover:shadow-[0_0_20px_rgba(16,185,129,0.8)] hover:-translate-y-0.5 cursor-pointer'
                : 'bg-gray-500 cursor-not-allowed opacity-60'
            }`}
          >
            ✓ Confirm Booking
          </button>
          <button
            onClick={onResetBooking}
            className="w-full py-2 rounded-lg font-semibold text-cyan-900 bg-cyan-100/30 hover:bg-cyan-100 transition-all duration-300"
          >
            ↻ Reset Selection
          </button>
        </div>

        {/* Success Message */}
        {hasSelectedSeats && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-green-700 text-sm font-semibold">
              Ready to book {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
