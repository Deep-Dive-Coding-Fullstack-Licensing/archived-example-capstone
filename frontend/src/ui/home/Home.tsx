
import {TweetCard} from "./TweetCard.tsx";
import {TweetForm} from "./TweetForm.tsx";
import { Container, Row, Col} from 'react-bootstrap'
import {useGetAllTweetsQuery} from "../../store/apis.ts";


export function Home() {

  const {data: tweets, isLoading, error } = useGetAllTweetsQuery("");
console.log(tweets)

  if(isLoading || tweets === undefined) {
    return <></>
  }

  if(error) {
    return <>Error loading the page</>
  }

  return (
    <>
      <Container>
        <Row className='pt-2 border border-light border-2'>
          <Col>
            <TweetForm/>
          </Col>
        </Row>
        {
           tweets.map(tweet => <TweetCard tweet={tweet} key={tweet.tweetId}/>)
        }
      </Container>
    </>
  )
};


