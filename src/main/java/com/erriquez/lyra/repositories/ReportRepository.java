package com.erriquez.lyra.repositories;

import com.erriquez.lyra.models.Report;
import com.erriquez.lyra.models.ReportStatus;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ReportRepository extends ElasticsearchRepository< Report, String> {

    List<Report> findReportsByProject(String project);
    Long countReportsByRegistrationDateBetween(LocalDateTime fromDate, LocalDateTime toDate);


    List<Report> findAll();
    void deleteReportById(String id);
    long count();

    long countReportsByStatus(ReportStatus status);

    long countReportsByCategory(String category);

    //long countReportsByProjectAndStatus(String project, String status);

}

