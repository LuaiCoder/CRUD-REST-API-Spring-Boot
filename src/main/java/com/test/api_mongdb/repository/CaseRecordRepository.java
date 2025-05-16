package com.test.api_mongdb.repository;

import com.test.api_mongdb.model.CaseRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CaseRecordRepository extends MongoRepository<CaseRecord, String> {
}

