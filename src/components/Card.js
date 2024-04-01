import "./Card.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import Section1 from "./section/Section"

import { useState } from "react"

import postWineList from "../api/updateWineList" 

const Heading = ({text, mode, onInput, children}) => {
  const [value, setValue ] = useState(text);
  if(!text && mode === "readonly") return undefined;

  return (
    <div className="card-title">
      {mode === "edit" ?
        <input 
          onInput={(event) => {
            setValue(event.target.value)
            return onInput(event.target.value)
          }
          }
          type="text"
          placeholder="Wine name..." 
          value={value}
        /> :
        value
      }
      {children}
    </div>
  )
}

const Subtitle = ({ text, onInput, mode }) => {
  const [value, setValue ] = useState(text);
  if(!text && mode === "readonly") return undefined;

  return (
    <div className="card-subtitle">
      {mode === "edit" ?
        <input 
          onInput={(event) => {
            setValue(event.target.value)
            return onInput(event.target.value)
          }}
          type="text" 
          placeholder="Subtitle... (optional)"
          value={value}
        /> :
        value
      }
    </div>
  )
}

const Pill = ({ text, type }) => {
  if(!text) return undefined;

  const colorMap = {
    country: {
      background: "#ff00008a",
      color: "white",
      border: "solid 1.5px rgb(176 2 0)",
    },
    grape: {
      background: "#0000ff8f",
      color: "white",
      border: "solid 1.5px rgb(38 20 240)",
    },
    type: {
      background: "#8000808c",
      color: "white",
      border: "solid 1.5px rgb(58 0 58)",
    },
    default: {
      background: "#ffff5e",
      color: "black",
      border: "solid 1.5px #dbdb27"
    }
  }

  return (
    <div className="pill-container">
      <div className="pill-tooltip">
          {type.charAt(0).toUpperCase() + type.slice(1)}
      </div>
      <div className="pill" style={colorMap[type] || colorMap["default"]}>
        {text}
      </div>
    </div>
  )
}

const cardModel = [
  {
    header: "Description:",
    key: "description",
    type: "textarea"
  },
  {
    header: "Notes:",
    key: "notes"
  },
  {
    header: "Rating:",
    key: "rating"
  },
  {
    header: "Tags:",
    key: "tags",
    render: (data) => {
      if (!data) return undefined;
      return (
        <div className="pillbox">
          <Pill text={data.country} type={"country"}/>
          <Pill text={data.grape} type={"grape"}/>
          <Pill text={data.type} type={"type"}/>
          <Pill text={data.region} type={"region"}/>
        </div>
      )
    }
  }
]

const Card = (props) => {
  const { 
    removeCard,
    editClicked,
    data
  } = props

  const [ cardData, setCardData ] = useState(data);
  const [ mode, setMode ] = useState(Object.keys(cardData).length === 1 ? "edit" : "readonly");

  const onInput = (fieldName) => (data) => {
    return setCardData((oldData) => {
      return {...oldData, [fieldName]: data}
    })
  }

  return (
    <div className="card">
      <div className="card-buttons">
        <button onClick={() => editClicked(cardData, mode, setMode)}>
          <EditIcon fontSize="small"/>
        </button>
        <div className="delete-button">
          <button onClick={() => removeCard(cardData.id)}>
            <DeleteIcon fontSize="small"/>
          </button>
        </div>
      </div>
      <Heading text={cardData.name} mode={mode} onInput={onInput("name")}>
        <Subtitle text={cardData.sub} mode={mode} onInput={onInput("sub")}/>
      </Heading>
      <div className="card-content-container">
        {
          cardModel.map(
            (config, index) => {
              return (
                <Section1 
                  id={`${config.key}-${index}`}
                  config={config}
                  mode={mode}
                  content={cardData[config.key]}
                  onInput={onInput(config.key)}
                />
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default Card