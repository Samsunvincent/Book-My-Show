
//Add Movie



async function getSelectBox(event) {
    event.preventDefault()
    //fetch category

    try {
        let c_response = await fetch('/category', { method: 'GET' })
        console.log("c_response", c_response)

        let parsed_c_response = await c_response.json();
        console.log(parsed_c_response)

        let c_data = parsed_c_response.data;
        console.log("c_data", c_data)

        let c_rows = '<option selected = "category">category</option>'

        let category = document.getElementById('category');

        for (let i = 0; i < c_data.length; i++) {
            c_rows = c_rows + `
            <option value ="${c_data[i].category}">${c_data[i].category}</option>
            `
        }
        category.innerHTML = c_rows;


        //fetch language

        let l_response = await fetch('/language', { method: 'GET' });
        console.log("l_response", l_response);

        let parsed_l_response = await l_response.json();
        console.log("parsed_l_response", parsed_l_response);

        let l_data = parsed_l_response.data;
        console.log("l_data", l_data);

        let l_rows = '<option selected = "language">language</option>'

        let language = document.getElementById('language');

        for (let i = 0; i < l_data.length; i++) {
            l_rows = l_rows + `
            <option value="${l_data[i].language}">${l_data[i].language}</option>
            `
        }
        language.innerHTML = l_rows
    } catch (error) {
        console.log("error", error)
    }
}
async function viewPage(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let image = document.getElementById('image');
    let rating = document.getElementById('rating').value;
    let duration = document.getElementById('duration').value;
    let release_date = document.getElementById('release_date').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let language = document.getElementById('language').value
    let cast = document.getElementById('cast').value;
    let crew = document.getElementById('crew').value; // Use `.value` to get the actual content

    const file = image.files[0];

    let datas = {
        name,
        image: "", // Initialize the image data with an empty string
        rating,
        duration,
        release_date,
        description,
        category,
        language,
        cast,
        crew
    };

    // Check if the image file is selected
    if (file) {
        const reader = new FileReader();

        reader.onload = async function (e) {
            const dataUrl = e.target.result; // The result will be a Data URL

            datas.image = dataUrl; // Assign the Data URL to the image property in the datas object

            // After the FileReader has finished reading the image, send the fetch request
            try {
                let response = await fetch('/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datas) // Convert the object to a JSON string
                });

                console.log("response from add", response);

                let parsed_response = await response.text();
                console.log("parsed_Response", parsed_response);

                if (response.status === 200) {
                    alert("Movie added successfully");
                    window.location = `admin.html`
                } else {
                    alert("Something went wrong");
                }
            } catch (error) {
                console.log("error", error);
            }
        };

        reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
        // Handle the case where no image is selected
        try {
            let response = await fetch('/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datas) // Send the request even without an image
            });

            console.log("response from add", response);

            let parsed_response = await response.text();
            console.log("parsed_Response", parsed_response);

            if (response.status === 200) {
                alert("Movie added successfully");
            } else {
                alert("Something went wrong");
            }
        } catch (error) {
            console.log("error", error);
        }
    }
}

// View Movie

async function moviesPage() {
    try {
        let response = await fetch('/getdatas', { method: 'GET' })
        console.log("response", response);

        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        let data = parsed_response.data;
        console.log("data", data);

        let datacontainer = document.getElementById('datacontainer');

        let rows = '';

        for (i = 0; i < data.length; i++) {
            rows = rows +`

                <div>
                    <div class="d-flex">
                        <div>
                            <img src="${data[i].image}" style="width:224px;""height:378.08px;" onclick = "handleclick('${data[i]._id}')">
                            <div onclick="handleclick('${data[i]._id}')">${data[i].name}</div>
                            <div onclick="handleclick('${data[i]._id}')">${data[i].category.category}</div>
                        </div>
                    </div>
                </div>
            `
        }
        datacontainer.innerHTML = rows
    } catch (error) {
        console.log("error", error)
    }
}

function handleclick(id) {
    window.location = `view.html ? id = ${ id } `
}

async function moviePage() {
    let params = new URLSearchParams(window.location.search);
    console.log("params", params)

    let id = params.get('id');
    console.log("id : ", id);

    try {
        let response = await fetch(`/ getdata / ${ id } `)
        console.log("response", response)

        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        let datas = parsed_response.data;
        console.log("data", datas);

        let movieContainer = document.getElementById('movieContainer')

        let rows = `
                < div > ${ datas.name }</div >
        <div>${datas.cast}</div>
        <div>${datas.category.category}</div>
        <div>${datas.crew}</div>
        <div>${datas.description}</div>
        <div>${datas.duration}</div>
        <div>${datas.language.language}</div>
        <div>${datas.rating}</div>
        <div>${datas.release_date}</div>


            `

        movieContainer.innerHTML = rows;
    }
    catch (error) {
        console.log("error", error);
    }
}


async function adminView() {
    try {
        let response = await fetch('/getdatas', { method: 'GET' })
        console.log("response", response);

        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        let data = parsed_response.data;
        console.log("data", data);

        let adminContainer = document.getElementById('adminContainer');

        let rows = '';

        for (i = 0; i < data.length; i++) {
            rows = rows + `
            <div onclick = "handleclick('${data[i]._id}')" > ${ data[i].category.category }</div>
            <div onclick = "handleclick('${data[i]._id}')">${data[i].name}</div>
            <div><img src = "${data[i].image}" onclick = "handleclick('${data[i]._id}')"></div>
            <div><button onclick = "updateclick('${data[i]._id}')">update</button></div>
            <div><button onclick = "deleteClick('${data[i]._id}')">Delete</button></div>


            `
        }
        adminContainer.innerHTML = rows
    } catch (error) {
        console.log("error", error)
    }
}


function updateclick(id) {
    window.location = `update.html ? id = ${ id } `;
}

async function admin_getSelectBox() {
    try {
        let c_response = await fetch('/category', { method: 'GET' })
        console.log("c_response", c_response)

        let parsed_c_response = await c_response.json();
        console.log(parsed_c_response)

        let c_data = parsed_c_response.data;
        console.log("c_data", c_data)

        let c_rows = '<option selected = "category">category</option>'

        let category = document.getElementById('category');

        for (let i = 0; i < c_data.length; i++) {
            c_rows = c_rows + `
                < option value = "${c_data[i].category}" > ${ c_data[i].category }</option >
                    `
        }
        category.innerHTML = c_rows;


        //fetch language

        let l_response = await fetch('/language', { method: 'GET' });
        console.log("l_response", l_response);

        let parsed_l_response = await l_response.json();
        console.log("parsed_l_response", parsed_l_response);

        let l_data = parsed_l_response.data;
        console.log("l_data", l_data);

        let l_rows = '<option selected = "language">language</option>'

        let language = document.getElementById('language');

        for (let i = 0; i < l_data.length; i++) {
            l_rows = l_rows + `
                    < option value = "${l_data[i].language}" > ${ l_data[i].language }</option >
                        `
        }
        language.innerHTML = l_rows
    } catch (error) {
        console.log("error", error)
    }


    let name = document.getElementById('name')
    let image = document.getElementById('image');
    let rating = document.getElementById('rating')
    let duration = document.getElementById('duration')
    let release_date = document.getElementById('release_date')
    let description = document.getElementById('description')
    let category = document.getElementById('category')
    let language = document.getElementById('language')
    let cast = document.getElementById('cast')
    let crew = document.getElementById('crew')

    let params = new URLSearchParams(window.location.search);

    let id = params.get('id');
    console.log('id', id);

    try {
        let response = await fetch(`/ getdata / ${ id } `)
        console.log("response", response)

        let parsed_response = await response.json();
        console.log('parsed_response', parsed_response);

        let datas = parsed_response.data;
        console.log("data", datas);

        name.value = datas.name;
        rating.value = datas.rating;
        category.value = datas.category.category;
        language.value = datas.language.language;
        duration.value = datas.duration;
        release_date.value = datas.release_date;
        description.value = datas.description;
        cast.value = datas.cast;
        crew.value = datas.crew;



    }
    catch (error) {
        console.log("error", error);
    }


}


async function deleteClick(id) {
    console.log("reached........................,", id)
    try {
        let response = await fetch(`/ delete_data / ${ id } `, {
            method: "DELETE"
        });

        let parsed_response = await response.json()
        console.log(parsed_response)

        if (response.status === 200) {
            alert("deletion successfull")
            window.location = 'admin.html'
        } else {
            alert("deletion failed")
        }

    } catch (error) {

        console.log("error", error)
    }
}

async function filterMovies() {
    try {
        let c_response = await fetch('/category', { method: 'GET' })
        console.log("c_response", c_response)

        let parsed_c_response = await c_response.json();
        console.log(parsed_c_response)

        let c_data = parsed_c_response.data;
        console.log("c_data", c_data)

        let c_rows = '<option selected = "category">category</option>'

        let category = document.getElementById('category');

        for (let i = 0; i < c_data.length; i++) {
            c_rows = c_rows + `
                <option value="${c_data[i].category}">${c_data[i].category}</option>
                `
        }
        category.innerHTML = c_rows;


        //fetch language

        let l_response = await fetch('/language', { method: 'GET' });
        console.log("l_response", l_response);

        let parsed_l_response = await l_response.json();
        console.log("parsed_l_response", parsed_l_response);

        let l_data = parsed_l_response.data;
        console.log("l_data", l_data);

        let l_rows = '<option selected = "language">language</option>'

        let language = document.getElementById('language');

        for (let i = 0; i < l_data.length; i++) {
            l_rows = l_rows + `
                <option value = "${l_data[i].language}"> ${ l_data[i].language }</option>
                        `
        }
        language.innerHTML = l_rows
    } catch (error) {
        console.log("error", error)
    }
}
async function getFilter(event) {
    event.preventDefault()
    let category = document.getElementById('category').value
    console.log('category', category)

    if (category === 'category') {
        category = ''
    }

    let language = document.getElementById('language').value
    console.log('langauage', language)

    if (language === 'language') {
        language = ''
    }
    try {
        let response = await fetch(`/getdatas?category=${category}&language=${language}`)
    } catch (error) {

    }

}



