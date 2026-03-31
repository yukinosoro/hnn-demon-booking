'use client';

export default function SearchForm({ serviceType, searchData, onUpdate, canSearch, onSearch, cityOptions }) {
  const labels = {
    bus: {
      title: "Search Buses",
      typeLabel: "Bus Type",
      fromLabel: "From",
      toLabel: "To"
    },
    train: {
      title: "Search Trains",
      typeLabel: "Train Type",
      fromLabel: "From",
      toLabel: "To"
    },
    movie: {
      title: "Search Movies",
      typeLabel: "Seat Type",
      fromLabel: "Theater",
      toLabel: "Showtime"
    }
  };

  const current = labels[serviceType];

  const handleChange = (field, value) => {
    onUpdate({ ...searchData, [field]: value });
  };

  return (
    <div className="card-glass rounded-2xl p-6 border border-cyan-300/30">
      <h2 className="text-2xl font-bold text-cyan-100 mb-4">{current.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={searchData.passengerName}
          onChange={(e) => handleChange('passengerName', e.target.value)}
          placeholder="Passenger Name"
          className="rounded-xl bg-black/40 border border-cyan-400/30 p-3 text-white placeholder-cyan-200"
        />

        <div className="space-y-2">
          <label className="text-sm text-cyan-200">
            {current.fromLabel}
          </label>
          <select
            value={searchData.from}
            onChange={(e) => handleChange('from', e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-cyan-400/30 p-3 text-white"
          >
            <option value="">{serviceType === 'movie' ? 'Select theater' : 'Select city'}</option>
            {cityOptions.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-cyan-200">
            {current.toLabel}
          </label>
          {serviceType === 'movie' ? (
            <select
              value={searchData.to}
              onChange={(e) => handleChange('to', e.target.value)}
              className="w-full rounded-xl bg-black/40 border border-cyan-400/30 p-3 text-white"
            >
              <option value="">Select time</option>
              <option value="04:00 PM">04:00 PM</option>
              <option value="07:00 PM">07:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
            </select>
          ) : (
            <select
              value={searchData.to}
              onChange={(e) => handleChange('to', e.target.value)}
              className="w-full rounded-xl bg-black/40 border border-cyan-400/30 p-3 text-white"
            >
              <option value="">Select city</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm text-cyan-200">Journey Date</label>
          <input
            type="date"
            value={searchData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full rounded-xl bg-black/40 border border-cyan-400/30 p-3 text-white"
          />
        </div>

        {serviceType !== 'movie' && (
          <div className="space-y-2">
            <label className="text-sm text-cyan-200">{current.typeLabel}</label>
            <select
              value={searchData.busType}
              onChange={(e) => handleChange('busType', e.target.value)}
              className="w-full rounded-xl bg-black/40 border border-cyan-400/30 p-3 text-white"
            >
              <option value="AC Sleeper">AC Sleeper</option>
              <option value="AC Seater">AC Seater</option>
              <option value="Non-AC Sleeper">Non-AC Sleeper</option>
            </select>
          </div>
        )}
      </div>

      <button
        onClick={onSearch}
        disabled={!canSearch}
        className={`btn-glow mt-6 w-full rounded-2xl py-3 font-bold text-black ${
          canSearch ? 'hover:from-blue-500 hover:to-cyan-400' : 'opacity-60 cursor-not-allowed'
        }`}
      >
        {current.title}
      </button>

      {!canSearch && (
        <p className="mt-2 text-sm text-red-300">Please complete all required details.</p>
      )}
    </div>
  );
}
