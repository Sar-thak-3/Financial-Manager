import requests

API_URL = 'http://localhost:3000'

def register_user(user_data):
    return requests.post(f'{API_URL}/auth/register', json=user_data)

def login_user(user_data):
    return requests.post(f'{API_URL}/auth/login', json=user_data)

def get_transactions(user_id):
    return requests.get(f'{API_URL}/transactions/{user_id}')

def add_transaction(id, transaction_data):
    return requests.post(f'{API_URL}/transactions/{id}', json=transaction_data)

def update_transaction(id, transaction_data):
    return requests.put(f'{API_URL}/transactions/{id}', json=transaction_data)

def delete_transaction(id):
    return requests.delete(f'{API_URL}/transactions/{id}')

def get_categories(user_id):
    return requests.get(f'{API_URL}/categories/{user_id}')

def add_category(category_data):
    return requests.post(f'{API_URL}/categories', json=category_data)

def update_category(id, category_data):
    return requests.put(f'{API_URL}/categories/{id}', json=category_data)

def delete_category(id):
    return requests.delete(f'{API_URL}/categories/{id}')

def get_savings_goals(user_id):
    return requests.get(f'{API_URL}/savings-goals/{user_id}')

def add_savings_goal(user_id, goal_data):
    return requests.post(f'{API_URL}/savings-goals/{user_id}', json=goal_data)

def update_savings_goal(id, goal_data):
    return requests.put(f'{API_URL}/savings-goals/{id}', json=goal_data)

def delete_savings_goal(id):
    return requests.delete(f'{API_URL}/savings-goals/{id}')

def check_savings_progress(user_id, goal_id):
    return requests.get(f'{API_URL}/savings-goals/progress/{user_id}/{goal_id}')
