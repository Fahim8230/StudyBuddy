import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const AttachmentsComponent = ({ studyGroup }) => {
    const [attachments, setAttachments] = useState([]);
    const { getToken } = useContext(AuthContext);
    const fileInputRef = useRef(null);

    const fetchAttachments = async () => {
        try {
            const token = await getToken();
            const response = await axios.get(
                `http://127.0.0.1:5000/attachment/study-group/${studyGroup.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );
            setAttachments(response.data);
        } catch (error) {
            console.error("Error fetching attachments:", error);
        }
    };

    useEffect(() => {
        fetchAttachments();
    }, []);

    const handleFileUpload = async (e) => {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append("study_group_id", studyGroup.id);

        try {
            const token = await getToken();
            await axios.post(`http://127.0.0.1:5000/attachment/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            fetchAttachments();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleAddAttachmentClick = () => {
        fileInputRef.current.click();
    };

    const getDownloadLink = (att) => {
        return `http://127.0.0.1:5000/attachment/file/${att.id}`;
    };

    return (
        <Container>
            <Button variant="primary" onClick={handleAddAttachmentClick}>
                Add Attachment
            </Button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
            <Row className="mt-4">
                {attachments.map((attachment) => (
                    <Col md={12} key={attachment.id} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{attachment.file_name}</Card.Title>
                                <Card.Text>
                                    Uploaded by: {attachment.user} on{" "}
                                    {new Date(
                                        attachment.date_uploaded
                                    ).toLocaleDateString()}
                                </Card.Text>
                                <Button
                                    variant="secondary"
                                    href={getDownloadLink(attachment)}
                                    target="_blank"
                                >
                                    Download
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AttachmentsComponent;
