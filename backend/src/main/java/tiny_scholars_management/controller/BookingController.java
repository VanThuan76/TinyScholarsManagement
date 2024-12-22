package tiny_scholars_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tiny_scholars_management.configuration.BaseResponse;
import tiny_scholars_management.dto.request.BookingCreateRequest;
import tiny_scholars_management.dto.request.BookingUpdateRequest;
import tiny_scholars_management.dto.response.BookingResponse;
import tiny_scholars_management.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/{id}")
    public BaseResponse<BookingResponse> getBookingById(@PathVariable Integer id) {
        BookingResponse booking = bookingService.getBookingById(id);
        return BaseResponse.ok(booking);
    }

    @GetMapping
    public BaseResponse<List<BookingResponse>> getAllBookings() {
        List<BookingResponse> bookings = bookingService.getAllBookings();
        return BaseResponse.ok(bookings);
    }

    @PostMapping
    public BaseResponse<BookingResponse> createBooking(@RequestBody BookingCreateRequest bookingCreateRequest) {
        BookingResponse booking = bookingService.createBooking(bookingCreateRequest);
        return BaseResponse.created(booking);
    }

    @PutMapping("/{id}")
    public BaseResponse<BookingResponse> updateBooking(@PathVariable("id") Integer id, @RequestBody BookingUpdateRequest bookingUpdateRequest) {
        BookingResponse updatedBooking = bookingService.updateBooking(id, bookingUpdateRequest);
        return BaseResponse.ok(updatedBooking);
    }

    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteBooking(@PathVariable Integer id) {
        bookingService.deleteBooking(id);
        return BaseResponse.deleted();
    }
}
