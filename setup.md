
```sh
docker run --name postgresql -e POSTGRES_USER=trustblock -e POSTGRES_DB=$DB_NAME -e POSTGRES_PASSWORD=trustblock -p 5432:5432 -v /data:/home/saadjhk/docker/postgresql/data -d postgres
```