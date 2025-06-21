import { useParams } from "react-router-dom"


export const CommentsPage = () => {
    const { postId } = useParams()
    return(
        <div className="comments">
            <h1>Welcome the comments of {postId}</h1>
        </div>
    )
}
