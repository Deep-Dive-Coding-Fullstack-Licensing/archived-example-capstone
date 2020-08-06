import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getAllTweets} from "../../shared/actions/tweet";
import {TweetCard} from "../../shared/components/tweetCard/TweetCard";
import {TweetForm} from "../../shared/components/tweetForm/TweetForm";
import {Container} from "react-bootstrap"

export const Home = () => {

	const tweets = useSelector(state => state.tweets);
	const dispatch = useDispatch();

	const effects = () => {
		dispatch(getAllTweets());
	};

	const inputs = [];

	useEffect(effects, inputs);

	return (
		<>
			<Container>
			<TweetForm/>
			{tweets.map(tweet => <TweetCard tweet={tweet}/>)}
			</Container>
		</>
	)
};


