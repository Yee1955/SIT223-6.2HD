pipeline {
    agent any

    tools {
        nodejs "NodeJS"
    }

    environment {
        DATADOG_API_KEY = credentials('datadog-api-key')
        RECIPIENT = 'alice0312chong@gmail.com'
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
                    // Print IPv4 address
                    sh "echo \"Docker host IPv4 is \$(getent ahosts host.docker.internal | grep STREAM | awk '{print \$1}')\""
                }
            }
        }

        stage('Release') {
            steps {
                script {
                    echo "Simulating release to production."
                    // In a real release, we could integrate Octopus Deploy, AWS CodeDeploy, etc.
                }
            }
        }

        stage('Monitoring') {
            steps {
                script {
                    echo "Sending app.build.success metric to Datadog"
                    sh '''
                    response=$(curl -X POST -H "Content-Type: application/json" \
                    -d '{
                            "series" : [{
                                "metric": "app.build.success",
                                "points": [[`date +%s`, 1]],
                                "type": "gauge",
                                "host": "jenkins-ci",
                                "tags": ["env:production"]
                            }]
                        }' \
                    "https://api.datadoghq.com/api/v1/series?api_key=${DATADOG_API_KEY}")
                    echo "Datadog response: $response"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
            emailext(
                subject: "Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<p>GOOD NEWS!</p><p>The build was successful.</p><p>Check it out here: <a href='${BUILD_URL}'>${BUILD_URL}</a></p>""",
                to: "${env.RECIPIENT}",
                attachLog: true
            )
        }
        failure {
            echo 'Pipeline failed.'
            emailext(
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """<p>ALERT!</p><p>The build has failed.</p><p>Check it out here: <a href='${BUILD_URL}'>${BUILD_URL}</a></p>""",
                to: "${env.RECIPIENT}",
                attachLog: true
            )
        }
    }
}
