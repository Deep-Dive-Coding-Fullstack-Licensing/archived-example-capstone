import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {httpConfig} from "../shared/utils/httpConfig";
import { useDispatch, useSelector } from 'react-redux'
import {setAllTweets} from "../../store/tweets";

export const TweetCard = ({tweet}) => {

	const likes = useSelector(state => {
		if ( state.likes[tweet.tweetId] === undefined) {
			return []
		}else{
			return state.likes[tweet.tweetId]
		}
	})

	const dispatch = useDispatch()

	const clickLike = () => {
		httpConfig.post("/apis/like/", {likeTweetId: tweet.tweetId})
			.then(reply => {
					if(reply.status === 200) {
						console.log(reply)
						dispatch(setAllTweets())
					}
				console.log(reply)
				}
			);
	}

	console.log(likes)

	return (
		<>
			<Row className=" border border-light rounded px-4">
				<Col xs={2}  sm={2} md={1} lg={1} xl={1} xxl={1}>
			<Image src={tweet.profileAvatarUrl}  width={60} height={60} roundedCircle fluid/>
				</Col>
				<Col>
					<strong>{tweet.profileAtHandle}</strong> {new Date(tweet.tweetDate).toDateString()}
					<p>{tweet.tweetContent}</p>
					<button onClick={clickLike}>{likes.length}<span role="img" aria-label="heart emoji">❤️</span></button>
					{/*{logged in profile id === tweet.tweetProfileId ? <button onclick={deleteTweet}>Delete</button> : ""}*/}
				</Col>
			</Row>
		</>

	)
};