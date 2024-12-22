package tiny_scholars_management.service;

import tiny_scholars_management.dto.request.BookingCreateRequest;
import tiny_scholars_management.dto.request.BookingUpdateRequest;
import tiny_scholars_management.dto.response.BookingResponse;

import java.util.List;

public interface BookingService {

    BookingResponse getBookingById(Integer id);

    List<BookingResponse> getAllBookings();

    BookingResponse createBooking(BookingCreateRequest bookingCreateRequest);

    BookingResponse updateBooking(Integer id, BookingUpdateRequest bookingUpdateRequest);

    void deleteBooking(Integer id);
}
