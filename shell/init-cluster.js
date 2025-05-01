print("⏳ Waiting for servers...");

dba.configureInstance('root@mysql1:3306', {password: 'root'});
dba.configureInstance('root@mysql2:3306', {password: 'root'});
dba.configureInstance('root@mysql3:3306', {password: 'root'});

var cluster = dba.createCluster('myCluster');
cluster.addInstance('root@mysql2:3306');
cluster.addInstance('root@mysql3:3306');

print("✅ Cluster is up and running!");