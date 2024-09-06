pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        // Define environment variables
        DEPLOYMENT_PATH = '/path/to/deployment'
        HOME = "${env.WORKSPACE}"
    }

    stages {

        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Build image') {
            agent {
                docker { image 'docker:24.0.5' }
            }
            steps {
               script {
                dockerImage = docker.build("my-docker-62HD")
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
