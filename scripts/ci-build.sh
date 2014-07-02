if [ "$TRAVIS_TAG" ]; then
  ./node_modules/.bin/gulp build --production
else
  if [ "$TRAVIS_BRANCH" == "master" ]; then
    ./node_modules/.bin/gulp build --staging
  else
    ./node_modules/.bin/gulp build --development
  fi
fi
