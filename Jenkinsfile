pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        // Define environment variables
        DEPLOYMENT_PATH = '/path/to/deployment'
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                script {
                    app = docker.build("myexpressapp:latest")
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    app.inside {
                        sh """
                        cd /usr/src/app
                        npm ci
                        npm test
                        """
                    }
                }
            }
        }

        stage('Code Quality Analysis') {
            environment {
                scannerHome = tool 'SonarQube Scanner';
            }
            steps {
                withSonarQubeEnv(credentialsId: '1ac30cec-ed2d-4009-a5d5-1faf954d477c', installationName: 'SonarQube') {
                sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh """
                    docker-compose up -d
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
