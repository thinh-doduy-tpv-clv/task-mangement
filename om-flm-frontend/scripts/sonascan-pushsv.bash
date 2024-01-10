#!/bin/bash

while getopts t:u: flag
do
   case "${flag}" in
      u) url=${OPTARG};;
      t) token=${OPTARG};;
   esac
done

echo "url: $url";
echo "token: $token";

echo "Lint check";
yarn run lint

echo "Lint report";
yarn run lint:report

echo "Test Coverage";
yarn test:cov

echo "start scan";
case "$OSTYPE" in
    darwin*)  sonar-scanner \
			  -Dsonar.host.url=$url \
			  -Dsonar.login=$token ;; 
    linux*)   sonar-scanner \
			  -Dsonar.host.url=$url \
			  -Dsonar.login=$token ;;
    msys*)    sonar-scanner.bat -D"sonar.host.url=$url" -D"sonar.login=$token" ;;
    cygwin*)  sonar-scanner.bat -D"sonar.host.url=$url" -D"sonar.login=$token" ;;
    *)        echo "Unknown operating system: $OSTYPE" ;;
esac

echo "end";