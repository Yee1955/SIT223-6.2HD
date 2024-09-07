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
                    // Start the containers in detached mode
                    sh 'docker-compose up -d'
                    // List all running containers to see their status
                    sh 'docker ps'
                    // Optionally, you can list detailed information about a specific container if you know its name or ID
                    sh 'docker inspect myexpressapp' // Replace 'myexpressapp' with the actual container name or ID
                    // Retrieve the IP address if running in a network
                    sh 'docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' myexpressapp'
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
