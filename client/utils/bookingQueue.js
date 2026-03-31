/**
 * Booking Queue (FIFO DSA)
 * Manages booking requests in First-In-First-Out order
 */
class BookingQueue {
  constructor() {
    this.queue = [];
    this.processedQueue = [];
  }

  /**
   * Enqueue a booking request
   */
  enqueue(booking) {
    this.queue.push({
      id: Date.now(),
      timestamp: new Date(),
      ...booking,
    });
  }

  /**
   * Dequeue and process the first booking request
   */
  dequeue() {
    if (this.queue.length === 0) {
      return null;
    }
    const booking = this.queue.shift();
    this.processedQueue.push({
      ...booking,
      processedAt: new Date(),
    });
    return booking;
  }

  /**
   * Get the next booking without removing it
   */
  peek() {
    return this.queue.length > 0 ? this.queue[0] : null;
  }

  /**
   * Get queue size
   */
  size() {
    return this.queue.length;
  }

  /**
   * Check if queue is empty
   */
  isEmpty() {
    return this.queue.length === 0;
  }

  /**
   * Get all bookings in queue
   */
  getAllBookings() {
    return [...this.queue];
  }

  /**
   * Get all processed bookings
   */
  getProcessedBookings() {
    return [...this.processedQueue];
  }

  /**
   * Clear the queue
   */
  clear() {
    this.queue = [];
  }

  /**
   * Clear processed bookings
   */
  clearProcessed() {
    this.processedQueue = [];
  }
}

export default BookingQueue;
