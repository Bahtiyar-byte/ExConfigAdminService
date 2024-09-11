package com.geico.expp.management.model;

import lombok.Builder;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.UserDefinedType;

/**
 * Variance entity.
 *
 * <p>This class represents a UDT variance associated with an experiment.
 *
 * <p><strong>Author:</strong> Brandon Hay [bhaydarov@geico.com]
 *
 * @param key_name the key name of the variance.
 * @param description the description of the variance
 * @param split_allocation the split allocation of the variance
 * @param status the status of the variance
 */
@Builder(toBuilder = true)
@UserDefinedType("variance")
public record Variance(
        @CassandraType(type = CassandraType.Name.VARCHAR) String key_name,
        @CassandraType(type = CassandraType.Name.TEXT) String description,
        @CassandraType(type = CassandraType.Name.SMALLINT) Short split_allocation,
        @CassandraType(type = CassandraType.Name.VARCHAR) String status) {
    // Empty
}
