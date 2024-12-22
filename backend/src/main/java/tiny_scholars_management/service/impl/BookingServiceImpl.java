package tiny_scholars_management.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tiny_scholars_management.dto.request.BookingCreateRequest;
import tiny_scholars_management.dto.request.BookingUpdateRequest;
import tiny_scholars_management.dto.response.BookingResponse;
import tiny_scholars_management.dto.response.CampusResponse;
import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.dto.response.RoomResponse;
import tiny_scholars_management.entity.Booking;
import tiny_scholars_management.entity.Campus;
import tiny_scholars_management.entity.Child;
import tiny_scholars_management.mapper.BookingMapper;
import tiny_scholars_management.mapper.CampusMapper;
import tiny_scholars_management.mapper.ChildMapper;
import tiny_scholars_management.mapper.RoomMapper;
import tiny_scholars_management.repository.BookingRepository;
import tiny_scholars_management.repository.CampusRepository;
import tiny_scholars_management.repository.ChildRepository;
import tiny_scholars_management.repository.RoomRepository;
import tiny_scholars_management.service.BookingService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Override
    public BookingResponse getBookingById(Integer id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Campus campus = booking.getCampus();

        List<RoomResponse> rooms = roomRepository.findAllByCampus(campus).stream()
                .map(RoomMapper::convertToRoomResponse)
                .collect(Collectors.toList());
        CampusResponse campusResponse = CampusMapper.convertToCampusResponse(campus, rooms);

        Child child = booking.getChild();
        ChildResponse childResponse = ChildMapper.convertToChildResponse(child);

        return BookingMapper.convertToBookingResponse(booking, campusResponse, childResponse);
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        List<BookingResponse> responses = new ArrayList<>();

        for (Booking booking : bookings) {
            Campus campus = booking.getCampus();

            List<RoomResponse> rooms = roomRepository.findAllByCampus(campus).stream()
                    .map(RoomMapper::convertToRoomResponse)
                    .collect(Collectors.toList());
            CampusResponse campusResponse = CampusMapper.convertToCampusResponse(campus, rooms);

            Child child = booking.getChild();
            ChildResponse childResponse = ChildMapper.convertToChildResponse(child);

            BookingResponse bookingResponse = BookingMapper.convertToBookingResponse(booking, campusResponse, childResponse);
            responses.add(bookingResponse);
        }
        return responses;
    }

    @Override
    public BookingResponse createBooking(BookingCreateRequest bookingCreateRequest) {
        Child child = childRepository.findById(bookingCreateRequest.getChildId())
                .orElseThrow(() -> new RuntimeException("Child not found"));

        Campus campus = campusRepository.findById(bookingCreateRequest.getCampusId())
                .orElseThrow(() -> new RuntimeException("Campus not found"));

        Booking booking = new Booking();
        booking.setChild(child);
        booking.setCampus(campus);
        booking.setRoomName(bookingCreateRequest.getRoomName());
        booking.setBookedDate(bookingCreateRequest.getBookedDate());
        booking.setBookTimeFrom(bookingCreateRequest.getBookTimeFrom());
        booking.setBookTimeTo(bookingCreateRequest.getBookTimeTo());
        booking.setCreatedDate(LocalDateTime.now());

        Booking savedBooking = bookingRepository.save(booking);

        List<RoomResponse> rooms = roomRepository.findAllByCampus(campus).stream()
                .map(RoomMapper::convertToRoomResponse)
                .collect(Collectors.toList());

        CampusResponse campusResponse = CampusMapper.convertToCampusResponse(campus, rooms);

        ChildResponse childResponse = ChildMapper.convertToChildResponse(child);

        return BookingMapper.convertToBookingResponse(savedBooking, campusResponse, childResponse);
    }


    @Override
    public BookingResponse updateBooking(Integer id, BookingUpdateRequest bookingUpdateRequest) {
        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Child child = childRepository.findById(bookingUpdateRequest.getChildId())
                .orElseThrow(() -> new RuntimeException("Child not found"));

        Campus campus = campusRepository.findById(bookingUpdateRequest.getCampusId())
                .orElseThrow(() -> new RuntimeException("Campus not found"));

        existingBooking.setChild(child);
        existingBooking.setCampus(campus);
        existingBooking.setRoomName(bookingUpdateRequest.getRoomName());
        existingBooking.setBookedDate(bookingUpdateRequest.getBookedDate());
        existingBooking.setBookTimeFrom(bookingUpdateRequest.getBookTimeFrom());
        existingBooking.setBookTimeTo(bookingUpdateRequest.getBookTimeTo());
        existingBooking.setModifiedDate(LocalDateTime.now());

        Booking updatedBooking = bookingRepository.save(existingBooking);

        List<RoomResponse> rooms = roomRepository.findAllByCampus(campus).stream()
                .map(RoomMapper::convertToRoomResponse)
                .collect(Collectors.toList());

        CampusResponse campusResponse = CampusMapper.convertToCampusResponse(campus, rooms);

        ChildResponse childResponse = ChildMapper.convertToChildResponse(child);

        return BookingMapper.convertToBookingResponse(updatedBooking, campusResponse, childResponse);
    }

    @Override
    public void deleteBooking(Integer id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        bookingRepository.delete(booking);
    }
}
