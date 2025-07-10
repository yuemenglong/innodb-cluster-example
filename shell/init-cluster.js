// 文件: shell/init-cluster.js
// \connect root:root@mysql1:3306
// \connect root:root@172.28.41.59:3316
// docker exec -it -u root mysql-router bash
// mysqlrouter --bootstrap root:root@mysql1:3306 --directory /usr/local/mysqlrouter --user=mysqlrouter --force
// chown -R mysqlrouter:mysqlrouter /usr/local/mysqlrouter/
// chmod 600 /usr/local/mysqlrouter/mysqlrouter.key
// mysqlrouter -c /usr/local/mysqlrouter/mysqlrouter.conf
print("⏳ 脚本开始：正在检查或创建InnoDB集群 'myCluster'...");

// try {
//     // 步骤 1: 首先尝试获取集群对象。这是判断集群是否存在的最佳方式。
//     // 注意：我们还没有连接到任何特定实例。
//     const cluster = dba.getCluster('myCluster');
//     print("✅ 已找到现有集群 'myCluster'。");

//     // 步骤 2: 如果找到了集群，检查其状态。
//     const status = cluster.status();
//     if (status.status === 'OK_NO_TOLERANCE' || status.status === 'OK') {
//         print("✅ 集群状态正常。无需操作。");
//     } else {
//         // 如果集群状态不正常（例如所有节点都离线了）
//         print("🟡 集群状态不佳，尝试从完全宕机中恢复...");
//         const rebootedCluster = dba.rebootClusterFromCompleteOutage('myCluster');
//         print("✅ 集群已成功重启。");
//     }

// } catch (e) {
//     // 步骤 3: 如果 getCluster() 抛出异常，我们判断是否是因为集群不存在。
//     if (e.message.includes("Cluster 'myCluster' does not exist")) {
//         print("🟡 未找到集群 'myCluster'。开始执行首次创建流程...");

// mysqlsh
// \connect root:root@172.28.41.59:3316
  dba.configureInstance('root@172.28.41.59:3316', { password: 'root', clusterAdmin: 'clusteradmin',
  clusterAdminPassword: 'password' });
  dba.configureInstance('root@172.28.41.59:3326', { password: 'root', clusterAdmin: 'clusteradmin',
  clusterAdminPassword: 'password' });
  dba.configureInstance('root@172.28.41.59:3336', { password: 'root', clusterAdmin: 'clusteradmin',
  clusterAdminPassword: 'password' });

// docker inspect mysql1 | grep IPAddress
  const newCluster = dba.createCluster('myCluster', {
    localAddress: '0.0.0.0:3316'
  });

  newCluster.addInstance('root@172.28.41.59:3326', {
    password: 'root',
    recoveryMethod: 'clone',
    localAddress: 'mysql2:3326'
  });

  newCluster.addInstance('root@172.28.41.59:3336', {
    password: 'root',
    recoveryMethod: 'clone',
    localAddress: '0.0.0.0:3336'
  });

                
        // dba.configureInstance('root@172.28.41.59:3316', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        // dba.configureInstance('root@172.28.41.59:3326', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        // dba.configureInstance('root@172.28.41.59:3336', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        // const newCluster = dba.createCluster('myCluster');
        // newCluster.addInstance('root@172.28.41.59:3326', { password: 'root', recoveryMethod: 'clone' });
        // newCluster.addInstance('root@172.28.41.59:3336', { password: 'root', recoveryMethod: 'clone' });
        

// mysqlsh
// \connect root:root@mysql1:3316
        dba.configureInstance('root@mysql1:3316', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        dba.configureInstance('root@mysql2:3326', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        dba.configureInstance('root@mysql3:3336', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        const newCluster = dba.createCluster('myCluster');
        newCluster.addInstance('root@mysql2:3326', { password: 'root', recoveryMethod: 'clone' });
        newCluster.addInstance('root@mysql3:3336', { password: 'root', recoveryMethod: 'clone' });
        


        // // 步骤 3a: 依次配置每个实例
        // print("  -> 正在配置 mysql1...");
        // dba.configureInstance('root@mysql1:3306', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        
        // print("  -> 正在配置 mysql2...");
        // dba.configureInstance('root@mysql2:3306', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });
        
        // print("  -> 正在配置 mysql3...");
        // dba.configureInstance('root@mysql3:3306', { password: 'root', clusterAdmin: 'clusteradmin', clusterAdminPassword: 'password' });

        // // 步骤 3b: 创建集群，并将 mysql1 作为种子节点
        // print("  -> 正在创建集群...");
        // const newCluster = dba.createCluster('myCluster');

        // // 步骤 3c: 将另外两个实例加入集群
        // print("  -> 正在添加 mysql2 到集群...");
        // newCluster.addInstance('root@mysql2:3306', { password: 'root', recoveryMethod: 'clone' });
        
        // print("  -> 正在添加 mysql3 到集群...");
        // newCluster.addInstance('root@mysql3:3306', { password: 'root', recoveryMethod: 'clone' });
        
        // print("✅ 新集群 'myCluster' 创建成功！");

//     } else {
//         // 步骤 4: 如果是其他未知错误，打印错误并以失败状态退出。
//         print(`❌ 发生未知严重错误: ${e.message}`);
//     }
// }

print("🏁 脚本执行完毕。");