package com.geico.expp.management.resolver;

import com.geico.expp.management.model.Experiment;
import com.geico.expp.management.model.ExperimentKey;
import com.geico.expp.management.model.Variance;
import com.geico.expp.management.repository.ExperimentRepository;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.DgsQuery;
import com.netflix.graphql.dgs.InputArgument;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@DgsComponent
public class ExperimentResolver {

    private final ExperimentRepository experimentRepository;

    @Autowired
    public ExperimentResolver(ExperimentRepository experimentRepository) {
        this.experimentRepository = experimentRepository;
    }

    @DgsQuery
    public Flux<Experiment> getAllExperiments() {
        return experimentRepository.findAll();
    }

    // @DgsQuery
    // public Flux<Experiment> getAllExperiments() {
    //     return experimentRepository
    //             .findAll()
    //             .map(experiment -> new Experiment(
    //                     experiment.key(),
    //                     experiment.experimentName(),
    //                     experiment.description(),
    //                     experiment.status(),
    //                     experiment.variances(),
    //                     experiment.owner(),
    //                     toOffsetDateTime(experiment
    //                                     .createdAt()
    //                                     .atOffset(ZoneId.systemDefault()
    //                                             .getRules()
    //                                             .getOffset(experiment.createdAt()))
    //                                     .toInstant())
    //                             .toInstant(),
    //                     experiment.lastModifiedBy(),
    //                     experiment.lastModifiedAt(),
    //                     experiment.tagName(),
    //                     experiment.systemName(),
    //                     experiment.startDatetime(),
    //                     experiment.endDatetime()));
    // }
    //
    // private OffsetDateTime toOffsetDateTime(Instant instant) {
    //     return instant != null ? OffsetDateTime.ofInstant(instant, ZoneId.systemDefault()) : null;
    // }

    @DgsQuery
    public Mono<Experiment> getExperiment(@InputArgument("key") Map<String, String> keyInput) {
        UUID id = UUID.fromString(keyInput.get("id"));
        String systemId = keyInput.get("systemId");
        ExperimentKey key = new ExperimentKey(id, systemId);
        return experimentRepository.findById(key);
    }

    @DgsQuery
    public Flux<Experiment> getExperimentsBySystemId(@InputArgument String systemId) {
        return experimentRepository.findByKeySystemId(systemId);
    }

    @DgsMutation
    public Mono<Experiment> createExperiment(@InputArgument("input") Map<String, Object> input) {
        // Getting key
        Map<String, String> keyInput = (Map<String, String>) input.get("key");
        UUID id = UUID.fromString(keyInput.get("id"));
        String systemId = keyInput.get("systemId");
        ExperimentKey key = new ExperimentKey(id, systemId);

        // Getting Variances list
        List<Map<String, Object>> varianceInputs = (List<Map<String, Object>>) input.get("variances");
        List<Variance> variances = varianceInputs.stream()
                .map(variance -> new Variance(
                        (String) variance.get("keyName"),
                        (String) variance.get("description"),
                        ((Integer) variance.get("splitAllocation")).shortValue(),
                        (String) variance.get("status")))
                .toList();

        // Create Experiment
        Experiment experiment = Experiment.builder()
                .key(key)
                .experimentName((String) input.get("experimentName"))
                .description((String) input.get("description"))
                .status((String) input.get("status"))
                .variances(variances)
                .owner((String) input.get("owner"))
                .createdAt(OffsetDateTime.now().toInstant())
                .lastModifiedBy((String) input.get("owner"))
                .lastModifiedAt(OffsetDateTime.now().toInstant())
                .tagName((String) input.get("tagName"))
                .systemName((String) input.get("systemName"))
                .startDatetime(OffsetDateTime.parse((String) input.get("startDatetime"))
                        .toInstant())
                .endDatetime(
                        OffsetDateTime.parse((String) input.get("endDatetime")).toInstant())
                .build();

        // Saving to Repository
        return experimentRepository.save(experiment);
    }
}
