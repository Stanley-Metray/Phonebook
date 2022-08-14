// window.location.href="/edit-contacts";
const edits = document.getElementsByClassName("edit");
const trashs = document.getElementsByClassName("delete");
const edit = [...edits];
const trash = [...trashs];

// console.log(edit);

edit.forEach((element)=>{
    element.addEventListener("click", (e)=>{
        let parent = e.target.parentElement.parentElement;
        let name = parent.getElementsByClassName("name")[0].innerText.split(" ")[0];
        document.cookie = "editname="+name;
        window.location.href="/edit-contacts";
    });
});

trash.forEach((element)=>{
    element.addEventListener("click", (e)=>{
        let parent = e.target.parentElement.parentElement;
        let name = parent.getElementsByClassName("name")[0].innerText.split(" ")[0];
        document.cookie = "deletename="+name;
        window.location.href="/delete-contacts";
    });
});

let counter=0;
const searchInput =  document.getElementById("search");
const searchResult = document.getElementById("names");

searchInput.addEventListener("keyup", (e)=>{
    // console.log("key pressed...",++counter);
    $.ajax('/search-contact', {
        type: 'GET',  // http method
        data: { name: e.target.value },  // data to submit
        success: function (data, status, xhr) {
            searchResult.innerHTML = "";
            for(let index in data)
            {
                let li = document.createElement("li");
                li.innerText = data[index].firstName+" "+data[index].lastName;
                li.addEventListener("click", ()=>{
                    document.cookie = "editname="+data[index].firstName; 
                    window.location.href="/edit-contacts";
                });
                searchResult.appendChild(li);
            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
                console.log(errorMessage);
        }
    });
});

