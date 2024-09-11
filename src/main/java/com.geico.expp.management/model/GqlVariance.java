package com.geico.expp.management.model;

import com.geico.expp.model.v1.VarianceStatus;
import edu.umd.cs.findbugs.annotations.NonNull;

/**
 * Variance entity.
 *
 * <p>This class represents a UDT variance associated with an experiment.
 *
 * <p><strong>Author:</strong> Brandon Hay [bhaydarov@geico.com]
 *
 * @param keyName the key name of the variance.
 * @param description the description of the variance
 * @param splitAllocation the split allocation of the variance
 * @param status the status of the variance
 */
public record GqlVariance(
        @NonNull String keyName, @NonNull String description, int splitAllocation, @NonNull VarianceStatus status) {
    // Empty
}
