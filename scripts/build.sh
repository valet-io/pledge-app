#!/bin/bash
set -e
if [ "${TRAVIS_TAG}" ]; then
  BUILD_ENV="production"
elif [ "${TRAVIS_BRANCH}" == "master" ]; then
  BUILD_ENV="staging"
else
  BUILD_ENV="development"
fi
gulp build --env "${BUILD_ENV}"
