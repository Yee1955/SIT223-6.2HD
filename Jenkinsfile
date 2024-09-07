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
                    app = docker.build("getintodevops/hellonode")
                }
            }
        }

        stage('Test image') {
            steps {
                script {
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




pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        // Define environment variables
        DEPLOYMENT_PATH = '/path/to/deployment'
        SONARQUBE_SERVER = 'http://your-sonarqube-server'
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
                    // Naming the Docker image with a more descriptive name
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
                        npm install --only=dev  // Ensure all devDependencies are installed
                        npm run test            // Run the predefined test script from package.json
                        """
                    }
                }
            }
        }


        stage('Code Quality Analysis') {
            steps {
                script {
                    // Run SonarQube analysis
                    sh """
                    sonar-scanner \
                        -Dsonar.projectKey=your-project-key \
                        -Dsonar.sources=. \
                        -Dsonar.host.url=\${SONARQUBE_SERVER} \
                        -Dsonar.login=\${SONARQUBE_LOGIN}
                    """
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Example using Docker Compose; adjust accordingly if different tools are used
                    sh 'docker-compose -f docker-compose.test.yml up -d'
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    // This should be guarded with approval steps or conditions
                    sh 'docker-compose -f docker-compose.prod.yml up -d'
                }
            }
        }

        stage('Monitoring and Alerting') {
            steps {
                script {
                    // Example integration call to a monitoring service setup
                    echo 'Setup monitoring and alerting with Datadog/New Relic'
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
