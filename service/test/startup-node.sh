docker stop quizmeistermongo || true && docker rm quizmeistermongo || true
docker run -e "MONGO_INITDB_ROOT_USERNAME=root" -e "MONGO_INITDB_ROOT_PASSWORD=wu4XiEf9D50X" \
   -p 27017:27017 --name quizmeistermongo \
   -d mongo:latest
npx nodemon src/index.js
docker container rm quizmeistermongo