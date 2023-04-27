import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from "../../actions/post";

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.Comment);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const commentRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));
    console.log("🚀 ~ file: CommentSection.jsx:20 ~ handleClick ~ newComments:", newComments)
    setComments(newComments.Comment);
 
    commentRef.current.scrollIntoView({ behavior: "smooth" });
    setComment("")
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}: </strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              {" "}
              write a comment{" "}
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="filled"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Button
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
