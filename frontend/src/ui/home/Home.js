import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {TweetCard} from "./TweetCard";
import {TweetForm} from "./TweetForm";
import { Container, Row, Col, Button } from 'react-bootstrap'
import {fetchAllTweets} from "../../store/tweets";

export const Home = () => {

	const tweets = useSelector(state => state.tweets ? state.tweets : []);

	const dispatch = useDispatch();
	const effects = () => {
		dispatch(fetchAllTweets());
	};
	useEffect(effects, [dispatch]);

	return (
		<>
			<Container>
				<Button onClick={()=> {

					dispatch(fetchAllTweets())}}>Click Me</Button>
				<Row className='pt-2 border border-light border-2'>
					<Col>
			<TweetForm/>
					</Col>
				</Row>
			{tweets.map(tweet => <TweetCard
				tweet={tweet} key={tweet.tweetId}/>)}
			</Container>
		</>
	)
};


