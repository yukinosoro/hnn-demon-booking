'use client';

export default function AddOns({ addons, setAddons, seatCost, addOnCost, totalFare, onBack, onNext }) {
  return (
    <div className="card-glass rounded-2xl p-6 border border-cyan-300/30 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-cyan-100 mb-4">Add-Ons</h2>

      <div className="flex gap-6 flex-wrap">
        <label className="flex items-center gap-2 bg-black/30 p-4 rounded-xl border border-cyan-500/30 w-full md:w-1/2">
          <input
            type="checkbox"
            checked={addons.insurance}
            onChange={(e) => setAddons({ ...addons, insurance: e.target.checked })}
          />
          <span className="text-cyan-200">Travel Insurance</span>
          <span className="ml-auto text-cyan-100">₹70</span>
        </label>

        <label className="flex items-center gap-2 bg-black/30 p-4 rounded-xl border border-cyan-500/30 w-full md:w-1/2">
          <input
            type="checkbox"
            checked={addons.cancellation}
            onChange={(e) => setAddons({ ...addons, cancellation: e.target.checked })}
          />
          <span className="text-cyan-200">Free Cancellation</span>
          <span className="ml-auto text-cyan-100">₹90</span>
        </label>
      </div>

      <div className="mt-5 border-t border-cyan-300/20 pt-4 text-cyan-100">
        <p className="text-sm">Seat cost: ₹{seatCost}</p>
        <p className="text-sm">Add-ons: ₹{addOnCost}</p>
        <p className="text-xl font-bold mt-2">Total: ₹{totalFare}</p>
      </div>

      <div className="mt-5 flex gap-3 flex-wrap">
        <button
          onClick={onBack}
          className="btn-glow rounded-xl px-4 py-2 text-black"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="btn-glow rounded-xl px-4 py-2 font-bold text-black hover:scale-105"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
}
