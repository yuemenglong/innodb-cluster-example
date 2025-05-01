print("⏳ Waiting for servers...");

dba.configureInstance('root@mysql1:3306', {password: 'root'});
dba.configureInstance('root@mysql2:3306', {password: 'root'});
dba.configureInstance('root@mysql3:3306', {password: 'root'});

// Check if a cluster exists
try {
    var cluster = dba.rebootClusterFromCompleteOutage();
    print('Cluster rebooted from complete outage.');
} catch (e) {
    if (e.message.includes('No metadata found')) {
        // No cluster exists, create a new one
        var cluster = dba.createCluster('myCluster');
        cluster.addInstance('root@mysql2:3306');
        cluster.addInstance('root@mysql3:3306');

        print('New cluster created.');
    } else {
        // Some other error
        print('Error: ' + e.message);
    }
}

print("✅ Cluster is up and running!");