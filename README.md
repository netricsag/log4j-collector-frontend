# log4j-collector-frontend

![Build Status](https://github.com/bluestoneag/log4j-collector/workflows/CI/badge.svg)
![GitHub top language](https://img.shields.io/github/languages/top/bluestoneag/log4j-collector-frontend)
![open issues](https://img.shields.io/github/issues-raw/bluestoneag/log4j-collector-frontend)
![license](https://img.shields.io/github/license/bluestoneag/log4j-collector-frontend)

This is a simple frontend built with React and Fluent UI to visualize the data stored in the log4j-collector API.
The API can be found at:

- [log4j-collector](https://github.com/bluestoneag/log4j-collector)

## Scanning
For the scanning process and data collection, the following tool can be used:
- [log4j-scanner](https://github.com/bluestoneag/log4j-scanner)

## Env Variables

- `API_URL` - The IP address of the backend [log4j-collector](https://github.com/bluestoneag/log4j-collector) API. Can be used like `API_URL=http://192.168.1.10/api/v1/reports` or with a custom port like `API_URL=http://192.168.1.10:8080/api/v1/reports`

## Docker

This Docker image is best run with a Docker Compose file. Use the `docker-compose-yml` in this repo and customise the API IP address in the environment variables.

First run:
`docker-compose pull`

After that:
`docker-compose up -d`

## Screenshots

### Dashboard overview

![alt text](https://raw.githubusercontent.com/bluestoneag/log4j-collector-frontend/main/assets/dashboard.jpg "Dashboard")
