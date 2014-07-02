./node_modules/.bin/gulp build --staging
./node_modules/.bin/gulp server & sleep 1
echo 'Test server online'
./node_modules/.bin/webdriver-manager update --standalone
./node_modules/.bin/webdriver-manager start & sleep 5
echo 'Webdriver online'
./node_modules/.bin/protractor
