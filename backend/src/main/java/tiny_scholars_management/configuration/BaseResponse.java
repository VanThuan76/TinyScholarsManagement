package tiny_scholars_management.configuration;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseResponse<T> implements Serializable {

    private T data;
    private Integer statusCode;
    private String message;

    public BaseResponse(T data, Integer statusCode, String message) {
        this.data = data;
        this.statusCode = statusCode;
        this.message = message;
    }

    public static <T> BaseResponse<T> ok() {
        return new BaseResponse<>(null, HttpStatus.OK.value(), "success");
    }

    public static <T> BaseResponse<T> ok(T data) {
        return new BaseResponse<>(data, HttpStatus.OK.value(), "success");
    }

    public static <T> BaseResponse<T> created() {
        return new BaseResponse<>(null, HttpStatus.CREATED.value(), "created");
    }

    public static <T> BaseResponse<T> deleted() {
        return new BaseResponse<>(null, HttpStatus.NO_CONTENT.value(), "deleted");
    }

    public static <T> BaseResponse<T> created(T data) {
        return new BaseResponse<>(data, HttpStatus.CREATED.value(), "created");
    }

    public static <T> BaseResponse<T> internalServerError() {
        return new BaseResponse<>(null, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal Server Error");
    }

    public static <T> BaseResponse<T> error() {
        return new BaseResponse<>(null, HttpStatus.BAD_REQUEST.value(), "error");
    }

    public static <T> BaseResponse<T> error(Integer statusCode, String message) {
        return new BaseResponse<>(null, statusCode, message);
    }

    public static <T> BaseResponse<T> error(T data, Integer statusCode) {
        return new BaseResponse<>(data, statusCode, "error");
    }

    public static <T> BaseResponse<T> error(T data, int statusCode, String message) {
        return new BaseResponse<>(data, statusCode, message);
    }

    public static <T> BaseResponse<T> badRequest(T data) {
        return new BaseResponse<>(data, 400, "error");
    }

    public static <T> BaseResponse<T> badRequest(String message) {
        return new BaseResponse<>(null, 400, message);
    }

    public static <T> BaseResponse<T> internalServerError(T data) {
        return new BaseResponse<>(data, 500, "error");
    }

    public static <T> BaseResponse<T> internalServerError(String message) {
        return new BaseResponse<>(null, 500, message);
    }

    public static <T> BaseResponse<T> internalServerError(T data, String message) {
        return new BaseResponse<>(data, 500, message);
    }
}