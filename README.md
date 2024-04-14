# News Aggregator

This project is a news aggregator that fetches data from three different APIs: NewsAPI, New York Times, and The Guardian. It utilizes Redux Toolkit for state management, React for the front-end, and Vite for fast development and server.

## Technology Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 

| Tools/Technologies      | Description |
| :---        |:----   |
| React   | Version 18.2.0          |
| Redux | Version 4.2.1 |
| Redux Toolkit | Version ^2.2.3 |

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
  - [Running with Docker](#running-with-docker)
  - [Running without Docker](#running-without-docker)
- [Contributors](#contributors)

## Introduction

News Aggregator is a web application designed to provide users with the latest news articles from various sources. By fetching data from NewsAPI, New York Times, and The Guardian, users can stay updated on current events from around the world. The application offers a user-friendly interface with features like search, filtering, and sorting to enhance the browsing experience.

## Features

- Fetch news articles from multiple APIs: NewsAPI, New York Times, and The Guardian.
- Search for specific news articles by keyword.
- Filter news articles by source, category, or date.
- Sort news articles by relevance, date, or popularity.
- Responsive design for seamless browsing on different devices.

## Prerequisites

Before running this application, ensure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Docker](https://www.docker.com/) (optional, for running with Docker)

## How to Run

### Environment Variables

    Create a `.env.local` file in the root directory of the project with the following variables:
    
    VITE_NEWS_API_URL=
    VITE_GUARDIAN_API_URL=
    VITE_NYT_API_URL=
    VITE_NEWS_API_KEY=your_news_api_key
    VITE_GUARDIAN_API_KEY=your_guardian_api_key
    VITE_NYT_API_KEY=your_nyt_api_key
    
### Running with Docker

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/maaz-shah47/news-aggregator.git

   # Navigate into the project directory
   cd news-aggregator
   # Build using the following command
   docker compose build
   # up container using the following command
   docker compose up -d

   # Visit the Url
    http://localhost:5176/

   # To check container logs RUN:
   docker logs news-aggregator-app-1 -f

## Running without Docker

    ```bash
    # Clone the repository to your local machine
    git clone https://github.com/your-username/news-aggregator.git
    
    # Navigate into the project directory
    cd news-aggregator
    
    # Install dependencies
    npm install
    
    # Build the project
    npm run build
    
    # Start the development server
    npm run dev


## Contributors

- Syed Maaz Shah

