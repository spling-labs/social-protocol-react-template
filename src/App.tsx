import { useEffect, useState } from 'react';
import { Order_By, Post, ProtocolOptions, SocialProtocol } from '@spling/social-protocol';
import PostItem from './components/PostItem';
import { Keypair } from '@solana/web3.js';
import { AppBar, CircularProgress, Container, Grid, IconButton, Toolbar, Typography } from '@mui/material';

function App() {
  // States
  const [socialProtocol, setSocialPorotcol] = useState<SocialProtocol>()
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1);
  const [endOfList, setEndOfList] = useState(false)
  const [loading, setLoading] = useState(false)

  // Initiliaze the Social Protocol.
  useEffect(() => {
    const runCode = async () => {
      const keyPair = Keypair.generate()
      const socialProtocol = await new SocialProtocol(keyPair, null, { useIndexer: true } as ProtocolOptions).init()
      setSocialPorotcol(socialProtocol)
    }
    runCode()
  }, [])

  // Trigger load posts.
  useEffect(() => {
    const loadPosts = async () => {
      if (socialProtocol !== undefined) {
        try {
          setLoading(true)

          const newPosts: Post[] = await socialProtocol.getAllPosts(1, 20, (page - 1) * 20, Order_By.Desc)
          if (newPosts.length === 0) setEndOfList(true)
          setPosts([...posts, ...newPosts])
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false)
        }
      }
    }
    loadPosts()
  }, [socialProtocol, page])

  // Add scroll event listener.
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  // Check on scroll if user reach almost the bottom.
  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - 200;
    const windowBottom = windowHeight + window.pageYOffset;

    // Check if list reached the bottom.
    if (windowBottom >= docHeight && !loading && !endOfList) {
      setPage(page + 1)
    }
  };

  // Render UI
  return (
    <Container maxWidth="sm">
      <AppBar position="fixed">
        <Toolbar style={{ backgroundColor: '#32283b' }}>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Feed
          </Typography>
          <IconButton
            onClick={() => { window.open('https://wa.me/31653742901', '_blank'); }}
            style={{ height: 42, width: 42, backgroundColor: '#271b2d', borderRadius: 36 / 2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
          >
            <img
              src={require("./assets/images/whatsapp_icon.png")}
              alt="Whatsapp Icon"
              style={{ width: 20, height: 20 }}
            />
          </IconButton>
          <IconButton
            onClick={() => { window.open('https://twitter.com/Spling_Labs', '_blank'); }}
            style={{ height: 42, width: 42, backgroundColor: '#271b2d', borderRadius: 36 / 2, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}
          >
            <img
              src={require("./assets/images/twitter_icon.png")}
              alt="Twitter Icon"
              style={{ width: 20, height: 20 }}
            />
          </IconButton>
          <IconButton
            onClick={() => { window.open('https://discord.gg/7e3QN3Hy64', '_blank'); }}
            style={{ height: 42, width: 42, backgroundColor: '#271b2d', borderRadius: 36 / 2, justifyContent: 'center', alignItems: 'center' }}
          >
            <img
              src={require("./assets/images/discord_icon.png")}
              alt="Discord Icon"
              style={{ width: 20, height: 20 }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent="center" onScroll={handleScroll} style={{ marginTop: 80 }}>
        {posts.length > 1 &&
          posts.map((post, i) => <PostItem
            postId={i}
            username={post.user.nickname}
            userAvatar={post.user.avatar}
            postDate={post.timestamp}
            postText={post.text}
            postTag={post.tags}
            postMedia={post.media}
          />)
        }
        {loading && <Grid item xs={12} style={{ textAlign: 'center', margin: 20 }}>
          <CircularProgress style={{ color: '#32283b' }} />
          <Typography variant="body1" sx={{ color: 'white', fontSize: 14 }}>Load more...</Typography>
        </Grid>}
        {!loading && endOfList && <div style={{ textAlign: 'center', margin: 20 }}>
          <Typography variant="body1" sx={{ color: 'white', fontSize: 14 }}>You have reached the end of the list! 🚀</Typography>
        </div>}
      </Grid>
    </Container>
  )
}

export default App;
