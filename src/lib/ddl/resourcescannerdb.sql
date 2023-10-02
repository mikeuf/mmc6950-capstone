CREATE TABLE destination (
  destination_id integer GENERATED ALWAYS AS IDENTITY,
  hostname text,
  path text,
  PRIMARY KEY (destination_id)
);

CREATE TABLE test_result (
  test_result_id integer GENERATED ALWAYS AS IDENTITY,
  dns_response text,
  http_status_code integer,
  server_response text,
  test_timestamp timestamp with time zone,
  destination_id integer REFERENCES destination(destination_id),
  PRIMARY KEY (test_result_id)
);

CREATE TABLE user_account (
  user_account_id integer GENERATED ALWAYS AS IDENTITY,
  first_name text,
  last_name text,
  email_address text,
  PRIMARY KEY (user_account_id)
);

CREATE TABLE job (
  job_id integer GENERATED ALWAYS AS IDENTITY,
  user_account_id integer REFERENCES user_account(user_account_id),
  start_timestamp timestamp with time zone,
  end_timestamp timestamp with time zone,
  PRIMARY KEY (job_id)
);

CREATE TABLE job_destination (
  job_id integer REFERENCES job(job_id),
  destination_id integer REFERENCES destination(destination_id),
  PRIMARY KEY (job_id, destination_id)
);

