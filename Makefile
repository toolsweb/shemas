all: run

run: 
	sudo service mongod start
	mongo &
	npm run dev

prod: 
	ssh lysa@vps701295.ovh.net 'cd workspace/toolsweb && git pull && docker-compose build --no-cache && docker-compose up -d'

vps:
	ssh lysa@vps701295.ovh.net 
