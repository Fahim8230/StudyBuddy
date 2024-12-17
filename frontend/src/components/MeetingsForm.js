import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const MeetingsForm = ({ onSubmit }) => {
    const [meetingTime, setMeetingTime] = useState("");
    const [onlineMeeting, setOnlineMeeting] = useState(false);
    const [meetingLocation, setMeetingLocation] = useState("");
    const [meetingLink, setMeetingLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            meeting_time: meetingTime,
            online_meeting: onlineMeeting,
            meeting_location: meetingLocation,
            meeting_link: meetingLink,
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMeetingTime" className="mb-3">
                <Form.Label>Meeting Time</Form.Label>
                <Form.Control
                    type="datetime-local"
                    value={meetingTime}
                    onChange={(e) => setMeetingTime(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formOnlineMeeting" className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Online Meeting"
                    checked={onlineMeeting}
                    onChange={(e) => setOnlineMeeting(e.target.checked)}
                />
            </Form.Group>
            {onlineMeeting && (
                <Form.Group controlId="formMeetingLink" className="mb-3">
                    <Form.Label>Meeting Link</Form.Label>
                    <Form.Control
                        type="url"
                        placeholder="Enter meeting link"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        required
                    />
                </Form.Group>
            )}
            {!onlineMeeting && (
                <Form.Group controlId="formMeetingLocation" className="mb-3">
                    <Form.Label>Meeting Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter meeting location"
                        value={meetingLocation}
                        onChange={(e) => setMeetingLocation(e.target.value)}
                        required={!onlineMeeting}
                        disabled={onlineMeeting}
                    />
                </Form.Group>
            )}
            <Button variant="primary" type="submit">
                Add Meeting
            </Button>
        </Form>
    );
};

export default MeetingsForm;
