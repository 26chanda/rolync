# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS
# from nltk.corpus import wordnet as wn
# from fuzzywuzzy import fuzz, process

# # Load environment variables
# load_dotenv()

# # Set up Flask app
# app = Flask(__name__)
# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'
# CORS(app, resources={r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}})

# # Set up logging
# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# # MongoDB connection details
# mongo_uri = 'mongodb://localhost:27017/'
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]
# employee_profiles_collection = db["employeeprofiles"]

# WEIGHTAGE = {
#     'department': 0.60,
#     'problems': 0.25,
#     'responsibilities': 0.15
# }

# MINIMUM_THRESHOLD_SCORE = 0.5  # Minimum score for partial matches

# # Normalize text to ensure consistency
# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else text

# def normalize_list(items):
#     normalized_items = []
#     for item in items:
#         if isinstance(item, str):
#             parts = [normalize_text(part) for part in item.split(',') if part]
#             normalized_items.extend(parts)
#     return set(normalized_items)

# def get_synonyms(word):
#     synonyms = set()
#     for syn in wn.synsets(word):
#         for lemma in syn.lemmas():
#             synonyms.add(lemma.name().replace('_', ' '))
#     return synonyms

# def expand_with_synonyms(terms):
#     expanded_terms = set()
#     for term in terms:
#         expanded_terms.update(get_synonyms(term))
#     return expanded_terms

# def jaccard_similarity(set1, set2):
#     intersection = set1.intersection(set2)
#     union = set1.union(set2)
#     return len(intersection) / len(union) if union else 0

# def fuzzy_similarity(str1, str2):
#     return fuzz.token_set_ratio(str1, str2) / 100.0

# def compute_weighted_score(department_score, problem_score, responsibility_score):
#     return (WEIGHTAGE['department'] * department_score +
#             WEIGHTAGE['problems'] * problem_score +
#             WEIGHTAGE['responsibilities'] * responsibility_score)

# def log_mismatches(user, profile, match_fields):
#     logging.info(f"Profile - Name: {profile.get('Name')}, ID: {profile.get('_id')}, Job Title: {profile.get('workExperience', {}).get('jobTitle')}, Domain: {profile.get('workExperience', {}).get('domain')}")
#     for field in ['departments', 'problems', 'responsibilities']:
#         if field not in match_fields:
#             logging.info(f"{field.capitalize()} mismatch. User: {user.get(field)}, Profile: {profile.get('workExperience', {}).get(field)}")

# def match_user_to_profile(user, profile):
#     user_departments = normalize_list(user.get('departments', []))
#     user_problems = normalize_list(user.get('problems', []))
#     user_responsibilities = normalize_list(user.get('responsibilities', []))

#     profile_departments = normalize_list(profile.get('workExperience', {}).get('domain', []))
#     profile_problems = expand_with_synonyms(normalize_list(profile.get('workExperience', {}).get('issuesAddressed', [])))
#     profile_responsibilities = expand_with_synonyms(normalize_list(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))

#     match_fields = set()

#     # Calculate similarity scores
#     department_score = jaccard_similarity(user_departments, profile_departments)
#     problem_score = max([fuzzy_similarity(user_problem, profile_problem) for user_problem in user_problems for profile_problem in profile_problems]) if profile_problems else 0
#     responsibility_score = max([fuzzy_similarity(user_responsibility, profile_responsibility) for user_responsibility in user_responsibilities for profile_responsibility in profile_responsibilities]) if profile_responsibilities else 0

#     if department_score > 0:
#         match_fields.add('departments')
#     if problem_score > 0:
#         match_fields.add('problems')
#     if responsibility_score > 0:
#         match_fields.add('responsibilities')

#     final_score = compute_weighted_score(department_score, problem_score, responsibility_score)
#     log_mismatches(user, profile, match_fields)
    
#     match = 1 if final_score > MINIMUM_THRESHOLD_SCORE else 0

#     return match, final_score

# def match_user_responses_to_profiles(user_response):
#     results = []
#     matched_profiles = []

#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")

#     for profile in employee_profiles:
#         match, score = match_user_to_profile(user_response, profile)

#         if match == 1:
#             matched_profiles.append({
#                 'ObjectId': str(profile.get('_id')),
#                 'Name': profile.get('Name'),
#                 'Job Title': profile.get('workExperience', {}).get('jobTitle'),
#                 'Company': profile.get('workExperience', {}).get('company'),
#                 'Summary': profile.get('summary'),
#                 'Match Score': score * 100  # Convert to percentage for frontend
#             })

#     ranked_results = sorted(matched_profiles, key=lambda x: x['Match Score'], reverse=True)[:5]

#     return {
#         'total_matches': len(ranked_results),
#         'matched_profiles': ranked_results
#     }

# @app.route('../flask-api/match_profiles', methods=['POST'])
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         logging.info(f"Received user response: {user_response}")
#         matching_results = match_user_responses_to_profiles(user_response)

#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200
#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500 

# @app.route('/')
# def home():
#     return "Flask app is running"

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5003, debug=False)



# # # pip install flask-cors
# # #  waitress-serve --port=5003 algo:app  
# # # ps aux | grep flask





# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS

# # Load environment variables
# load_dotenv()

# # Set up Flask app
# app = Flask(__name__)

# # Access the shared secret from the environment variable
# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'

# # Enable CORS for all routes
# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost/5001"]}
# })

# # Set up logging
# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# # MongoDB connection details
# mongo_uri = 'mongodb://localhost:27017/'
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]
# employee_profiles_collection = db["employeeprofiles"]

# WEIGHTAGE = {
#     'department': 0.50,
#     'problems': 0.35,
#     'responsibilities': 0.25
# }

# # Function to log user input (optional)
# def log_user_input(user_response):
#     logging.info(f"Received user response: {user_response}")

# # Function to normalize texts
# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else text

# def normalize_list(items):
#     normalized_items = []
#     for item in items:
#         if isinstance(item, str):
#             parts = [normalize_text(part) for part in item.split(',') if part]
#             normalized_items.extend(parts)
#     return normalized_items

# # Function for partial match between user and profile data
# def partial_match(user_list, profile_list):
#     for user_item in user_list:
#         for profile_item in profile_list:
#             if user_item in profile_item or profile_item in user_item:
#                 return True
#     return False

# # Function for exact match of responsibilities
# def exact_match(user_list, profile_list):
#     return len(user_list.intersection(profile_list)) >= 2

# # Function to compute the weighted score
# def compute_weighted_score(department_score, problem_score, responsibility_score):
#     return (WEIGHTAGE['department'] * department_score +
#             WEIGHTAGE['problems'] * problem_score +
#             WEIGHTAGE['responsibilities'] * responsibility_score)

# # Function to log mismatches between user and profile
# def log_mismatches(user, profile, match_fields):
#     logging.info(f"Processing Profile - Name: {profile.get('Name')}, Object ID: {profile.get('_id')}, "
#                  f"Job Title: {profile.get('workExperience', {}).get('jobTitle')}, "
#                  f"Domain: {profile.get('workExperience', {}).get('domain')}")
    
#     if 'departments' not in match_fields:
#         logging.info(f"Department mismatch. User: {user.get('departments')}, Profile: {profile.get('workExperience', {}).get('domain')}")
#     if 'problems' not in match_fields:
#         logging.info(f"Problems mismatch. User: {user.get('problems')}, Profile: {profile.get('workExperience', {}).get('issuesAddressed')}")
#     if 'responsibilities' not in match_fields:
#         logging.info(f"Responsibilities mismatch. User: {user.get('responsibilities')}, Profile: {profile.get('workExperience', {}).get('responsibilitiesKeywords')}")

# # Shared Secret Middleware
# def validate_shared_secret(f):
#     def wrapper(*args, **kwargs):
#         shared_secret = request.headers.get('x-shared-secret')
#         if shared_secret != FLASK_SHARED_SECRET:
#             return jsonify({'message': 'Unauthorized'}), 403
#         return f(*args, **kwargs)
#     wrapper.__name__ = f.__name__
#     return wrapper

# # Function to match user response with a profile
# def match_user_to_profile(user, profile):
#     user_departments = normalize_list(user.get('departments', []))
#     user_problems = normalize_list(user.get('problems', []))
#     user_responsibilities = set(normalize_list(user.get('responsibilities', [])))

#     profile_departments = normalize_list(profile.get('workExperience', {}).get('domain', []))
#     profile_problems = normalize_list(profile.get('workExperience', {}).get('issuesAddressed', []))
#     profile_responsibilities = set(normalize_list(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))

#     match_fields = set()

#     # Department score
#     department_score = 1 if partial_match(user_departments, profile_departments) else 0
#     if department_score > 0:
#         match_fields.add('departments')

#     # Problem score 
#     problem_score = 1 if partial_match(user_problems, profile_problems) else 0
#     if problem_score > 0:
#         match_fields.add('problems')

#     # Responsibility score
#     responsibility_score = 1 if exact_match(user_responsibilities, profile_responsibilities) else 0
#     if responsibility_score > 0:
#         match_fields.add('responsibilities')

#     final_score = compute_weighted_score(department_score, problem_score, responsibility_score)
#     log_mismatches(user, profile, match_fields)

#     match = 1 if final_score > 0.65 else 0
#     return match, final_score

# # Function to match user responses to all employee profiles
# def match_user_responses_to_profiles(user_response):
#     match_count = 0
#     non_match_count = 0
#     matched_profiles = []

#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")

#     for profile in employee_profiles:
#         match, score = match_user_to_profile(user_response, profile)

#         # Fetch the additional fields from the profile
#         object_id = str(profile.get('_id'))
#         name = profile.get('Name')
#         job_title = profile.get('workExperience', {}).get('jobTitle')
#         company = profile.get('workExperience', {}).get('company')
#         summary = profile.get('summary')

#         if match == 1:
#             match_count += 1
#             # Append the matched profile data including the score
#             matched_profiles.append({
#                 'ObjectId': object_id, 
#                 'Name': name,
#                 'Job Title': job_title,
#                 'Company': company,
#                 'Summary': summary,
#                 'Score': score  # Include score in the matched profile data
#             })
#         else:
#             non_match_count += 1

#     return {
#         'total_matches': match_count,
#         'total_non_matches': non_match_count,
#         'matched_profiles': matched_profiles
#     }

# # Flask route to handle matching profiles
# @app.route('/flask-api/match_profiles', methods=['POST'])
# @validate_shared_secret 
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         log_user_input(user_response)
#         matching_results = match_user_responses_to_profiles(user_response)

#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200
#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500 

# @app.route('/')
# def home():
#     return "Flask app is running"

# # Ensure Flask listens on 127.0.0.1 and port 5003
# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5003, debug=False)






# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS
# from nltk.corpus import wordnet as wn
# from fuzzywuzzy import fuzz, process

# # Load environment variables
# load_dotenv()

# # Set up Flask app
# app = Flask(__name__)
# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'
# CORS(app, resources={r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}})

# # Set up logging
# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# # MongoDB connection details
# mongo_uri = 'mongodb://localhost:27017/'
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]
# employee_profiles_collection = db["employeeprofiles"]

# WEIGHTAGE = {
#     'department': 0.60,
#     'problems': 0.25,
#     'responsibilities': 0.15
# }

# MINIMUM_THRESHOLD_SCORE = 0.5  # Minimum score for partial matches

# # Helper Functions
# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else ''

# def normalize_list(items):
#     if not items:
#         return set()
#     normalized_items = {normalize_text(item) for item in items if isinstance(item, str)}
#     return normalized_items

# def get_synonyms(word):
#     synonyms = set()
#     for syn in wn.synsets(word):
#         for lemma in syn.lemmas():
#             synonyms.add(lemma.name().replace('_', ' '))
#         # Include hypernyms and hyponyms for broader matching
#         synonyms.update([h.name().replace('_', ' ') for h in syn.hypernyms()])
#         synonyms.update([h.name().replace('_', ' ') for h in syn.hyponyms()])
#     return synonyms

# def expand_with_synonyms(terms):
#     expanded_terms = set()
#     for term in terms:
#         expanded_terms.update(get_synonyms(term))
#     return expanded_terms

# def jaccard_similarity(set1, set2):
#     if not set1 or not set2:
#         return 0
#     intersection = set1.intersection(set2)
#     union = set1.union(set2)
#     return len(intersection) / len(union)

# def fuzzy_similarity(str1, str2):
#     return fuzz.token_set_ratio(str1, str2) / 100.0

# def compute_weighted_score(department_score, problem_score, responsibility_score):
#     return sum([
#         WEIGHTAGE['department'] * department_score,
#         WEIGHTAGE['problems'] * problem_score,
#         WEIGHTAGE['responsibilities'] * responsibility_score
#     ])

# def match_user_to_profile(user, profile):
#     user_departments = normalize_list(user.get('departments'))
#     user_problems = normalize_list(user.get('problems'))
#     user_responsibilities = normalize_list(user.get('responsibilities'))

#     profile_departments = normalize_list(profile.get('workExperience', {}).get('domain'))
#     profile_problems = expand_with_synonyms(normalize_list(profile.get('workExperience', {}).get('issuesAddressed')))
#     profile_responsibilities = expand_with_synonyms(normalize_list(profile.get('workExperience', {}).get('responsibilitiesKeywords')))

#     department_score = jaccard_similarity(user_departments, profile_departments)
#     problem_score = max((fuzzy_similarity(up, pp) for up in user_problems for pp in profile_problems), default=0)
#     responsibility_score = max((fuzzy_similarity(ur, pr) for ur in user_responsibilities for pr in profile_responsibilities), default=0)

#     final_score = compute_weighted_score(department_score, problem_score, responsibility_score)
#     is_match = final_score > MINIMUM_THRESHOLD_SCORE

#     return is_match, final_score

# # Matching Logic
# def match_user_responses_to_profiles(user_response):
#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")
#         return {'total_matches': 0, 'matched_profiles': []}

#     matched_profiles = []
#     for profile in employee_profiles:
#         is_match, score = match_user_to_profile(user_response, profile)
#         if is_match:
#             matched_profiles.append({
#                 'ObjectId': str(profile.get('_id')),
#                 'Name': profile.get('Name'),
#                 'Job Title': profile.get('workExperience', {}).get('jobTitle'),
#                 'Company': profile.get('workExperience', {}).get('company'),
#                 'Summary': profile.get('summary'),
#                 'Match Score': round(score * 100, 2)  # Percentage
#             })

#     # Sort and return top 5 matches
#     ranked_results = sorted(matched_profiles, key=lambda x: x['Match Score'], reverse=True)[:5]
#     return {'total_matches': len(ranked_results), 'matched_profiles': ranked_results}

# # Routes
# @app.route('/flask-api/match_profiles', methods=['POST'])
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         logging.info(f"Received user response: {user_response}")
#         matching_results = match_user_responses_to_profiles(user_response)
#         return jsonify(matching_results), 200
#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500 

# @app.route('/')
# def home():
#     return "Flask app is running"

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5003, debug=False)




# import logging
# from flask import Flask, request, jsonify 
# from pymongo import MongoClient 
# import os 
# from dotenv import load_dotenv 
# from flask_cors import CORS 

# # Load environment variables
# load_dotenv()

# # Set up Flask app
# app = Flask(__name__)

# # Access the shared secret from the environment variable
# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'

# # Enable CORS for all routes
# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com","http://localhost:5001"]}
# })


# # Set up logging
# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')



# # MongoDB connection details
# mongo_uri ='mongodb://localhost:27017/'
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]  # Connect to your database
# employee_profiles_collection = db["employeeprofiles"]  

# WEIGHTAGE = {
#     'department': 0.50,
#     'problems': 0.35,
#     'responsibilities': 0.25
# }

# # Function to log user input (optional)
# def log_user_input(user_response):
#     logging.info(f"Received user response: {user_response}")

# # Function to normalize texts
# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else text

# def normalize_list(items):
#     normalized_items = []
#     for item in items:
#         if isinstance(item, str):
#             parts = [normalize_text(part) for part in item.split(',') if part]
#             normalized_items.extend(parts)
#     return normalized_items

# # Function for partial match between user and profile data
# def partial_match(user_list, profile_list):
#     for user_item in user_list:
#         for profile_item in profile_list:
#             if user_item in profile_item or profile_item in user_item:  # Bidirectional partial match
#                 return True
#     return False

# # Function for exact match of responsibilities
# def exact_match(user_list, profile_list):
#     return len(user_list.intersection(profile_list)) >= 2  # At least 2 responsibilities must match

# # Function to compute the weighted score
# def compute_weighted_score(department_score, problem_score, responsibility_score):
#     weighted_score = (WEIGHTAGE['department'] * department_score +
#                       WEIGHTAGE['problems'] * problem_score +
#                       WEIGHTAGE['responsibilities'] * responsibility_score)
#     return weighted_score

# # Function to log mismatches between user and profile
# def log_mismatches(user, profile, match_fields):
#     logging.info(f"Processing Profile - Name: {profile.get('Name')}, Object ID: {profile.get('_id')}, "
#                  f"Job Title: {profile.get('workExperience', {}).get('jobTitle')}, "
#                  f"Domain: {profile.get('workExperience', {}).get('domain')}")
    
#     if 'departments' not in match_fields:
#         logging.info(f"Department mismatch. User: {user.get('departments')}, Profile: {profile.get('workExperience', {}).get('domain')}")
#     if 'problems' not in match_fields:
#         logging.info(f"Problems mismatch. User: {user.get('problems')}, Profile: {profile.get('workExperience', {}).get('issuesAddressed')}")
#     if 'responsibilities' not in match_fields:
#         logging.info(f"Responsibilities mismatch. User: {user.get('responsibilities')}, Profile: {profile.get('workExperience', {}).get('responsibilitiesKeywords')}")

# # # Shared Secret Middleware
# def validate_shared_secret(f):
#     def wrapper(*args, **kwargs):
#         shared_secret = request.headers.get('x-shared-secret')
#         if shared_secret != FLASK_SHARED_SECRET:
#             return jsonify({'message': 'Unauthorized'}), 403  # Reject if the shared secret doesn't match
#         return f(*args, **kwargs)
#     wrapper.__name__ = f.__name__
#     return wrapper

# # Function to match user response with a profile
# def match_user_to_profile(user, profile):
#     user_departments = normalize_list(user.get('departments', []))
#     user_problems = normalize_list(user.get('problems', []))
#     user_responsibilities = set(normalize_list(user.get('responsibilities', [])))

#     profile_departments = normalize_list(profile.get('workExperience', {}).get('domain', []))
#     profile_problems = normalize_list(profile.get('workExperience', {}).get('issuesAddressed', []))
#     profile_responsibilities = set(normalize_list(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))

#     match_fields = set()

#     # Department score
#     department_score = 1 if partial_match(user_departments, profile_departments) else 0
#     if department_score > 0:
#         match_fields.add('departments')

#     # Problem score 
#     problem_score = 1 if partial_match(user_problems, profile_problems) else 0
#     if problem_score > 0:
#         match_fields.add('problems')

#     # Responsibility score
#     responsibility_score = 1 if exact_match(user_responsibilities, profile_responsibilities) else 0
#     if responsibility_score > 0:
#         match_fields.add('responsibilities')

#     final_score = compute_weighted_score(department_score, problem_score, responsibility_score)

#     log_mismatches(user, profile, match_fields)

#     match = 1 if final_score > 0.65 else 0

#     return match, final_score

# # Function to match user responses to all employee profiles
# def match_user_responses_to_profiles(user_response):
#     results = []
#     match_count = 0
#     non_match_count = 0
#     matched_profiles = []

#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")

#     for profile in employee_profiles:
#         match, score = match_user_to_profile(user_response, profile)

#         # Fetch the additional fields from the profile
#         object_id = str(profile.get('_id'))
#         name = profile.get('Name')
#         job_title = profile.get('workExperience', {}).get('jobTitle')
#         company = profile.get('workExperience', {}).get('company')
#         summary = profile.get('summary')

#         if match == 1:
#             match_count += 1
#             # Append the matched profile data (without the score)
#             matched_profiles.append({
#                 'ObjectId': object_id, 
#                 'Name': name,
#                 'Job Title': job_title,
#                 'Company': company,
#                 'Summary': summary
#             })
#         else:
#             non_match_count += 1

#     return {
#         'total_matches': match_count,
#         'total_non_matches': non_match_count,
#         'matched_profiles': matched_profiles
#     }

# # Flask route to handle matching profiles
# @app.route('/flask-api/match_profiles', methods=['POST'])
# @validate_shared_secret 
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         log_user_input(user_response)  # Log the incoming user response
#         matching_results = match_user_responses_to_profiles(user_response)

#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200
#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500 

# @app.route('/')
# def home():
#     return "Flask app is running"

# # Ensure Flask listens on 127.0.0.1 and port 5003
# if __name__ == '_main_':
#     app.run(host='127.0.0.1', port=5003, debug=True)



# -------------------------------------------------------------
# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS

# # Load environment variables
# load_dotenv()

# # Set up Flask app
# app = Flask(__name__)

# # Access the shared secret from the environment variable
# FLASK_SHARED_SECRET = os.getenv('FLASK_SHARED_SECRET', 'asudfbaiowAFJAKAJ!201391*')

# # Enable CORS for all routes
# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}
# })

# # Set up logging
# log_level = logging.INFO if os.getenv('FLASK_ENV') != 'production' else logging.WARNING
# logging.basicConfig(level=log_level, format='%(asctime)s - %(message)s')

# # MongoDB connection details
# mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]  # Connect to your database
# employee_profiles_collection = db["employeeprofiles"]
# matched_profiles_collection = db["matchedprofiles"]  # Collection for storing matched profiles

# WEIGHTAGE = {
#     'department': 0.50,
#     'problems': 0.35,
#     'responsibilities': 0.25
# }

# # Shared Secret Middleware
# def validate_shared_secret(f):
#     def wrapper(*args, **kwargs):
#         shared_secret = request.headers.get('x-shared-secret')
#         if shared_secret != FLASK_SHARED_SECRET:
#             return jsonify({'message': 'Unauthorized'}), 403
#         return f(*args, **kwargs)
#     wrapper.__name__ = f.__name__
#     return wrapper

# # Utility Functions
# def normalize_text(text):
#     """Normalize the text by stripping, lowering case, and removing extra spaces."""
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else text

# def normalize_list(items):
#     """Normalize a list of items."""
#     normalized_items = []
#     for item in items:
#         if isinstance(item, str):
#             parts = [normalize_text(part) for part in item.split(',') if part]
#             normalized_items.extend(parts)
#     return normalized_items

# def partial_match(user_list, profile_list):
#     """Check for partial match between user and profile lists."""
#     for user_item in user_list:
#         for profile_item in profile_list:
#             if user_item in profile_item or profile_item in user_item:
#                 return True
#     return False

# def exact_match(user_list, profile_list):
#     """Check for exact match (intersection) between user and profile lists."""
#     return len(user_list.intersection(profile_list)) >= 2

# def compute_weighted_score(department_score, problem_score, responsibility_score):
#     """Compute the weighted score for matching."""
#     return (WEIGHTAGE['department'] * department_score +
#             WEIGHTAGE['problems'] * problem_score +
#             WEIGHTAGE['responsibilities'] * responsibility_score)

# def log_mismatches(user, profile, match_fields):
#     """Log mismatches in departments, problems, and responsibilities."""
#     logging.info(f"Processing Profile - Name: {profile.get('Name')}, Object ID: {profile.get('_id')}")
#     if 'departments' not in match_fields:
#         logging.info(f"Department mismatch. User: {user.get('departments')}, Profile: {profile.get('workExperience', {}).get('domain')}")
#     if 'problems' not in match_fields:
#         logging.info(f"Problems mismatch. User: {user.get('problems')}, Profile: {profile.get('workExperience', {}).get('issuesAddressed')}")
#     if 'responsibilities' not in match_fields:
#         logging.info(f"Responsibilities mismatch. User: {user.get('responsibilities')}, Profile: {profile.get('workExperience', {}).get('responsibilitiesKeywords')}")

# # Matching Logic
# def match_user_to_profile(user, profile):
#     """Match user data with a profile."""
#     user_departments = normalize_list(user.get('departments', []))
#     user_problems = normalize_list(user.get('problems', []))
#     user_responsibilities = set(normalize_list(user.get('responsibilities', [])))

#     profile_departments = normalize_list(profile.get('workExperience', {}).get('domain', []))
#     profile_problems = normalize_list(profile.get('workExperience', {}).get('issuesAddressed', []))
#     profile_responsibilities = set(normalize_list(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))

#     match_fields = set()

#     department_score = 1 if partial_match(user_departments, profile_departments) else 0
#     if department_score > 0:
#         match_fields.add('departments')

#     problem_score = 1 if partial_match(user_problems, profile_problems) else 0
#     if problem_score > 0:
#         match_fields.add('problems')

#     responsibility_score = 1 if exact_match(user_responsibilities, profile_responsibilities) else 0
#     if responsibility_score > 0:
#         match_fields.add('responsibilities')

#     final_score = compute_weighted_score(department_score, problem_score, responsibility_score)
#     log_mismatches(user, profile, match_fields)

#     match = 1 if final_score > 0.65 else 0
#     return match, final_score

# def match_user_responses_to_profiles(user_response):
#     matched_profiles = []

#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")

#     for profile in employee_profiles:
#         match, score = match_user_to_profile(user_response, profile)

#         object_id = str(profile.get('_id'))
#         name = profile.get('Name')
#         job_title = profile.get('workExperience', {}).get('jobTitle')
#         company = profile.get('workExperience', {}).get('company')
#         summary = profile.get('summary')

#         if match == 1:
#             matched_profile = {
#                 '_id': object_id,  # Explicitly set ObjectId as the MongoDB _id
#                 'Name': name,
#                 'Job Title': job_title,
#                 'Company': company,
#                 'Summary': summary
#             }
#             matched_profiles.append(matched_profile)

#             # Save matched profiles to MongoDB
#             matched_profiles_collection.update_one(
#                 {'_id': object_id},  # Query by _id
#                 {'$set': matched_profile},
#                 upsert=True
#             )

#         return matched_profiles

# # Flask Routes

# @app.route('/flask-api/create-or-update-matches', methods=['POST'])
# @validate_shared_secret
# def create_or_update_matches():
#     """Route to create or update matches for a user in the database."""
#     try:
#         user_response = request.get_json()
#         user_id = user_response.get('userId')
#         matches = user_response.get('matches')

#         if not user_id or not matches:
#             return jsonify({'error': 'User ID and matches are required'}), 400

#         # Check if the user already has matches in the database
#         existing_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if existing_matches:
#             # Update the existing matches with new ones
#             existing_matches['matches'] = matches
#             matched_profiles_collection.update_one({'userId': user_id}, {'$set': existing_matches})
#             return jsonify({'message': 'Matches updated successfully', 'data': existing_matches}), 200
#         else:
#             # Create new match entry if none exists
#             new_matches = {'userId': user_id, 'matches': matches}
#             matched_profiles_collection.insert_one(new_matches)
#             return jsonify({'message': 'Matches created successfully', 'data': new_matches}), 201
#     except Exception as e:
#         logging.error(f"Error creating or updating matches: {e}")
#         return jsonify({'error': 'Error creating or updating matches', 'message': str(e)}), 500


# @app.route('/flask-api/get-matches/<user_id>', methods=['GET'])
# @validate_shared_secret
# def get_matches_by_user_id(user_id):
#     """Route to fetch all matches for a user."""
#     try:
#         user_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if not user_matches:
#             return jsonify({'message': 'No matches found for this user'}), 404

#         # Return the matches with profile details
#         return jsonify(user_matches), 200
#     except Exception as e:
#         logging.error(f"Error fetching matches for user {user_id}: {e}")
#         return jsonify({'error': 'Error fetching matches', 'message': str(e)}), 500


# @app.route('/flask-api/update-match', methods=['PUT'])
# @validate_shared_secret
# def update_match():
#     """Route to update a match profile in the user's matches."""
#     try:
#         user_response = request.get_json()
#         user_id = user_response.get('userId')
#         profile_id = user_response.get('profileId')
#         updated_match = user_response.get('updatedMatch')

#         if not user_id or not profile_id or not updated_match:
#             return jsonify({'error': 'userId, profileId, and updatedMatch are required'}), 400

#         # Find the user's match entry
#         user_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if not user_matches:
#             return jsonify({'message': 'User matches not found'}), 404

#         # Find the match profile to update
#         match_index = next((index for (index, match) in enumerate(user_matches['matches']) if str(match['profileId']) == profile_id), None)

#         if match_index is None:
#             return jsonify({'message': 'Match profile not found'}), 404

#         # Update the match profile
#         user_matches['matches'][match_index].update(updated_match)
#         matched_profiles_collection.update_one({'userId': user_id}, {'$set': user_matches})
#         return jsonify({'message': 'Match updated successfully', 'data': user_matches}), 200
#     except Exception as e:
#         logging.error(f"Error updating match: {e}")
#         return jsonify({'error': 'Error updating match', 'message': str(e)}), 500


# @app.route('/flask-api/delete-match/<user_id>/<profile_id>', methods=['DELETE'])
# @validate_shared_secret
# def delete_match(user_id, profile_id):
#     """Route to delete a match from the user's match list."""
#     try:
#         # Find the user's match entry
#         user_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if not user_matches:
#             return jsonify({'message': 'User matches not found'}), 404

#         # Filter out the match profile to delete
#         user_matches['matches'] = [match for match in user_matches['matches'] if str(match['profileId']) != profile_id]
#         matched_profiles_collection.update_one({'userId': user_id}, {'$set': user_matches})

#         return jsonify({'message': 'Match deleted successfully', 'data': user_matches}), 200
#     except Exception as e:
#         logging.error(f"Error deleting match: {e}")
#         return jsonify({'error': 'Error deleting match', 'message': str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)



# # --------------------------------
# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS

# # Load environment variables
# load_dotenv()

# # Set up Flask app
# app = Flask(__name__)

# # Access the shared secret from the environment variable
# FLASK_SHARED_SECRET = os.getenv('FLASK_SHARED_SECRET', 'asudfbaiowAFJAKAJ!201391*')

# # Enable CORS for all routes
# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}
# })

# # Set up logging
# log_level = logging.INFO if os.getenv('FLASK_ENV') != 'production' else logging.WARNING
# logging.basicConfig(level=log_level, format='%(asctime)s - %(message)s')

# # MongoDB connection details
# mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]  # Connect to your database
# employee_profiles_collection = db["employeeprofiles"]
# matched_profiles_collection = db["matchedprofiles"]  # Collection for storing matched profiles

# WEIGHTAGE = {
#     'department': 0.50,
#     'problems': 0.35,
#     'responsibilities': 0.25
# }

# # Shared Secret Middleware
# def validate_shared_secret(f):
#     def wrapper(*args, **kwargs):
#         shared_secret = request.headers.get('x-shared-secret')
#         if shared_secret != FLASK_SHARED_SECRET:
#             return jsonify({'message': 'Unauthorized'}), 403
#         return f(*args, **kwargs)
#     wrapper.__name__ = f.__name__
#     return wrapper

# # Utility Functions
# def normalize_text(text):
#     """Normalize the text by stripping, lowering case, and removing extra spaces."""
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else text

# def normalize_list(items):
#     """Normalize a list of items."""
#     normalized_items = []
#     for item in items:
#         if isinstance(item, str):
#             parts = [normalize_text(part) for part in item.split(',') if part]
#             normalized_items.extend(parts)
#     return normalized_items

# def partial_match(user_list, profile_list):
#     """Check for partial match between user and profile lists."""
#     for user_item in user_list:
#         for profile_item in profile_list:
#             if user_item in profile_item or profile_item in user_item:
#                 return True
#     return False

# def exact_match(user_list, profile_list):
#     """Check for exact match (intersection) between user and profile lists."""
#     return len(user_list.intersection(profile_list)) >= 2

# def compute_weighted_score(department_score, problem_score, responsibility_score):
#     """Compute the weighted score for matching."""
#     return (WEIGHTAGE['department'] * department_score +
#             WEIGHTAGE['problems'] * problem_score +
#             WEIGHTAGE['responsibilities'] * responsibility_score)

# def log_mismatches(user, profile, match_fields):
#     """Log mismatches in departments, problems, and responsibilities."""
#     logging.info(f"Processing Profile - Name: {profile.get('Name')}, Object ID: {profile.get('_id')}")
#     if 'departments' not in match_fields:
#         logging.info(f"Department mismatch. User: {user.get('departments')}, Profile: {profile.get('workExperience', {}).get('domain')}")
#     if 'problems' not in match_fields:
#         logging.info(f"Problems mismatch. User: {user.get('problems')}, Profile: {profile.get('workExperience', {}).get('issuesAddressed')}")
#     if 'responsibilities' not in match_fields:
#         logging.info(f"Responsibilities mismatch. User: {user.get('responsibilities')}, Profile: {profile.get('workExperience', {}).get('responsibilitiesKeywords')}")

# # Matching Logic
# def match_user_to_profile(user, profile):
#     """Match user data with a profile."""
#     user_departments = normalize_list(user.get('departments', []))
#     user_problems = normalize_list(user.get('problems', []))
#     user_responsibilities = set(normalize_list(user.get('responsibilities', [])))

#     profile_departments = normalize_list(profile.get('workExperience', {}).get('domain', []))
#     profile_problems = normalize_list(profile.get('workExperience', {}).get('issuesAddressed', []))
#     profile_responsibilities = set(normalize_list(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))

#     match_fields = set()

#     department_score = 1 if partial_match(user_departments, profile_departments) else 0
#     if department_score > 0:
#         match_fields.add('departments')

#     problem_score = 1 if partial_match(user_problems, profile_problems) else 0
#     if problem_score > 0:
#         match_fields.add('problems')

#     responsibility_score = 1 if exact_match(user_responsibilities, profile_responsibilities) else 0
#     if responsibility_score > 0:
#         match_fields.add('responsibilities')

#     final_score = compute_weighted_score(department_score, problem_score, responsibility_score)
#     log_mismatches(user, profile, match_fields)

#     match = 1 if final_score > 0.65 else 0
#     return match, final_score

# def match_user_responses_to_profiles(user_response):
#     """Match user responses to profiles and store results for the user."""
#     matched_profiles = []

#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")

#     for profile in employee_profiles:
#         match, score = match_user_to_profile(user_response, profile)

#         object_id = str(profile.get('_id'))
#         name = profile.get('Name')
#         job_title = profile.get('workExperience', {}).get('jobTitle')
#         company = profile.get('workExperience', {}).get('company')
#         summary = profile.get('summary')

#         if match == 1:
#             matched_profile = {
#                 '_id': object_id,  # Explicitly set ObjectId as the MongoDB _id
#                 'Name': name,
#                 'Job Title': job_title,
#                 'Company': company,
#                 'Summary': summary
#             }
#             matched_profiles.append(matched_profile)

#             # Save matched profiles to MongoDB
#             matched_profiles_collection.update_one(
#                 {'_id': object_id},  # Query by _id
#                 {'$set': matched_profile},
#                 upsert=True
#             )

#     return matched_profiles

# # Flask Routes

# @app.route('/flask-api/create-or-update-matches', methods=['POST'])
# @validate_shared_secret
# def create_or_update_matches():
#     """Route to create or update matches for a user in the database."""
#     try:
#         user_response = request.get_json()
#         user_id = user_response.get('userId')
#         matches = user_response.get('matches')

#         if not user_id or not matches:
#             return jsonify({'error': 'User ID and matches are required'}), 400

#         # Check if the user already has matches in the database
#         existing_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if existing_matches:
#             # Update the existing matches with new ones
#             existing_matches['matches'] = matches
#             matched_profiles_collection.update_one({'userId': user_id}, {'$set': existing_matches})
#             return jsonify({'message': 'Matches updated successfully', 'data': existing_matches}), 200
#         else:
#             # Create new match entry if none exists
#             new_matches = {'userId': user_id, 'matches': matches}
#             matched_profiles_collection.insert_one(new_matches)
#             return jsonify({'message': 'Matches created successfully', 'data': new_matches}), 201
#     except Exception as e:
#         logging.error(f"Error creating or updating matches: {e}")
#         return jsonify({'error': 'Error creating or updating matches', 'message': str(e)}), 500


# @app.route('/flask-api/get-matches/<user_id>', methods=['GET'])
# @validate_shared_secret
# def get_matches_by_user_id(user_id):
#     """Route to fetch all matches for a user."""
#     try:
#         user_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if not user_matches:
#             return jsonify({'message': 'No matches found for this user'}), 404

#         # Return the matches with profile details
#         return jsonify(user_matches), 200
#     except Exception as e:
#         logging.error(f"Error fetching matches for user {user_id}: {e}")
#         return jsonify({'error': 'Error fetching matches', 'message': str(e)}), 500


# @app.route('/flask-api/update-match', methods=['PUT'])
# @validate_shared_secret
# def update_match():
#     """Route to update a match profile in the user's matches."""
#     try:
#         user_response = request.get_json()
#         user_id = user_response.get('userId')
#         profile_id = user_response.get('profileId')
#         updated_match = user_response.get('updatedMatch')

#         if not user_id or not profile_id or not updated_match:
#             return jsonify({'error': 'userId, profileId, and updatedMatch are required'}), 400

#         # Find the user's match entry
#         user_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if not user_matches:
#             return jsonify({'message': 'User matches not found'}), 404

#         # Find the match profile to update
#         match_index = next((index for (index, match) in enumerate(user_matches['matches']) if str(match['profileId']) == profile_id), None)

#         if match_index is None:
#             return jsonify({'message': 'Match profile not found'}), 404

#         # Update the match profile
#         user_matches['matches'][match_index].update(updated_match)
#         matched_profiles_collection.update_one({'userId': user_id}, {'$set': user_matches})
#         return jsonify({'message': 'Match updated successfully', 'data': user_matches}), 200
#     except Exception as e:
#         logging.error(f"Error updating match: {e}")
#         return jsonify({'error': 'Error updating match', 'message': str(e)}), 500


# @app.route('/flask-api/delete-match/<user_id>/<profile_id>', methods=['DELETE'])
# @validate_shared_secret
# def delete_match(user_id, profile_id):
#     """Route to delete a match from the user's match list."""
#     try:
#         # Find the user's match entry
#         user_matches = matched_profiles_collection.find_one({'userId': user_id})

#         if not user_matches:
#             return jsonify({'message': 'User matches not found'}), 404

#         # Filter out the match profile to delete
#         user_matches['matches'] = [match for match in user_matches['matches'] if str(match['profileId']) != profile_id]
#         matched_profiles_collection.update_one({'userId': user_id}, {'$set': user_matches})

#         return jsonify({'message': 'Match deleted successfully', 'data': user_matches}), 200
#     except Exception as e:
#         logging.error(f"Error deleting match: {e}")
#         return jsonify({'error': 'Error deleting match', 'message': str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True)



# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS

# # Load environment variables
# load_dotenv()

# # Set up Flask app
# app = Flask(_name_)

# # Access the shared secret from the environment variable
# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'

# # Enable CORS for all routes
# CORS(app, resources={
#      r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost/5001"]}
# })


# # Set up logging
# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')



# # MongoDB connection details
# # mongo_uri ='mongodb://localhost:27017'
# mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# client = MongoClient(mongo_uri)
# db = client["newdatabase"]  # Connect to your database
# employee_profiles_collection = db["employeeprofiles"]  
# matched_profiles_collection = db["matchedprofiles"]
# # matched_profiles_collection = db["matchedprofile"]
# WEIGHTAGE = {
#     'department': 0.50,
#     'problems': 0.35,
#     'responsibilities': 0.25
# }

# # Function to log user input (optional)
# def log_user_input(user_response):
#     logging.info(f"Received user response: {user_response}")

# # Function to normalize texts
# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else text

# def normalize_list(items):
#     normalized_items = []
#     for item in items:
#         if isinstance(item, str):
#             parts = [normalize_text(part) for part in item.split(',') if part]
#             normalized_items.extend(parts)
#     return normalized_items

# # Function for partial match between user and profile data
# def partial_match(user_list, profile_list):
#     for user_item in user_list:
#         for profile_item in profile_list:
#             if user_item in profile_item or profile_item in user_item:  # Bidirectional partial match
#                 return True
#     return False

# # Function for exact match of responsibilities
# def exact_match(user_list, profile_list):
#     return len(user_list.intersection(profile_list)) >= 2  # At least 2 responsibilities must match

# # Function to compute the weighted score
# def compute_weighted_score(department_score, problem_score, responsibility_score):
#     weighted_score = (WEIGHTAGE['department'] * department_score +
#                       WEIGHTAGE['problems'] * problem_score +
#                       WEIGHTAGE['responsibilities'] * responsibility_score)
#     return weighted_score

# # Function to log mismatches between user and profile
# def log_mismatches(user, profile, match_fields):
#     logging.info(f"Processing Profile - Name: {profile.get('Name')}, Object ID: {profile.get('_id')}, "
#                  f"Job Title: {profile.get('workExperience', {}).get('jobTitle')}, "
#                  f"Domain: {profile.get('workExperience', {}).get('domain')}")
    
#     if 'departments' not in match_fields:
#         logging.info(f"Department mismatch. User: {user.get('departments')}, Profile: {profile.get('workExperience', {}).get('domain')}")
#     if 'problems' not in match_fields:
#         logging.info(f"Problems mismatch. User: {user.get('problems')}, Profile: {profile.get('workExperience', {}).get('issuesAddressed')}")
#     if 'responsibilities' not in match_fields:
#         logging.info(f"Responsibilities mismatch. User: {user.get('responsibilities')}, Profile: {profile.get('workExperience', {}).get('responsibilitiesKeywords')}")

# # # Shared Secret Middleware
# def validate_shared_secret(f):
#     def wrapper(*args, **kwargs):
#         shared_secret = request.headers.get('x-shared-secret')
#         if shared_secret != FLASK_SHARED_SECRET:
#             return jsonify({'message': 'Unauthorized'}), 403  # Reject if the shared secret doesn't match
#         return f(*args, **kwargs)
#     wrapper._name_ = f._name_
#     return wrapper

# # Function to match user response with a profile
# def match_user_to_profile(user, profile):
#     user_departments = normalize_list(user.get('departments', []))
#     user_problems = normalize_list(user.get('problems', []))
#     user_responsibilities = set(normalize_list(user.get('responsibilities', [])))

#     profile_departments = normalize_list(profile.get('workExperience', {}).get('domain', []))
#     profile_problems = normalize_list(profile.get('workExperience', {}).get('issuesAddressed', []))
#     profile_responsibilities = set(normalize_list(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))

#     match_fields = set()

#     # Department score
#     department_score = 1 if partial_match(user_departments, profile_departments) else 0
#     if department_score > 0:
#         match_fields.add('departments')

#     # Problem score 
#     problem_score = 1 if partial_match(user_problems, profile_problems) else 0
#     if problem_score > 0:
#         match_fields.add('problems')

#     # Responsibility score
#     responsibility_score = 1 if exact_match(user_responsibilities, profile_responsibilities) else 0
#     if responsibility_score > 0:
#         match_fields.add('responsibilities')

#     final_score = compute_weighted_score(department_score, problem_score, responsibility_score)

#     log_mismatches(user, profile, match_fields)

#     match = 1 if final_score > 0.65 else 0

#     return match, final_score

# # Function to match user responses to all employee profiles
# def match_user_responses_to_profiles(user_response):
#     results = []
#     match_count = 0
#     non_match_count = 0
#     matched_profiles = []

#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")

#     for profile in employee_profiles:
#         match, score = match_user_to_profile(user_response, profile)

#         # Fetch the additional fields from the profile
#         object_id = str(profile.get('_id'))
#         name = profile.get('Name')
#         job_title = profile.get('workExperience', {}).get('jobTitle')
#         company = profile.get('workExperience', {}).get('company')
#         summary = profile.get('summary')

#         if match == 1:
#             match_count += 1
#             # Append the matched profile data (without the score)
#             matched_profiles.append({
#                 'ObjectId': object_id,
#                 'Name': name,
#                 'Job Title': job_title,
#                 'Company': company,
#                 'Summary': summary
# })
#             # matched_profiles.append(matched_profile)

#             # Avoid duplicates: Insert only if the profile is not already in matchedprofiles
#             if not matched_profiles_collection.find_one({'ObjectId': object_id}):
#                 matched_profiles_collection.insert_one(matched_profile)


#         else:
#             non_match_count += 1

#     return {
#         'total_matches': match_count,
#         'total_non_matches': non_match_count,
#         'matched_profiles': matched_profiles
#     }

# # Flask route to handle matching profiles
# # @app.route('/flask-api/match_profiles', methods=['POST'])
# # @validate_shared_secret 
# # def match_profiles():
# #     try:
# #         user_response = request.get_json()
# #         log_user_input(user_response)  # Log the incoming user response
# #         matching_results = match_user_responses_to_profiles(user_response)

# #         return jsonify({
# #             'total_matches': matching_results['total_matches'],
# #             'matched_profiles': matching_results['matched_profiles']
# #         }), 200
# #     except Exception as e:
# #         logging.error(f"Error processing request: {e}")
# #         return jsonify({'error': 'Internal server error'}), 500 


# @app.route('/flask-api/match_profiles', methods=['POST'])
# @validate_shared_secret
# def match_profiles():
#     try:
#         # Extract and log the incoming request data
#         user_response = request.get_json()
#         logging.info(f"Received user response: {user_response}")
        
#         if not user_response:
#             return jsonify({'error': 'Request body is empty or invalid'}), 400  # Bad Request

#         # Match user response to profiles
#         matching_results = match_user_responses_to_profiles(user_response)

#         # Return matched results
#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200

#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500


















# @app.route('/')
# def home():
#     return "Flask app is running"

# # Ensure Flask listens on 127.0.0.1 and port 5003
# if _name_ == '_main_':
#     app.run(host='127.0.0.1', port=5003, debug=True)


# # ------------------------------------------------------------------------------------------------------------------------------------
# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# load_dotenv()

# app = Flask(__name__)

# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'


# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}
# })

# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]
# employee_profiles_collection = db["employeeprofiles"]


# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else ''


# def match_user_responses_to_profiles(user_response):
    
#     user_text = ' '.join([
#         normalize_text(','.join(user_response.get('departments', []))),
#         normalize_text(','.join(user_response.get('problems', []))),
#         normalize_text(','.join(user_response.get('responsibilities', [])))
#     ])

   
#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")
#         return {'total_matches': 0, 'matched_profiles': []}

    
#     profile_texts = []
#     profile_metadata = []

#     for profile in employee_profiles:
#         profile_text = ' '.join([
#             normalize_text(','.join(profile.get('workExperience', {}).get('domain', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('issuesAddressed', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))
#         ])
#         profile_texts.append(profile_text)

        
#         profile_metadata.append({
#             'ObjectId': str(profile.get('_id')),
#             'Name': profile.get('Name'),
#             'Job Title': profile.get('workExperience', {}).get('jobTitle'),
#             'Company': profile.get('workExperience', {}).get('company'),
#             'Summary': profile.get('summary'),
#         })

   
#     vectorizer = TfidfVectorizer()
#     tfidf_matrix = vectorizer.fit_transform([user_text] + profile_texts)
#     similarity_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

    
#     ranked_profiles = sorted(
#         zip(similarity_scores, profile_metadata),
#         key=lambda x: x[0],
#         reverse=True
#     )

   
#     top_matches = ranked_profiles[:8]

#     return {
#         'total_matches': len([score for score, _ in ranked_profiles if score > 0]),
#         'matched_profiles': [
#             {**metadata, 'Similarity Score': round(score, 2)}
#             for score, metadata in top_matches
#         ]
#     }

# @app.route('/flask-api/match_profiles', methods=['POST'])
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         logging.info(f"Received user response: {user_response}")

#         if not user_response:
#             return jsonify({'error': 'Request body is empty or invalid'}), 400  

      
#         matching_results = match_user_responses_to_profiles(user_response)

        
#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200

#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500

# @app.route('/')
# def home():
#     return "Flask app is running"


# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5003, debug=True)
# # ---------------------------------------------------------------------------------------------------------------------------------------------------------------


# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS
# from rapidfuzz import fuzz
# from rapidfuzz import process

# load_dotenv()

# app = Flask(__name__)

# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'

# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}
# })

# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]
# employee_profiles_collection = db["employeeprofiles"]

# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else ''

# def match_user_responses_to_profiles(user_response):
   
#     user_text = ' '.join([
#         normalize_text(','.join(user_response.get('departments', []))),
#         normalize_text(','.join(user_response.get('problems', []))),
#         normalize_text(','.join(user_response.get('responsibilities', [])))
#     ])

   
#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")
#         return {'total_matches': 0, 'matched_profiles': []}

#     profile_metadata = []
#     similarity_scores = []

#     for profile in employee_profiles:
#         profile_text = ' '.join([
#             normalize_text(','.join(profile.get('workExperience', {}).get('domain', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('issuesAddressed', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))
#         ])

       
#         similarity_score = fuzz.ratio(user_text, profile_text)
#         similarity_scores.append((similarity_score, {
#             'ObjectId': str(profile.get('_id')),
#             'Name': profile.get('Name'),
#             'Job Title': profile.get('workExperience', {}).get('jobTitle'),
#             'Company': profile.get('workExperience', {}).get('company'),
#             'Summary': profile.get('summary'),
#         }))

    
#     ranked_profiles = sorted(similarity_scores, key=lambda x: x[0], reverse=True)

    
#     top_matches = ranked_profiles[:5]

#     return {
#         'total_matches': len([score for score, _ in ranked_profiles if score > 0]),
#         'matched_profiles': [
#             {**metadata, 'Similarity Score': round(score, 2)}
#             for score, metadata in top_matches
#         ]
#     }

# @app.route('/flask-api/match_profiles', methods=['POST'])
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         logging.info(f"Received user response: {user_response}")

#         if not user_response:
#             return jsonify({'error': 'Request body is empty or invalid'}), 400  

       
#         matching_results = match_user_responses_to_profiles(user_response)

#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200

#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500

# @app.route('/')
# def home():
#     return "Flask app is running"

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5003, debug=True)



# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS
# from rapidfuzz import fuzz
# from rapidfuzz import process

# load_dotenv()

# app = Flask(__name__)

# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'

# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}
# })

# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]
# employee_profiles_collection = db["employeeprofiles"]

# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else ''

# def match_user_responses_to_profiles(user_response):
    
#     user_text = ' '.join([
#         normalize_text(','.join(user_response.get('departments', []))),
#         normalize_text(','.join(user_response.get('problems', []))),
#         normalize_text(','.join(user_response.get('responsibilities', [])))
#     ])

    
#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")
#         return {'total_matches': 0, 'matched_profiles': []}

#     similarity_scores = []

#     for profile in employee_profiles:
#         profile_text = ' '.join([
#             normalize_text(','.join(profile.get('workExperience', {}).get('domain', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('issuesAddressed', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))
#         ])

        
#         similarity_score = fuzz.ratio(user_text, profile_text)
#         similarity_scores.append((similarity_score, {
#             'ObjectId': str(profile.get('_id')),
#             'Name': profile.get('Name'),
#             'Job Title': profile.get('workExperience', {}).get('jobTitle'),
#             'Company': profile.get('workExperience', {}).get('company'),
#             'Summary': profile.get('summary'),
#         }))

    
#     ranked_profiles = sorted(similarity_scores, key=lambda x: x[0], reverse=True)

    
#     top_matches = ranked_profiles[:5]

#     return {
#         'total_matches': len([score for score, _ in ranked_profiles if score > 0]),
#         'matched_profiles': [metadata for _, metadata in top_matches]
#     }

# @app.route('/flask-api/match_profiles', methods=['POST'])
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         logging.info(f"Received user response: {user_response}")

#         if not user_response:
#             return jsonify({'error': 'Request body is empty or invalid'}), 400  

        
#         matching_results = match_user_responses_to_profiles(user_response)

#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200

#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500

# @app.route('/')
# def home():
#     return "Flask app is running"

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5003, debug=True)

#-------------------------------------------------------------------------------------------------------

# import logging
# from flask import Flask, request, jsonify
# from pymongo import MongoClient
# import os
# from dotenv import load_dotenv
# from flask_cors import CORS
# from rapidfuzz import fuzz

# load_dotenv()

# app = Flask(__name__)

# FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'

# CORS(app, resources={
#     r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}
# })

# if os.getenv('FLASK_ENV') == 'production':
#     logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
# else:
#     logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

# mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
# client = MongoClient(mongo_uri)
# db = client["mydatabase1"]
# employee_profiles_collection = db["employeeprofiles"]

# def normalize_text(text):
#     return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else ''

# def match_user_responses_to_profiles(user_response):
#     user_text = ' '.join([
#         normalize_text(','.join(user_response.get('departments', []))),
#         normalize_text(','.join(user_response.get('problems', []))),
#         normalize_text(','.join(user_response.get('responsibilities', [])))
#     ])

#     employee_profiles = list(employee_profiles_collection.find())
#     if not employee_profiles:
#         logging.warning("No employee profiles found in the database.")
#         return {'total_matches': 0, 'matched_profiles': []}

#     similarity_scores = []

#     for profile in employee_profiles:
#         profile_text = ' '.join([
#             normalize_text(','.join(profile.get('workExperience', {}).get('domain', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('issuesAddressed', []))),
#             normalize_text(','.join(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))
#         ])

#         similarity_score = fuzz.token_set_ratio(user_text, profile_text)
#         similarity_scores.append((similarity_score, {
#             'ObjectId': str(profile.get('_id')),
#             'Name': profile.get('Name'),
#             'Job Title': profile.get('workExperience', {}).get('jobTitle'),
#             'Company': profile.get('workExperience', {}).get('company'),
#             'Summary': profile.get('summary'),
#             'Similarity Score': similarity_score
#         }))

#     ranked_profiles = sorted(similarity_scores, key=lambda x: x[0], reverse=True)

#     top_matches = ranked_profiles[:-8]

#     return {
#         'total_matches': len([score for score, _ in ranked_profiles if score > 0]),
#         'matched_profiles': [metadata for _, metadata in top_matches]
#     }

# @app.route('/flask-api/match_profiles', methods=['POST'])
# def match_profiles():
#     try:
#         user_response = request.get_json()
#         logging.info(f"Received user response: {user_response}")

#         if not user_response:
#             return jsonify({'error': 'Request body is empty or invalid'}), 400

#         matching_results = match_user_responses_to_profiles(user_response)

#         return jsonify({
#             'total_matches': matching_results['total_matches'],
#             'matched_profiles': matching_results['matched_profiles']
#         }), 200

#     except Exception as e:
#         logging.error(f"Error processing request: {e}")
#         return jsonify({'error': 'Internal server error'}), 500

# @app.route('/')
# def home():
#     return "Flask app is running"

# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=5003, debug=True)
# # parallel processing-------------------------------------------------



import logging
from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from flask_cors import CORS
from rapidfuzz import fuzz

load_dotenv()

app = Flask(__name__)

FLASK_SHARED_SECRET = 'asudfbaiowAFJAKAJ!201391*'

CORS(app, resources={
    r"/match_profiles": {"origins": ["https://www.rolync.com", "https://rolync.com", "http://localhost:5001"]}
})

if os.getenv('FLASK_ENV') == 'production':
    logging.basicConfig(level=logging.WARNING, format='%(asctime)s - %(message)s')
else:
    logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(message)s')

mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(mongo_uri)
db = client["mydatabase1"]
employee_profiles_collection = db["employeeprofiles"]

def normalize_text(text):
    return text.strip().lower().replace('\n', ' ') if isinstance(text, str) else ''

def calculate_similarity(user_text, profile_text, weight=1.0):
    score = fuzz.token_set_ratio(user_text, profile_text)
    return score * weight

def match_user_responses_to_profiles(user_response):
    user_departments = normalize_text(','.join(user_response.get('departments', [])))
    user_problems = normalize_text(','.join(user_response.get('problems', [])))
    user_responsibilities = normalize_text(','.join(user_response.get('responsibilities', [])))

    employee_profiles = list(employee_profiles_collection.find())
    if not employee_profiles:
        logging.warning("No employee profiles found in the database.")
        return {'total_matches': 0, 'matched_profiles': []}

    similarity_scores = []
    
    for profile in employee_profiles:
        profile_departments = normalize_text(','.join(profile.get('workExperience', {}).get('domain', [])))
        profile_problems = normalize_text(','.join(profile.get('workExperience', {}).get('issuesAddressed', [])))
        profile_responsibilities = normalize_text(','.join(profile.get('workExperience', {}).get('responsibilitiesKeywords', [])))

        department_score = calculate_similarity(user_departments, profile_departments, weight=0.4)
        problem_score = calculate_similarity(user_problems, profile_problems, weight=0.3)
        responsibility_score = calculate_similarity(user_responsibilities, profile_responsibilities, weight=0.3)

        total_score = department_score + problem_score + responsibility_score

        if total_score > 50:  
            similarity_scores.append((total_score, {
                'ObjectId': str(profile.get('_id')),
                'Name': profile.get('Name'),
                'Job Title': profile.get('workExperience', {}).get('jobTitle'),
                'Company': profile.get('workExperience', {}).get('company'),
                'Summary': profile.get('summary'),
                'Similarity Score': total_score
            }))

    ranked_profiles = sorted(similarity_scores, key=lambda x: x[0], reverse=True)

    return {
        'total_matches': len(ranked_profiles),
        'matched_profiles': [metadata for _, metadata in ranked_profiles]
    }

@app.route('/flask-api/match_profiles', methods=['POST'])
def match_profiles():
    try:
        user_response = request.get_json()
        logging.info(f"Received user response: {user_response}")

        if not user_response:
            return jsonify({'error': 'Request body is empty or invalid'}), 400

        matching_results = match_user_responses_to_profiles(user_response)

        return jsonify({
            'total_matches': matching_results['total_matches'],
            'matched_profiles': matching_results['matched_profiles']
        }), 200

    except Exception as e:
        logging.error(f"Error processing request: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/')
def home():
    return "Flask app is running"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5003, debug=True)
