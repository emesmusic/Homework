(async function () {
    const contentDiv = document.getElementById('content');
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Users';
    backButton.id = 'back-button';
    backButton.style.display = 'none';
    backButton.style.position = 'absolute';
    backButton.style.top = '10px';
    backButton.style.left = '10px';
    document.body.appendChild(backButton);
    const loadingIMG = document.createElement('img');
    loadingIMG.src = './loading.gif';
    let users;
    backButton.addEventListener('click', () => {
        contentDiv.replaceChildren(usersContainer);
        backButton.style.display = 'none';
    });

    const usersContainer = document.createElement('div');
    usersContainer.className = 'user-list';
    contentDiv.appendChild(usersContainer);

    const postsContainer = document.createElement('div');
    postsContainer.className = 'posts-list';


    try {
        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!userResponse.ok) {
            throw new Error(`${userResponse.status} - ${userResponse.statusText}`);
        }
        users = await userResponse.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
    console.log(users);
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-card');
        userDiv.innerHTML = `<h2>${user.name}</h2>
    <p><a href="http://${user.website}" target="_blank">${user.website}</a></p>
    <p>${user.company.name}</p>
    <p>${user.company.catchPhrase}</p>
    <hr>`;
        usersContainer.appendChild(userDiv);
        userDiv.addEventListener('click', async () => {
            contentDiv.removeChild(usersContainer);
            contentDiv.appendChild(postsContainer);

            let posts;

            try {
                const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
                if (!postsResponse.ok) {
                    throw new Error(`${postsResponse.status} - ${postsResponse.statusText}`);
                }
                posts = await postsResponse.json();
            } catch (error) {
                console.error('Error fetching post data:', error);
            }

            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.classList.add('post-card');
                postDiv.innerHTML = `<h3>${post.title}</h3>
                                            <p>${post.body}</p>`;


                const commentsToggle = document.createElement('button');
                commentsToggle.textContent = 'Show Comments';
                commentsToggle.showComments = false;
                commentsToggle.className = 'comments-button';
                postDiv.appendChild(commentsToggle);
                postDiv.appendChild(document.createElement('hr'));
                postsContainer.appendChild(postDiv);
                backButton.style.display = 'block';


                let commentsBox;

                commentsToggle.addEventListener('click', async () => {
                    if (commentsToggle.showComments) {
                        commentsToggle.showComments = !commentsToggle.showComments;
                        commentsBox.style.display = 'none';
                        commentsToggle.textContent = 'Show Comments';
                    } else {
                        commentsToggle.showComments = !commentsToggle.showComments;
                        commentsToggle.textContent = 'Hide Comments';

                        if (commentsBox) {
                            commentsBox.style.display = 'block';
                            return;
                        }
                        else {
                            commentsBox = document.createElement('div');
                            commentsBox.className = 'comments-box';
                            postDiv.appendChild(commentsBox);

                        }
                        let comments;
                        commentsBox.appendChild(loadingIMG);
                        try {
                            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                            if (!commentsResponse.ok) {
                                throw new Error(`${commentsResponse.status} - ${commentsResponse.statusText}`);
                            }

                            comments = await commentsResponse.json();
                            commentsBox.removeChild(loadingIMG);
                            comments.forEach(comment => {

                                const commentElement = document.createElement('div');
                                commentElement.classList.add('comment-card');
                                commentElement.innerHTML = `<h4>${comment.name} (${comment.email})</h4>
                                                <p>${comment.body}</p>
                                                <hr>`;
                                commentsBox.appendChild(commentElement);


                            });


                        } catch (error) {
                            console.error('Error fetching comments data:', error);
                        }
                        postDiv.appendChild(commentsBox);



                    }
                });

            });




        });

    });



})();










