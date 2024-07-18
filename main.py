import json
from getpass import getpass
import api

user_id = None

def main():
    while True:
        print("\nWelcome to Personal Finance Manager")
        print("1. Register")
        print("2. Login")
        print("3. Exit")
        choice = input("Enter your choice: ")

        if choice == '1':
            register()
        elif choice == '2':
            if login():
                user_menu()
        elif choice == '3':
            break
        else:
            print("Invalid choice. Please try again.")

def register():
    print("\nRegister:")
    name = input("Name: ")
    email = input("Email: ")
    password = getpass("Password: ")
    user_data = {'name': name, 'email': email, 'password': password}
    response = api.register_user(user_data)
    if response.status_code == 201:
        print("Registration successful!")
    else:
        print("Registration failed:", response.json().get('message'))

def login():
    global user_id
    print("\nLogin:")
    email = input("Email: ")
    password = getpass("Password: ")
    user_data = {'email': email, 'password': password}
    response = api.login_user(user_data)
    if response.status_code == 200 or response.status_code == 201:
        user_id = response.json().get('user_id')
        print("Login successful!")
        return True
    else:
        print("Login failed:", response.json().get('message'))
        return False

def user_menu():
    while True:
        print("\nUser Menu")
        print("1. Manage Transactions")
        print("2. Manage Categories")
        print("3. Manage Savings Goals")
        print("4. Logout")
        choice = input("Enter your choice: ")

        if choice == '1':
            manage_transactions()
        elif choice == '2':
            manage_categories()
        elif choice == '3':
            manage_savings_goals()
        elif choice == '4':
            break
        else:
            print("Invalid choice. Please try again.")

def manage_transactions():
    while True:
        print("\nManage Transactions")
        print("1. View Transactions")
        print("2. Add Transaction")
        print("3. Update Transaction")
        print("4. Delete Transaction")
        print("5. Back to User Menu")
        choice = input("Enter your choice: ")

        if choice == '1':
            response = api.get_transactions(user_id)
            if response.status_code == 200 or response.status_code == 201:
                transactions = response.json()
                print(json.dumps(transactions, indent=4))
            else:
                print("Error fetching transactions:", response.json().get('message'))
        elif choice == '2':
            response = api.get_categories(user_id)
            if response.status_code == 200 or response.status_code == 201:
                categories = response.json()
                print("Select a Category:")
                for idx, category in enumerate(categories):
                    print(f"{idx + 1}. {category['name']}")
                category_choice = int(input("Enter the number of the category: ")) - 1

                if 0 <= category_choice < len(categories):
                    category = categories[category_choice]['name']
                    amount = float(input("Amount: "))
                    date = input("Date (YYYY-MM-DD): ")
                    description = input("Description: ")
                    transaction_data = {'user_id': user_id, 'amount': amount, 'date': date, 'category': category, 'description': description}
                    response = api.add_transaction(user_id, transaction_data)
                    if response.status_code == 200 or response.status_code == 201:
                        print("Transaction added successfully!")
                    else:
                        print("Error adding transaction:", response.json().get('message'))
                else:
                    print("Invalid category choice.")
            else:
                print("Error fetching categories:", response.json().get('message'))
        elif choice == '3':
            id = input("Transaction ID: ")
            amount = float(input("Amount: "))
            date = input("Date (YYYY-MM-DD): ")
            category = input("Category: ")
            description = input("Description: ")
            transaction_data = {'amount': amount, 'date': date, 'category': category, 'description': description}
            response = api.update_transaction(id, transaction_data)
            if response.status_code == 200 or response.status_code == 201:
                print("Transaction updated successfully!")
            else:
                print("Error updating transaction:", response.json().get('message'))
        elif choice == '4':
            id = input("Transaction ID: ")
            response = api.delete_transaction(id)
            if response.status_code == 200 or response.status_code == 201:
                print("Transaction deleted successfully!")
            else:
                print("Error deleting transaction:", response.json().get('message'))
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

def manage_categories():
    while True:
        print("\nManage Categories")
        print("1. View Categories")
        print("2. Add Category")
        print("3. Update Category")
        print("4. Delete Category")
        print("5. Back to User Menu")
        choice = input("Enter your choice: ")

        if choice == '1':
            response = api.get_categories(user_id)
            if response.status_code == 200 or response.status_code == 201:
                categories = response.json()
                print(json.dumps(categories, indent=4))
            else:
                print("Error fetching categories:", response.json().get('message'))
        elif choice == '2':
            name = input("Category Name: ")
            category_data = {'user_id': user_id, 'name': name}
            response = api.add_category(category_data)
            if response.status_code == 200 or response.status_code == 201:
                print("Category added successfully!")
            else:
                print("Error adding category:", response.json().get('message'))
        elif choice == '3':
            id = input("Category ID: ")
            name = input("Category Name: ")
            category_data = {'name': name}
            response = api.update_category(id, category_data)
            if response.status_code == 200 or response.status_code == 201:
                print("Category updated successfully!")
            else:
                print("Error updating category:", response.json().get('message'))
        elif choice == '4':
            id = input("Category ID: ")
            response = api.delete_category(id)
            if response.status_code == 200 or response.status_code == 201:
                print("Category deleted successfully!")
            else:
                print("Error deleting category:", response.json().get('message'))
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

def manage_savings_goals():
    while True:
        print("\nManage Savings Goals")
        print("1. View Savings Goals")
        print("2. Add Savings Goal")
        print("3. Update Savings Goal")
        print("4. Delete Savings Goal")
        print("5. Check Savings Progress")  # New option for checking progress
        print("6. Back to User Menu")
        choice = input("Enter your choice: ")

        if choice == '1':
            response = api.get_savings_goals(user_id)
            if response.status_code == 200 or response.status_code == 201:
                goals = response.json()
                print(json.dumps(goals, indent=4))
            else:
                print("Error fetching savings goals:", response.json().get('message'))
        elif choice == '2':
            amount = float(input("Target Amount: "))
            current_date = input("Current Date (YYYY-MM-DD): ")
            track_date = input("Track Date (YYYY-MM-DD): ")
            goal_data = {'target_amount': amount, 'current_date': current_date, 'track_date': track_date}
            response = api.add_savings_goal(user_id, goal_data)
            if response.status_code == 200 or response.status_code == 201:
                print("Savings goal added successfully!")
            else:
                print("Error adding savings goal:", response.json().get('message'))
        elif choice == '3':
            id = input("Savings Goal ID: ")
            amount = float(input("Target Amount: "))
            current_date = input("Current Date (YYYY-MM-DD): ")
            track_date = input("Track Date (YYYY-MM-DD): ")
            goal_data = {'target_amount': amount, 'current_date': current_date, 'track_date': track_date}
            response = api.update_savings_goal(id, goal_data)
            if response.status_code == 200 or response.status_code == 201:
                print("Savings goal updated successfully!")
            else:
                print("Error updating savings goal:", response.json().get('message'))
        elif choice == '4':
            id = input("Savings Goal ID: ")
            response = api.delete_savings_goal(id)
            if response.status_code == 200 or response.status_code == 201:
                print("Savings goal deleted successfully!")
            else:
                print("Error deleting savings goal:", response.json().get('message'))
        elif choice == '5':  # Check progress option
            id = input("Savings Goal ID: ")
            response = api.check_savings_progress(user_id, id)
            if response.status_code == 200 or response.status_code == 201:
                progress = response.json()
                print(json.dumps(progress, indent=4))
            else:
                print("Error checking savings progress:", response.json().get('message'))
        elif choice == '6':
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == '__main__':
    main()
