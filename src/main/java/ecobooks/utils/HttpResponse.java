package ecobooks.utils;

public class HttpResponse {
    private String message;
    private int statusCode;
    private Object data;

    // Constructors
    public HttpResponse(String message, int statusCode, Object data) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }

    public HttpResponse(String message, int statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
