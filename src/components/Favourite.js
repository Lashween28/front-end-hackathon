import { useEffect, useState } from "react";
import { db } from "../firebase-config"
import { collection, getDocs } from "firebase/firestore"
import Recipe from "./Recipe";
import { v4 as uuidv4} from "uuid"

const Favourite = () => {
    const userCollectionRef = collection(db, "favourite")
    const [favouriteRecipes, setFavouriteRecipes] = useState([])

    useEffect(() => {
        const getRecipes = async () => {
            const data = await getDocs(userCollectionRef);
            setFavouriteRecipes(data.docs.map(doc => ({...doc.data(), id: doc.id})))
        }

        getRecipes()
    }, []);

    console.log(favouriteRecipes)

    return ( 
        <div>
            <h2>Favourite</h2>

            {favouriteRecipes.length === 0 && <h2>No Favourites</h2>}

            {favouriteRecipes.map(recipe => (
               <Recipe key={uuidv4()}
               label={recipe.label} 
               image={recipe.image} 
               url={recipe.url} 
               ingredients={recipe.ingredients} 
               id={recipe.id} 
               favourite={recipe.favourite} 
                />
            ))}


        </div>
     );
}
 
export default Favourite;