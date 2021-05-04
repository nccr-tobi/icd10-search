#!/usr/bin/env bash

curl "https://raw.githubusercontent.com/krishagni/openspecimen/master/WEB-INF/resources/db/2.0/permissible-values/clinical-diagnosis.csv" | ramda -i csv --header --js 'map(omit(["IDENTIFIER", "PUBLIC_ID"]))' > clinical-diagnosis.json
