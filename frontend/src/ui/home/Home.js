import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {TweetCard} from "../shared/components/tweetCard/TweetCard";
import {TweetForm} from "./TweetForm";
import {Container, Row, Col} from "react-bootstrap"
import {fetchAllTweets} from "../../store/tweets";

export const Home = () => {

	const tweets = useSelector(state => state.tweets ? state.tweets : []);
	console.log(tweets)
	const dispatch = useDispatch();
	const effects = () => {
		dispatch(fetchAllTweets());
	};
	useEffect(effects, [dispatch]);

	return (
		<>
			<Container>

				<Row className='pt-2 border border-light border-2'>
					<Col>
			<TweetForm/>
					</Col>
				</Row>
			{tweets.map(tweet => <TweetCard tweet={tweet} key={tweet.tweetId}/>)}
			</Container>
		</>
	)
};


