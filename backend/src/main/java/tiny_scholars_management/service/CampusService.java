package tiny_scholars_management.service;

import tiny_scholars_management.dto.request.CampusCreateRequest;
import tiny_scholars_management.dto.request.CampusUpdateRequest;
import tiny_scholars_management.dto.response.CampusResponse;
import tiny_scholars_management.entity.Campus;

import java.util.List;

public interface CampusService {

    CampusResponse getCampusById(Integer id);

    List<CampusResponse> getAllCampuses();

    Campus createCampus(CampusCreateRequest campusCreateRequest);

    Campus updateCampus(Integer id, CampusUpdateRequest campusUpdateRequest);

    void deleteCampus(Integer id);
}
