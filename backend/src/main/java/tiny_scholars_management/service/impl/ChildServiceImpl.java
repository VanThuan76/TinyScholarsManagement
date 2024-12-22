package tiny_scholars_management.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tiny_scholars_management.dto.request.ChildCreateRequest;
import tiny_scholars_management.dto.request.ChildUpdateRequest;
import tiny_scholars_management.dto.response.ChildResponse;
import tiny_scholars_management.entity.Child;
import tiny_scholars_management.entity.User;
import tiny_scholars_management.mapper.ChildMapper;
import tiny_scholars_management.repository.ChildRepository;
import tiny_scholars_management.repository.UserRepository;
import tiny_scholars_management.service.ChildService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChildServiceImpl implements ChildService {

    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ChildResponse getChildById(Integer id) {
        Child child = childRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Child not found"));

        return ChildMapper.convertToChildResponse(child);
    }

    @Override
    public List<ChildResponse> getAllChildren() {
        return childRepository.findAll()
                .stream()
                .map(ChildMapper::convertToChildResponse)
                .collect(Collectors.toList());
    }


    @Override
    public Child createChild(ChildCreateRequest childCreateRequest) {
        User user = userRepository.findById(childCreateRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Child child = new Child();
        child.setUser(user);
        child.setFirstName(childCreateRequest.getFirstName());
        child.setLastName(childCreateRequest.getLastName());
        child.setGender(childCreateRequest.getGender());
        child.setBirthday(childCreateRequest.getBirthday());
        child.setCreatedDate(LocalDateTime.now());

        return childRepository.save(child);
    }

    @Override
    public Child updateChild(Integer id, ChildUpdateRequest childUpdateRequest) {
        Child existingChild = childRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Child not found"));

        User user = userRepository.findById(childUpdateRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingChild.setUser(user);
        existingChild.setFirstName(childUpdateRequest.getFirstName());
        existingChild.setLastName(childUpdateRequest.getLastName());
        existingChild.setGender(childUpdateRequest.getGender());
        existingChild.setBirthday(childUpdateRequest.getBirthday());
        existingChild.setModifiedDate(LocalDateTime.now());

        return childRepository.save(existingChild);
    }

    @Override
    public void deleteChild(Integer id) {
        Child child = childRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Child not found"));
        childRepository.delete(child);
    }
}
