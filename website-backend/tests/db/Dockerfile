FROM postgres:latest
VOLUME /tmp

COPY ${FILE} /tmp/${FILE}

COPY scripts/restore_schema.sh /docker-entrypoint-initdb.d/restore_schema.sh
RUN sed -i 's/\r$//g' /docker-entrypoint-initdb.d/restore_schema.sh
RUN chmod 777 /docker-entrypoint-initdb.d/restore_schema.sh

COPY 20201203135804-default-e2e.js /tmp/seeders/20201203135804-default-e2e.js
RUN node /tmp/seeders/20201203135804-default-e2e.js

EXPOSE 5432