SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL,
	"password" varchar NOT NULL,
	"ssid" varchar NOT NULL,
	"# of sightings" bigint,
	"fav_rat" varchar,
	"report_history" varchar,
  "create_date" date,

	CONSTRAINT "user_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.rats (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"image" varchar,
	"alive/dead" varchar,
	"description" varchar,
  "create_date" date,

	CONSTRAINT "rats_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.sighting (
	"_id" serial NOT NULL,
	"location" varchar NOT NULL,
	"current time" datetime,
	"description" varchar,
  "create_date" date,

	CONSTRAINT "user_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE public.user ADD CONSTRAINT "users_fk0" FOREIGN KEY ("sighting_id") REFERENCES  public.sighting("_id");

ALTER TABLE public.user ADD CONSTRAINT "rats_fk0" FOREIGN KEY ("sighting_id") REFERENCES  public.sighting("_id");

ALTER TABLE public.user ADD CONSTRAINT "sighting_fk0" FOREIGN KEY ("users_id") REFERENCES  public.users("_id");
ALTER TABLE public.user ADD CONSTRAINT "sighting_fk1" FOREIGN KEY ("rats_id") REFERENCES  public.rats("_id");
