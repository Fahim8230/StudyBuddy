import React, { useState, useEffect, useContext } from "react";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import MeetingsForm from "./MeetingsForm";

const MeetingsComponent = ({ studyGroup = null }) => {
    const [meetings, setMeetings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { getToken } = useContext(AuthContext);

    const fetchMeetings = async () => {
        try {
            const token = await getToken();
            const response = await axios.get(
                studyGroup
                    ? `http://127.0.0.1:5000/meeting/study-group/${studyGroup.id}`
                    : `http://127.0.0.1:5000/meeting/my-meetings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMeetings(response.data);
        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);

    const handleAddMeeting = async (meeting) => {
        try {
            const token = await getToken();
            await axios.post(
                `http://127.0.0.1:5000/meeting/`,
                { ...meeting, study_group_id: studyGroup.id },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            fetchMeetings();
            setShowModal(false);
        } catch (error) {
            console.error("Error adding meeting:", error);
        }
    };

    return (
        <Container>
            {studyGroup && (
                <Button variant="primary" onClick={() => setShowModal(true)}>
                    Add Meeting
                </Button>
            )}
            <Row className="mt-4">
                {meetings.map((meeting) => (
                    <Col md={12} key={meeting.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{meeting.meeting_time}</Card.Title>
                                {meeting.online_meeting && (
                                    <Card.Text>
                                        Online Meeting:{" "}
                                        <a
                                            target="_blank"
                                            href={meeting.meeting_link}
                                        >
                                            {meeting.meeting_link}
                                        </a>
                                    </Card.Text>
                                )}
                                {!meeting.online_meeting && (
                                    <Card.Text>
                                        Location: {meeting.meeting_location}
                                    </Card.Text>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Meeting</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MeetingsForm onSubmit={handleAddMeeting} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default MeetingsComponent;
