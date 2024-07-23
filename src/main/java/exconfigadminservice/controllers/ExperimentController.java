package exconfigadminservice.controllers;

import exconfigadminservice.models.Experiment;
import exconfigadminservice.services.ExperimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/experiments")
public class ExperimentController {
    @Autowired
    private ExperimentService experimentService;

    @PostMapping
    public ResponseEntity<Experiment> createExperiment(@RequestBody Experiment experiment) {
        return ResponseEntity.ok(experimentService.createExperiment(experiment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Experiment> getExperiment(@PathVariable UUID id) {
        return experimentService.getExperimentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Experiment>> getAllExperiments() {
        return ResponseEntity.ok(experimentService.getAllExperiments());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Experiment> updateExperiment(@PathVariable UUID id, @RequestBody Experiment experiment) {
        Experiment updatedExperiment = experimentService.updateExperiment(id, experiment);
        return updatedExperiment != null ? ResponseEntity.ok(updatedExperiment) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperiment(@PathVariable UUID id) {
        experimentService.deleteExperiment(id);
        return ResponseEntity.noContent().build();
    }
}