const farm_data_list = document.querySelector('#farm-data-list');
const get_data_form = document.querySelector('#request-data-form');
const sort_data_form = document.querySelector('#sort-farm-data-form');


// create element & render farm data
function renderData(doc, collection){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let data_json = document.createElement('span');
    let cross = document.createElement('div');
    let id_doc = document.createElement('div');
    id_doc.className = 'id_class'

    li.setAttribute('data-id', doc.id);
    name.textContent = (collection == "tomatoes" || collection == "production") ? ("Name is " + doc.data().name) : ("At time " + doc.data().time);
    data_json.textContent = JSON.stringify(doc.data());
    cross.textContent = 'x';
    id_doc.textContent = doc.id;

    li.appendChild(name);
    li.appendChild(data_json);
    li.appendChild(cross);
    li.appendChild(id_doc)

    farm_data_list.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection(collection).doc(id).delete();
        console.log("Deleted document!")
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

function get_sorted_data(collection, key, operator, value) {

   let query_instance = db.collection(collection).where(key, operator, parseFloat(value));
    if (operator != "==") {
        query_instance = query_instance.orderBy(key, 'desc');
    }

    query_instance.get().then(snapshot =>
        {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }  
              
            snapshot.docs.forEach(doc => {
                //console.log(doc);
                renderData(doc,collection);
            });
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
            console.log("Looking for document in collection with id");
            get_data_by_id(collection, id_doc)
        } else if(collection != '') {
            console.log("Looking through all documents for collection")
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
            console.log("Sorting collection!");
            get_sorted_data(collection, key, operator, val);
    }

    get_data_form.collection.value = '';
    get_data_form.id_doc.value = '';

    sort_data_form.key_sort.value = '';
    sort_data_form.value_sort.value = '';
    sort_data_form.operator_sort.value = '';
});
