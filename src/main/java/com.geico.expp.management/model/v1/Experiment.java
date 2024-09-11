package com.geico.expp.model.v1;

import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import java.time.Instant;
import java.util.List;
import lombok.Builder;

/**
 * Experiment model
 *
 * @param id the experiment id
 * @param name the name of experiment
 * @param owner owner of experiment
 * @param status status of experiment
 * @param systemName name of system under experiment
 * @param systemId id of system under experiment
 * @param variances list of variances for the experiment
 * @param startsAt start date time of the experiment
 * @param endsAt end date time of the experiment
 * @param createdAt created date time of the experiment
 * @param lastUpdatedAt last update date time of the experiment
 * @param lastUpdatedBy last update username for the experiment
 * @param description test hypothesis for the experiment
 * @param tagName tag name for the experiment if any
 */
@Builder(toBuilder = true)
public record Experiment(
        @NonNull String id,
        @NonNull String name,
        @NonNull String owner,
        @NonNull ExperimentStatus status,
        @NonNull String systemName,
        @NonNull String systemId,
        @NonNull List<Variance> variances,
        @NonNull Instant startsAt,
        @NonNull Instant endsAt,
        @NonNull Instant createdAt,
        @Nullable Instant lastUpdatedAt,
        @Nullable String lastUpdatedBy,
        @Nullable String description,
        @Nullable String tagName) {
    // Empty
}
