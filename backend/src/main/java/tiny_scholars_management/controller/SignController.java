package tiny_scholars_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tiny_scholars_management.configuration.BaseResponse;
import tiny_scholars_management.dto.request.SignCreateRequest;
import tiny_scholars_management.dto.request.SignUpdateRequest;
import tiny_scholars_management.dto.response.SignResponse;
import tiny_scholars_management.entity.Sign;
import tiny_scholars_management.service.SignService;

import java.util.List;

@RestController
@RequestMapping("/api/signs")
public class SignController {

    @Autowired
    private SignService signService;

    @GetMapping("/{id}")
    public BaseResponse<SignResponse> getSignById(@PathVariable Integer id) {
        SignResponse sign = signService.getSignById(id);
        return BaseResponse.ok(sign);
    }

    @GetMapping
    public BaseResponse<List<SignResponse>> getAllSigns() {
        List<SignResponse> signs = signService.getAllSigns();
        return BaseResponse.ok(signs);
    }

    @PostMapping
    public BaseResponse<Sign> createSign(@RequestBody SignCreateRequest signCreateRequest) {
        Sign sign = signService.createSign(signCreateRequest);
        return BaseResponse.created(sign);
    }

    @PutMapping("/{id}")
    public BaseResponse<Sign> updateSign(@PathVariable("id") Integer id, @RequestBody SignUpdateRequest signUpdateRequest) {
        Sign updatedSign = signService.updateSign(id, signUpdateRequest);
        return BaseResponse.ok(updatedSign);
    }

    @DeleteMapping("/{id}")
    public BaseResponse<String> deleteSign(@PathVariable Integer id) {
        signService.deleteSign(id);
        return BaseResponse.deleted();
    }
}
