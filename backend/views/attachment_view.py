from flask import request, jsonify
import controllers.attachment_controller as attachment_controller
from flask import Blueprint, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
import os
import uuid
bp = Blueprint('attachment', __name__)

def attachment_to_dict(att):
    return {
        "id": att.id,
        "file_name": att.file_name,
        "file_path": att.file_path,
        "mime_type": att.mime_type,
        "date_uploaded": att.date_uploaded,
        "user_id": att.user_id,
        "study_group_id": att.study_group_id,
        "user": att.user.name,
        "study_group": att.study_group.name
    }

@bp.route('/', methods=['POST'])
@jwt_required()
def add_attachment():
    data = request.form.to_dict()
    data['user_id'] = get_jwt_identity()
    file = request.files['file']
    file_name = file.filename
    saved_file_name = str(uuid.uuid4()) + file_name
    file_path = os.path.join(os.getcwd(), 'uploads', saved_file_name)
    os.makedirs(os.path.join(os.getcwd(), 'uploads'), exist_ok=True)
    file.save(file_path)
    data['file_name'] = file_name
    data['file_path'] = file_path
    data['mime_type'] = file.mimetype
    attachment = attachment_controller.save_attachment(data)
    return jsonify(attachment_to_dict(attachment))

@bp.route('/study-group/<int:study_group_id>', methods=['GET'])
@jwt_required()
def attachments_by_study_group(study_group_id):
    attachment = attachment_controller.get_attachments_by_study_group(study_group_id)
    print(study_group_id)
    print(len(attachment))
    atts = []
    for a in attachment:
        atts.append(attachment_to_dict(a))
    return jsonify(atts)

@bp.route('/<int:attachment_id>', methods=['GET'])
def attachment(attachment_id):
    attachment = attachment_controller.get_attachment(attachment_id)
    return jsonify(attachment_to_dict(attachment))

@bp.route('/file/<int:attachment_id>', methods=['GET'])
def get_file(attachment_id):
    att = attachment_controller.get_attachment(attachment_id)
    return send_file(att.file_path, mimetype=att.mime_type)

