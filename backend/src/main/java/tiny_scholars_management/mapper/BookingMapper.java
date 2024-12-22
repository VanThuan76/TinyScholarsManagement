package tiny_scholars_management.mapper;

import org.modelmapper.ModelMapper;
import tiny_scholars_management.dto.response.BookingResponse;
import tiny_scholars_management.dto.response.CampusResponse;
import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.entity.Booking;

public class BookingMapper {
    private static final ModelMapper modelMapper = new ModelMapper();

    public static BookingResponse convertToBookingResponse(Booking booking, CampusResponse campusResponse, ChildResponse childResponse) {
        BookingResponse response = new BookingResponse();
        response.setId(booking.getId());
        response.setCampus(campusResponse);
        response.setRoomName(booking.getRoomName());
        response.setBookedDate(booking.getBookedDate());
        response.setBookTimeFrom(booking.getBookTimeFrom());
        response.setBookTimeTo(booking.getBookTimeTo());
        response.setChild(childResponse);
        return response;
    }
}
