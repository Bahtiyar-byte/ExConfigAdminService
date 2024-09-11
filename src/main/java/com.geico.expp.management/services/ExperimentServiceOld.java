package exconfigadminservice.services;

import exconfigadminservice.repository.ExperimentRepository;
import exconfigadminservice.models.Experiment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.Optional;

@Service
public class ExperimentService { 
    @Autowired
    private ExperimentRepository experimentRepository;

    public Experiment createExperiment(Experiment experiment) {
        experiment.setId(UUID.randomUUID());
        return experimentRepository.save(experiment);
    }

    public Optional<Experiment> getExperimentById(UUID id) {
        return experimentRepository.findById(id);
    }

    public List<Experiment> getAllExperiments() {
        return experimentRepository.findAll();
    }

    public Experiment updateExperiment(UUID id, Experiment experiment) {
        if (experimentRepository.existsById(id)) {
            experiment.setId(id);
            return experimentRepository.save(experiment);
        }
        return null;
    }

    public void deleteExperiment(UUID id) {
        experimentRepository.deleteById(id);
    }
}
