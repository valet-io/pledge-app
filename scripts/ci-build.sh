if [ "$TRAVIS_TAG" ]; then
  BUILD_ENV="production"
elif [ "$TRAVIS_BRANCH" == "master" ]; then
  BUILD_ENV="staging"
else
  BUILD_ENV="development"
fi
./node_modules/.bin/gulp build --env $BUILD_ENV
