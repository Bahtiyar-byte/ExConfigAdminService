package com.geico.expp.management.model;

import com.geico.expp.model.v1.ExperimentStatus;
import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import java.time.ZonedDateTime;
import java.util.List;

/**
 * Experiment entity.
 *
 * <p>This class represents an experiment with various attributes such as name, description, status, etc.
 *
 * <p><strong>Author:</strong> Brandon Hay [bhaydarov@geico.com]
 *
 * @param id unique identifier of the experiment.
 * @param name the name of the experiment
 * @param description the description of the experiment
 * @param status the status of the experiment
 * @param systemId the primary key of the experiment
 * @param systemName the system name associated with the experiment
 * @param variances the list of variances associated with the experiment
 * @param owner the owner of the experiment
 * @param startsAt the start datetime of the experiment
 * @param endsAt the end datetime of the experiment
 * @param createdAt the creation timestamp of the experiment
 * @param lastUpdatedAt the last modification timestamp of the experiment
 * @param lastUpdatedBy the user who last modified the experiment
 * @param tagName tag if any for the experiment
 */
public record GqlExperiment(
        @NonNull String id,
        @NonNull String name,
        @Nullable String description,
        @NonNull ExperimentStatus status,
        @NonNull String systemId,
        @NonNull String systemName,
        @Nullable List<GqlVariance> variances,
        @NonNull String owner,
        @NonNull ZonedDateTime startsAt,
        @NonNull ZonedDateTime endsAt,
        @NonNull ZonedDateTime createdAt,
        @NonNull ZonedDateTime lastUpdatedAt,
        @NonNull String lastUpdatedBy,
        @NonNull String tagName) {
    // Empty
}
