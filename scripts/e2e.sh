#!/bin/bash
set -e
case "$1" in
  --local)
      webdriver-manager update --standalone
      protractor
    ;;
  --sauce)
    protractor protractor.sauce.conf.js
    ;;
esac
