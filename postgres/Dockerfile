FROM postgres:12.0

ADD /seed/copy_varieties.sql /docker-entrypoint-initdb.d
ADD /seed/variety.csv /docker-entrypoint-initdb.d

RUN chmod a+r /docker-entrypoint-initdb.d/*