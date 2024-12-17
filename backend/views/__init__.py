from flask import Blueprint

from .user_view import bp as user_blueprint
from .state_view import bp as state_blueprint
from .university_view import bp as university_blueprint
from .course_view import bp as course_blueprint
from .enrollment_view import bp as enrollment_blueprint
from .study_group_view import bp as study_group_blueprint
from .message_view import bp as message_blueprint
from .attachment_view import bp as attachment_blueprint
from .membership_view import bp as membership_blueprint
from .meeting_view import bp as meeting_blueprint
