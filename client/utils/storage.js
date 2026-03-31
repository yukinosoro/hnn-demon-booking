/**
 * localStorage Operations for Persistence
 */

const BOOKED_SEATS_KEY = 'busReservation_bookedSeats';
const BOOKINGS_HISTORY_KEY = 'busReservation_bookings';

/**
 * Save booked seats to localStorage
 */
export const saveBookedSeats = (seatIds) => {
  try {
    localStorage.setItem(BOOKED_SEATS_KEY, JSON.stringify(seatIds));
    return true;
  } catch (error) {
    console.error('Error saving booked seats:', error);
    return false;
  }
};

/**
 * Load booked seats from localStorage
 */
export const loadBookedSeats = () => {
  try {
    const data = localStorage.getItem(BOOKED_SEATS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading booked seats:', error);
    return [];
  }
};

/**
 * Save booking to history
 */
export const saveBooking = (booking) => {
  try {
    const bookings = loadBookingHistory();
    bookings.push({
      ...booking,
      bookingDate: new Date().toISOString(),
    });
    localStorage.setItem(BOOKINGS_HISTORY_KEY, JSON.stringify(bookings));
    return true;
  } catch (error) {
    console.error('Error saving booking:', error);
    return false;
  }
};

/**
 * Load all bookings from history
 */
export const loadBookingHistory = () => {
  try {
    const data = localStorage.getItem(BOOKINGS_HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading booking history:', error);
    return [];
  }
};

/**
 * Clear all booked seats
 */
export const clearAllBookedSeats = () => {
  try {
    localStorage.removeItem(BOOKED_SEATS_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing booked seats:', error);
    return false;
  }
};

/**
 * Clear booking history
 */
export const clearBookingHistory = () => {
  try {
    localStorage.removeItem(BOOKINGS_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing booking history:', error);
    return false;
  }
};

/**
 * Update entire booking history (e.g. cancel order)
 */
export const updateBookingHistory = (bookings) => {
  try {
    localStorage.setItem(BOOKINGS_HISTORY_KEY, JSON.stringify(bookings));
    return true;
  } catch (error) {
    console.error('Error updating booking history:', error);
    return false;
  }
};

/**
 * Clear all data
 */
export const clearAllData = () => {
  clearAllBookedSeats();
  clearBookingHistory();
};
