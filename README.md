# Tomato Farm 🍅

Stack API and App: nodejs, express, firebase, firestore, html, css and javascript :)

You can follow [this link to the live app](https://tomato-farm-7f26e.web.app/). 

The scope of this project is to extract data from a database and visualize it in a simple way. Firebase's Cloud Firestore services were used due to it's easy and quick setup. Being a quick and easy way to prototype and also host a web app (with minimal code), makes it a suitable choice. Moreover, a RESTful api has been developed for baisc CRUD operations on the stored data. 

The following sections will explain further the repository. API Crud Design will present the design and structure of the database. Next, in the usage chapter, you will find info on how to operate the web app and interact with the api. Finally, a section with a list of possible improvements will be addressed.

## API CRUD Design
In the folder **farm-api** there should be a controller called `farm.js`. This controller (with the help of the express web framework) contains routes and sets up responses to requests for the CRUD operations to access the database. A firebase function is exported called farm. Through this function the api can perform all the listed operations associated with it. The link for the api calls is embedded [here](https://us-central1-tomato-farm-7f26e.cloudfunctions.net/farm).

The image in firestore looks as follows. 

![image](https://user-images.githubusercontent.com/37040215/110009281-17197500-7d1d-11eb-9263-74fa94d768b0.png)

The database is structured according to the supplied json data, and is necessary to be understood before we get to the usage of the app. The following image will aid in understanding this structure.

![image](https://user-images.githubusercontent.com/37040215/110010085-3533a500-7d1e-11eb-87b3-3d3e860648bf.png)

Each json file supplied has been converted to a collection in firebase's cloudstore. **production**, **environment**, **soil**, and **tomatoes** are each a collection containing sets of documents. Each document has a specific id. For instance for the case of the **environment** collection, each document seen on the middle contains the json data on the right. The document ids and the name of the collections will be used to send get requests for the data in the web app.

## Usage
If one should wish to test the live app, (and I can't imagine whom would've read all this text without wishing for the final outcome), the live app link is posted at the beginning of this readme file. In this chapter the usage of this app will be explained. The following photo shows the simple interface created to visualise the data. 


![image](https://user-images.githubusercontent.com/37040215/110014718-6bbfee80-7d23-11eb-93ed-c541a498ed20.png)

In the image, the input field "collection" is completed with the collection key **production**. If then the *Get Data* button is pressed, the app will make a request to fetch all the documents in this collection. There is also the option to specify the id of a single document and filter those out. 

The output is presented in a list. Each child of list will present either the name of the document (in the case of production and tomatoes) or the timestamp (in the case of environment or soil). On the far right, the unique id and a cross are shown. If one decides to press the cross, the app will make a call to delete the given document.
Underneath the title of each document the json data is shown in light grey.

![image](https://user-images.githubusercontent.com/37040215/110017073-133e2080-7d26-11eb-8f83-2cddaca02f52.png)

In the above image, there's an explanation on how to use the sorting form. Pressing the sorting button, the data will be sorted by looking at the key input **data.temperature**  (leftmost field), with the operator **<=** (center field) and expected value of 3. Returned data is sorted in descending order by this parameter.

For example, the following two images show how to sort the data to display the days with the second highest temperatures. First we identify the second highest temperature by querying for a high temp value. Then we use the **==** operator to get all the days with that temperature value.

![image](https://user-images.githubusercontent.com/37040215/110017873-f9510d80-7d26-11eb-92b7-5be997b3fd0d.png)

![image](https://user-images.githubusercontent.com/37040215/110017954-12f25500-7d27-11eb-962c-185f17ea44ec.png)


## What I would've done differently
- Visualize data in a nicer way, while JSON output is useful, it is not so easy to visualise the data for each document.
- Management of resources should've been planned for better, a lot of time was spent figuring out how the API should've been structured.
- Use the api to visualize the data. It was unclear whether I was needed or not to use the api created to fetch the json data and then display it. In the end a simple db connection approach as used.
- Implement more query operations in the API
- Use a frontend web framework such as React.
- Don't post the API Key for firebase publicly on github.
- Real time update of the data.
- More error handling. While some errors/debugging messages are thrown in the console, and as a reponse from the API, the errors should be more visible to the user.
