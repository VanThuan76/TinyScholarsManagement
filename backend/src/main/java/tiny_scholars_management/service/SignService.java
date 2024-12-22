package tiny_scholars_management.service;

import tiny_scholars_management.dto.request.SignCreateRequest;
import tiny_scholars_management.dto.request.SignUpdateRequest;
import tiny_scholars_management.dto.response.SignResponse;
import tiny_scholars_management.entity.Sign;

import java.util.List;

public interface SignService {

    SignResponse getSignById(Integer id);

    List<SignResponse> getAllSigns();

    Sign createSign(SignCreateRequest signCreateRequest);

    Sign updateSign(Integer id, SignUpdateRequest signUpdateRequest);

    void deleteSign(Integer id);
}
