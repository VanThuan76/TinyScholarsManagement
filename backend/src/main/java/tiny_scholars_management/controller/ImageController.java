package tiny_scholars_management.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tiny_scholars_management.configuration.BaseResponse;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("/api/image")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ImageController {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static/photos/";

    @PostMapping("/upload-file")
    public BaseResponse<?> uploadFiles(@RequestParam("file") MultipartFile[] files) {
        List<Map<String, Object>> uploadedFilesInfo = new ArrayList<>();

        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        for (MultipartFile file : files) {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename != null && !originalFilename.isEmpty()) {
                String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();

                if (!isValidImageExtension(extension)) {
                    return BaseResponse.error();
                }

                try {
                    String uid = UUID.randomUUID().toString();
                    Path filePath = Paths.get(UPLOAD_DIR + uid + "." + extension);
                    File serverFile = filePath.toFile();

                    try (BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile))) {
                        stream.write(file.getBytes());
                    }

                    String fileUrl = "http://localhost:8080/photos/" + uid + "." + extension;

                    Map<String, Object> fileInfo = new HashMap<>();
                    fileInfo.put("url", fileUrl);
                    uploadedFilesInfo.add(fileInfo);

                } catch (IOException e) {
                    e.printStackTrace();
                    return BaseResponse.internalServerError("Lỗi khi upload file");
                }
            } else {
                return BaseResponse.error();
            }
        }

        return BaseResponse.ok(uploadedFilesInfo);
    }

    private boolean isValidImageExtension(String extension) {
        return extension.equals("png") || extension.equals("jpg") || extension.equals("jpeg") ||
                extension.equals("gif") || extension.equals("svg");
    }
}
