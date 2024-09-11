package com.geico.expp.management.controller;

import com.geico.expp.management.model.Experiment;
import com.geico.expp.management.model.ExperimentKey;
import com.geico.expp.management.repository.ExperimentRepository;
import java.time.Instant;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Controller for managing experiments.
 *
 * <p>This class provides RESTful endpoints for retrieving experiments.
 *
 * <p><strong>Endpoints:</strong>
 *
 * <ul>
 *   <li>GET /api/experiments - Retrieve all experiments
 *   <li>GET /api/experiments/{id}/{systemId} - Retrieve a specific experiment by ID and system ID
 *   <li>GET /api/experiments/system/{systemId} - Retrieve experiments by system ID
 * </ul>
 *
 * <p><strong>Author:</strong> Brandon Hay [mailto:bhaydarov@geico.com]
 */
@RestController
@RequestMapping("/api/experiments")
public class ExperimentController {

    private final ExperimentRepository experimentRepository;

    @Autowired
    public ExperimentController(ExperimentRepository experimentRepository) {
        this.experimentRepository = experimentRepository;
    }

    /**
     * Retrieve all experiments.
     *
     * @return a flux of all experiments
     */
    @GetMapping
    public Flux<Experiment> getAllExperiments() {
        return experimentRepository.findAll();
    }

    /**
     * Retrieve a specific experiment by ID and system ID.
     *
     * @param id the primary key of the experiment
     * @param systemId the system ID
     * @return the experiment with the given ID and system ID
     */
    @GetMapping("/{id}/{systemId}")
    public Mono<Experiment> getExperiment(@PathVariable UUID id, @PathVariable String systemId) {
        ExperimentKey key = new ExperimentKey(id, systemId);
        return experimentRepository.findById(key);
    }

    /**
     * Retrieve experiments by system ID.
     *
     * @param systemId the system ID
     * @return a flux of experiments with the given system ID
     */
    @GetMapping("/system/{systemId}")
    public Flux<Experiment> getExperimentsBySystemId(@PathVariable String systemId) {
        return experimentRepository.findByKeySystemId(systemId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Experiment> createExperiment(@RequestBody Experiment experiment) {
        // Set a new UUID for the experiment key and set the createdAt timestamp
        UUID id = UUID.randomUUID();
        ExperimentKey key = new ExperimentKey(id, experiment.key().systemId());
        Experiment newExperiment = experiment.toBuilder()
                .key(key)
                .createdAt(Instant.now()) // Use Instant to store timestamps
                .lastModifiedAt(Instant.now())
                .build();

        return experimentRepository.save(newExperiment);
    }

    /**
     * Delete a specific experiment by ID and system ID.
     *
     * @param id the ID of the experiment
     * @param systemId the system ID
     * @return a Mono signaling when the deletion is complete
     */
    @DeleteMapping("/{id}/{systemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteExperiment(@PathVariable UUID id, @PathVariable String systemId) {
        ExperimentKey key = new ExperimentKey(id, systemId);
        return experimentRepository.deleteById(key);
    }
}
