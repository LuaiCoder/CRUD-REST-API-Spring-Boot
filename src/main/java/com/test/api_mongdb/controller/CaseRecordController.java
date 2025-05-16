package com.test.api_mongdb.controller;

import com.test.api_mongdb.service.CaseRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import com.test.api_mongdb.model.CaseRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cases")
public class CaseRecordController {

    @Autowired
    private CaseRecordService caseRecordService;

    // Create a new case
    @PostMapping
    public ResponseEntity<String> createCase(@RequestBody CaseRecord caseRecord) {
        String result = caseRecordService.createCase(caseRecord);
        return ResponseEntity.ok(result);
    }

    // Get case by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCaseById(@PathVariable String id) {
        Optional<CaseRecord> found = caseRecordService.getCaseById(id);
        return found
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Case record not found"));
    }

    // Get all cases
    @GetMapping
    public ResponseEntity<List<CaseRecord>> getAllCases() {
        return ResponseEntity.ok(caseRecordService.getAllCases());
    }

    // Update a case
    @PutMapping("/{id}")
    public ResponseEntity<String> updateCase(@PathVariable String id, @RequestBody CaseRecord updatedCase) {
        String result = caseRecordService.updateCase(id, updatedCase);
        return ResponseEntity.ok(result);
    }

    // Delete a case
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCase(@PathVariable String id) {
        String result = caseRecordService.deleteCase(id);
        return ResponseEntity.ok(result);
    }
}