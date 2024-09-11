package com.geico.expp.management.model;

import java.time.Instant;
import java.util.List;
import lombok.Builder;
import org.springframework.data.cassandra.core.mapping.Column;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Builder(toBuilder = true)
@Table("exp_by_sys_id")
public record Experiment(
        @PrimaryKey ExperimentKey key,
        @Column("experiment_name") String experimentName,
        String description,
        String status,
        List<Variance> variances,
        String owner,
        @Column("created_at") Instant createdAt,
        @Column("last_modified_by") String lastModifiedBy,
        @Column("last_modified_at") Instant lastModifiedAt,
        @Column("tag_name") String tagName,
        @Column("system_name") String systemName,
        @Column("start_datetime") Instant startDatetime,
        @Column("end_datetime") Instant endDatetime) {
    // Empty
}

// package com.geico.expp.management.model;
//
// import java.time.LocalDateTime;
// import java.util.List;
// import lombok.Builder;
// import org.springframework.data.cassandra.core.mapping.Column;
// import org.springframework.data.cassandra.core.mapping.PrimaryKey;
// import org.springframework.data.cassandra.core.mapping.Table;
//
// /**
//  * Experiment entity.
//  *
//  * <p>This class represents an experiment with various attributes such as name, description, status, etc.
//  *
//  * <p><strong>Author:</strong> Brandon Hay [bhaydarov@geico.com]
//  *
//  * @param key the primary key of the experiment
//  * @param experimentName the name of the experiment
//  * @param description the description of the experiment
//  * @param status the status of the experiment
//  * @param variances the list of variances associated with the experiment
//  * @param owner the owner of the experiment
//  * @param createdAt the creation timestamp of the experiment
//  * @param lastModifiedBy the user who last modified the experiment
//  * @param lastModifiedAt the last modification timestamp of the experiment
//  * @param tagName the tag name associated with the experiment
//  * @param systemName the system name associated with the experiment
//  * @param startDatetime the start datetime of the experiment
//  * @param endDatetime the end datetime of the experiment
//  */
// @Table("exp_by_sys_id")
// @Builder
// public record Experiment(
//         @PrimaryKey ExperimentKey key,
//         @Column("experiment_name") String experimentName,
//         String description,
//         String status,
//         List<Variance> variances,
//         String owner,
//         @Column("created_at") LocalDateTime createdAt,
//         @Column("last_modified_by") String lastModifiedBy,
//         @Column("last_modified_at") LocalDateTime lastModifiedAt,
//         @Column("tag_name") String tagName,
//         @Column("system_name") String systemName,
//         @Column("start_datetime") LocalDateTime startDatetime,
//         @Column("end_datetime") LocalDateTime endDatetime) {
//     // Empty
// }
