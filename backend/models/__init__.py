from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .state import State
from .university import University
from .user import User
from .course import Course
from .enrollment import Enrollment
from .study_group import StudyGroup
from .membership import Membership
from .message import Message
