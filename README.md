# The Indegenous Library

Entire Full stack app.


# Instruction for Development:

Clone the repository using:

    git clone <link>

Set up the virtual environment in the root folder (TheIndegenousLibrary) using any virtual environment package. The example below is using pipenv:
**Remember to install packages for different applications in their respective virtual environments and activate it before running the app**

    pipenv shell

In order to install all the required dependencies run (with virtual environment active):

    pip install -r requirements.txt

You should now be set to run the server!

## Running the backend server:
The name of the django project is *backend* created using:

    django-admin startproject <project_name>
  
from base directory, change directory to *backend*. Then:

    python manage.py runserver

