package com.geico.expp.management.model;

import java.util.UUID;
import lombok.Builder;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

/**
 * Experiment entity Primary Key.
 *
 * <p>This class represents the composite key for the Experiment entity.
 *
 * <p><strong>Author:</strong> Brandon Hay [bhaydarov@geico.com]
 *
 * @param id the Experiment unique id associated with the experiment
 * @param systemId the system Id associated with the experiment
 */
@PrimaryKeyClass
@Builder(toBuilder = true)
public record ExperimentKey(
        @PrimaryKeyColumn(name = "id", ordinal = 0, type = PrimaryKeyType.PARTITIONED) UUID id,
        @PrimaryKeyColumn(name = "system_id", ordinal = 1, type = PrimaryKeyType.PARTITIONED) String systemId) {
    // Empty
}
