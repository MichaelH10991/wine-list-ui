import { useState } from "react";
import ReplayTwoToneIcon from '@mui/icons-material/ReplayTwoTone';

import "./Section.css";

const SectionInput = ({ value, type, setValue, onInput }) => {
  if(type === "textarea") {
    return (
      <textarea 
        onInput={(event) => {
          setValue(event.target.value)
          onInput(event.target.value)
        }}
        value={value} 
      />
    )
  } else {
    return (
      <input 
        onInput={(event) => {
          setValue(event.target.value)
          onInput(event.target.value)
        }}
        value={value} 
      />
    )
  }
}

const Children = ({ config, content }) => {
  if(config.render) {
    return config.render(content)
  }
}

const Section = ({ config, mode, content, onInput, children }) => {
  const [value, setValue] = useState(content);
  const [valueStore] = useState(content);

  if(config.render) {
    //render children
    return (
      <>
        <div className="card-content-header">
          {config.header}
        </div>
        <Children config={config} content={content} />
      </>
    )
  } else {
    // render normal component
    return (
      <>
        <div className="card-content-header">
          {config.header}
        </div>
        <div className="card-content">
          {mode === "edit" ? 
            <>
              <SectionInput value={value} type={config.type} setValue={setValue} onInput={onInput}/>
              <button onClick={() => setValue(valueStore)}>
                <ReplayTwoToneIcon />
              </button>
            </>
            :
            value || "-"
          }
        </div>
      </>
    );
  }

  // return (
  //   <div>
  //     <div className="card-content-header">
  //       {config.header}
  //     </div>
  //     <div className="card-content">
  //       {mode === "edit" ? 
  //         <>
  //           <SectionInput value={value} type={config.type} setValue={setValue} onInput={onInput}/>
  //           <button onClick={() => setValue(content)}>
  //             <ReplayTwoToneIcon />
  //           </button>
  //         </>
  //          :
  //         value || children || "-"
  //       }
  //     </div>
  //   </div>
  // )
}

export default Section