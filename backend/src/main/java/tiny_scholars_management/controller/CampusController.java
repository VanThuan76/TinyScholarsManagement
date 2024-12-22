package tiny_scholars_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tiny_scholars_management.configuration.BaseResponse;
import tiny_scholars_management.dto.request.CampusCreateRequest;
import tiny_scholars_management.dto.request.CampusUpdateRequest;
import tiny_scholars_management.dto.response.CampusResponse;
import tiny_scholars_management.entity.Campus;
import tiny_scholars_management.service.CampusService;

import java.util.List;

@RestController
@RequestMapping("/api/campuses")
public class CampusController {

    @Autowired
    private CampusService campusService;

    @GetMapping("/{id}")
    public BaseResponse<CampusResponse> getCampusById(@PathVariable Integer id) {
        CampusResponse campus = campusService.getCampusById(id);
        return BaseResponse.ok(campus);
    }

    @GetMapping
    public BaseResponse<List<CampusResponse>> getAllCampuses() {
        List<CampusResponse> campuses = campusService.getAllCampuses();
        return BaseResponse.ok(campuses);
    }

    @PostMapping
    public BaseResponse<Campus> createCampus(@RequestBody CampusCreateRequest campusCreateRequest) {
        Campus campus = campusService.createCampus(campusCreateRequest);
        return BaseResponse.created(campus);
    }

    @PutMapping("/{id}")
    public BaseResponse<Campus> updateCampus(@PathVariable("id") Integer id, @RequestBody CampusUpdateRequest campusUpdateRequest) {
        Campus updatedCampus = campusService.updateCampus(id, campusUpdateRequest);
        return BaseResponse.ok(updatedCampus);
    }

    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteCampus(@PathVariable Integer id) {
        campusService.deleteCampus(id);
        return BaseResponse.deleted();
    }
}
