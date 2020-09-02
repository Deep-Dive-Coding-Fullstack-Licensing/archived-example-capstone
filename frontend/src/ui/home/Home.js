import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {TweetCard} from "../shared/components/tweetCard/TweetCard";
import {TweetForm} from "../shared/components/tweetForm/TweetForm";
import {Container} from "react-bootstrap"
import {fetchAllTweets} from "../../store/tweets";

export const Home = () => {

	const tweets = useSelector(state => state.tweets ? state.tweets : []);
	const dispatch = useDispatch();
	const effects = () => {
		dispatch(fetchAllTweets());
	};
	const inputs = [];
	useEffect(effects, inputs);

	return (
		<>
			<Container>
			<TweetForm/>
			{tweets.map(tweet => <TweetCard tweet={tweet} key={tweet.tweetId}/>)}
			</Container>
		</>
	)
};


