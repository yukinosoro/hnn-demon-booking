'use client';

import { SEAT_COLUMNS } from '@/utils/constants';

/**
 * SeatGrid Component
 * Displays 40 seats in a 10x4 grid (2D Matrix)
 * Interactive seat selection with visual feedback
 */
export default function SeatGrid({
  serviceType,
  seatMatrix,
  onSeatClick,
  availableCount,
  bookedCount,
}) {
  if (!seatMatrix || seatMatrix.length === 0) {
    return (
      <div className="card-glass rounded-2xl p-6 border border-cyan-500/20 flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-cyan-200 text-lg">Select journey details to view available seats</p>
        </div>
      </div>
    );
  }

  const handleSeatClick = (row, col) => {
    onSeatClick(row, col);
  };

  return (
    <div className="card-glass rounded-xl p-6 border border-purple-300/30">
      <h2 className="text-2xl font-bold text-cyan-200 mb-4">
        {serviceType === 'movie' ? 'Screen Seat Selection' : 'Seat Selection'}
      </h2>

      {/* Seat Legend */}
      <div className="mb-6 p-4 bg-white/10 rounded-lg border border-cyan-300/20 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-cyan-200 mb-3">Seat Legend</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-300 rounded border border-green-400"></div>
            <span className="text-gray-700">Available ({availableCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded border border-blue-600"></div>
            <span className="text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-400 rounded border border-red-500 cursor-not-allowed opacity-50"></div>
            <span className="text-gray-700">Booked ({bookedCount})</span>
          </div>
        </div>
      </div>

      {/* Seat Grid with Screen indicator */}
      <div className="border-t-4 border-gray-800 pt-6 pb-4 mb-6">
        <p className="text-center text-gray-600 font-semibold mb-6 text-sm">
          🎬 SCREEN (Front)
        </p>

        {/* Seats Grid */}
        <div className="space-y-3">
          {seatMatrix.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-3 justify-center items-center"
            >
              <span className="w-6 text-center text-xs font-semibold text-gray-500">
                {rowIndex + 1}
              </span>
              <div className="flex gap-3">
                {row.map((seat, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => handleSeatClick(rowIndex, colIndex)}
                    disabled={seat.isBooked}
                    className={`
                      w-10 h-10 rounded-lg border-2 font-semibold text-xs transition-all duration-300 transform
                      flex items-center justify-center
                      ${
                        seat.isBooked
                          ? 'bg-red-500 border-red-600 text-white cursor-not-allowed opacity-80'
                          : seat.isSelected
                          ? 'bg-gradient-to-r from-fuchsia-500 to-blue-500 border-fuchsia-400 text-white scale-110 shadow-[0_0_16px_rgba(99,102,241,0.58)]'
                          : 'bg-emerald-400 border-emerald-500 text-white hover:scale-110 hover:shadow-[0_0_14px_rgba(34,197,94,0.6)] cursor-pointer'
                      }
                    `}
                    title={`Seat ${seat.id} - ${seat.isBooked ? 'Booked' : seat.isSelected ? 'Selected' : 'Available'}`}
                  >
                    {seat.id}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs">
        A1-D10 | Aisle Width = Medium
      </p>
    </div>
  );
}
