import React, { useState } from "react";
import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../NoteLayout/Layout";
import ReactMarkdown from "react-markdown";

import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

type NoteProps = {
  onDelete: (id: string) => void;
};

export function Note({ onDelete }: NoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  const [shareLink, setShareLink] = useState("");

  const shareNote = () => {
    const link = `${window.location.origin}/${note.id}`;
    setShareLink(link);
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {note.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Button variant="outline-secondary" onClick={shareNote}>
              Share
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <div
        style={{
          border: "6px solid",
          borderRadius: "12px",
          backgroundColor: "white",
          padding: "20px",
          fontSize: "18px",
          height: "500px",
          overflowY: "scroll",
        }}
      >
        <div style={{ fontFamily: "Noto Serif, serif" }}>
          <ReactMarkdown>{note.markdown}</ReactMarkdown>
        </div>
      </div>
      {shareLink && (
        <Row className="mt-4">
          <Col>
            <div className="d-flex justify-center gap-4 mb-2">
              <div className="mr-2">
                <FacebookShareButton url={shareLink}>
                  <Button variant="outline-primary">
                    <FacebookIcon size={24} round />
                    Share on Facebook
                  </Button>
                </FacebookShareButton>
              </div>
              <div className="mr-2">
                <TwitterShareButton url={shareLink}>
                  <Button variant="outline-primary">
                    <TwitterIcon size={24} round />
                    Share on Twitter
                  </Button>
                </TwitterShareButton>
              </div>
              <div>
                <WhatsappShareButton url={shareLink}>
                  <Button variant="outline-primary">
                    <WhatsappIcon size={24} round />
                    Share on WhatsApp
                  </Button>
                </WhatsappShareButton>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
