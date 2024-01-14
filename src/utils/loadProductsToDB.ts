const mongodb = require("mongodb");
const mongoose = require("mongoose");
const mongoClient = mongodb.MongoClient;

require("dotenv").config();

// const client = new mongoClient(process.env.DB_URL);

import { products } from "./mockData";


function loadProductsToDB(): void {
  console.log("trying to load products to db...");
  let string = process.env.MONGO_DB_CONNECTION_STRING;
  
  const DB_NAME = string?.split("/").slice(3)[0]
  let length_of_db_name = DB_NAME?.length
  if (length_of_db_name !== undefined) {
    
  let DB_URL = process.env.MONGO_DB_CONNECTION_STRING?.slice(
    0,
    -length_of_db_name
  );
    

    // console.log(DB_URL); 
    const client = new mongoClient(DB_URL);


    (async () => {
      try {

        const existingDocumentsCount = await client
          .db(DB_NAME)
          .collection("mock_products")
          .countDocuments();

        if(existingDocumentsCount > 0){

          console.log(`The 'mock products' collection already has ${existingDocumentsCount} documents ` )
          return
            
                      
        }

        const feedback = await client
          .db(DB_NAME)
          .collection("mock_products")
          .insertMany(products);


        
  
        


     
        console.log("successfullly inserted products into the 'mock products' collection");
      } catch (error) {
        console.log("Error storing data in database", error);
      }
    })();


     
    
    
  } else {
    console.log("Error: 'length_of_db_name' is undefined.");
  } 
  

}

export default loadProductsToDB;
