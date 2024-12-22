package tiny_scholars_management.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tiny_scholars_management.dto.request.SignCreateRequest;
import tiny_scholars_management.dto.request.SignUpdateRequest;
import tiny_scholars_management.dto.response.SignResponse;
import tiny_scholars_management.entity.Booking;
import tiny_scholars_management.entity.Sign;
import tiny_scholars_management.entity.User;
import tiny_scholars_management.mapper.SignMapper;
import tiny_scholars_management.repository.BookingRepository;
import tiny_scholars_management.repository.SignRepository;
import tiny_scholars_management.repository.UserRepository;
import tiny_scholars_management.service.SignService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SignServiceImpl implements SignService {

    @Autowired
    private SignRepository signRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public SignResponse getSignById(Integer id) {
        Sign sign = signRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sign not found"));

        return SignMapper.convertToSignResponse(sign);
    }

    @Override
    public List<SignResponse> getAllSigns() {
        return signRepository.findAll()
                .stream()
                .map(SignMapper::convertToSignResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Sign createSign(SignCreateRequest signCreateRequest) {
        User user = userRepository.findById(signCreateRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository.findById(signCreateRequest.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Sign sign = new Sign();
        sign.setUser(user);
        sign.setBooking(booking);
        sign.setType(signCreateRequest.getType());
        sign.setSignTime(signCreateRequest.getSignTime());
        sign.setSignature(signCreateRequest.getSignature());
        sign.setCreatedDate(LocalDateTime.now());

        return signRepository.save(sign);
    }

    @Override
    public Sign updateSign(Integer id, SignUpdateRequest signUpdateRequest) {
        Sign existingSign = signRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sign not found"));

        User user = userRepository.findById(signUpdateRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Booking booking = bookingRepository.findById(signUpdateRequest.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        existingSign.setUser(user);
        existingSign.setBooking(booking);
        existingSign.setType(signUpdateRequest.getType());
        existingSign.setSignTime(signUpdateRequest.getSignTime());
        existingSign.setSignature(signUpdateRequest.getSignature());
        existingSign.setModifiedDate(LocalDateTime.now());

        return signRepository.save(existingSign);
    }

    @Override
    public void deleteSign(Integer id) {
        Sign sign = signRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sign not found"));
        signRepository.delete(sign);
    }
}
