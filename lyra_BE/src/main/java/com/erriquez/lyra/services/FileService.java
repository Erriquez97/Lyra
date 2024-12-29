package com.erriquez.lyra.services;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class FileService {

    private final String baseFolderPath = "C:/Users/domen/Desktop/Report-image";

    public void uploadFile(MultipartFile file, String id) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File cannot be empty");
        }

        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (extension == null || extension.isEmpty()) {
            throw new IllegalArgumentException("File must have a valid extension");
        }

        String sanitizedId = sanitizeFilename(id);
        String uniqueFilename = sanitizedId + "_" + generateTimestamp() + "." + extension;
        Path folderPath = Paths.get(baseFolderPath, sanitizedId);

        try {
            // Create directories if they don't exist
            Files.createDirectories(folderPath);

            // Transfer file
            Path filePath = folderPath.resolve(uniqueFilename);
            file.transferTo(filePath.toFile());

            System.out.println("File uploaded successfully: " + filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    private String sanitizeFilename(String filename) {
        return filename.replaceAll("[^a-zA-Z0-9-_\\.]", "_");
    }

    private String generateTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        return LocalDateTime.now().format(formatter);
    }
}
