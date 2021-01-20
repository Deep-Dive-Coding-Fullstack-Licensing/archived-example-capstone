import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {httpConfig} from "../../utils/http-config";
import {useDispatch} from "react-redux";
import {getAllTweets} from "../../../../store/tweets";

export const TweetCard = ({tweet}) => {

	const dispatch = useDispatch()

	const clickLike = () => {
		httpConfig.post("/apis/like/", {likeTweetId: tweet.tweetId})
			.then(reply => {
					if(reply.status === 200) {
						console.log(reply)
						dispatch(getAllTweets())
					}
				console.log(reply)
				}
			);
	}
	return (
		<div>
			<Row>
				<Col xs={1}>
			<Image src={tweet.profileAvatarUrl} roundedCircle fluid/>
				</Col>
				<Col>
					<strong>{tweet.profileAtHandle}</strong> {new Date(tweet.tweetDate).toDateString()}
					<p>{tweet.tweetContent}</p>
					<button onClick={clickLike}>{tweet.likeCount}<span role="img" aria-label="heart emoji">❤️</span></button>
					{/*{logged in profile id === tweet.tweetProfileId ? <button onclick={deleteTweet}>Delete</button> : ""}*/}
				</Col>
			</Row>
		</div>

	)
};