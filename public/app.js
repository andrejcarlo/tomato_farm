const farm_data_list = document.querySelector('#farm-data-list');
const get_data_form = document.querySelector('#request-data-form');
const sort_data_form = document.querySelector('#sort-farm-data-form');


// create element & render farm data
function renderData(doc, collection){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let data_json = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = (collection == "tomatoes" || collection == "production") ? ("Name is " + doc.data().name) : ("At time " + doc.data().time);
    data_json.textContent = JSON.stringify(doc.data());
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(data_json);
    li.appendChild(cross);

    farm_data_list.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection(collection).doc(id).delete();
    });
}


function get_data(collection) { 
    db.collection(collection).get().then(snapshot =>
        {
            snapshot.docs.forEach(doc => {
               
                renderData(doc, collection);
               
            });
        });
}

function get_data_by_id(collection, id){
    db.collection(collection).doc(id).get().then(snapshot =>
        {
            renderData(snapshot, collection);
        });
}

// get data 
get_data_form.addEventListener('submit', (e) => {
    e.preventDefault();
    // refresh list whenever you try to pull new data
    while (farm_data_list.lastElementChild) {
        farm_data_list.removeChild(farm_data_list.lastElementChild);
    }

    const id_doc =  get_data_form.id_doc.value;
    const collection = get_data_form.collection.value;


    // check whether you wanna index by id or just by collection name
    if (id_doc != '' && collection != '') {
            console.log("Looking for collection with id");
            get_data_by_id(collection, id_doc)
        } else if(collection != '') {
            console.log("Looking for collection")
            get_data(collection);
        }
    get_data_form.collection.value = '';
    get_data_form.id_doc.value = '';
});

// query data 
sort_data_form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // refresh list whenever you try to pull new data
    while (farm_data_list.lastElementChild) {
        farm_data_list.removeChild(farm_data_list.lastElementChild);
    }

    //const id_doc =  get_data_form.id_doc.value;
    // get collection name to know which collection to query
    const collection = get_data_form.collection.value;
    const key = sort_data_form.key_sort.value;
    const operator = sort_data_form.operator_sort.value;
    const val = sort_data_form.value_sort.value;

    // check whether you wanna index by id or just by collection name
    if (collection != '') {
            console.log("Looking for collection with id");
            get_data_by_id(collection, id_doc)
    }

    get_data_form.collection.value = '';
    get_data_form.id_doc.value = '';
});
