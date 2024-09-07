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
                    app = docker.build("myexpressapp:latest")
                }
            }
        }

        stage('Test image') {
            steps {
                script {
                    // Running the Docker image to perform tests
                    app.inside {
                        // Ensure your Express.js project has a test script defined in package.json
                        // Run tests with npm or a specific framework like Mocha/Chai
                        sh """
                        cd /usr/src/app
                        npm install --only=development
                        npm run test
                        """
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
