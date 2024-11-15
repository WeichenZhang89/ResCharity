import newsDetails from "@/data/newsDetails";
import React from "react";
import { Image } from "react-bootstrap";
import SingleComment from "../CausesDetails/SingleComment";
import CommentForm from "../CommentForm/CommentForm";

const {
  image,
  admin,
  totalComments,
  title,
  textOne,
  textTwo,
  textThree,
  tags,
  author: { image: authorImage, name, description },
  comments,
} = newsDetails;

const NewsDetailsLeft = () => {
  return (
    <div className="news-details__left">
      <div className="news-details__img">
        <Image src={image.src} alt="" />
      </div>
      <div className="news-details__content">
        <ul className="list-unstyled news-details__meta">
          <li>
            <a href="#">
              <i className="far fa-user-circle"></i> by {admin}
            </a>
          </li>
          <li>
            <span>/</span>
          </li>
          <li>
            <a href="#">
              <i className="far fa-comments"></i> {totalComments} Comments
            </a>
          </li>
        </ul>
        <h3 className="news-details__title">{title}</h3>
        <p className="news-details__text-one">{textOne}</p>
        <p className="news-details__text-two">{textTwo}</p>
        <p className="news-details__text-three">{textThree}</p>
      </div>
      <div className="news-details__bottom">
        <p className="news-details__tags">
          <span>Tags: </span>
          {tags.map((tag, i) => (
            <a key={i} href="#">
              {tag}
            </a>
          ))}
        </p>
      </div>
      <div className="author-one">
        <div className="author-one__image">
          <Image src={authorImage.src} alt="" />
        </div>
        <div className="author-one__content">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="comment-one">
        <h3 className="comment-one__title">Comments</h3>
        {comments.map((comment) => (
          <SingleComment key={comment.id} comment={comment} />
        ))}
      </div>
      <CommentForm />
    </div>
  );
};

export default NewsDetailsLeft;
