CREATE KEYSPACE "exp_adm_config_dv1"
    WITH REPLICATION = {
        'class' : 'SimpleStrategy',
        'replication_factor' : 3
        }
     AND DURABLE_WRITES = false;

USE "exp_adm_config_dv1";

CREATE TYPE IF NOT EXISTS "exp_adm_config_dv1".variance (
                                                            "key_name" varchar,
                                                            "description" text,
                                                            "split_allocation" smallint,
                                                            "status" varchar
                                                        );

CREATE TABLE "exp_adm_config_dv1"."exp_by_sys_id" (
                                                      "id" uuid,
                                                      "system_id" varchar,
                                                      "experiment_name" varchar,
                                                      "description" text,
                                                      "status" varchar,
                                                      "variances" list<frozen<variance>>,
                                                      "owner" varchar,
                                                      "created_at" timestamp,
                                                      "last_modified_by" varchar,
                                                      "last_modified_at" timestamp,
                                                      "tag_name" varchar,
                                                      "system_name" varchar,
                                                      "start_datetime" timestamp,
                                                      "end_datetime" timestamp,
                                                      PRIMARY KEY (("id", "system_id"), "experiment_name")
)
    WITH CLUSTERING ORDER BY ("experiment_name" ASC);

CREATE INDEX "systemnameindex"
    ON "exp_adm_config_dv1"."exp_by_sys_id" ("system_name");

CREATE INDEX "experimentname"
    ON "exp_adm_config_dv1"."exp_by_sys_id" ("experiment_name");

CREATE TABLE "exp_adm_config_dv1"."exp_audit_by_id" (
                                                        "experiment_id" uuid,
                                                        "system_id" varchar,
                                                        "system_name" text,
                                                        "created_at" timestamp,
                                                        "activity_name" text,
                                                        "created_by" varchar,
                                                        "activity_reason" text,
                                                        PRIMARY KEY (("experiment_id", "system_id"), "system_name", "created_at")
)
    WITH CLUSTERING ORDER BY ("system_name" ASC, "created_at" DESC);

CREATE TABLE "exp_adm_config_dv1"."sys_by_id" (
                                                  "system_id" varchar,
                                                  "system_name" varchar,
                                                  "description" text,
                                                  "created_at" timestamp,
                                                  PRIMARY KEY ("system_id")
);
