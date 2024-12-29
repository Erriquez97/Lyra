package com.erriquez.lyra.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.erriquez.lyra.models.Report;
import com.erriquez.lyra.models.ReportStatus;
import com.erriquez.lyra.request.SendEmailRequest;
import com.erriquez.lyra.services.EmailSenderService;
import com.erriquez.lyra.services.FileService;
import com.erriquez.lyra.services.ReportService;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private FileService fileService;

    private final String defaultMessage = "La ringraziamo per la sua segnalazione, il problema è stato risolto.";
    private final String defaultSubject = "Datasound srl";

    // Endpoint to add a new report
    @PostMapping("")
    public ResponseEntity<Report> addReport(@RequestBody Report report) {
        Report newReport = reportService.addReport(report);
        return new ResponseEntity<>(newReport, HttpStatus.CREATED);
    }

    // Endpoint to upload an image for a report
    @PostMapping("/addImage/{id}")
    public ResponseEntity<Void> addImage(@RequestParam("file") MultipartFile file, @PathVariable("id") String id) {
        fileService.uploadFile(file, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint to send a customized email
    @PreAuthorize("hasRole('TICKET_MANAGER')")
    @PostMapping("/sendCustomizedEmail")
    public ResponseEntity<Void> sendCustomizedEmail(@RequestBody SendEmailRequest emailRequest) {
        emailSenderService.sendSimpleEmail(emailRequest.getToEmail(), emailRequest.getBody(), emailRequest.getSubject());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint to send a default email
    @PreAuthorize("hasRole('TICKET_MANAGER')")
    @PostMapping("/sendEmail")
    public ResponseEntity<Void> sendEmail(@RequestBody String toEmail) {
        emailSenderService.sendSimpleEmail(toEmail, defaultMessage, defaultSubject);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint to fetch all reports
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TICKET_MANAGER')")
    @GetMapping("/all")
    public ResponseEntity<List<Report>> getAllReports() {
        List<Report> reports = reportService.findAllReports();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to fetch all reports in descending order by registration date
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TICKET_MANAGER')")
    @GetMapping("/order")
    public ResponseEntity<List<Report>> getAllReportsInDescOrder() {
        List<Report> reports = reportService.findAllReportsInDescOrder();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to count all reports
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TICKET_MANAGER')")
    @GetMapping("/count")
    public ResponseEntity<Long> getNumberReports() {
        long totalReports = reportService.count();
        return new ResponseEntity<>(totalReports, HttpStatus.OK);
    }

    // Endpoint to count reports by status
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TICKET_MANAGER')")
    @GetMapping("/countByStatus/{status}")
    public ResponseEntity<Object> countReportsByStatus(@PathVariable("status") String status) {
        try{
            ReportStatus reportStatus = ReportStatus.valueOf(status.toUpperCase());
            long reports = reportService.countReportsByStatus(reportStatus);
            return new ResponseEntity<>(reports, HttpStatus.OK);

        }catch(IllegalArgumentException e){
            String message = "Invalid status value: " +status+", the valid statues are"+ Arrays.toString(ReportStatus.values());
            return new ResponseEntity<>(message,HttpStatus.BAD_REQUEST);
        }
    }

    // Endpoint to count reports by multiple categories
    @GetMapping("/countByCategories/{categories}")
    public ResponseEntity<long[]> countReportsByCategory(
            @PathVariable("categories") String[] categories) {
        long[] reports = reportService.countReportsByCategories(categories);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to count reports between specific date ranges
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TICKET_MANAGER')")
    @GetMapping("/allDates")
    public ResponseEntity<long[]> getReportsBetweenDates() {
        long[] reports = reportService.countReportsBetweenDates();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to count reports by months in the last year
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TICKET_MANAGER')")
    @GetMapping("/allDatesByMonth")
    public ResponseEntity<long[]> getReportsByMonth() {
        long[] reports = reportService.countReportsByMonth();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to fetch all reports for a specific project
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_TICKET_MANAGER')")
    @GetMapping("/all/{project}")
    public ResponseEntity<List<Report>> getAllReportsByProject(@PathVariable("project") String project) {
        List<Report> reports = reportService.findAllReportsByProject(project);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Endpoint to delete a report by ID
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable("id") String id) {
        reportService.deleteReport(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // Endpoint to close a report by ID
    @PreAuthorize("hasAuthority('ROLE_TICKET_MANAGER')")
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
