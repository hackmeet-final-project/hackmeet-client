import { Outlet } from 'react-router-dom'

const App = () => {

  return (
    <>

    <Outlet/>
    <div id="background-wrap">
        <div className="x1">
            <img src="https://cdn.discordapp.com/attachments/1098167479722840096/1134334284585508935/image.png"/>
        </div>
        <div className="x2">
            <img src="https://cdn.discordapp.com/attachments/1098167479722840096/1134334284585508935/image.png"/>
        </div>
        <div className="x3">
            <img src="https://cdn.discordapp.com/attachments/1098167479722840096/1134334284585508935/image.png"/>
        </div>
        <div className="x4">
            <img src="https://cdn.discordapp.com/attachments/1098167479722840096/1134334284585508935/image.png"/>
        </div>
        <div className="x5">
            <div className="cloud"></div>
        </div>
        <div className="x2">
            <div className="cloud"></div>
        </div>
        <div className="x1">
            <div className="cloud"></div>
        </div>
        <div className="x3">
            <div className="cloud"></div>
        </div>
        <div className="x4">
            <div className="cloud"></div>
        </div>
        <div className="x5">
            <div className="cloud"></div>
        </div>
    </div>
    </>
  )
}

export default App