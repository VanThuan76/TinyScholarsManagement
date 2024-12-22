package tiny_scholars_management.service;

import tiny_scholars_management.dto.request.ChildCreateRequest;
import tiny_scholars_management.dto.request.ChildUpdateRequest;
import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.entity.Child;

import java.util.List;

public interface ChildService {

    ChildResponse getChildById(Integer id);

    List<ChildResponse> getAllChildren();

    Child createChild(ChildCreateRequest childCreateRequest);

    Child updateChild(Integer id, ChildUpdateRequest childUpdateRequest);

    void deleteChild(Integer id);
}
