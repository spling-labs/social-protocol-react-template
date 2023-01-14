import React, { useState } from "react";
import {
    Card,
    CardHeader,
    Avatar,
    CardMedia,
    Typography,
    CardContent,
} from "@mui/material";
import { MediaData } from "@spling/social-protocol/dist/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

interface PostProps {
    postId: number;
    username: string;
    userAvatar: string | null;
    postDate: number;
    postText: string;
    postTag: string[];
    postMedia: MediaData[];
}

const PostItem: React.FC<PostProps> = props => {
    const {
        postId,
        username,
        userAvatar,
        postDate,
        postText,
        postTag,
        postMedia
    } = props;

    const [imageLoaded, setImageLoaded] = useState(true)

    const hideImage = () => {
        setImageLoaded(false)
    }

    return (
        <Card key={postId} style={{ marginBottom: 10, backgroundColor: '#32283b', borderRadius: 10, width: 400 }}>
            <CardHeader
                avatar={
                    <Avatar src={userAvatar ?? ""} />
                }
                title={username}
                titleTypographyProps={{ color: 'white', fontWeight: '600', fontSize: 14 }}
                subheader={dayjs.unix(postDate).fromNow()}
                subheaderTypographyProps={{ color: 'white', fontSize: 12 }}
            />
            {postMedia.length > 0 && imageLoaded && <CardMedia image={postMedia[0].file} component="img" sx={{ height: 300, objectFit: "cover" }} onError={hideImage} />}
            <CardContent>
                <Typography variant="body1" sx={{ color: 'white', fontSize: 14 }}>
                    {postText}
                </Typography>
                {postTag.length > 0 && <div style={{ width: "100%", alignItems: 'flex-end' }}>
                    <Typography variant="body1" sx={{ color: 'white', fontSize: 12, fontWeight: 'bold', textAlign: 'end' }}>#{postTag[0]}</Typography>
                </div>}
            </CardContent>
        </Card>
    )
}

export default PostItem;
