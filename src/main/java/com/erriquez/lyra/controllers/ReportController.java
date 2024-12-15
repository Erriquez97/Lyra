package com.erriquez.lyra.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.erriquez.lyra.models.Report;
import com.erriquez.lyra.services.ReportService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;
    // private final EmailSenderService emailSenderService;

    // @Autowired
    // private fileService fileService;

    // private final String defaultMessage = "La ringraziamo per la sua segnalazione, il problema è stato risolto.";
    // private final String defaultSubject = "Datasound srl";

    @Autowired
    public ReportController(ReportService reportService /*, EmailSenderService emailSenderService */) {
        this.reportService = reportService;
        // this.emailSenderService = emailSenderService;
    }

    // Endpoint to add a new report
    @PostMapping("")
    public ResponseEntity<Report> addReport(@RequestBody Report report) {
        Report newReport = reportService.addReport(report);
        return new ResponseEntity<>(newReport, HttpStatus.CREATED);
    }

    // Endpoint to upload an image for a report
    @PostMapping("/addImage/{id}")
    public ResponseEntity<Void> addImage(@RequestParam("file") MultipartFile file, @PathVariable("id") String id) {
        // fileService.uploadFile(file, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint to send a customized email
    // @PostMapping("/sendCustomizedEmail")
    // public ResponseEntity<Void> sendCustomizedEmail(@RequestBody SendEmailRequest emailRequest) {
    //     emailSenderService.sendSimpleEmail(emailRequest.getToEmail(), emailRequest.getBody(), emailRequest.getSubject());
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    // Endpoint to send a default email
    // @PostMapping("/sendEmail")
    // public ResponseEntity<Void> sendEmail(@RequestBody String toEmail) {
    //     emailSenderService.sendSimpleEmail(toEmail, defaultMessage, defaultSubject);
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    // Endpoint to fetch all reports
    @GetMapping("/all")
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.findAllReports();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to fetch all reports in descending order by registration date
    @GetMapping("/order")
    public ResponseEntity<List<Report>> getAllReportsInDescOrder() {
        List<Report> reports = reportService.findAllReportsInDescOrder();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to count all reports
    @GetMapping("/count")
    public ResponseEntity<Long> getNumberReports() {
        long totalReports = reportService.count();
        return new ResponseEntity<>(totalReports, HttpStatus.OK);
    }

    // Endpoint to count reports by status
    @GetMapping("/countByStatus/{status}")
    public ResponseEntity<Long> countReportsByStatus(@PathVariable("status") String status) {
        long reports = reportService.countReportsByStatus(status);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to count reports by multiple categories
    @GetMapping("/countByCategories/{category1}/{category2}/{category3}/{category4}")
    public ResponseEntity<long[]> countReportsByCategory(
            @PathVariable("category1") String category1,
            @PathVariable("category2") String category2,
            @PathVariable("category3") String category3,
            @PathVariable("category4") String category4) {
        long[] reports = reportService.countReportsByCategory(category1, category2, category3, category4);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to count reports between specific date ranges
    @GetMapping("/allDates")
    public ResponseEntity<long[]> getReportsBetweenDates() {
        long[] reports = reportService.countReportsBetweenDates();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to count reports by months in the last year
    @GetMapping("/allDatesByMonth")
    public ResponseEntity<long[]> getReportsByMonth() {
        long[] reports = reportService.countReportsByMonth();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to fetch all reports for a specific project
    @GetMapping("/all/{project}")
    public ResponseEntity<List<Report>> getAllReportsByProject(@PathVariable("project") String project) {
        List<Report> reports = reportService.findAllReportsByProject(project);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to delete a report by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable("id") String id) {
        reportService.deleteReport(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint to close a report by ID
    @PutMapping("/close")
    public ResponseEntity<Report> closeReport(@RequestBody String id) {
        Optional<Report> optionalReport = reportService.findReportById(id);
        if (optionalReport.isPresent()) {
            Report report = optionalReport.get();
            return new ResponseEntity<>(reportService.updateReport(report), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
