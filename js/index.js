
document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById("github-form");
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        let search = e.target.search.value
        handleSearch(search)
    
function handleSearch() {
    
    fetch('https://api.github.com/search/users?q=' + search, {
        method: 'GET',
        header:{
            'Content-Type': 'application/json',
            Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify()
    })
    .then(res => res.json())
    .then(data => {console.log(data)
        const userList = document.getElementById('user-list')
        const reposList = document.getElementById('repos-list')

        userList.innerHTML = ''
        reposList.innerHTML =''
  
        data.items.forEach(user => {
            let userCard = document.createElement('li')
            userCard.className = 'all-users'
            userCard.innerHTML = `
                <div class='content'>
                    <h2> User: ${user.login}</h2>
                    <h4> URL: ${user.html_url}</h4>
                    <div class ='repos'>
                    <button class='repo-button'>
                    Repositories
                    </button>
                    </div>
                    <img src=${user.avatar_url} class = 'avatar-img' />
                </div>`
            
           userList.appendChild(userCard)   
           
           const repoButton = document.querySelector('.repo-button')
           console.log(repoButton)
           repoButton.addEventListener('click', () => {
               fetch(user.repos_url, {
               method: 'GET',
               header:{
                   'Content-Type': 'application/json',
                   Accept: 'application/vnd.github.v3+json'
               },
              // body: JSON.stringify()
            })
               .then(res => res.json())
               .then(data => {
             
               data.forEach(repo => {
                    let repoCard = document.createElement('li')
                    repoCard.innerHTML = `
                    <div class = 'repo-card'>
                    <h4> ${repo.name} </h4>
                    <p> ${repo.html_url}</p>
                    </div>
                    `
                    document.querySelector('#repos-list').appendChild(repoCard)
                    
               })
            })
              
           })


    })

})
}
})
}) 



 

