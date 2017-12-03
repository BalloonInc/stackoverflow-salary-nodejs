#!/usr/bin/env bash
mongoimport --host=127.0.0.1 -d stackoverflowsurveydatabase -c stackoverflowsurvey --type csv --file assets/survey_results_public.csv --headerline 
