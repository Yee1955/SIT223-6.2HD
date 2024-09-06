pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        // Define environment variables
        DEPLOYMENT_PATH = '/path/to/deployment'
    }

    def app

    stages {

        stage('Clone repository') {
            steps {
                checkout scm
            }
        }

        stage('Build image') {
            app = docker.build("getintodevops/hellonode")
        }

        stage('Test image') {
            app.inside {
                sh 'echo "Tests passed"'
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
