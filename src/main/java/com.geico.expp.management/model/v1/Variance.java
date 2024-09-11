package com.geico.expp.model.v1;

import edu.umd.cs.findbugs.annotations.NonNull;
import edu.umd.cs.findbugs.annotations.Nullable;
import lombok.Builder;

/**
 * Represents Instance of Experiment Variance
 *
 * @param keyName variance key name
 * @param splitAllocation split allocation of variance
 * @param status status of variance Active / Inactive
 * @param description description for variance
 */
@Builder(toBuilder = true)
public record Variance(
        @NonNull String keyName, int splitAllocation, @NonNull VarianceStatus status, @Nullable String description) {
    // Empty
}
