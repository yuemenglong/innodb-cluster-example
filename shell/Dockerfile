FROM debian:bullseye

ENV DEBIAN_FRONTEND=noninteractive

# Install MySQL Shell
RUN apt-get update && \
    apt-get install -y wget gnupg lsb-release curl && \
    wget https://dev.mysql.com/get/mysql-apt-config_0.8.29-1_all.deb && \
    echo "mysql-apt-config mysql-apt-config/select-server select mysql-8.0" | debconf-set-selections && \
    dpkg -i mysql-apt-config_0.8.29-1_all.deb && \
    apt-get update && \
    apt-get install -y mysql-shell && \
    rm -rf /var/lib/apt/lists/*

RUN apt-get update && \
    apt-get install -y locales && \
    sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US:en \
    LC_ALL=en_US.UTF-8

WORKDIR /init
COPY init-cluster.js .

CMD ["sh", "-c", "sleep 20 && mysqlsh --uri root:root@mysql1:3306 --file /init/init-cluster.js"]
