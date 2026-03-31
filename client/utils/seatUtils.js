import { SEAT_ROWS, SEAT_COLUMNS, TOTAL_SEATS } from './constants';

/**
 * Initialize seat matrix (2D Array DSA)
 * Matrix structure: 10 rows x 4 columns representing 40 seats
 * Each cell contains seat information: { id, row, col, isBooked, isSelected }
 */
export const initializeSeatMatrix = (bookedSeats = []) => {
  const matrix = [];
  const bookedSet = new Set(bookedSeats); // HashMap for O(1) lookup

  for (let row = 0; row < SEAT_ROWS; row++) {
    const rowSeats = [];
    for (let col = 0; col < SEAT_COLUMNS; col++) {
      const seatId = row * SEAT_COLUMNS + col + 1; // Seat numbering from 1 to 40
      rowSeats.push({
        id: seatId,
        row,
        col,
        isBooked: bookedSet.has(seatId),
        isSelected: false,
      });
    }
    matrix.push(rowSeats);
  }

  return matrix;
};

/**
 * Toggle seat selection in the matrix (2D Array operation)
 */
export const toggleSeat = (matrix, row, col) => {
  const newMatrix = matrix.map(r => [...r]);
  const seat = newMatrix[row][col];

  // Prevent toggling booked seats
  if (seat.isBooked) {
    return newMatrix;
  }

  seat.isSelected = !seat.isSelected;
  return newMatrix;
};

/**
 * Get all selected seats from matrix with sorting (Sorting DSA)
 */
export const getSelectedSeats = (matrix) => {
  const selected = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].isSelected) {
        selected.push(matrix[row][col].id);
      }
    }
  }

  // Sort selected seats numerically (Sorting DSA)
  return selected.sort((a, b) => a - b);
};

/**
 * Get all booked seats from matrix
 */
export const getBookedSeats = (matrix) => {
  const booked = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col].isBooked) {
        booked.push(matrix[row][col].id);
      }
    }
  }

  return booked.sort((a, b) => a - b);
};

/**
 * Find nearest available seat (Greedy DSA)
 * Returns the first available seat found
 */
export const findNearestAvailableSeat = (matrix) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const seat = matrix[row][col];
      if (!seat.isBooked && !seat.isSelected) {
        return seat.id;
      }
    }
  }
  return null;
};

/**
 * Check if specific seats are available (Searching DSA)
 */
export const areSeatcsAvailable = (matrix, seatIds) => {
  const seatSet = new Set(seatIds); // Use Set for O(1) lookup

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const seat = matrix[row][col];
      if (seatSet.has(seat.id) && (seat.isBooked || seat.isSelected)) {
        return false; // Seat not available
      }
    }
  }

  return true;
};

/**
 * Mark selected seats as booked in the matrix
 */
export const markSeatsAsBooked = (matrix, seatIds) => {
  const newMatrix = matrix.map(r => [...r]);
  const seatSet = new Set(seatIds);

  for (let row = 0; row < newMatrix.length; row++) {
    for (let col = 0; col < newMatrix[row].length; col++) {
      const seat = newMatrix[row][col];
      if (seatSet.has(seat.id)) {
        seat.isBooked = true;
        seat.isSelected = false;
      }
    }
  }

  return newMatrix;
};

/**
 * Reset all selections but keep booked seats
 */
export const resetSelections = (matrix) => {
  return matrix.map(row =>
    row.map(seat => ({
      ...seat,
      isSelected: false,
    }))
  );
};

/**
 * Count available seats in the matrix
 */
export const countAvailableSeats = (matrix) => {
  let count = 0;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!matrix[row][col].isBooked) {
        count++;
      }
    }
  }

  return count;
};
