async function editFormHandler(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
        const response = await fetch('/dashboard/edit', {
          method: 'PUT',
          body: JSON.stringify({
            post_id,
            title,
            post_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.replace('/dashboard/');
        } else {
          alert(response.statusText);
        }
      }
  
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);