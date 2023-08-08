
import { Col, Image, Row } from 'react-bootstrap'
import {Tweet} from "../../shared/interfaces/Tweet.ts";
import {useGetLikesByLikeTweetIdQuery, useGetProfileByProfileIdQuery, useToggleLikeMutation} from "../../store/apis.ts";


interface TweetCardProps {
  tweet: Tweet
}
export function TweetCard (props: TweetCardProps) {
  const { tweet } = props

const [submitLike] = useToggleLikeMutation()
  const {data: profile, isLoading} = useGetProfileByProfileIdQuery(tweet.tweetProfileId)
  const {data: likes, isLoading: likesIsLoading, refetch} = useGetLikesByLikeTweetIdQuery(tweet.tweetProfileId)


  if(isLoading ||profile === undefined) {
    return <></>
  }

  if(likesIsLoading || likes === undefined) {
    return <></>
  }


  const clickLike =  async () => {
    await submitLike({likeTweetId: tweet.tweetId})
    await refetch()
  }

  if (profile === null) {
    return (<></>)
  }

  return (
    <>
      <Row className=" border border-light rounded px-4">
        <Col xs={2} sm={2} md={1} lg={1} xl={1} xxl={1}>
          <Image src={profile.profileAvatarUrl as string} width={60} height={60} roundedCircle fluid/>
        </Col>
        <Col>
          <strong>{profile.profileAtHandle}</strong> {new Date(tweet.tweetDate).toLocaleDateString()}
          <p>{tweet.tweetContent}</p>
          <button onClick={clickLike}>{likes.length}<span role="img" aria-label="heart emoji">❤️</span></button>
          {/*{logged in profile id === tweet.tweetProfileId ? <button onclick={deleteTweet}>Delete</button> : ""}*/}
        </Col>
      </Row>
    </>

  )
}