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

        stage('Build image') {
            steps {
                script {
                    // Building the Docker image
                    def app = docker.build("getintodevops/hellonode")
                }
            }
        }

        stage('Test image') {
            steps {
                script {
                    // Testing using the built Docker image
                    def app = docker.image("getintodevops/hellonode")
                    app.inside {
                        sh 'echo "Tests passed"'
                    }
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
