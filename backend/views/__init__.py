from flask import Blueprint

from .user_view import bp as user_blueprint
from .state_view import bp as state_blueprint
from .university_view import bp as university_blueprint
from .course_view import bp as course_blueprint
from .enrollment_view import bp as enrollment_blueprint