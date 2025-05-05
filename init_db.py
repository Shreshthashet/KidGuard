import sqlite3

def initialize_database():
    try:
        # Connect to SQLite database (creates file if it doesn't exist)
        conn = sqlite3.connect('child_safety.db')
        cursor = conn.cursor()

        # Read SQL commands from init_db.spsql
        with open('init_db.spsql', 'r') as f:
            sql_script = f.read()

        # Execute SQL script
        cursor.executescript(sql_script)

        # Commit changes and close connection
        conn.commit()
        conn.close()

        print("Database 'child_safety.db' initialized successfully.")
    except sqlite3.Error as e:
        print(f"Database error: {e}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    initialize_database()
