'use client';

import { useState, useEffect, useMemo } from 'react';
import SearchForm from '@/components/SearchForm';
import BusList from '@/components/BusList';
import SeatGrid from '@/components/SeatGrid';
import AddOns from '@/components/AddOns';
import Payment from '@/components/Payment';
import BookingsPage from '@/components/BookingsPage';
import Header from '@/components/Header';
import SuccessOverlay from '@/components/SuccessOverlay';
import CancelOverlay from '@/components/CancelOverlay';

import {
  initializeSeatMatrix,
  toggleSeat,
  getSelectedSeats,
  getBookedSeats,
  markSeatsAsBooked,
  resetSelections,
  countAvailableSeats,
} from '@/utils/seatUtils';

import {
  getRouteInfo,
  calculateTotalFare,
  calculateArrivalTime,
} from '@/utils/fareUtils';

import {
  saveBookedSeats,
  loadBookedSeats,
  saveBooking,
  loadBookingHistory,
  updateBookingHistory,
  clearAllData,
} from '@/utils/storage';

import BookingQueue from '@/utils/bookingQueue';
import { BUS_TYPES, AVAILABLE_ROUTES } from '@/utils/constants';

const citySet = new Set(
  AVAILABLE_ROUTES.flatMap((r) => r.split('-'))
);

const cityOptions = Array.from(citySet);

export default function Home() {
  const [step, setStep] = useState('search');
  const [searchData, setSearchData] = useState({
    passengerName: '',
    from: '',
    to: '',
    date: '',
    busType: BUS_TYPES[0],
  });

  const [availableBuses, setAvailableBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [seatMatrix, setSeatMatrix] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [addons, setAddons] = useState({ insurance: false, cancellation: false });
  const [bookings, setBookings] = useState([]);
  const [serviceType, setServiceType] = useState('bus');
  const [bookingQueue] = useState(() => new BookingQueue());
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [cancelMessage, setCancelMessage] = useState('❌ Booking Cancelled');


  useEffect(() => {
    const booked = loadBookedSeats();
    setSeatMatrix(initializeSeatMatrix(booked));
    setBookings(loadBookingHistory());
  }, []);

  const route = useMemo(() => {
    if (!searchData.from || !searchData.to) return '';
    return `${searchData.from}-${searchData.to}`;
  }, [searchData.from, searchData.to]);

  const canSearch =
    searchData.passengerName.trim().length > 0 &&
    searchData.from &&
    searchData.to &&
    searchData.from !== searchData.to &&
    searchData.date;

  const seatCount = useMemo(() => selectedSeats.length, [selectedSeats]);
  const seatFare = selectedBus ? selectedBus.farePerSeat : 0;

  const addOnCost =
    (addons.insurance ? 70 : 0) + (addons.cancellation ? 90 : 0);

  const totalFare = seatCount * seatFare + addOnCost;

  const handleSearch = () => {
    if (!canSearch) return;

    const routeName = `${searchData.from}-${searchData.to}`;

    let info = getRouteInfo(routeName);
    let baseFare = 0;
    let travelTime = { hours: 0, minutes: 0 };

    if (serviceType === 'movie') {
      // movie uses fixed price and no distance
      info = {
        distance: 0,
        travelTime: { hours: 0, minutes: 0 },
        farePerSeat: 180,
      };
      baseFare = info.farePerSeat;
    } else {
      // bus and train: fallback route info if needed
      if (!info.distance || info.distance === 0) {
        const fallbackDistance = Math.floor(Math.random() * 500 + 300);
        const fallbackSpeed = 60;
        const fallbackHours = fallbackDistance / fallbackSpeed;
        info = {
          distance: fallbackDistance,
          travelTime: {
            hours: Math.floor(fallbackHours),
            minutes: Math.round((fallbackHours % 1) * 60),
          },
          farePerSeat: Math.ceil(fallbackDistance * 1.5),
        };
      }

      baseFare = info.farePerSeat * (serviceType === 'train' ? 0.8 : 1);
      travelTime = info.travelTime;
    }

    const generator =
      serviceType === 'movie'
        ? [{ name: 'Express Cinema', offset: 0 }]
        : serviceType === 'train'
        ? [
            { name: 'Green Express', offset: 1 },
            { name: 'Bullet Train', offset: 2 },
          ]
        : [
            { name: 'Demon Express', offset: 1 },
            { name: 'Hashira Cruiser', offset: 2 },
            { name: 'Neon Shinobi', offset: 3 },
          ];

    const list = generator.map((item, idx) => {
      const departureTime =
        serviceType === 'movie'
          ? searchData.to || '06:00 PM'
          : `${6 + idx * 3}:00 AM`;
      const arrivalTime =
        serviceType === 'movie'
          ? `${parseInt(departureTime.split(':')[0], 10) + 3}:00 PM`
          : calculateArrivalTime(departureTime, travelTime.hours, travelTime.minutes);

      const fareForService =
        serviceType === 'movie'
          ? info.farePerSeat
          : Math.ceil(baseFare * (1 + idx * 0.06));

      return {
        id: `${Date.now()}-${idx}`,
        busName: item.name,
        serviceType,
        departure: departureTime,
        arrival: arrivalTime,
        farePerSeat: fareForService,
        availableSeats: countAvailableSeats(seatMatrix),
        route: routeName,
        distance: info.distance,
        travelTime: travelTime,
        type: serviceType === 'movie' ? 'Movie Seat' : searchData.busType,
        bookedSeats: getBookedSeats(seatMatrix),
      };
    });

    setAvailableBuses(list);
    setStep('list');
  };

  const handleSelectBus = (bus) => {
    setSelectedBus(bus);
    const bookedSeats = loadBookedSeats();
    setSeatMatrix(initializeSeatMatrix(bookedSeats));
    setSelectedSeats([]);
    setStep('seat');
  };

  const handleSeatClick = (row, col) => {
    const seat = seatMatrix[row][col];
    if (seat.isBooked) return;

    const newMatrix = toggleSeat(seatMatrix, row, col);
    setSeatMatrix(newMatrix);

    const selected = getSelectedSeats(newMatrix);
    setSelectedSeats(selected);

    if (selected.length > 8) {
      alert('You can select a maximum of 8 seats.');
      setSelectedSeats(selected.slice(0, 8));
    }
  };

  const handleAddonsNext = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      setStep('seat');
      return;
    }
    setStep('payment');
  };

  const handlePayNow = () => {
    if (!selectedBus || selectedSeats.length === 0) {
      alert('Pick seats first.');
      return;
    }

    const booking = {
      id: Date.now(),
      serviceType,
      passengerName: searchData.passengerName,
      route: serviceType === 'movie' ? `${searchData.from} @ ${searchData.to}` : route,
      from: searchData.from,
      to: searchData.to,
      date: searchData.date,
      busName: selectedBus.busName,
      departure: selectedBus.departure,
      arrival: selectedBus.arrival,
      busType: selectedBus.type,
      seats: [...selectedSeats],
      addons: { ...addons },
      farePerSeat: seatFare,
      totalFare,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    };

    bookingQueue.enqueue(booking);
    const processed = bookingQueue.dequeue();

    const matrixAfterBooking = markSeatsAsBooked(seatMatrix, selectedSeats);
    setSeatMatrix(matrixAfterBooking);
    saveBookedSeats(getBookedSeats(matrixAfterBooking));
    saveBooking(processed);
    setBookings(loadBookingHistory());

    setShowSuccess(true);
    setSelectedSeats([]);
    setAddons({ insurance: false, cancellation: false });
    setStep('bookings');

    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  };

  const handleCancelBooking = (bookingId) => {
    const current = loadBookingHistory();

    const updated = current.map((item) =>
      item.id === bookingId ? { ...item, status: 'cancelled' } : item
    );

    // Enforce only most recent 2 cancelled bookings
    const active = updated.filter((item) => item.status !== 'cancelled');
    const cancelledBookings = updated
      .filter((item) => item.status === 'cancelled')
      .sort((a, b) => b.id - a.id) // newest first via numeric id timestamp
      .slice(0, 2);

    const finalBookings = [...active, ...cancelledBookings];

    updateBookingHistory(finalBookings);
    setBookings(finalBookings);

    const cancelled = current.find((item) => item.id === bookingId);
    if (cancelled && cancelled.seats && cancelled.status !== 'cancelled') {
      const remaining = getBookedSeats(seatMatrix).filter(
        (seat) => !cancelled.seats.includes(seat)
      );
      saveBookedSeats(remaining);
      setSeatMatrix(initializeSeatMatrix(remaining));
    }

    setCancelMessage('❌ Booking Cancelled');
    setShowCancel(true);
    setTimeout(() => setShowCancel(false), 2000);
  };

  return (
    <div className="min-h-screen anime-background text-cyan-100">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {showSuccess && <SuccessOverlay />}
        {showCancel && <CancelOverlay message={cancelMessage} />}
        <div className="rounded-2xl border border-cyan-400/25 bg-white/5 p-4 backdrop-blur-lg shadow-2xl shadow-cyan-900/40 flex flex-wrap gap-2">
          {['search', 'list', 'seat', 'addons', 'payment', 'bookings'].map((label) => (
            <button
              key={label}
              onClick={() => setStep(label)}
              className={`rounded-full px-4 py-1 text-xs uppercase tracking-wide transition duration-300 ${
                step === label
                  ? 'bg-cyan-400 text-black shadow-[0_0_14px_rgba(34,211,238,0.7)]'
                  : 'bg-white/10 text-cyan-200 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {step === 'search' && (
          <>
            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-cyan-300/20 bg-black/20 p-3">
              {['bus', 'train', 'movie'].map((type) => (
                <button
                  key={type}
                  onClick={() => { setServiceType(type); setStep('search'); }}
                  className={`px-4 py-2 rounded-2xl transition duration-300 ${
                    serviceType === type
                      ? type === 'bus'
                        ? 'bg-blue-500 text-white shadow-[0_0_16px_rgba(59,130,246,0.5)]'
                        : type === 'train'
                        ? 'bg-emerald-500 text-white shadow-[0_0_16px_rgba(34,197,94,0.5)]'
                        : 'bg-violet-500 text-white shadow-[0_0_16px_rgba(168,85,247,0.5)]'
                      : 'bg-white/10 text-cyan-100 hover:bg-white/20'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
            <SearchForm
              serviceType={serviceType}
              searchData={searchData}
              onUpdate={setSearchData}
              canSearch={canSearch}
              onSearch={handleSearch}
              cityOptions={cityOptions}
            />
          </>
        )}

        {step === 'list' && (
          <BusList
            buses={availableBuses}
            onSelectBus={handleSelectBus}
            onBack={() => setStep('search')}
          />
        )}

        {step === 'seat' && selectedBus && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <SeatGrid
              serviceType={serviceType}
              seatMatrix={seatMatrix}
              onSeatClick={handleSeatClick}
              availableCount={countAvailableSeats(seatMatrix)}
              bookedCount={getBookedSeats(seatMatrix).length}
            />

            <div className="card-glass rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Seat Selection</h2>
              <p className="mb-2">Selected Seats: {selectedSeats.join(', ') || 'None'}</p>
              <p className="mb-2">Seat Fare: ₹{seatFare}</p>
              <p className="font-semibold">SubTotal: ₹{selectedSeats.length * seatFare}</p>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setStep('addons')}
                  disabled={selectedSeats.length === 0}
                  className="w-full rounded-2xl bg-cyan-500 px-4 py-2 text-black font-bold transition hover:scale-105 disabled:opacity-40"
                >
                  Continue to Add-Ons
                </button>
                <button
                  onClick={() => setStep('list')}
                  className="w-full rounded-2xl border border-cyan-400 px-4 py-2"
                >
                  Back to Bus List
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'addons' && selectedBus && (
          <AddOns
            addons={addons}
            setAddons={setAddons}
            seatCost={selectedSeats.length * seatFare}
            addOnCost={addOnCost}
            totalFare={totalFare}
            onBack={() => setStep('seat')}
            onNext={handleAddonsNext}
          />
        )}

        {step === 'payment' && selectedBus && (
          <Payment
            passengerName={searchData.passengerName}
            route={route}
            date={searchData.date}
            busName={selectedBus.busName}
            departure={selectedBus.departure}
            arrival={selectedBus.arrival}
            seats={selectedSeats}
            seatCost={selectedSeats.length * seatFare}
            addOnCost={addOnCost}
            totalFare={totalFare}
            onBack={() => setStep('addons')}
            onPayNow={handlePayNow}
          />
        )}

        {step === 'bookings' && (
          <BookingsPage
            bookings={bookings}
            onCancel={handleCancelBooking}
            onNewBooking={() => setStep('search')}
          />
        )}
      </main>

      <footer className="text-center text-gray-400 pb-8">
        HNN - Demon Booking • Next.js + Tailwind • DSA + LocalStorage
      </footer>
    </div>
  );
}
