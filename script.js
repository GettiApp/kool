const postText = document.getElementById('post-text');
const sendBtn = document.getElementById('send-btn');
const recentPosts = document.getElementById('recent-posts');

sendBtn.addEventListener('click', () => {
    const postContent = postText.value.trim();

    if (postContent) {
        const postId = generateRandomId();
        const postElement = createPostElement(postContent, postId);
        recentPosts.appendChild(postElement);

        // Store posts in local storage (consider database for scalability)
        storePost(postId, postContent);

        // Clear the post text area
        postText.value = '';
    } else {
        alert('Please enter some text for your post.');
    }
});

function generateRandomId() {
    // Improved random ID generation for better uniqueness
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 16; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

function createPostElement(content, id) {
    const post = document.createElement('div');
    post.classList.add('post');
    post.innerHTML = `
        <p>${content}</p>
        <a href="Post.html?id=${id}">View Post</a>
    `;
    return post;
}

// Function to store posts in local storage (replace with database integration)
function storePost(id, content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || {};
    posts[id] = content;
    localStorage.setItem('posts', JSON.stringify(posts));
}

// Function to retrieve posts from local storage (replace with database retrieval)
function retrievePosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || {};
    for (const id in posts) {
        const postContent = posts[id];
        const postElement = createPostElement(postContent, id);
        recentPosts.appendChild(postElement);
    }
}

// Retrieve posts on page load
retrievePosts();
