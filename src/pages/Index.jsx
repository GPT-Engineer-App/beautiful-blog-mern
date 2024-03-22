import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Image, VStack, HStack, Wrap, WrapItem, Container, Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    // Simulated API call to fetch blog posts
    const fetchPosts = async () => {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      likes: 0,
      comments: [],
    };

    // Simulated API call to create a new blog post
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      setTitle("");
      setContent("");
      toast({
        title: "Post created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="2xl" mb={8}>
        My Blog
      </Heading>

      <VStack spacing={8} align="stretch">
        {posts.map((post) => (
          <Box key={post.id} p={6} boxShadow="md" rounded="md">
            <Image src={`https://images.unsplash.com/photo-1496449903678-68ddcb189a24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxibG9nJTIwcG9zdCUyMCUyNCU3QnBvc3QudGl0bGUlN0R8ZW58MHx8fHwxNzExMDk1MjM1fDA&ixlib=rb-4.0.3&q=80&w=1080`} alt={post.title} mb={4} rounded="md" />
            <Heading as="h2" size="xl" mb={2}>
              {post.title}
            </Heading>
            <Text mb={4}>{post.content}</Text>
            <HStack>
              <Button leftIcon={<FaHeart />} variant="ghost">
                {post.likes} Likes
              </Button>
              <Button leftIcon={<FaComment />} variant="ghost">
                {post.comments.length} Comments
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>

      <Box mt={12}>
        <Heading as="h2" size="xl" mb={4}>
          Create a New Post
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
            <Button type="submit" colorScheme="blue">
              Create Post
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

export default Index;
