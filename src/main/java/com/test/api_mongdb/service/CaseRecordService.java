package com.test.api_mongdb.service;

import com.test.api_mongdb.model.CaseRecord;
import com.test.api_mongdb.service.CaseRecordService;
import com.test.api_mongdb.repository.CaseRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CaseRecordService {

    @Autowired
    private CaseRecordRepository repository;

    public String createCase(CaseRecord caseRecord) {
        caseRecord.setCreatedDate(LocalDateTime.now());
        repository.save(caseRecord);
        return "Case record has been saved successfully.";
    }

    public Optional<CaseRecord> getCaseById(String id) {
        return repository.findById(id);
    }

    public List<CaseRecord> getAllCases() {
        return repository.findAll();
    }

    public String updateCase(String id, CaseRecord updatedCase) {
        Optional<CaseRecord> existing = repository.findById(id);
        if (existing.isPresent()) {
            updatedCase.setId(id);
            updatedCase.setCreatedDate(existing.get().getCreatedDate());
            repository.save(updatedCase);
            return "Case record with ID " + id + " has been updated successfully.";
        }
        return "Case record with ID " + id + " not found. Update failed.";
    }

    public String deleteCase(String id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return "Case record with ID " + id + " has been deleted successfully.";
        }
        return "Case record with ID " + id + " not found. Deletion failed.";
    }
}
