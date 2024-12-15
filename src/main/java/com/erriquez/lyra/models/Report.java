package com.erriquez.lyra.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import java.time.LocalDateTime;

@Document(indexName = "report_index")
public class Report {
    @Id
    private String id;

    @Field(type = FieldType.Text, name = "email")
    private String email;

    @Field(type = FieldType.Text, name = "title")
    private String title;

    @Field(type = FieldType.Text, name = "description")
    private String description;

    @Field(type = FieldType.Text, name = "project")
    private String project;

    @Field(type = FieldType.Text, name = "image")
    private String image;

    @Field(type = FieldType.Date,  format = {}, pattern = "yyyy-MM-dd'T'HH:mm:ss", name = "registrationDate")
    private LocalDateTime registrationDate;

    @Field(type = FieldType.Date, format = {}, pattern = "yyyy-MM-dd'T'HH:mm:ss", name = "closingDate")
    private LocalDateTime closingDate;

    @Field(type = FieldType.Text, name = "category")
    private String category;

    @Field(type = FieldType.Text, name = "status")
    private String status;

    public Report(String id, String email, String title, String description, String project, String image, LocalDateTime registrationDate, LocalDateTime closingDate, String category, String status) {
        this.id = id;
        this.email = email;
        this.title = title;
        this.description = description;
        this.project = project;
        this.image = image;
        this.registrationDate = registrationDate;
        this.closingDate = closingDate;
        this.category = category;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(LocalDateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    public LocalDateTime getClosingDate() {
        return closingDate;
    }

    public void setClosingDate(LocalDateTime closingDate) {
        this.closingDate = closingDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


}
