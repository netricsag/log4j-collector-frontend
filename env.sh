#!/bin/bash
# Author: Jan Lauber
# Description: This script is used to copy the environment variables to the .env file in the docker container and then run the nginx webserver.
#
# Environment variables:
# - REACT_APP_API_ADDRESS: The IP address with port of the log4j-collector api e.g. -> 10.0.0.10:8080.

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js

# Read each line in .env file
# Each line represents key=value pairs

# Check if .env file exists
if [ -f .env ]; then
  while read -r line || [[ -n "$line" ]];
  do
    # Split env variables by character `=`
    if printf '%s\n' "$line" | grep -q -e '='; then
      varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
      varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    fi

    # Read value of current variable if exists as Environment variable
    value=$(printf '%s\n' "${!varname}")
    # Otherwise use value from .env file
    [[ -z $value ]] && value=${varvalue}

    # Append configuration property to JS file
    echo "  $varname: \"$value\"," >> ./env-config.js
  done < .env
fi

if [ -z "$API_URL" ]; then
  echo "  API_URL: \"http://localhost:8080\"," >> ./env-config.js
else
  echo "  API_URL: \"$API_URL\"," >> ./env-config.js
fi

echo "}" >> ./env-config.js