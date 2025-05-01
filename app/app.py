import os
import mysql.connector
import time

config = {
    "host": os.getenv("DB_HOST"),
    "port": int(os.getenv("DB_PORT", 6446)),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASS"),
    "database": os.getenv("DB_NAME"),
}

def wait_for_db():
    for _ in range(20):
        try:
            conn = mysql.connector.connect(**config)
            conn.close()
            print("✅ Connected to MySQL Router")
            return
        except:
            print("⏳ Waiting for MySQL Router...")
            time.sleep(3)
    raise Exception("❌ Could not connect to MySQL Router")

def main():
    wait_for_db()
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS testdb")
    cursor.execute("USE testdb")
    cursor.execute("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))")
    cursor.execute("INSERT INTO users (name) VALUES ('Alice'), ('Bob')")
    conn.commit()

    cursor.execute("SELECT * FROM users")
    for row in cursor.fetchall():
        print("👤", row)

    cursor.close()
    conn.close()

if __name__ == "__main__":
    main()
