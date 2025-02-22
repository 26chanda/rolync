#!/bin/bash
source /home/anandabhinav217/ROLYNC/Deploy/python-backend/venv/bin/activate  # Activate your virtual environment
/home/anandabhinav217/ROLYNC/Deploy/python-backend/venv/bin/gunicorn -c /home/anandabhinav217/ROLYNC/Deploy/python-backend/gunicorn_config.py algo:app  # Run Gunicorn with config
