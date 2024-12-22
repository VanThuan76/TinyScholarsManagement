package tiny_scholars_management.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tiny_scholars_management.dto.request.CampusCreateRequest;
import tiny_scholars_management.dto.request.CampusUpdateRequest;
import tiny_scholars_management.dto.response.CampusResponse;
import tiny_scholars_management.dto.response.RoomResponse;
import tiny_scholars_management.entity.Campus;
import tiny_scholars_management.mapper.CampusMapper;
import tiny_scholars_management.mapper.RoomMapper;
import tiny_scholars_management.repository.CampusRepository;
import tiny_scholars_management.repository.RoomRepository;
import tiny_scholars_management.service.CampusService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampusServiceImpl implements CampusService {

    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private RoomRepository roomRepository;

    public Campus findCampusById(Integer folderId) {
        return this.campusRepository.findById(folderId)
                .orElseThrow(() -> new RuntimeException("Folder not found!"));
    }

    @Override
    public CampusResponse getCampusById(Integer id) {
        Campus campus = findCampusById(id);
        List<RoomResponse> rooms = roomRepository.findAllByCampus(campus).stream()
                .map(RoomMapper::convertToRoomResponse).collect(Collectors.toList());

        return CampusMapper.convertToCampusResponse(campus, rooms);
    }

    @Override
    public List<CampusResponse> getAllCampuses() {
        List<Campus> campuses = campusRepository.findAll();
        List<CampusResponse> responses = new ArrayList<>();

        for (Campus campus : campuses) {
            List<RoomResponse> roomResponses = roomRepository.findAllByCampus(campus).stream()
                    .map(RoomMapper::convertToRoomResponse).collect(Collectors.toList());
            CampusResponse campusResponse = CampusMapper.convertToCampusResponse(campus, roomResponses);
            responses.add(campusResponse);
        }
        return responses;
    }

    @Override
    public Campus createCampus(CampusCreateRequest campusCreateRequest) {
        Campus campus = new Campus();
        campus.setName(campusCreateRequest.getName());
        campus.setAddress(campusCreateRequest.getAddress());
        campus.setCampusEmail(campusCreateRequest.getCampusEmail());
        campus.setCampusPhoneNumber(campusCreateRequest.getCampusPhoneNumber());

        return campusRepository.save(campus);
    }

    @Override
    public Campus updateCampus(Integer id, CampusUpdateRequest campusUpdateRequest) {
        Campus existingCampus = campusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campus not found"));
        existingCampus.setName(campusUpdateRequest.getName());
        existingCampus.setAddress(campusUpdateRequest.getAddress());
        existingCampus.setCampusEmail(campusUpdateRequest.getCampusEmail());
        existingCampus.setCampusPhoneNumber(campusUpdateRequest.getCampusPhoneNumber());

        return campusRepository.save(existingCampus);
    }

    @Override
    public void deleteCampus(Integer id) {
        Campus campus = campusRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campus not found"));
        campusRepository.delete(campus);
    }
}
