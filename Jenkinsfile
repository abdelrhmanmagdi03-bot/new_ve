pipeline {
    agent any

    environment {
        PROJECT = 'Liverpoll'
        COMPOSE = 'Docker-compose.yaml'
    }

    stages {
        stage('checkout') {
            steps {
                git url: 'https://github.com/abdelrhmanmagdi03-bot/magdos.git', branch: 'main'
            }
        }
        stage('pre-check') {
            steps {
                sh 'ls -la'
                sh 'docker compose -p $PROJECT -f $COMPOSE config -q'
            }
        }
        stage('build-image') {
            steps {
                sh 'docker compose -p $PROJECT -f $COMPOSE up --build -d'
            }
        }
        stage('ls-image') {
            steps {
                sh 'docker image ls'
                sh 'docker compose -p $PROJECT -f $COMPOSE ps'
            }
        }
    }

    post {
        failure {
            sh 'docker compose -p $PROJECT -f $COMPOSE logs --tail=50 || true'
        }
    }
}
