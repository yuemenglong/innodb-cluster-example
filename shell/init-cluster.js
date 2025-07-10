/*测试可用*/
// docker exec -it -u root mysql-shell bash
// mysqlsh
// \connect root:root@mysql1:3316
dba.configureInstance('root@mysql1:3316', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
dba.configureInstance('root@mysql2:3326', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
dba.configureInstance('root@mysql3:3336', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
const newCluster = dba.createCluster('myCluster');
newCluster.addInstance('root@mysql2:3326', { password: 'root', recoveryMethod: 'clone' });
newCluster.addInstance('root@mysql3:3336', { password: 'root', recoveryMethod: 'clone' });
newCluster.status()
// docker exec -it -u root mysql-router bash
// mysqlrouter --bootstrap root:root@mysql1:3316 --directory /usr/local/mysqlrouter --user=mysqlrouter --force
// mysqlrouter -c /usr/local/mysqlrouter/mysqlrouter.conf       
// 测试可用后，在这里打镜像并配置启动参数