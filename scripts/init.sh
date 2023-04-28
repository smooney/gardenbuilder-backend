#!/bin/bash

psql -U $POSTGRES_USER -d $POSGRES_DB -a -f ./seed/index.sql