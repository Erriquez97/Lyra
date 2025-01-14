package com.erriquez.lyra.request;

import jakarta.validation.constraints.NotBlank;

public class SendEmailRequest {

    @NotBlank
    private String toEmail;

    @NotBlank
    private String body;

    @NotBlank
    private String subject;

    public String getToEmail() {
        return toEmail;
    }

    public void setToEmail(String toEmail) {
        this.toEmail = toEmail;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
