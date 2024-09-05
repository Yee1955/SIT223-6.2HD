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

        stage('Prepare') {
            steps {
                echo 'Installing dependencies'
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image'
                sh 'docker build -t yourappname:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running Tests'
                sh 'docker run --rm yourappname:latest npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to server'
                // Add your deployment commands here, potentially using docker push to a registry
                sh 'docker save yourappname:latest | ssh $DEPLOY_HOST docker load'
                sh 'ssh $DEPLOY_HOST docker run -d --restart always --name yourapp -p 80:3000 yourappname:latest'
            }
        }

        stage('Release') {
            steps {
                echo 'Releasing version'
                // Additional commands for release management
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up'
                sh 'docker rmi yourappname:latest'
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
