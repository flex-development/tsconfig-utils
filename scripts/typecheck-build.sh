#!/bin/sh

# Postbuild Typecheck Workflow

# set initial tsconfig file
TSCONFIG='tsconfig.build.json'

# change tsconfig file if typescript version is not at least 5
[[ ! $(jq .devDependencies.typescript package.json -r) = 5* ]] && TSCONFIG=config/ts/v4/$TSCONFIG

# run typecheck
tsc -p $TSCONFIG
