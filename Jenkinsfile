pipeline {
    agent any

    environment {
        PROJECT = 'liverpool'
        COMPOSE = 'docker-compose.yml'
    }

    stages {
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
