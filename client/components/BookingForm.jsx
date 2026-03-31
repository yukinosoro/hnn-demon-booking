'use client';

import { AVAILABLE_ROUTES, BUS_TYPES, DEPARTURE_TIMES } from '@/utils/constants';

/**
 * BookingForm Component
 * Allows users to enter journey details
 * Validates inputs before enabling seat selection
 */
export default function BookingForm({
  formData,
  onFormChange,
  isFormValid,
  onSearchBuses,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchClick = () => {
    if (isFormValid) {
      onSearchBuses();
    }
  };

  return (
    <div className="card-glass rounded-xl p-6 border border-cyan-200/20">
      <h2 className="text-2xl font-bold text-cyan-200 mb-6 tracking-tight">Journey Details</h2>

      <div className="space-y-4">
        {/* Passenger Name */}
        <div>
          <label htmlFor="passengerName" className="block text-sm font-semibold text-gray-700 mb-2">
            Passenger Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="passengerName"
            name="passengerName"
            value={formData.passengerName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-cyan-300/50 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-80 placeholder:text-cyan-100 transition"
          />
        </div>

        {/* Route Selection */}
        <div>
          <label htmlFor="route" className="block text-sm font-semibold text-gray-700 mb-2">
            Route <span className="text-red-500">*</span>
          </label>
          <select
            id="route"
            name="route"
            value={formData.route}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-cyan-300/50 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-80 transition"
          >
            <option value="">Select a route</option>
            {AVAILABLE_ROUTES.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </select>
        </div>

        {/* Journey Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
            Journey Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-cyan-300/50 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-80 transition"
          />
        </div>

        {/* Bus Type */}
        <div>
          <label htmlFor="busType" className="block text-sm font-semibold text-gray-700 mb-2">
            Bus Type <span className="text-red-500">*</span>
          </label>
          <select
            id="busType"
            name="busType"
            value={formData.busType}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select bus type</option>
            {BUS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Departure Time */}
        <div>
          <label htmlFor="departureTime" className="block text-sm font-semibold text-gray-700 mb-2">
            Departure Time <span className="text-red-500">*</span>
          </label>
          <select
            id="departureTime"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-cyan-300/50 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-opacity-80 transition"
          >
            <option value="">Select departure time</option>
            {DEPARTURE_TIMES.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearchClick}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-bold text-white uppercase tracking-wider transition-all duration-300 transform ${
            isFormValid
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_16px_rgba(56,189,248,0.55)] hover:shadow-[0_0_26px_rgba(56,189,248,0.75)] hover:-translate-y-0.5 cursor-pointer'
              : 'bg-gray-500 cursor-not-allowed opacity-60'
          }`}
        >
          Search Buses
        </button>
      </div>
    </div>
  );
}
