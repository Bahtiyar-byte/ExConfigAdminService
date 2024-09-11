// package com.geico.expp.management.service;
//
// import com.geico.expp.management.model.Experiment;
// import com.geico.expp.management.model.ExperimentKey;
// import com.geico.expp.management.repository.ExperimentRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import reactor.core.publisher.Flux;
// import reactor.core.publisher.Mono;
//
// /**
//  * Service for managing experiments.
//  *
//  * <p>This class provides methods for creating, retrieving, updating, and deleting experiments.
//  *
//  * <p><strong>Author:</strong> Brandon Hay [bhaydarov@geico.com]
//  */
// @Service
// public class ExperimentService {
//
//     /** Internal representation of an Experiment Repository */
//     private final ExperimentRepository experimentRepository;
//
//     /**
//      * Create a new Experiment Service.
//      *
//      * @param experimentRepository the experiment repository
//      */
//     @Autowired
//     public ExperimentService(final ExperimentRepository experimentRepository) {
//         this.experimentRepository = experimentRepository;
//     }
//
//     /**
//      * Create a new experiment.
//      *
//      * @param experiment the experiment to create
//      * @return the created experiment
//      */
//     // public Mono<Experiment> createExperiment(final Experiment experiment) {
//     //     final UUID id = UUID.randomUUID();
//     //     final ExperimentKey key = new ExperimentKey(id, experiment.key().systemId());
//     //     final LocalDateTime now = LocalDateTime.now(ZoneId.systemDefault());
//     //
//     //     final Experiment newExperiment = new Experiment(
//     //             key,
//     //             experiment.experimentName(),
//     //             experiment.description(),
//     //             "DRAFT",
//     //             experiment.variances(),
//     //             experiment.owner(),
//     //             now,
//     //             experiment.owner(),
//     //             now,
//     //             experiment.tagName(),
//     //             experiment.systemName(),
//     //             experiment.startDatetime(),
//     //             experiment.endDatetime());
//     //
//     //     return experimentRepository.save(newExperiment);
//     // }
//
//     /**
//      * Retrieve all experiments.
//      *
//      * @return a flux of all experiments
//      */
//     public Flux<Experiment> getAllExperiments() {
//         return experimentRepository.findAll();
//     }
//
//     /**
//      * Retrieve a specific experiment by ID.
//      *
//      * @param key the primary key of the experiment
//      * @return the experiment with the given ID
//      */
//     public Mono<Experiment> getExperiment(final ExperimentKey key) {
//         return experimentRepository.findById(key);
//     }
//
//     /**
//      * Retrieve experiments by system ID.
//      *
//      * @param systemId the system ID
//      * @return a flux of experiments with the given system ID
//      */
//     public Flux<Experiment> getExperimentsBySystemId(final String systemId) {
//         return experimentRepository.findByKeySystemId(systemId);
//     }
// }
