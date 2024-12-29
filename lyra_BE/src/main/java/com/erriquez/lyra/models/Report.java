package com.erriquez.lyra.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import lombok.Data;

import java.time.LocalDateTime;

@Data
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
    private ReportStatus status;

    public Report(String id, String email, String title, String description, String project, String image, LocalDateTime registrationDate, LocalDateTime closingDate, String category, ReportStatus status) {
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


}
