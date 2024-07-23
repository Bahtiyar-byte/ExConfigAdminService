package exconfigadminservice.repository;

import exconfigadminservice.models.Experiment;
import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ExperimentRepository extends CassandraRepository<Experiment, UUID> {
}
