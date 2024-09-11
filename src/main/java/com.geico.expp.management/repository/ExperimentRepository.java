package com.geico.expp.management.repository;

import com.geico.expp.management.model.Experiment;
import com.geico.expp.management.model.ExperimentKey;
import org.springframework.data.cassandra.repository.ReactiveCassandraRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

/**
 * Repository for managing Experiment entities
 *
 * <p>This interface provides methods for CRUD operations on Experiment entities.
 *
 * <p><strong>Author:</strong> Brandon Hay [bhaydarov@geico.com]
 */
@Repository
public interface ExperimentRepository extends ReactiveCassandraRepository<Experiment, ExperimentKey> {

    /**
     * Find experiments by system ID.
     *
     * @param systemId the system ID
     * @return a flux of experiments with the given system ID
     */
    Flux<Experiment> findByKeySystemId(String systemId);
}
