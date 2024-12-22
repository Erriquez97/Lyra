package com.erriquez.lyra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.erriquez.lyra.models.Project;
import com.erriquez.lyra.models.Report;
import com.erriquez.lyra.models.ReportStatus;
import com.erriquez.lyra.repositories.ReportRepository;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final ProjectService projectService;

    @Autowired
    public ReportService(ReportRepository reportRepository, ProjectService projectService) {
        this.reportRepository = reportRepository;
        this.projectService = projectService;
    }

    public LocalDateTime createDateLessMonths(int months) {
        return LocalDateTime.now().minusMonths(months);
    }

    public Report addReport(Report report) {
        report.setRegistrationDate(LocalDateTime.now());
        report.setStatus(ReportStatus.OPEN);
        report.setId(UUID.randomUUID().toString());

        Optional<Project> optionalProject = projectService.findProjectByName(report.getProject());
            if (optionalProject.isPresent()) {
                Project project = optionalProject.get();
                project.setTotalReports(project.getTotalReports() + 1);
                project.setOpenReports(project.getOpenReports() + 1);
                projectService.updateProject(project);
            }
        
        return reportRepository.save(report);
    }

    public Optional<Report> findReportById(String id) {
        return reportRepository.findById(id);
    }

    public long count() {
        return reportRepository.count();
    }

    public long countReportsByStatus(ReportStatus status) {
        return reportRepository.countReportsByStatus(status);
    }

    public long[] countReportsBetweenDates() {
        LocalDateTime today = LocalDateTime.now();
        LocalDateTime lastWeek = today.minus(7, ChronoUnit.DAYS);
        LocalDateTime lastMonth = today.minus(1, ChronoUnit.MONTHS);
        LocalDateTime lastYear = today.minus(1, ChronoUnit.YEARS);

        return new long[]{
            reportRepository.countReportsByRegistrationDateBetween(lastWeek, today),
            reportRepository.countReportsByRegistrationDateBetween(lastMonth, today),
            reportRepository.countReportsByRegistrationDateBetween(lastYear, today)
        };
    }

    public long[] countReportsByMonth() {
        long[] counts = new long[12];
        LocalDateTime now = LocalDateTime.now();
        for (int i = 0; i < 12; i++) {
            LocalDateTime start = now.minusMonths(i + 1);
            LocalDateTime end = now.minusMonths(i);
            counts[11 - i] = reportRepository.countReportsByRegistrationDateBetween(start, end);
        }
        return counts;
    }

    public long[] countReportsByCategories(String[] categories) {

        long[] count = new long[categories.length];
        for(int i =0; i< categories.length;i++){
            count[i]= reportRepository.countReportsByCategory(categories[i]);
        }

        return count;
    }

    public Report updateReport(Report report) {
        if (report.getStatus()== ReportStatus.OPEN) {
            report.setClosingDate(LocalDateTime.now());
            report.setStatus(ReportStatus.CLOSED);

            Optional<Project> optionalProject = projectService.findProjectByName(report.getProject());
            if (optionalProject.isPresent()) {
                Project project = optionalProject.get();
                project.setOpenReports(project.getOpenReports() - 1);
                projectService.updateProject(project);
            }
        }
        return reportRepository.save(report);
    }

    public List<Report> findAllReports() {
        return reportRepository.findAll();
    }

    Sort.TypedSort<Report> reportSort = Sort.sort(Report.class);
    Sort sortDesc = reportSort.by(Report::getRegistrationDate).descending();

    public List<Report> findAllReportsInDescOrder() {
        List<Report> reports = StreamSupport.stream(reportRepository.findAll().spliterator(), false)
                                            .collect(Collectors.toList());
        // Sort in descending order by registration date
        reports.sort((r1, r2) -> r2.getRegistrationDate().compareTo(r1.getRegistrationDate()));
        return reports;
    }

    public List<Report> findAllReportsByProject(String project) {
        return reportRepository.findReportsByProject(project);
    }

    public void deleteReport(String id) {
        reportRepository.deleteReportById(id);
    }
}
