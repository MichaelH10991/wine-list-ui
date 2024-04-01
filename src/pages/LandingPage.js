import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Banner from "../components/Banner"
import Card from "../components/Card"

import getWineList from "../api/getWineList";
import updateWineList from "../api/updateWineList";
import createWineItem from "../api/createWineItem";
import deleteWineItem from "../api/deleteWineItem"

import "./LandingPage.css"

const mockData = [
  {
    id: 1,
    name: "Château Beauséjour-Duffau-Lagarrosse",
    sub: "The best one that they did",
    rating: 5,
    tags: {
      country: "France",
      grape: "Siraz",
      type: "Red",
      region: "Somewhere in France",
    },
    description: `Some wine, it was fine, I guess.`
  },
  {
    id: 2,
    name: "Yellow Tail",
    sub: "Chardonnay",
    tags: {
      type: "White",
      country: "Australia",
    },
    rating: 5,
    notes: `This was a good one, dry, tangly in my mouth. yum!`,
    description: `Shadoobee doo`
  },
  {
    id: 3,
    name: "Decántalo",
    rating: 5,
    tags: {
      country: "South Africa",
    },
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum.`
  },
  {
    id: 4,
    name: "Cairenne",
    rating: 5,
    tags: {
      country: "Germany",
      type: "Red",
      grape: "Malbec",
    },
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae.`
  },
  {
    id: 5,
    name: "Something",
    rating: 5,
    tags: {
      country: "France"
    },
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
    optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
    obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
    nihil, eveniet aliquid culpa officia aut!`
  }
]

const urlParams = new URLSearchParams(window.location.search);

const LandingPage = () => {
  const [wineList, setWineList] = useState([]);
  const [username, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const fetchedDataResponse = await getWineList(urlParams.get("user"));
      setUserName(fetchedDataResponse.data.userName);
      setWineList(fetchedDataResponse.data.wineList)
    }

    fetchData()
  }, []);

  const removeCard = async (id) => {
    await deleteWineItem(urlParams.get("user"), id);
    setWineList((oldData) => oldData.filter(item => item.id !== id))
  }

  const addCard = async () => {
    const newWineItem = { id: uuidv4() }
    await createWineItem(urlParams.get("user"), newWineItem);
    setWineList((prevState) => ([...prevState, newWineItem]))
  }

  const editClicked = async (cardData, mode, setMode) => {
    if(mode === "edit") {
      // save the data externally
      await updateWineList(urlParams.get("user"), cardData);
      // setCardData((oldData) => {
      //   return {...oldData}
      // });
      setMode("readonly");
    } else {
      // setCardData((oldData) => {
      //   return {...oldData, mode: "edit"}
      // });
      setMode("edit");
    }
  }

  const foo = async () => {
    urlParams.set("user", "123")
    const fetchedDataResponse = await getWineList(urlParams.get("user"));
    setUserName(fetchedDataResponse.data.userName);
    setWineList(fetchedDataResponse.data.wineList)
  }

  return (
    <>
      <Banner userName={username} onClick={foo}/>
      <div className="header-container">
        <div className="header">Welcome to your winelist, {username}.</div>
        <input className="search" placeholder="Search..."/>
      </div>
      <div className="card-container">
        {wineList && wineList.map(item => {
          return <Card 
            key={item.id}
            data={item}
            removeCard={removeCard}
            editClicked={editClicked}
          />
        })}
        <div className="add-new">
          <button onClick={() => addCard()}>
            <AddCircleOutlineIcon fontSize="7em" className="add-new-button"/>
          </button>
        </div>
      </div>
    </>
  )
}

export default LandingPage