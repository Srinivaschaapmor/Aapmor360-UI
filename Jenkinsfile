pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "aapmor-ui1"
        DOCKER_TAG = "${DOCKER_IMAGE}:${BUILD_NUMBER}"
        CONTAINER_NAME = "aapmor360-ui-c"
        SCANNER_HOME=tool'sonar-scanner'
        DEPLOYMENT="deploy.yml"
        PORT_MAPPING = "3000:3000"  // Replace with your desired port mapping
    }
    

    stages {
        
    
         stage('Stop and Remove Existing Container') {
            steps {
                script {
                    // Stop and remove existing container if it exists
                    sh "docker ps -a | grep ${CONTAINER_NAME} | awk '{print \$1}' | xargs -r docker stop"
                    sh "docker ps -a | grep ${CONTAINER_NAME} | awk '{print \$1}' | xargs -r docker rm"
                }
            }
        }
        stage("checkout"){
            steps{
               git branch: 'main', credentialsId: 'davorse-token', url: 'https://github.com/github-aapmor/aapmor360-ui.git'            
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image

                
                     sh "docker build -t ${DOCKER_IMAGE} ."
                     }
            }
        }
       stage("k8s"){
            steps{
                script{
                     kubectl get pods
                }
            }
        }
      
   
}
}
