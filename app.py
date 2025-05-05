from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import sqlite3
import hashlib

# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'your_secret_key'

def get_db_connection():
    conn = sqlite3.connect('child_safety.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def home():
    # Route for the home page
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Route for login functionality
    if request.method == 'POST':
        user_type = request.form.get('user_type')
        email = request.form.get('email')
        password = request.form.get('password')

        hashed_password = hashlib.sha256(password.encode()).hexdigest()

        conn = get_db_connection()
        cursor = conn.cursor()

        if user_type == 'parent':
            cursor.execute('SELECT * FROM parents WHERE email = ? AND password = ?', (email, hashed_password))
        else:
            cursor.execute('SELECT * FROM children WHERE email = ? AND password = ?', (email, hashed_password))

        user = cursor.fetchone()
        conn.close()

        if user:
            session['user_type'] = user_type
            session['email'] = email
            session['user_id'] = user['id']
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error="Invalid credentials")

    return render_template('login.html')

@app.route('/signup', methods=['POST'])
def signup():
    # Route for sign-up functionality
    role = request.form.get('role')
    email = request.form.get('email')
    password = request.form.get('password')

    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        if role == 'parent':
            cursor.execute('INSERT INTO parents (email, password) VALUES (?, ?)', (email, hashed_password))
        else:
            cursor.execute('INSERT INTO children (email, password) VALUES (?, ?)', (email, hashed_password))
        conn.commit()
        message = "Signup successful. Please log in."
    except sqlite3.IntegrityError:
        message = "Email already exists."
    except Exception as e:
        message = f"Error: {str(e)}"
    finally:
        conn.close()

    return render_template('login.html', message=message)

@app.route('/dashboard')
def dashboard():
    if 'user_type' not in session:
        return redirect(url_for('login'))

    if session['user_type'] == 'parent':
        return render_template('dashboard_parent.html', email=session.get('email'))
    else:
        return render_template('dashboard_child.html', email=session.get('email'))

@app.route('/api/send-alert', methods=['POST'])
def api_send_alert():
    # API route for sending alerts
    data = request.get_json()
    message = data.get('message')
    # Broadcast the message to the child (dummy response here)
    return jsonify({'success': True, 'message': message})

@app.route('/api/lock-device', methods=['POST'])
def api_lock_device():
    # API route for locking the device
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)
