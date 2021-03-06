all: run

run: start_mongo
	npm run dev

start_mongo:
	sudo service mongod start
	timeout 10s mongod &
	mongo &

docker:
	sudo service mongod stop
	sudo docker-compose build
	sudo docker-compose up -d
	sudo docker exec -it  docker-node-mongo bash -c 'migrate-mongo up'
	sass --watch public/stylesheets/index.scss:public/stylesheets/index.css &
	sudo docker-compose up
	
ssh:
	sudo docker-compose up -d
	sudo docker exec -it  docker-node-mongo bash


docker_rebuild:
	docker system prune -a
	sudo docker-compose build --no-cache
	sudo docker-compose up -d

prod: 
	ssh lysa@vps701295.ovh.net 'cd workspace/toolsweb && git pull && docker-compose build --no-cache && docker-compose up -d'

vps:
	ssh lysa@vps701295.ovh.net 
