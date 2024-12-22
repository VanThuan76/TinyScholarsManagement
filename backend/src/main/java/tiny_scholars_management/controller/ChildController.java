package tiny_scholars_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tiny_scholars_management.configuration.BaseResponse;
import tiny_scholars_management.dto.request.ChildCreateRequest;
import tiny_scholars_management.dto.request.ChildUpdateRequest;
import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.entity.Child;
import tiny_scholars_management.service.ChildService;

import java.util.List;

@RestController
@RequestMapping("/api/children")
public class ChildController {

    @Autowired
    private ChildService childService;

    @GetMapping("/{id}")
    public BaseResponse<ChildResponse> getChildById(@PathVariable Integer id) {
        ChildResponse child = childService.getChildById(id);
        return BaseResponse.ok(child);
    }

    @GetMapping
    public BaseResponse<List<ChildResponse>> getAllChildren() {
        List<ChildResponse> children = childService.getAllChildren();
        return BaseResponse.ok(children);
    }

    @PostMapping
    public BaseResponse<Child> createChild(@RequestBody ChildCreateRequest childCreateRequest) {
        Child child = childService.createChild(childCreateRequest);
        return BaseResponse.created(child);
    }

    @PutMapping("/{id}")
    public BaseResponse<Child> updateChild(@PathVariable("id") Integer id, @RequestBody ChildUpdateRequest childUpdateRequest) {
        Child updatedChild = childService.updateChild(id, childUpdateRequest);
        return BaseResponse.ok(updatedChild);
    }

    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteChild(@PathVariable Integer id) {
        childService.deleteChild(id);
        return BaseResponse.deleted();
    }
}
